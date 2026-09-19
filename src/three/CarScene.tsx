import React, { useEffect, useRef } from 'react';
import { GLView } from 'expo-gl';
import type { ExpoWebGLRenderingContext } from 'expo-gl';
import * as THREE from 'three';
import { buildBeachEnvironment } from './BeachEnvironment';
import { addBoostFlames, addClouds, addDust, addSpeedLines } from './RaceEffects';
import { createSupercar } from './CarModels';
import { addOceanWaves, addSkyDome } from './WorldEffects';

type CameraMode = 'chase' | 'cockpit' | 'top' | 'wide';
type WeatherMode = 'Day' | 'Sunset' | 'Night';
type Props = { color: string; mode?: 'garage' | 'race'; cameraMode?: CameraMode; weather?: WeatherMode; steering?: number; boosting?: boolean; jumping?: boolean; drift?: number };

export function CarScene({ color, mode = 'garage', cameraMode = 'chase', weather = 'Sunset', steering = 0, boosting = false, jumping = false, drift = 0 }: Props) {
  const frame = useRef<number | null>(null); const live = useRef({ cameraMode, weather, steering, boosting, jumping, drift }); live.current = { cameraMode, weather, steering, boosting, jumping, drift };
  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const renderer = new THREE.WebGLRenderer({ context: gl as any, antialias: true, powerPreference: 'high-performance' }); renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.shadowMap.enabled = true;
    const scene = new THREE.Scene(); const night = weather === 'Night'; const sky = night ? '#06111c' : weather === 'Day' ? '#81cdf0' : '#d78570'; scene.background = new THREE.Color(sky); scene.fog = new THREE.Fog(sky, 14, 58); addSkyDome(scene, night);
    const camera = new THREE.PerspectiveCamera(48, gl.drawingBufferWidth / gl.drawingBufferHeight, .1, 170); camera.position.set(0, 5.2, 10);
    scene.add(new THREE.HemisphereLight(night ? '#6b86bd' : '#d9f7ff', '#101820', night ? 1.1 : 2.4)); const sun = new THREE.DirectionalLight(night ? '#779dff' : '#ffe2bd', night ? 1.3 : 3.8); sun.position.set(-8, 14, 8); sun.castShadow = true; scene.add(sun); const rim = new THREE.PointLight('#4cddff', night ? 28 : 14, 24); rim.position.set(4, 4, -6); scene.add(rim);
    buildBeachEnvironment(scene); const waves = addOceanWaves(scene); const clouds = addClouds(scene); const car = createSupercar(color, 'wedge'); scene.add(car); const flames = addBoostFlames(car); const speedLines = addSpeedLines(scene); const dust = addDust(scene); const clock = new THREE.Clock();
    const animate = () => { const t = clock.getElapsedTime(); const state = live.current; const preset = ({ chase: { x: 0, y: 5.2, z: 10, look: .8 }, cockpit: { x: 0, y: 1.65, z: 2.8, look: 1.05 }, top: { x: 0, y: 13, z: 5, look: 0 }, wide: { x: 8.5, y: 6.5, z: 13, look: .7 } } as any)[state.cameraMode]; const jump = state.jumping ? Math.max(0, Math.sin(Math.min(t * 4.8, Math.PI) * 1.1)) * 1.45 : 0; car.position.y = jump + Math.sin(t * 4) * .018; car.rotation.y = Math.PI + (mode === 'garage' ? Math.sin(t * .45) * .34 : state.steering * .18); car.rotation.z = state.steering * -.09 - state.drift * .0012; car.rotation.x = state.boosting ? Math.sin(t * 22) * .012 : 0; camera.position.lerp(new THREE.Vector3(preset.x, preset.y, preset.z), .08); camera.lookAt(0, preset.look, 0); camera.fov = THREE.MathUtils.lerp(camera.fov, state.boosting ? 59 : 48, .08); camera.updateProjectionMatrix(); flames.visible = state.boosting; flames.scale.setScalar(.9 + Math.sin(t * 35) * .2); speedLines.visible = state.boosting; speedLines.children.forEach((line, i) => { line.position.z += (.08 + Number(line.userData.speed || .5) * .22) * (state.boosting ? 4 : .12); if (line.position.z > 8) line.position.z = -24 - i * .15; }); dust.visible = state.jumping || state.boosting || state.drift > 25; dust.children.forEach((p) => { p.position.y += .012; if (p.position.y > 1.4) p.position.y = .05; }); clouds.position.x = Math.sin(t * .025) * 2; waves.rotation.z = Math.sin(t * .12) * .01; renderer.render(scene, camera); gl.endFrameEXP(); frame.current = requestAnimationFrame(animate); }; animate();
  };
  useEffect(() => () => { if (frame.current !== null) cancelAnimationFrame(frame.current); }, []); return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate as any} />;
}

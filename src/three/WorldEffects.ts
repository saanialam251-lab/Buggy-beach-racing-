import * as THREE from 'three';

export function addSkyDome(scene: THREE.Scene, night = false) {
  const sky = new THREE.Mesh(new THREE.SphereGeometry(95, 32, 16), new THREE.MeshBasicMaterial({ color: night ? '#07152a' : '#76c9ed', side: THREE.BackSide }));
  scene.add(sky);
  const horizon = new THREE.Mesh(new THREE.CylinderGeometry(55, 55, 18, 48, 1, true), new THREE.MeshBasicMaterial({ color: night ? '#10223d' : '#f2a77b', side: THREE.BackSide, transparent: true, opacity: 0.6 }));
  horizon.position.y = 4; scene.add(horizon);
  if (night) {
    const stars = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: '#d7efff' });
    for (let i = 0; i < 80; i++) { const star = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), mat); star.position.set((Math.random() - .5) * 100, 15 + Math.random() * 35, -35 - Math.random() * 50); stars.add(star); }
    scene.add(stars);
  } else {
    const sun = new THREE.Mesh(new THREE.SphereGeometry(3.2, 24, 16), new THREE.MeshBasicMaterial({ color: '#fff0ad' }));
    sun.position.set(-25, 20, -48); scene.add(sun);
  }
}

export function addOceanWaves(scene: THREE.Scene) {
  const waves = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color: '#a7f5f5', transparent: true, opacity: .22 });
  for (let i = 0; i < 12; i++) { const wave = new THREE.Mesh(new THREE.TorusGeometry(8 + i * 1.7, .035, 6, 64), mat); wave.rotation.x = -Math.PI / 2; wave.position.set(0, -.45, -28); waves.add(wave); }
  scene.add(waves); return waves;
}

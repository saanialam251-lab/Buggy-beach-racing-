import * as THREE from 'three';

export type DesignKind = 'wedge' | 'gt' | 'grand-tourer' | 'track';

export function createSupercar(color: string, kind: DesignKind = 'wedge') {
  const group = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color, metalness: 0.84, roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.05 });
  const carbon = new THREE.MeshStandardMaterial({ color: '#080d12', metalness: 0.78, roughness: 0.25 });
  const glass = new THREE.MeshPhysicalMaterial({ color: '#8ed8f5', metalness: 0.2, roughness: 0.08, transparent: true, opacity: 0.72 });
  const bodyWidth = kind === 'grand-tourer' ? 3.0 : 2.72;
  const bodyLength = kind === 'track' ? 5.35 : 5.0;
  const body = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth, 0.76, bodyLength), paint);
  body.position.y = 0.75;
  group.add(body);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(bodyWidth * 0.49, 2.2, kind === 'gt' ? 6 : 4), paint);
  nose.rotation.x = Math.PI / 2;
  nose.scale.y = 0.28;
  nose.position.set(0, 0.82, bodyLength / 2 + 0.42);
  group.add(nose);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.66, kind === 'grand-tourer' ? 0.82 : 0.7, kind === 'track' ? 1.8 : 2.05), glass);
  cabin.position.set(0, 1.35, -0.15);
  cabin.rotation.x = -0.08;
  group.add(cabin);

  const splitter = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.91, 0.1, 0.44), carbon);
  splitter.position.set(0, 0.4, bodyLength / 2 + 0.05);
  group.add(splitter);

  if (kind !== 'grand-tourer') {
    const spoiler = new THREE.Mesh(new THREE.BoxGeometry(kind === 'track' ? 2.35 : 2, 0.11, 0.5), carbon);
    spoiler.position.set(0, kind === 'track' ? 1.5 : 1.3, -bodyLength / 2 + 0.1);
    group.add(spoiler);
  }

  const wheelGeo = new THREE.CylinderGeometry(kind === 'track' ? 0.61 : 0.57, kind === 'track' ? 0.61 : 0.57, 0.4, 28);
  const wheelMat = new THREE.MeshStandardMaterial({ color: '#10161e', metalness: 0.85, roughness: 0.25 });
  for (const [x, z] of [[-bodyWidth * 0.53, bodyLength * 0.31], [bodyWidth * 0.53, bodyLength * 0.31], [-bodyWidth * 0.53, -bodyLength * 0.31], [bodyWidth * 0.53, -bodyLength * 0.31]]) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, 0.48, z);
    group.add(wheel);
  }

  const lampMat = new THREE.MeshStandardMaterial({ color: '#fff1af', emissive: '#ffe18a', emissiveIntensity: 4 });
  for (const x of [-bodyWidth * 0.3, bodyWidth * 0.3]) {
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.17), lampMat);
    lamp.position.set(x, 0.91, bodyLength / 2 - 0.1);
    group.add(lamp);
  }
  group.rotation.y = Math.PI;
  return group;
}

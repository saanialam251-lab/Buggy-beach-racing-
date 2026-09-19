import * as THREE from 'three';

export function addSpeedLines(scene: THREE.Scene, color = '#8cecff') {
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.72 });
  for (let i = 0; i < 42; i += 1) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.7 + Math.random() * 2.4), material);
    line.position.set((Math.random() - 0.5) * 20, 0.25 + Math.random() * 5, -3 - Math.random() * 20);
    line.userData.speed = 0.3 + Math.random() * 0.9;
    group.add(line);
  }
  scene.add(group);
  return group;
}

export function addBoostFlames(car: THREE.Group) {
  const group = new THREE.Group();
  const flameMaterials = [
    new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.95 }),
    new THREE.MeshBasicMaterial({ color: '#44dfff', transparent: true, opacity: 0.85 }),
    new THREE.MeshBasicMaterial({ color: '#ffb52e', transparent: true, opacity: 0.8 }),
  ];
  [-0.62, 0.62].forEach((x, index) => {
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.19, 1.25, 12), flameMaterials[index % flameMaterials.length]);
    flame.rotation.x = -Math.PI / 2;
    flame.position.set(x, 0.62, -2.75);
    flame.userData.base = 1;
    group.add(flame);
  });
  car.add(group);
  return group;
}

export function addDust(scene: THREE.Scene) {
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color: '#f6d49c', transparent: true, opacity: 0.2 });
  for (let i = 0; i < 24; i += 1) {
    const dust = new THREE.Mesh(new THREE.SphereGeometry(0.08 + Math.random() * 0.15, 8, 6), material);
    dust.position.set((Math.random() - 0.5) * 6, 0.05 + Math.random() * 0.35, -2 - Math.random() * 7);
    dust.userData.phase = Math.random() * Math.PI * 2;
    group.add(dust);
  }
  scene.add(group);
  return group;
}

export function addClouds(scene: THREE.Scene) {
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.24 });
  for (let i = 0; i < 8; i += 1) {
    const cloud = new THREE.Group();
    for (let j = 0; j < 4; j += 1) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.7 + Math.random() * 0.45, 12, 8), material);
      puff.position.set(j * 0.8, Math.random() * 0.35, 0);
      cloud.add(puff);
    }
    cloud.position.set(-18 + i * 5.4, 8 + (i % 3), -16 - (i % 2) * 7);
    cloud.scale.setScalar(0.8 + (i % 3) * 0.18);
    group.add(cloud);
  }
  scene.add(group);
  return group;
}

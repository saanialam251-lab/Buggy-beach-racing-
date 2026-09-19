import * as THREE from 'three';

function material(color: string, roughness = 0.8, metalness = 0) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function addBuilding(scene: THREE.Scene, x: number, z: number, width: number, depth: number, height: number, color: string, roofColor: string) {
  const building = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material(color, 0.72));
  body.position.y = height / 2 - 0.45;
  body.castShadow = true;
  body.receiveShadow = true;
  building.add(body);

  const roof = new THREE.Mesh(new THREE.BoxGeometry(width + 0.22, 0.22, depth + 0.22), material(roofColor, 0.65));
  roof.position.y = height - 0.32;
  roof.castShadow = true;
  building.add(roof);

  const windowMat = new THREE.MeshStandardMaterial({ color: '#8de9ff', emissive: '#145a70', emissiveIntensity: 0.65, roughness: 0.2, metalness: 0.25 });
  const doorMat = material('#17242d', 0.4, 0.2);
  const floors = Math.max(2, Math.floor(height / 2));
  const columns = Math.max(2, Math.floor(width / 1.25));
  for (let floor = 0; floor < floors; floor++) {
    for (let column = 0; column < columns; column++) {
      const window = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.42, 0.06), windowMat);
      window.position.set(-width / 2 + 0.65 + column * ((width - 1.0) / Math.max(1, columns - 1)), 1.0 + floor * 1.18, depth / 2 + 0.035);
      building.add(window);
      const sideWindow = window.clone();
      sideWindow.rotation.y = Math.PI / 2;
      sideWindow.position.set(width / 2 + 0.035, 1.0 + floor * 1.18, -depth / 2 + 0.7 + column * 0.18);
      building.add(sideWindow);
    }
  }

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.25, 0.07), doorMat);
  door.position.set(0, 0.2, depth / 2 + 0.05);
  building.add(door);
  building.position.set(x, 0, z);
  scene.add(building);
}

function addPalm(scene: THREE.Scene, x: number, z: number, scale: number) {
  const palm = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * scale, 0.23 * scale, 2.8 * scale, 8), material('#85552b', 1));
  trunk.position.y = 1.0 * scale;
  trunk.rotation.z = 0.05;
  palm.add(trunk);
  const leafMat = material('#29975c', 0.9);
  for (let i = 0; i < 7; i++) {
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.13 * scale, 1.55 * scale, 0.38 * scale), leafMat);
    leaf.position.set(0, 2.45 * scale, 0);
    leaf.rotation.z = Math.PI / 3.2;
    leaf.rotation.y = i * (Math.PI * 2 / 7);
    palm.add(leaf);
  }
  palm.position.set(x, 0, z);
  scene.add(palm);
}

function addRoadMark(scene: THREE.Scene, angle: number, radius: number, width: number) {
  const mark = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.035, width), material('#f7e7a6', 0.5));
  mark.position.set(Math.cos(angle) * radius, -0.03, Math.sin(angle) * radius);
  mark.rotation.y = -angle;
  scene.add(mark);
}

export function buildBeachEnvironment(scene: THREE.Scene) {
  const sand = new THREE.Mesh(new THREE.CircleGeometry(25, 96), material('#c49a62', 1));
  sand.rotation.x = -Math.PI / 2;
  sand.position.y = -0.55;
  sand.receiveShadow = true;
  scene.add(sand);

  const water = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.MeshStandardMaterial({ color: '#249bb1', roughness: 0.18, metalness: 0.2, transparent: true, opacity: 0.94 }));
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, -0.58, -28);
  scene.add(water);

  const road = new THREE.Mesh(new THREE.RingGeometry(5.35, 8.75, 128), material('#1b252e', 0.9, 0.05));
  road.rotation.x = -Math.PI / 2;
  road.position.y = -0.46;
  road.receiveShadow = true;
  scene.add(road);

  const curb = new THREE.Mesh(new THREE.RingGeometry(8.72, 8.94, 128), material('#e8d79d', 0.7));
  curb.rotation.x = -Math.PI / 2;
  curb.position.y = -0.42;
  scene.add(curb);
  const innerCurb = new THREE.Mesh(new THREE.RingGeometry(5.14, 5.36, 128), material('#e8d79d', 0.7));
  innerCurb.rotation.x = -Math.PI / 2;
  innerCurb.position.y = -0.42;
  scene.add(innerCurb);

  for (let i = 0; i < 32; i++) addRoadMark(scene, (i / 32) * Math.PI * 2, 7.05, 0.58);

  // Side-by-side beachfront buildings frame the track.
  const buildings = [
    [-12.5, -3, 3.5, 3.2, 5.2, '#df8e62', '#f5c477'], [12.5, -3, 3.8, 3.4, 6.4, '#6fa4ba', '#e7d69c'],
    [-13.2, 7.5, 4.1, 3.5, 7.8, '#e9bd72', '#bd5c54'], [13.2, 7.5, 4.1, 3.5, 5.8, '#b979a7', '#e6b76b'],
    [-15.5, 15.5, 5.3, 4.0, 9.5, '#709b7c', '#e7d69c'], [15.5, 15.5, 5.3, 4.0, 8.2, '#d77e63', '#78bcc0'],
    [-17, -13, 5.5, 4.2, 8.6, '#6b87a3', '#e6b76b'], [17, -13, 5.5, 4.2, 7.5, '#d99d5c', '#6c9eab'],
  ] as const;
  buildings.forEach(([x, z, width, depth, height, color, roof]) => addBuilding(scene, x, z, width, depth, height, color, roof));

  [-10.5, 10.5, -16.5, 16.5].forEach((x, index) => addPalm(scene, x, index % 2 ? 3 : -8, 1.15));
  [-16, 16].forEach((x) => addPalm(scene, x, 23, 1.4));

  const lampMat = new THREE.MeshStandardMaterial({ color: '#a7c6ce', metalness: 0.75, roughness: 0.3 });
  const bulbMat = new THREE.MeshStandardMaterial({ color: '#d9f7ff', emissive: '#5ddfff', emissiveIntensity: 4 });
  [-10.1, 10.1].forEach((x) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 2.8, 10), lampMat);
    pole.position.set(x, 1.0, 0);
    scene.add(pole);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), bulbMat);
    bulb.position.set(x, 2.45, 0);
    scene.add(bulb);
  });
}

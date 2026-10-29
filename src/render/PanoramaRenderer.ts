import * as THREE from 'three';

/**
 * Renders the official Minecraft 26.3 Title Screen 3D Panorama Skybox
 * using `/assets/minecraft/textures/gui/title/background/panorama_0..5.png`
 * extracted from `/.minecraft/assets/indexes/34.json`.
 */
export class PanoramaRenderer {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  cubeMesh: THREE.Mesh;
  angle = 0;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 100);

    const loader = new THREE.TextureLoader();
    const loadFace = (idx: number) => {
      const tex = loader.load(`/assets/minecraft/textures/gui/title/background/panorama_${idx}.png`);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      return new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, depthWrite: false });
    };

    // Minecraft panorama order: 0=front(+Z), 1=right(-X), 2=back(-Z), 3=left(+X), 4=top(+Y), 5=bottom(-Y)
    // Three.js BoxGeometry material order: +X, -X, +Y, -Y, +Z, -Z
    const materials = [
      loadFace(1), // +X
      loadFace(3), // -X
      loadFace(4), // +Y
      loadFace(5), // -Y
      loadFace(0), // +Z
      loadFace(2), // -Z
    ];

    const geo = new THREE.BoxGeometry(10, 10, 10);
    this.cubeMesh = new THREE.Mesh(geo, materials);
    this.scene.add(this.cubeMesh);
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  render(renderer: THREE.WebGLRenderer, dt: number) {
    this.angle += dt * 0.085;
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = -this.angle;
    this.camera.rotation.x = Math.sin(this.angle * 0.7) * 0.12 - 0.08;
    renderer.render(this.scene, this.camera);
  }
}

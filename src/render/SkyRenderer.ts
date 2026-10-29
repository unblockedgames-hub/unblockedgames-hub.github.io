// Official Minecraft 26.3 Sky, Sun, Moon Phases, Stars, and 3D Clouds Renderer
// Uses /assets/minecraft/textures/environment/sun.png, moon_phases.png, clouds.png

import * as THREE from 'three';

export class SkyRenderer {
  public group: THREE.Group;
  private celestialGroup: THREE.Group;
  private sunMesh!: THREE.Mesh;
  private moonMesh!: THREE.Mesh;
  private starsPoints!: THREE.Points;
  private cloudsMesh!: THREE.Mesh;
  private cloudOffset = 0;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    this.celestialGroup = new THREE.Group();
    this.group.add(this.celestialGroup);
    scene.add(this.group);

    this.initSunAndMoon();
    this.initStars();
    this.initClouds();
  }

  private initSunAndMoon(): void {
    const loader = new THREE.TextureLoader();

    // Sun (sun.png)
    const sunGeo = new THREE.PlaneGeometry(36, 36);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    loader.load('/assets/minecraft/textures/environment/sun.png', (tex) => {
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      sunMat.map = tex;
      sunMat.needsUpdate = true;
    });
    this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
    this.sunMesh.position.set(0, 160, 0);
    this.sunMesh.rotation.x = Math.PI / 2;
    this.celestialGroup.add(this.sunMesh);

    // Moon (moon_phases.png - 4x2 grid of phases, crop full moon cell 0,0)
    const moonGeo = new THREE.PlaneGeometry(28, 28);
    const uv = moonGeo.attributes.uv as THREE.BufferAttribute;
    uv.setXY(0, 0, 1.0);
    uv.setXY(1, 0.25, 1.0);
    uv.setXY(2, 0, 0.5);
    uv.setXY(3, 0.25, 0.5);
    uv.needsUpdate = true;

    const moonMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    loader.load('/assets/minecraft/textures/environment/moon_phases.png', (tex) => {
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      moonMat.map = tex;
      moonMat.needsUpdate = true;
    });
    this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
    this.moonMesh.position.set(0, -160, 0);
    this.moonMesh.rotation.x = -Math.PI / 2;
    this.celestialGroup.add(this.moonMesh);
  }

  private initStars(): void {
    const starCount = 750;
    const positions = new Float32Array(starCount * 3);
    let seed = 10842;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0xffffffff;
    };

    for (let i = 0; i < starCount; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 155;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      fog: false,
    });
    this.starsPoints = new THREE.Points(geo, mat);
    this.celestialGroup.add(this.starsPoints);
  }

  private initClouds(): void {
    const loader = new THREE.TextureLoader();
    const cloudGeo = new THREE.PlaneGeometry(512, 512);
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.82,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    loader.load('/assets/minecraft/textures/environment/clouds.png', (tex) => {
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 2);
      cloudMat.map = tex;
      cloudMat.needsUpdate = true;
    });
    this.cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
    this.cloudsMesh.rotation.x = Math.PI / 2;
    this.cloudsMesh.position.y = 128;
    this.group.add(this.cloudsMesh);
  }

  public update(dt: number, playerPos: THREE.Vector3, timeOfDay: number, cloudsMode: string): void {
    this.group.position.set(playerPos.x, 0, playerPos.z);
    this.celestialGroup.position.y = playerPos.y;

    // 0 = sunrise (6000 = noon, 12000 = sunset, 18000 = midnight)
    const angle = ((timeOfDay - 6000) / 24000) * Math.PI * 2;
    this.celestialGroup.rotation.z = angle;

    // Stars visibility at night
    const sunHeight = Math.cos(angle);
    const starAlpha = Math.max(0, Math.min(1, -sunHeight * 2.0));
    (this.starsPoints.material as THREE.PointsMaterial).opacity = starAlpha;

    // Clouds drift
    this.cloudsMesh.visible = cloudsMode !== 'OFF';
    if (this.cloudsMesh.visible) {
      this.cloudOffset += dt * 0.0015;
      const mat = this.cloudsMesh.material as THREE.MeshBasicMaterial;
      if (mat.map) {
        mat.map.offset.x = this.cloudOffset;
      }
      const dayBrightness = Math.max(0.22, Math.min(1.0, sunHeight * 0.6 + 0.65));
      mat.color.setRGB(dayBrightness, dayBrightness, Math.min(1.0, dayBrightness * 1.05));
    }
  }
}

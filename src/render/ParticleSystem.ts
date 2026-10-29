import * as THREE from 'three';
import { TextureAtlas } from './TextureAtlas';

interface Particle {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  swayFreq: number;
}

/**
 * Renders Minecraft 26.3 Particles:
 * - Falling Poplar Leaves (`FallingLeavesParticle$PoplarProvider`: orange, red, and yellow autumn leaves drifting from Poplar trees)
 * - Campfire Smoke (`CampfireSmokeParticle`: rising smoke above Abandoned Camp campfires)
 * - Block Break Debris bursts
 */
export class ParticleSystem {
  scene: THREE.Scene;
  particles: Particle[] = [];
  leafMaterials: Record<'orange' | 'red' | 'yellow', THREE.MeshBasicMaterial>;
  smokeMaterial: THREE.MeshBasicMaterial;
  damageHeartMaterial: THREE.MeshBasicMaterial;
  critStarMaterial: THREE.MeshBasicMaterial;
  poofCloudMaterial: THREE.MeshBasicMaterial;
  sharedGeo = new THREE.BoxGeometry(0.14, 0.14, 0.04);
  billboardGeo = new THREE.PlaneGeometry(0.24, 0.24);
  smokeGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);
  timer = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    const loader = new THREE.TextureLoader();

    const loadTex = (p: string, fallbackHex: number) => {
      const tex = loader.load(p);
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      return new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.1,
        color: fallbackHex,
        side: THREE.DoubleSide,
      });
    };

    this.leafMaterials = {
      orange: loadTex('/assets/minecraft/textures/particle/orange_poplar_1.png', 0xff9224),
      red: loadTex('/assets/minecraft/textures/particle/red_poplar_1.png', 0xe03c28),
      yellow: loadTex('/assets/minecraft/textures/particle/yellow_poplar_1.png', 0xffdc3c),
    };

    this.damageHeartMaterial = loadTex('/assets/minecraft/textures/particle/damage.png', 0xffffff);
    this.critStarMaterial = loadTex('/assets/minecraft/textures/particle/critical_hit.png', 0xffffff);
    this.poofCloudMaterial = loadTex('/assets/minecraft/textures/particle/generic_5.png', 0xffffff);

    this.smokeMaterial = new THREE.MeshBasicMaterial({
      color: 0x6b6b6b,
      transparent: true,
      opacity: 0.55,
    });
  }

  spawnPoplarLeaf(x: number, y: number, z: number, color: 'orange' | 'red' | 'yellow') {
    if (this.particles.length > 180) return;
    const mesh = new THREE.Mesh(this.sharedGeo, this.leafMaterials[color]);
    mesh.position.set(x + Math.random(), y - 0.1, z + Math.random());
    this.scene.add(mesh);
    this.particles.push({
      mesh,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.6 - Math.random() * 0.4,
      vz: (Math.random() - 0.5) * 0.4,
      life: 0,
      maxLife: 4.5 + Math.random() * 2.0,
      swayFreq: 1.5 + Math.random() * 2.0,
    });
  }

  spawnCampfireSmoke(x: number, y: number, z: number) {
    if (this.particles.length > 180) return;
    const mesh = new THREE.Mesh(this.smokeGeo, this.smokeMaterial);
    mesh.position.set(x + 0.35 + Math.random() * 0.3, y + 0.5, z + 0.35 + Math.random() * 0.3);
    this.scene.add(mesh);
    this.particles.push({
      mesh,
      vx: (Math.random() - 0.5) * 0.15,
      vy: 0.9 + Math.random() * 0.4,
      vz: (Math.random() - 0.5) * 0.15,
      life: 0,
      maxLife: 3.5 + Math.random() * 1.5,
      swayFreq: 0.8,
    });
  }

  /**
   * Official Minecraft `damage_indicator` dark-red heart particles when hitting an entity.
   */
  spawnDamageIndicator(x: number, y: number, z: number, count = 3) {
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(this.billboardGeo, this.damageHeartMaterial);
      mesh.position.set(
        x + (Math.random() - 0.5) * 0.5,
        y + (Math.random() - 0.2) * 0.4,
        z + (Math.random() - 0.5) * 0.5
      );
      mesh.rotation.y = Math.random() * Math.PI * 2;
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        vx: (Math.random() - 0.5) * 1.4,
        vy: 1.6 + Math.random() * 1.1,
        vz: (Math.random() - 0.5) * 1.4,
        life: 0,
        maxLife: 0.5 + Math.random() * 0.2,
        swayFreq: 0,
      });
    }
  }

  /**
   * Official Minecraft `crit` star particles on a falling critical hit.
   */
  spawnCritBurst(x: number, y: number, z: number) {
    for (let i = 0; i < 8; i++) {
      const mesh = new THREE.Mesh(this.billboardGeo, this.critStarMaterial);
      mesh.position.set(
        x + (Math.random() - 0.5) * 0.6,
        y + (Math.random() - 0.2) * 0.5,
        z + (Math.random() - 0.5) * 0.6
      );
      mesh.rotation.y = Math.random() * Math.PI * 2;
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        vx: (Math.random() - 0.5) * 2.8,
        vy: 1.2 + Math.random() * 2.0,
        vz: (Math.random() - 0.5) * 2.8,
        life: 0,
        maxLife: 0.45 + Math.random() * 0.2,
        swayFreq: 0,
      });
    }
  }

  /**
   * Official Minecraft `poof` white smoke clouds when a mob dies.
   */
  spawnDeathPoof(x: number, y: number, z: number) {
    for (let i = 0; i < 12; i++) {
      const mesh = new THREE.Mesh(this.billboardGeo, this.poofCloudMaterial);
      mesh.position.set(
        x + (Math.random() - 0.5) * 0.8,
        y + (Math.random() - 0.2) * 0.6,
        z + (Math.random() - 0.5) * 0.8
      );
      mesh.rotation.y = Math.random() * Math.PI * 2;
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        vx: (Math.random() - 0.5) * 1.1,
        vy: 0.6 + Math.random() * 1.2,
        vz: (Math.random() - 0.5) * 1.1,
        life: 0,
        maxLife: 0.65 + Math.random() * 0.35,
        swayFreq: 0.5,
      });
    }
  }

  private materialCache = new Map<number, THREE.MeshBasicMaterial>();

  private getMaterial(hexColor: number): THREE.MeshBasicMaterial {
    let m = this.materialCache.get(hexColor);
    if (!m) {
      m = new THREE.MeshBasicMaterial({ color: hexColor });
      this.materialCache.set(hexColor, m);
    }
    return m;
  }

  private texturedBreakMat: THREE.MeshBasicMaterial | null = null;

  spawnBlockBreakBurst(x: number, y: number, z: number, textureName?: string, hexColor = 0xa07855) {
    const count = 10;
    let uv = textureName ? TextureAtlas.getUV(textureName) : null;
    if (!uv) {
      uv = TextureAtlas.getUV('stone');
    }

    if (!this.texturedBreakMat && TextureAtlas.texture) {
      this.texturedBreakMat = new THREE.MeshBasicMaterial({
        map: TextureAtlas.texture,
        side: THREE.DoubleSide,
        transparent: true,
        alphaTest: 0.1,
      });
    }

    const mat = this.texturedBreakMat || this.getMaterial(hexColor);

    for (let i = 0; i < count; i++) {
      const geo = new THREE.PlaneGeometry(0.12, 0.12);
      if (uv) {
        // Sample random 4x4 pixel region from the block face UV
        const uvAttr = geo.attributes.uv as THREE.BufferAttribute;
        const uSpan = uv.u1 - uv.u0;
        const vSpan = uv.v1 - uv.v0;
        const uOffset = uv.u0 + Math.random() * (uSpan * 0.75);
        const vOffset = uv.v0 + Math.random() * (vSpan * 0.75);
        const subU = uSpan * 0.25;
        const subV = vSpan * 0.25;
        uvAttr.setXY(0, uOffset, vOffset + subV);
        uvAttr.setXY(1, uOffset + subU, vOffset + subV);
        uvAttr.setXY(2, uOffset, vOffset);
        uvAttr.setXY(3, uOffset + subU, vOffset);
        uvAttr.needsUpdate = true;
      }
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        x + 0.2 + Math.random() * 0.6,
        y + 0.2 + Math.random() * 0.6,
        z + 0.2 + Math.random() * 0.6
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        vx: (Math.random() - 0.5) * 3.2,
        vy: 1.4 + Math.random() * 2.2,
        vz: (Math.random() - 0.5) * 3.2,
        life: 0,
        maxLife: 0.35 + Math.random() * 0.15,
        swayFreq: 0,
      });
    }
  }

  update(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += dt;
      if (p.life >= p.maxLife) {
        this.scene.remove(p.mesh);
        this.particles.splice(i, 1);
        continue;
      }

      if (p.swayFreq === 0) {
        // Gravity burst particle
        p.vy -= 9.8 * dt;
      } else if (p.vy < 0) {
        // Drifting poplar leaf
        p.vx = Math.sin(p.life * p.swayFreq) * 0.55;
        p.vz = Math.cos(p.life * p.swayFreq * 0.8) * 0.55;
        p.mesh.rotation.x += dt * 1.8;
        p.mesh.rotation.y += dt * 2.2;
      } else {
        // Rising campfire smoke
        p.mesh.rotation.y += dt * 0.7;
      }

      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
    }
  }
}

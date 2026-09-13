import * as THREE from 'three';

/**
 * 3D Particle System for localized stone dust, rock chips, and friction sparks
 * triggered when the cursor carves away the brutalist stone exterior.
 */
export class DustParticles {
  constructor(scene, maxParticles = 600) {
    this.scene = scene;
    this.maxParticles = maxParticles;
    this.particleIndex = 0;

    // Particle state arrays
    this.positions = new Float32Array(maxParticles * 3);
    this.velocities = new Float32Array(maxParticles * 3);
    this.colors = new Float32Array(maxParticles * 3);
    this.sizes = new Float32Array(maxParticles);
    this.lifes = new Float32Array(maxParticles);      // current age 0 -> 1
    this.lifeSpeeds = new Float32Array(maxParticles); // decay rate

    // Create particle geometry
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(this.sizes, 1));

    // Custom circular/soft particle texture
    const particleTexture = this.createParticleTexture();

    // Points material with additive/alpha blending
    this.material = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      vertexColors: true
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.scene.add(this.points);

    // Color palettes
    this.colBasalt = new THREE.Color('#383c44'); // Dark rock chip
    this.colDust = new THREE.Color('#dcdfe5');   // Pale pulverised stone dust
    this.colGold = new THREE.Color('#e5b842');   // Friction spark
    this.colWhite = new THREE.Color('#ffffff');  // Core marble fragment
  }

  createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(240, 240, 240, 0.8)');
    grad.addColorStop(0.7, 'rgba(180, 180, 180, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  /**
   * Emit a burst of dust and shards at 3D point
   * @param {THREE.Vector3} point - 3D raycast hit position
   * @param {THREE.Vector3} normal - Surface normal
   * @param {number} count - Number of particles in burst
   */
  emit(point, normal, count = 12) {
    for (let i = 0; i < count; i++) {
      const idx = this.particleIndex;
      this.particleIndex = (this.particleIndex + 1) % this.maxParticles;

      // Position: close to contact point with slight randomized jitter
      const pIdx = idx * 3;
      this.positions[pIdx] = point.x + (Math.random() - 0.5) * 0.08;
      this.positions[pIdx + 1] = point.y + (Math.random() - 0.5) * 0.08;
      this.positions[pIdx + 2] = point.z + 0.02 + Math.random() * 0.06;

      // Velocity: outward away from surface with spread
      const speed = 0.8 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const spread = 0.5 + Math.random() * 0.8;

      this.velocities[pIdx] = (Math.cos(angle) * spread + normal.x * 0.4) * speed * 0.015;
      this.velocities[pIdx + 1] = (Math.sin(angle) * spread + normal.y * 0.4 + 0.3) * speed * 0.015; // upward lift
      this.velocities[pIdx + 2] = (normal.z * 0.8 + Math.random() * 0.6) * speed * 0.02;

      // Random particle type: dust, chip, or spark
      const r = Math.random();
      let pColor;
      if (r < 0.45) {
        // Fine pulverised dust
        pColor = this.colDust;
        this.sizes[idx] = 0.14 + Math.random() * 0.16;
        this.lifeSpeeds[idx] = 0.015 + Math.random() * 0.015; // stays longer
      } else if (r < 0.75) {
        // Dark basalt chip
        pColor = this.colBasalt;
        this.sizes[idx] = 0.08 + Math.random() * 0.1;
        this.lifeSpeeds[idx] = 0.025 + Math.random() * 0.02;
      } else if (r < 0.9) {
        // Gleaming marble shard
        pColor = this.colWhite;
        this.sizes[idx] = 0.07 + Math.random() * 0.09;
        this.lifeSpeeds[idx] = 0.02 + Math.random() * 0.02;
      } else {
        // Friction spark
        pColor = this.colGold;
        this.sizes[idx] = 0.18 + Math.random() * 0.15;
        this.lifeSpeeds[idx] = 0.04 + Math.random() * 0.03; // quick spark
      }

      this.colors[pIdx] = pColor.r;
      this.colors[pIdx + 1] = pColor.g;
      this.colors[pIdx + 2] = pColor.b;

      this.lifes[idx] = 1.0; // fully alive
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
    this.geometry.attributes.size.needsUpdate = true;
  }

  /**
   * Update particle positions, apply gravity & decay
   */
  update(delta) {
    const gravity = -0.0003;
    const airDrag = 0.97;
    let anyActive = false;

    for (let i = 0; i < this.maxParticles; i++) {
      if (this.lifes[i] > 0) {
        anyActive = true;
        this.lifes[i] -= this.lifeSpeeds[i];

        const idx = i * 3;

        // Apply drag & gravity
        this.velocities[idx] *= airDrag;
        this.velocities[idx + 1] = this.velocities[idx + 1] * airDrag + gravity;
        this.velocities[idx + 2] *= airDrag;

        // Integrate position
        this.positions[idx] += this.velocities[idx];
        this.positions[idx + 1] += this.velocities[idx + 1];
        this.positions[idx + 2] += this.velocities[idx + 2];

        // Shrink particle as it dies
        const lifeAlpha = Math.max(0, this.lifes[i]);
        if (lifeAlpha <= 0) {
          this.sizes[i] = 0;
          this.positions[idx + 2] = -999; // move off-screen
        }
      }
    }

    if (anyActive) {
      this.geometry.attributes.position.needsUpdate = true;
      this.geometry.attributes.size.needsUpdate = true;
    }
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.scene.remove(this.points);
  }
}

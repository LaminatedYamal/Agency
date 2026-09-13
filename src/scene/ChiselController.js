import * as THREE from 'three';

/**
 * Manages raycasting, dynamic chisel mask canvas, cursor light,
 * audio haptics, and auto-reveal showcase routines.
 */
export class ChiselController {
  constructor(experience, monolith, dustParticles) {
    this.experience = experience;
    this.monolith = monolith;
    this.dustParticles = dustParticles;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2(-999, -999);
    this.lastUV = null;
    this.isHovering = false;
    this.sfxEnabled = false;

    // Mask resolution
    this.maskWidth = 1024;
    this.maskHeight = 512;

    // Dynamic 2D canvas for the chisel mask (0 = Stone exterior, 1 = Marble core)
    this.maskCanvas = document.createElement('canvas');
    this.maskCanvas.width = this.maskWidth;
    this.maskCanvas.height = this.maskHeight;
    this.maskCtx = this.maskCanvas.getContext('2d', { willReadFrequently: true });

    // Initialize with completely uncarved stone (black)
    this.resetMask();

    // Create Three.js texture from canvas
    this.maskTexture = new THREE.CanvasTexture(this.maskCanvas);
    this.maskTexture.minFilter = THREE.LinearFilter;
    this.maskTexture.magFilter = THREE.LinearFilter;
    this.maskTexture.generateMipmaps = false;

    // Connect mask to monolith shader
    this.monolith.setMaskTexture(this.maskTexture);

    // Dynamic Chisel Spotlight
    this.chiselLight = new THREE.PointLight(0xfffaed, 0, 4.5, 1.8);
    this.chiselLight.castShadow = true;
    this.chiselLight.shadow.bias = -0.002;
    this.experience.scene.add(this.chiselLight);

    // Chisel Brush Stamp (procedural chipped stone chisel stamp)
    this.brushCanvas = this.createChiselBrushStamp(70);

    // Web Audio API Synthesizer for subtle stone carving texture
    this.audioCtx = null;
    this.initAudio();

    // Setup DOM Listeners
    this.setupListeners();

    // Carve percentage telemetry cache
    this.carvePercent = 0;
    this.lastSampleTime = 0;

    // Auto-reveal state
    this.isAutoRevealing = false;
    this.autoRevealTime = 0;
  }

  /**
   * Procedural brush stamp with fractured/chipped rock edges
   */
  createChiselBrushStamp(radius) {
    const size = radius * 2;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.45)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2);
    ctx.fill();

    return canvas;
  }

  resetMask() {
    this.maskCtx.fillStyle = '#000000';
    this.maskCtx.fillRect(0, 0, this.maskWidth, this.maskHeight);
    if (this.maskTexture) {
      this.maskTexture.needsUpdate = true;
    }
    this.carvePercent = 0;
    this.isAutoRevealing = false;
  }

  setupListeners() {
    const onPointerMove = (e) => {
      // Normalize pointer [-1, 1]
      this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Update custom cursor visual
      const cursor = document.getElementById('custom-cursor');
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursor.classList.add('visible');
      }

      // Hide interaction hint on first deliberate move
      const hint = document.getElementById('interaction-hint');
      if (hint && !hint.classList.contains('fade-out')) {
        hint.classList.add('fade-out');
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerdown', (e) => {
      onPointerMove(e);
      this.initAudioContextOnUserGesture();
    });

    window.addEventListener('pointerleave', () => {
      this.pointer.set(-999, -999);
      this.isHovering = false;
      const cursor = document.getElementById('custom-cursor');
      if (cursor) cursor.classList.remove('visible', 'on-mesh');
    });
  }

  /**
   * Sound synthesis: deep mineral scrape when chisel strikes stone
   */
  initAudio() {
    // Lazy initialized on first user interaction
  }

  initAudioContextOnUserGesture() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playChiselSound() {
    if (!this.sfxEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450 + Math.random() * 600, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(3, this.audioCtx.currentTime);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120 + Math.random() * 80, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {
      // Audio fallback silent
    }
  }

  /**
   * Stamp the chisel brush onto the dynamic mask canvas
   */
  carveAt(u, v, countParticles = true, hitPoint = null, hitNormal = null) {
    const px = u * this.maskWidth;
    const py = (1.0 - v) * this.maskHeight; // Invert V for Three.js UV orientation

    const radius = 55;

    this.maskCtx.save();
    this.maskCtx.globalCompositeOperation = 'lighter'; // Accumulative reveal
    this.maskCtx.drawImage(
      this.brushCanvas,
      px - radius,
      py - radius,
      radius * 2,
      radius * 2
    );

    // If we have previous point, interpolate between them for continuous chisel line
    if (this.lastUV) {
      const lastX = this.lastUV.x * this.maskWidth;
      const lastY = (1.0 - this.lastUV.y) * this.maskHeight;
      const dist = Math.hypot(px - lastX, py - lastY);
      const steps = Math.min(30, Math.ceil(dist / 14));

      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const ix = lastX + (px - lastX) * t;
        const iy = lastY + (py - lastY) * t;
        this.maskCtx.drawImage(
          this.brushCanvas,
          ix - radius,
          iy - radius,
          radius * 2,
          radius * 2
        );
      }
    }
    this.maskCtx.restore();

    this.maskTexture.needsUpdate = true;

    // Emit 3D particles & sound
    if (countParticles && hitPoint && hitNormal) {
      this.dustParticles.emit(hitPoint, hitNormal, 10);
      this.playChiselSound();
    }
  }

  /**
   * Auto reveal cinematic animation
   */
  startAutoReveal() {
    this.isAutoRevealing = true;
    this.autoRevealTime = 0;
  }

  updateAutoReveal(delta) {
    if (!this.isAutoRevealing) return;

    this.autoRevealTime += delta * 1.1;
    const t = this.autoRevealTime;

    // Sculptor's excavation path: sweeps along perimeter and around the letter contours of "BRUTO"
    const u = 0.5 + Math.sin(t * 2.2) * 0.44 + Math.cos(t * 5.5) * 0.05;
    const v = 0.5 + Math.sin(t * 3.8) * 0.36 + Math.cos(t * 1.8) * 0.12;

    // Simulate 3D hit point on monolith front
    const frontZ = 0.42;
    const width = 4.8;
    const height = 2.7;
    const hitPoint = new THREE.Vector3(
      (u - 0.5) * width,
      (v - 0.5) * height,
      frontZ
    );
    const hitNormal = new THREE.Vector3(0, 0, 1);

    this.carveAt(u, v, true, hitPoint, hitNormal);

    // Move chisel light with auto reveal
    this.chiselLight.position.copy(hitPoint);
    this.chiselLight.position.z += 0.5;
    this.chiselLight.intensity = THREE.MathUtils.lerp(this.chiselLight.intensity, 3.8, 0.12);

    if (t > 15.0 || this.carvePercent >= 88) {
      this.isAutoRevealing = false;
    }
  }

  update(delta) {
    // Auto reveal loop
    if (this.isAutoRevealing) {
      this.updateAutoReveal(delta);
      this.sampleCarvePercentage();
      return;
    }

    // Raycast from camera
    this.raycaster.setFromCamera(this.pointer, this.experience.camera);
    const intersects = this.raycaster.intersectObject(this.monolith.frontMesh);

    const cursorEl = document.getElementById('custom-cursor');
    const uvEl = document.getElementById('uv-coords');

    if (intersects.length > 0) {
      const hit = intersects[0];
      this.isHovering = true;

      if (cursorEl) cursorEl.classList.add('on-mesh');

      // Update Chisel Spotlight to 3D hit position
      this.chiselLight.position.copy(hit.point);
      this.chiselLight.position.z += 0.55;
      this.chiselLight.intensity = THREE.MathUtils.lerp(this.chiselLight.intensity, 3.8, 0.15);

      if (hit.uv) {
        const u = hit.uv.x;
        const v = hit.uv.y;

        if (uvEl) {
          uvEl.textContent = `${u.toFixed(2)}, ${v.toFixed(2)}`;
        }

        // Carve if moved sufficiently
        if (!this.lastUV || Math.hypot(u - this.lastUV.x, v - this.lastUV.y) > 0.005) {
          const worldNormal = hit.face ? hit.face.normal.clone().applyQuaternion(this.monolith.mesh.quaternion) : new THREE.Vector3(0, 0, 1);
          this.carveAt(u, v, true, hit.point, worldNormal);
          this.lastUV = { x: u, y: v };
        }
      }
    } else {
      this.isHovering = false;
      this.lastUV = null;
      if (cursorEl) cursorEl.classList.remove('on-mesh');
      if (uvEl) uvEl.textContent = '---, ---';

      // Fade out cursor light when not hovering over block
      this.chiselLight.intensity = THREE.MathUtils.lerp(this.chiselLight.intensity, 0.0, 0.1);
    }

    // Periodically update percentage
    this.sampleCarvePercentage();
  }

  /**
   * Sample the mask canvas to calculate monolith carve percentage
   */
  sampleCarvePercentage() {
    const now = performance.now();
    if (now - this.lastSampleTime < 250) return;
    this.lastSampleTime = now;

    try {
      // Downsample 64x32
      const sW = 64;
      const sH = 32;
      const testCanvas = document.createElement('canvas');
      testCanvas.width = sW;
      testCanvas.height = sH;
      const tCtx = testCanvas.getContext('2d');
      tCtx.drawImage(this.maskCanvas, 0, 0, sW, sH);
      const data = tCtx.getImageData(0, 0, sW, sH).data;

      let brightCount = 0;
      const totalPixels = sW * sH;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 60) {
          brightCount++;
        }
      }

      this.carvePercent = Math.min(100, Math.round((brightCount / totalPixels) * 100));

      const bar = document.getElementById('carve-progress-bar');
      const text = document.getElementById('carve-percentage');
      if (bar) bar.style.width = `${this.carvePercent}%`;
      if (text) text.textContent = `${this.carvePercent < 10 ? '0' : ''}${this.carvePercent}%`;
    } catch (e) {
      // Ignore
    }
  }

  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled;
    this.initAudioContextOnUserGesture();
    const btn = document.getElementById('sound-btn');
    const state = btn?.querySelector('.sound-state');
    if (btn) {
      btn.classList.toggle('active', this.sfxEnabled);
      if (state) state.textContent = this.sfxEnabled ? 'ON' : 'OFF';
    }
    return this.sfxEnabled;
  }
}

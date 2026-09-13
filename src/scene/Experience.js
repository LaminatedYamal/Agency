import * as THREE from 'three';
import { TextureGenerator } from './TextureGenerator.js';
import { BrutoCenterpiece } from './BrutoCenterpiece.js';
import { ArchitecturalProps } from './ArchitecturalProps.js';

/**
 * Main 3D Architectural Studio Experience:
 * Renders the Bruto Studios sanctuary with carved-out glowing letters,
 * stepped Carrara marble plinths, furniture, reflection pools, and dusk vistas.
 */
export class Experience {
  constructor(container) {
    this.container = container;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2(0, 0);
    this.targetCameraPos = new THREE.Vector3(0, 1.8, 6.4);
    this.cameraLookAt = new THREE.Vector3(0, 1.9, 0);

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLighting();

    // Procedural entities
    this.texGen = new TextureGenerator();
    this.props = new ArchitecturalProps(this.scene, this.texGen);
    this.centerpiece = new BrutoCenterpiece(this.scene, this.texGen);

    this.setupEvents();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    // Atmospheric studio dusk fog
    this.scene.fog = new THREE.FogExp2(0x0f1217, 0.035);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      46,
      this.width / this.height,
      0.1,
      100
    );
    this.updateCameraFraming();
    this.camera.lookAt(this.cameraLookAt);
    this.scene.add(this.camera);
  }

  updateCameraFraming() {
    const aspect = this.width / this.height;
    if (aspect < 1.0) {
      // Mobile vertical framing
      this.baseZ = 9.2;
      this.baseY = 2.1;
    } else if (aspect < 1.4) {
      // Tablet framing
      this.baseZ = 7.5;
      this.baseY = 1.95;
    } else {
      // Desktop widescreen framing
      this.baseZ = 6.4;
      this.baseY = 1.8;
    }
    this.targetCameraPos.set(0, this.baseY, this.baseZ);
    this.camera.position.copy(this.targetCameraPos);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true
    });

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);
  }

  initLighting() {
    // 1. Ambient architectural light (Dusk studio tone)
    this.ambientLight = new THREE.AmbientLight(0x222630, 1.2);
    this.scene.add(this.ambientLight);

    // 2. Ceiling Grazing Key Light (Soft warm wash down the central wall)
    this.keyLight = new THREE.DirectionalLight(0xfff3e5, 2.4);
    this.keyLight.position.set(0, 5.0, 3.5);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 2048;
    this.keyLight.shadow.mapSize.height = 2048;
    this.keyLight.shadow.bias = -0.001;
    this.scene.add(this.keyLight);

    // 3. Subtle cool floor fill light
    this.floorFill = new THREE.DirectionalLight(0x405068, 0.8);
    this.floorFill.position.set(0, -2, 5);
    this.scene.add(this.floorFill);
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.camera.aspect = this.width / this.height;
      this.updateCameraFraming();
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Interactive mouse parallax tracking
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Parallax target offset
      this.targetCameraPos.x = this.mouse.x * 0.45;
      this.targetCameraPos.y = this.baseY + this.mouse.y * 0.22;
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const time = this.clock.getElapsedTime();

    // Smooth camera parallax lerp
    this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, this.targetCameraPos.x, 0.04);
    this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, this.targetCameraPos.y, 0.04);
    this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, this.targetCameraPos.z, 0.04);
    this.camera.lookAt(this.cameraLookAt);

    // Update animations
    if (this.centerpiece) {
      this.centerpiece.update(time);
    }

    if (this.props) {
      this.props.update(time);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

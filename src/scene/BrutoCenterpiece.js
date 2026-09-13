import * as THREE from 'three';

/**
 * The Central Monument:
 * 1. Board-formed vertical concrete monolith with carved-out "Bruto" letters and inner Dijon Canvas backlight
 * 2. Stepped white Carrara marble plinth with:
 *    - Upper step: "BRUTO STUDIOS - EST. 2026"
 *    - Lower step: "HEAVY-DUTY DIGITAL. TYPEFOUNDRY. COMPLEX SYSTEMS."
 */
export class BrutoCenterpiece {
  constructor(scene, textureGenerator) {
    this.scene = scene;
    this.texGen = textureGenerator;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.initConcreteMonolith();
    this.initSteppedMarblePlinth();
  }

  initConcreteMonolith() {
    // Wall Dimensions
    this.wallWidth = 7.2;
    this.wallHeight = 5.2;
    this.wallDepth = 0.4;

    const concreteMaps = this.texGen.createBoardFormedConcrete();
    const brutoMaps = this.texGen.createCarvedBrutoWallTextures();

    // Front Wall Face with the carved-out "Bruto" title and bevels
    const frontGeom = new THREE.PlaneGeometry(this.wallWidth, this.wallHeight, 64, 64);
    const frontMat = new THREE.MeshStandardMaterial({
      map: brutoMaps.diffuse,
      roughness: 0.88,
      metalness: 0.08,
      normalMap: concreteMaps.normal,
      normalScale: new THREE.Vector2(0.4, 0.4)
    });

    this.frontWall = new THREE.Mesh(frontGeom, frontMat);
    this.frontWall.position.set(0, 2.6, 0);
    this.frontWall.castShadow = true;
    this.frontWall.receiveShadow = true;
    this.group.add(this.frontWall);

    // Inner Cavity Backplane (Glowing warm Dijon Canvas backlight)
    const cavityGeom = new THREE.PlaneGeometry(this.wallWidth * 0.98, this.wallHeight * 0.98);
    const cavityMat = new THREE.MeshBasicMaterial({
      map: brutoMaps.emissive,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.95
    });

    this.cavityMesh = new THREE.Mesh(cavityGeom, cavityMat);
    this.cavityMesh.position.set(0, 2.6, -0.08); // Recessed inside wall
    this.group.add(this.cavityMesh);

    // Monolith Solid Body (sides, top, rear)
    const bodyGeom = new THREE.BoxGeometry(this.wallWidth, this.wallHeight, this.wallDepth);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x16181b,
      roughness: 0.92,
      metalness: 0.05,
      map: concreteMaps.diffuse,
      normalMap: concreteMaps.normal,
      normalScale: new THREE.Vector2(0.8, 0.8)
    });

    this.bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
    this.bodyMesh.position.set(0, 2.6, -this.wallDepth / 2);
    this.bodyMesh.castShadow = true;
    this.bodyMesh.receiveShadow = true;
    this.group.add(this.bodyMesh);

    // Warm Dijon Canvas internal cavity lights
    // Light 1: Central amber glow
    this.dijonLight1 = new THREE.PointLight(0xf5a623, 3.8, 4.5, 1.6);
    this.dijonLight1.position.set(0, 2.6, 0.15);
    this.group.add(this.dijonLight1);

    // Light 2: Grazing bounce onto top of marble plinth
    this.dijonLight2 = new THREE.PointLight(0xe59828, 2.4, 3.8, 1.8);
    this.dijonLight2.position.set(0, 1.6, 0.35);
    this.group.add(this.dijonLight2);

    // Subtle fluted ceiling downlight grazing the top of the monolith
    this.topSconce = new THREE.SpotLight(0xfff4e6, 3.2, 7.0, Math.PI * 0.35, 0.5, 1.2);
    this.topSconce.position.set(0, 5.4, 0.6);
    this.topSconce.target = this.frontWall;
    this.group.add(this.topSconce);
  }

  initSteppedMarblePlinth() {
    // ==========================================
    // 1. UPPER MARBLE STEP
    // ==========================================
    const upperWidth = 5.2;
    const upperHeight = 0.55;
    const upperDepth = 0.95;

    const upperTex = this.texGen.createUpperPlinthTexture();

    const upperMatSide = new THREE.MeshStandardMaterial({
      color: 0xf6f7f9,
      roughness: 0.18,
      metalness: 0.05,
      map: upperTex
    });

    const upperMatFront = new THREE.MeshStandardMaterial({
      map: upperTex,
      roughness: 0.16,
      metalness: 0.08
    });

    // Box materials array: [+X, -X, +Y, -Y, +Z, -Z]
    const upperMats = [
      upperMatSide, // right
      upperMatSide, // left
      upperMatSide, // top (gleaming polished marble)
      upperMatSide, // bottom
      upperMatFront, // front with "BRUTO STUDIOS - EST. 2026"
      upperMatSide  // rear
    ];

    const upperGeom = new THREE.BoxGeometry(upperWidth, upperHeight, upperDepth);
    this.upperPlinth = new THREE.Mesh(upperGeom, upperMats);
    this.upperPlinth.position.set(0, 0.725, 0.45);
    this.upperPlinth.castShadow = true;
    this.upperPlinth.receiveShadow = true;
    this.group.add(this.upperPlinth);

    // ==========================================
    // 2. LOWER MARBLE STEP / BASE PLATFORM
    // ==========================================
    const lowerWidth = 6.6;
    const lowerHeight = 0.45;
    const lowerDepth = 1.65;

    const lowerTex = this.texGen.createLowerPlinthTexture();

    const lowerMatSide = new THREE.MeshStandardMaterial({
      color: 0xf5f6f8,
      roughness: 0.18,
      metalness: 0.05,
      map: lowerTex
    });

    const lowerMatFront = new THREE.MeshStandardMaterial({
      map: lowerTex,
      roughness: 0.16,
      metalness: 0.08
    });

    const lowerMats = [
      lowerMatSide, // right
      lowerMatSide, // left
      lowerMatSide, // top step
      lowerMatSide, // bottom
      lowerMatFront, // front with "HEAVY-DUTY DIGITAL. TYPEFOUNDRY. COMPLEX SYSTEMS."
      lowerMatSide  // rear
    ];

    const lowerGeom = new THREE.BoxGeometry(lowerWidth, lowerHeight, lowerDepth);
    this.lowerPlinth = new THREE.Mesh(lowerGeom, lowerMats);
    this.lowerPlinth.position.set(0, 0.225, 0.8);
    this.lowerPlinth.castShadow = true;
    this.lowerPlinth.receiveShadow = true;
    this.group.add(this.lowerPlinth);
  }

  update(time) {
    // Subtle breathing pulse in the warm Dijon letter backlight
    const pulse = Math.sin(time * 1.5) * 0.15 + 1.0;
    if (this.dijonLight1) {
      this.dijonLight1.intensity = 3.6 * pulse;
    }
    if (this.cavityMesh) {
      this.cavityMesh.material.opacity = 0.9 + Math.sin(time * 2.0) * 0.06;
    }
  }
}

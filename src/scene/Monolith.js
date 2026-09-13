import * as THREE from 'three';

/**
 * The Sculpted Monolith:
 * Starts as a massive dark basalt stone block scored with the brutalist outline of "BRUTO".
 * As the user hovers/chisels, the surrounding stone matrix is carved away into an excavated cavity,
 * leaving the word "BRUTO" standing proud in 3D relief as a gleaming white Carrara marble sculpture.
 */
export class Monolith {
  constructor(experience, textureGenerator) {
    this.experience = experience;
    this.textureGenerator = textureGenerator;

    this.group = new THREE.Group();
    this.experience.scene.add(this.group);

    // Monolith dimensions
    this.width = 4.8;
    this.height = 2.7;
    this.depth = 0.82;

    // Generate procedural textures
    this.basaltMaps = this.textureGenerator.createBasaltTextures();
    this.letterMaskData = this.textureGenerator.createLetterMask();
    this.marbleMaps = this.textureGenerator.createMarbleTextures();
    this.excavatedBedTex = this.textureGenerator.createExcavatedBedTextures();

    // Default 1x1 black texture until mask is ready
    this.emptyMask = new THREE.DataTexture(new Uint8Array([0]), 1, 1, THREE.RedFormat);
    this.emptyMask.needsUpdate = true;

    this.initMeshes();

    // Mouse parallax tracking
    this.targetRotation = new THREE.Vector2(0, 0);
  }

  initMeshes() {
    // 1. FRONT FACE MESH (High-density grid for 3D excavation displacement)
    const segX = 256;
    const segY = 128;
    const frontGeom = new THREE.PlaneGeometry(this.width, this.height, segX, segY);

    // Custom Shader Material
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMask: { value: this.emptyMask },
        uLetterMask: { value: this.letterMaskData.texture },
        uBasaltDiff: { value: this.basaltMaps.diffuse },
        uBasaltNorm: { value: this.basaltMaps.normal },
        uMarbleDiff: { value: this.marbleMaps.diffuse },
        uMarbleNorm: { value: this.marbleMaps.normal },
        uExcavatedBed: { value: this.excavatedBedTex },
        uLightPos: { value: new THREE.Vector3(3.5, 4.5, 5.0) },
        uLightColor: { value: new THREE.Color(0xfff5ea) },
        uChiselLightPos: { value: new THREE.Vector3(0, 0, 2) },
        uChiselLightColor: { value: new THREE.Color(0xfff7e8) },
        uChiselLightIntensity: { value: 0.0 }
      },
      vertexShader: `
        uniform sampler2D uMask;
        uniform sampler2D uLetterMask;
        uniform sampler2D uBasaltDiff;
        uniform float uTime;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying float vMaskVal;
        varying float vLetterVal;

        void main() {
          vUv = uv;

          // Sample dynamic chisel carving mask & letter mask
          float maskVal = texture2D(uMask, uv).r;
          float letterVal = texture2D(uLetterMask, uv).r;
          vMaskVal = maskVal;
          vLetterVal = letterVal;

          // Sample basalt surface roughness
          float rockHeight = texture2D(uBasaltDiff, uv).r;
          float baseRockDisp = (rockHeight - 0.5) * 0.08;

          // SCULPTURAL EXCAVATION DISPLACEMENT:
          // 1. Where it's a letter (BRUTO): stays proud, pops forward in 3D (+0.10)
          // 2. Where it's the surrounding stone: when carved by chisel, sinks inwards (-0.22) into excavated basin!
          float carveProgress = smoothstep(0.08, 0.75, maskVal);
          
          float letterElevation = letterVal * 0.10 * carveProgress;
          float matrixExcavation = (1.0 - letterVal) * (-0.22) * carveProgress;
          
          float totalDisp = baseRockDisp * (1.0 - carveProgress * 0.6) + letterElevation + matrixExcavation;

          vec3 displacedPos = position + normal * totalDisp;
          vec4 worldPos = modelMatrix * vec4(displacedPos, 1.0);
          vWorldPos = worldPos.xyz;
          vNormal = normalize(normalMatrix * normal);

          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform sampler2D uMask;
        uniform sampler2D uLetterMask;
        uniform sampler2D uBasaltDiff;
        uniform sampler2D uBasaltNorm;
        uniform sampler2D uMarbleDiff;
        uniform sampler2D uMarbleNorm;
        uniform sampler2D uExcavatedBed;

        uniform vec3 uLightPos;
        uniform vec3 uLightColor;
        uniform vec3 uChiselLightPos;
        uniform vec3 uChiselLightColor;
        uniform float uChiselLightIntensity;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying float vMaskVal;
        varying float vLetterVal;

        // Procedural noise for fractured rock edge
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        void main() {
          // Dynamic chisel mask with fractured edge noise
          float maskRaw = texture2D(uMask, vUv).r;
          float letterVal = texture2D(uLetterMask, vUv).r;

          float edgeNoise = noise(vUv * 70.0) * 0.16 + noise(vUv * 180.0) * 0.06;
          float carveMask = smoothstep(0.35 - edgeNoise, 0.65 + edgeNoise, maskRaw);

          // 1. Textures
          vec4 basaltCol = texture2D(uBasaltDiff, vUv);
          vec3 basaltNorm = normalize(texture2D(uBasaltNorm, vUv).xyz * 2.0 - 1.0);

          vec4 marbleCol = texture2D(uMarbleDiff, vUv);
          vec3 marbleNorm = normalize(texture2D(uMarbleNorm, vUv).xyz * 2.0 - 1.0);

          vec4 bedCol = texture2D(uExcavatedBed, vUv);

          // 2. Determine Color & Roughness based on Letter vs Excavated Negative Space
          vec3 baseColor;
          vec3 blendedTexNorm;
          float roughness;
          float isMarble = 0.0;

          if (letterVal > 0.45) {
            // ON THE SCULPTURE OF "BRUTO":
            // Starts as dark basalt with the scored outline, turns into gleaming white marble sculpture!
            baseColor = mix(basaltCol.rgb, marbleCol.rgb, carveMask);
            blendedTexNorm = mix(basaltNorm, marbleNorm, carveMask);
            roughness = mix(0.92, 0.12, carveMask);
            isMarble = carveMask;
          } else {
            // IN THE SURROUNDING MATRIX:
            // Starts as rough basalt, chisels away into the darker excavated quarry bed!
            baseColor = mix(basaltCol.rgb, bedCol.rgb, carveMask);
            blendedTexNorm = basaltNorm;
            roughness = 0.95;
            isMarble = 0.0;
          }

          // Normal perturbation
          vec3 geomNormal = normalize(vNormal);
          vec3 N = normalize(geomNormal + blendedTexNorm * 0.65);
          vec3 V = normalize(cameraPosition - vWorldPos);

          // 3. Lighting Calculations
          // Key Studio Light (grazing dramatic shadows)
          vec3 L1 = normalize(uLightPos - vWorldPos);
          float NdotL1 = max(dot(N, L1), 0.0);

          // Specular highlight (high on polished marble sculpture)
          vec3 H1 = normalize(L1 + V);
          float specPower = mix(4.0, 90.0, isMarble);
          float spec1 = pow(max(dot(N, H1), 0.0), specPower) * (1.0 - roughness * 0.6);

          // Chisel Dynamic Light (follows cursor)
          vec3 chiselDiff = uChiselLightPos - vWorldPos;
          float chiselDist = length(chiselDiff);
          vec3 L2 = normalize(chiselDiff);
          float atten = 1.0 / (1.0 + 0.8 * chiselDist + 1.4 * chiselDist * chiselDist);
          float NdotL2 = max(dot(N, L2), 0.0);

          vec3 H2 = normalize(L2 + V);
          float spec2 = pow(max(dot(N, H2), 0.0), specPower * 1.5) * (1.0 - roughness * 0.5);

          // Ambient lighting
          vec3 ambient = vec3(0.04, 0.045, 0.05) * baseColor;

          vec3 diffuse1 = uLightColor * baseColor * NdotL1 * 1.15;
          vec3 specular1 = uLightColor * spec1 * mix(0.05, 0.95, isMarble);

          vec3 diffuse2 = uChiselLightColor * baseColor * NdotL2 * uChiselLightIntensity * atten;
          vec3 specular2 = uChiselLightColor * spec2 * uChiselLightIntensity * atten * mix(0.1, 1.5, isMarble);

          // Friction rim glow where chisel cuts stone
          float rimWidth = smoothstep(0.3, 0.48, maskRaw) * (1.0 - smoothstep(0.52, 0.7, maskRaw));
          vec3 frictionGlow = vec3(0.95, 0.75, 0.32) * rimWidth * (0.8 + noise(vUv * 90.0 + uTime * 6.0) * 0.8);

          // Depth shadow for excavated cavity
          float cavityOcclusion = mix(1.0, 0.75, (1.0 - letterVal) * carveMask);

          vec3 finalColor = (ambient + diffuse1 + specular1 + diffuse2 + specular2 + frictionGlow) * cavityOcclusion;

          // Studio filmic contrast
          finalColor = pow(finalColor, vec3(0.94));

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.FrontSide
    });

    this.frontMesh = new THREE.Mesh(frontGeom, this.shaderMaterial);
    this.frontMesh.position.z = this.depth / 2;
    this.frontMesh.castShadow = true;
    this.frontMesh.receiveShadow = true;
    this.group.add(this.frontMesh);

    // 2. MONOLITH SIDES AND REAR
    this.initBlockBody();
  }

  initBlockBody() {
    const sideGeom = new THREE.BoxGeometry(
      this.width,
      this.height,
      this.depth,
      32,
      16,
      16
    );

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x121417,
      roughness: 0.95,
      metalness: 0.05,
      map: this.basaltMaps.diffuse,
      normalMap: this.basaltMaps.normal,
      normalScale: new THREE.Vector2(1.2, 1.2)
    });

    const invisibleMaterial = new THREE.MeshBasicMaterial({ visible: false });

    // Multi-material: sides and rear only, front (+Z index 4) invisible
    const materials = [
      bodyMaterial, // +X
      bodyMaterial, // -X
      bodyMaterial, // +Y
      bodyMaterial, // -Y
      invisibleMaterial, // +Z
      bodyMaterial  // -Z
    ];

    this.bodyMesh = new THREE.Mesh(sideGeom, materials);
    this.bodyMesh.position.z = 0;
    this.bodyMesh.castShadow = true;
    this.bodyMesh.receiveShadow = true;
    this.group.add(this.bodyMesh);

    this.mesh = this.group;
  }

  setMaskTexture(texture) {
    if (this.shaderMaterial && this.shaderMaterial.uniforms.uMask) {
      this.shaderMaterial.uniforms.uMask.value = texture;
    }
  }

  update(delta, time, pointer, chiselLight) {
    if (this.shaderMaterial) {
      this.shaderMaterial.uniforms.uTime.value = time;
      if (chiselLight) {
        this.shaderMaterial.uniforms.uChiselLightPos.value.copy(chiselLight.position);
        this.shaderMaterial.uniforms.uChiselLightIntensity.value = chiselLight.intensity;
      }
    }

    // Subtle, heavy monolithic parallax tilt
    if (pointer) {
      this.targetRotation.x = -pointer.y * 0.06;
      this.targetRotation.y = pointer.x * 0.08;
    }

    this.group.rotation.x = THREE.MathUtils.lerp(this.group.rotation.x, this.targetRotation.x, 0.04);
    this.group.rotation.y = THREE.MathUtils.lerp(this.group.rotation.y, this.targetRotation.y, 0.04);
    this.group.position.y = Math.sin(time * 0.8) * 0.04;
  }
}

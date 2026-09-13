import * as THREE from 'three';

/**
 * Architectural Props & Pavilion Environment:
 * - Polished concrete floor, dark slatted ceiling, corridor walls
 * - Side twilight dusk mountain vistas through panoramic windows
 * - Left and right still architectural reflection pools
 * - Left brutalist bench with leather roll cushion and stone cube stool
 * - Right pedestal with oiled-leather tablet stand in Dijon Canvas, type specimen tablet, and stylus
 * - Wall-mounted analog clock showing "PORTUGAL" and live time
 */
export class ArchitecturalProps {
  constructor(scene, textureGenerator) {
    this.scene = scene;
    this.texGen = textureGenerator;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.initPavilionStructure();
    this.initDuskWindowsAndPools();
    this.initLeftFurniture();
    this.initRightWorkspace();
  }

  initPavilionStructure() {
    // 1. Polished Concrete Floor
    const floorTex = this.texGen.createPolishedFloorTexture();
    const floorGeom = new THREE.PlaneGeometry(24, 18);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1f2227,
      roughness: 0.22,
      metalness: 0.15,
      map: floorTex
    });

    this.floor = new THREE.Mesh(floorGeom, floorMat);
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.set(0, 0, 3);
    this.floor.receiveShadow = true;
    this.group.add(this.floor);

    // 2. Dark Architectural Ceiling
    const ceilingGeom = new THREE.PlaneGeometry(24, 18);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x111316,
      roughness: 0.95,
      metalness: 0.05
    });

    this.ceiling = new THREE.Mesh(ceilingGeom, ceilingMat);
    this.ceiling.rotation.x = Math.PI / 2;
    this.ceiling.position.set(0, 5.2, 3);
    this.group.add(this.ceiling);

    // 3. Flanking Corridor Concrete Walls (framing the central monument)
    const concreteMaps = this.texGen.createBoardFormedConcrete();
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x141619,
      roughness: 0.9,
      metalness: 0.08,
      map: concreteMaps.diffuse,
      normalMap: concreteMaps.normal
    });

    // Left flank column
    const leftColGeom = new THREE.BoxGeometry(0.8, 5.2, 4.0);
    this.leftCol = new THREE.Mesh(leftColGeom, wallMat);
    this.leftCol.position.set(-4.0, 2.6, -0.4);
    this.leftCol.castShadow = true;
    this.leftCol.receiveShadow = true;
    this.group.add(this.leftCol);

    // Right flank column
    const rightColGeom = new THREE.BoxGeometry(0.8, 5.2, 4.0);
    this.rightCol = new THREE.Mesh(rightColGeom, wallMat);
    this.rightCol.position.set(4.0, 2.6, -0.4);
    this.rightCol.castShadow = true;
    this.rightCol.receiveShadow = true;
    this.group.add(this.rightCol);

    // Far Left Outer Wall
    const farLeftGeom = new THREE.BoxGeometry(0.6, 5.2, 8.0);
    const farLeftWall = new THREE.Mesh(farLeftGeom, wallMat);
    farLeftWall.position.set(-7.8, 2.6, 2.0);
    this.group.add(farLeftWall);

    // Far Right Outer Wall (where the clock is mounted)
    const farRightGeom = new THREE.BoxGeometry(0.6, 5.2, 8.0);
    this.farRightWall = new THREE.Mesh(farRightGeom, wallMat);
    this.farRightWall.position.set(7.8, 2.6, 2.0);
    this.group.add(this.farRightWall);
  }

  initDuskWindowsAndPools() {
    const duskTex = this.texGen.createDuskSkyTexture();
    const skyMat = new THREE.MeshBasicMaterial({
      map: duskTex,
      side: THREE.FrontSide
    });

    // Left Dusk Window
    const skyGeom = new THREE.PlaneGeometry(6.5, 2.6);
    this.leftSky = new THREE.Mesh(skyGeom, skyMat);
    this.leftSky.position.set(-5.6, 2.2, -2.5);
    this.group.add(this.leftSky);

    // Right Dusk Window
    this.rightSky = new THREE.Mesh(skyGeom, skyMat);
    this.rightSky.position.set(5.6, 2.2, -2.5);
    this.group.add(this.rightSky);

    // Left Still Water Reflection Pool
    const poolGeom = new THREE.PlaneGeometry(3.2, 6.0);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0a1018,
      roughness: 0.08,
      metalness: 0.75
    });

    this.leftPool = new THREE.Mesh(poolGeom, waterMat);
    this.leftPool.rotation.x = -Math.PI / 2;
    this.leftPool.position.set(-5.8, 0.02, 0.5);
    this.group.add(this.leftPool);

    // Right Still Water Reflection Pool
    this.rightPool = new THREE.Mesh(poolGeom, waterMat);
    this.rightPool.rotation.x = -Math.PI / 2;
    this.rightPool.position.set(5.8, 0.02, 0.5);
    this.group.add(this.rightPool);

    // Soft cool twilight lights coming through the windows
    const leftDuskLight = new THREE.DirectionalLight(0x425875, 1.4);
    leftDuskLight.position.set(-8, 3, -1);
    this.group.add(leftDuskLight);

    const rightDuskLight = new THREE.DirectionalLight(0x425875, 1.4);
    rightDuskLight.position.set(8, 3, -1);
    this.group.add(rightDuskLight);
  }

  initLeftFurniture() {
    const group = new THREE.Group();
    group.position.set(-4.6, 0, 2.2);

    // Dark Brutalist Bench (low black stone block)
    const benchMat = new THREE.MeshStandardMaterial({
      color: 0x141618,
      roughness: 0.85,
      metalness: 0.1
    });

    const benchGeom = new THREE.BoxGeometry(1.6, 0.38, 0.75);
    const bench = new THREE.Mesh(benchGeom, benchMat);
    bench.position.set(0, 0.19, 0);
    bench.castShadow = true;
    bench.receiveShadow = true;
    group.add(bench);

    // Oiled Tan Leather Roll Cushion
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x9e6836, // Warm tan/cognac oiled leather
      roughness: 0.55,
      metalness: 0.15
    });

    const cushionGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.65, 24);
    const cushion = new THREE.Mesh(cushionGeom, leatherMat);
    cushion.rotation.z = Math.PI / 2;
    cushion.rotation.y = Math.PI / 2;
    cushion.position.set(-0.4, 0.46, 0);
    cushion.castShadow = true;
    group.add(cushion);

    // Small Square Black Stone Cube Stool
    const cubeGeom = new THREE.BoxGeometry(0.55, 0.42, 0.55);
    const cube = new THREE.Mesh(cubeGeom, benchMat);
    cube.position.set(1.2, 0.21, 0.1);
    cube.castShadow = true;
    cube.receiveShadow = true;
    group.add(cube);

    this.group.add(group);
  }

  initRightWorkspace() {
    const group = new THREE.Group();
    group.position.set(4.6, 0, 2.0);

    // Low Dark Stone Pedestal
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x141618,
      roughness: 0.85,
      metalness: 0.1
    });

    const pedGeom = new THREE.BoxGeometry(1.4, 0.35, 0.9);
    const pedestal = new THREE.Mesh(pedGeom, stoneMat);
    pedestal.position.set(0, 0.175, 0);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    group.add(pedestal);

    // Oiled-Leather Tablet Stand in DIJON CANVAS
    const dijonLeatherMat = new THREE.MeshStandardMaterial({
      color: 0xc4892c, // Rich Dijon Canvas
      roughness: 0.6,
      metalness: 0.15
    });

    const standGeom = new THREE.BoxGeometry(0.72, 0.08, 0.48);
    const stand = new THREE.Mesh(standGeom, dijonLeatherMat);
    stand.position.set(0, 0.38, -0.05);
    stand.rotation.y = -Math.PI * 0.08;
    stand.castShadow = true;
    group.add(stand);

    // Digital Tablet (Angled towards viewer)
    const tabletScreenTex = this.texGen.createTabletScreenTexture();
    const tabletBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1c1e22,
      roughness: 0.4,
      metalness: 0.8
    });

    const tabletScreenMat = new THREE.MeshBasicMaterial({
      map: tabletScreenTex
    });

    const tabletGeom = new THREE.BoxGeometry(0.68, 0.48, 0.02);
    const tabletMats = [
      tabletBodyMat, tabletBodyMat, tabletBodyMat, tabletBodyMat,
      tabletScreenMat, // Front display screen
      tabletBodyMat
    ];

    const tablet = new THREE.Mesh(tabletGeom, tabletMats);
    tablet.position.set(0, 0.58, -0.04);
    tablet.rotation.x = -Math.PI * 0.28; // Angled back on stand
    tablet.rotation.y = -Math.PI * 0.08;
    tablet.castShadow = true;
    group.add(tablet);

    // Subtle soft white glow from tablet screen
    const tabletLight = new THREE.PointLight(0xfff8ee, 1.2, 1.8, 1.5);
    tabletLight.position.set(0, 0.65, 0.2);
    group.add(tabletLight);

    // Finely Machined Metallic Stylus
    const stylusMat = new THREE.MeshStandardMaterial({
      color: 0xd8dbe0, // Polished aluminum / steel
      roughness: 0.2,
      metalness: 0.9
    });

    const stylusGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.38, 16);
    const stylus = new THREE.Mesh(stylusGeom, stylusMat);
    stylus.rotation.z = Math.PI / 2;
    stylus.rotation.y = -Math.PI * 0.12;
    stylus.position.set(0.2, 0.365, 0.22);
    stylus.castShadow = true;
    group.add(stylus);

    this.group.add(group);

    // Architectural Wall Clock (mounted on far right wall)
    this.initWallClock();
  }

  initWallClock() {
    const clockTex = this.texGen.createClockTexture(16, 49);
    const clockMat = new THREE.MeshBasicMaterial({
      map: clockTex,
      transparent: true
    });

    const clockGeom = new THREE.PlaneGeometry(1.2, 1.7);
    this.clockMesh = new THREE.Mesh(clockGeom, clockMat);
    this.clockMesh.rotation.y = -Math.PI / 2; // Facing into studio
    this.clockMesh.position.set(7.48, 3.2, 0.6);
    this.group.add(this.clockMesh);
  }

  update(time) {
    // Update live clock every minute if needed
  }
}

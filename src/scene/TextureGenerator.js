import * as THREE from 'three';

/**
 * High-fidelity procedural textures for the Bruto Studios architectural scene:
 * 1. Dark board-formed concrete with vertical timber grain
 * 2. Stepped Carrara marble plinths with custom typography inscriptions
 * 3. Carved-out serif "Bruto" cutout mask, normal map, and Dijon emissive backlight
 * 4. Dusk twilight sky with mountain silhouettes for side windows
 * 5. Illuminated tablet type specimen display
 * 6. Architectural clock texture with live time
 */
export class TextureGenerator {
  constructor() {
    this.width = 2048;
    this.height = 1024;
  }

  noise2D(x, y) {
    const sin1 = Math.sin(x * 12.9898 + y * 78.233);
    return (Math.sin(sin1 * 43758.5453) + 1) * 0.5;
  }

  fbm(x, y, octaves = 5) {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;
    let maxValue = 0;
    for (let i = 0; i < octaves; i++) {
      value += this.noise2D(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value / maxValue;
  }

  /**
   * 1. Dark board-formed vertical concrete texture (for walls and central monolith)
   */
  createBoardFormedConcrete() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Base dark concrete charcoal
    ctx.fillStyle = '#181a1d';
    ctx.fillRect(0, 0, 1024, 1024);

    const imgData = ctx.getImageData(0, 0, 1024, 1024);
    const data = imgData.data;

    // Generate vertical board-formed wood grain cast into concrete
    for (let y = 0; y < 1024; y++) {
      for (let x = 0; x < 1024; x++) {
        const idx = (y * 1024 + x) * 4;

        // Board seams every 128px
        const boardSeam = Math.abs((x % 128) - 64) / 64;
        const seamDarken = Math.sin(boardSeam * Math.PI * 0.5) * 0.15;

        // Vertical grain noise
        const nWood = this.fbm(x * 0.003, y * 0.04, 4);
        const nFine = this.fbm(x * 0.08, y * 0.08, 2) * 0.1;
        const totalNoise = nWood * 0.8 + nFine * 0.2 - seamDarken;

        const val = Math.floor(22 + totalNoise * 26);
        data[idx] = val + Math.floor((Math.random() - 0.5) * 4);
        data[idx + 1] = val + Math.floor((Math.random() - 0.5) * 4);
        data[idx + 2] = val + 2 + Math.floor((Math.random() - 0.5) * 4);
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Subtle horizontal tie-rod holes characteristic of architectural concrete
    ctx.fillStyle = 'rgba(10, 11, 13, 0.7)';
    for (let r = 160; r < 1024; r += 240) {
      for (let c = 64; c < 1024; c += 128) {
        ctx.beginPath();
        ctx.arc(c, r, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(60, 65, 75, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const diffuseTex = new THREE.CanvasTexture(canvas);
    diffuseTex.wrapS = THREE.RepeatWrapping;
    diffuseTex.wrapT = THREE.RepeatWrapping;
    diffuseTex.colorSpace = THREE.SRGBColorSpace;

    // Normal map for vertical grain
    const normalCanvas = document.createElement('canvas');
    normalCanvas.width = 1024;
    normalCanvas.height = 1024;
    const nCtx = normalCanvas.getContext('2d');
    const nImgData = nCtx.createImageData(1024, 1024);
    const nData = nImgData.data;
    const diffData = imgData.data;

    for (let y = 0; y < 1024; y++) {
      const ym = Math.max(0, y - 1);
      const yp = Math.min(1023, y + 1);
      for (let x = 0; x < 1024; x++) {
        const xm = Math.max(0, x - 1);
        const xp = Math.min(1023, x + 1);

        const hL = diffData[(y * 1024 + xm) * 4] / 255;
        const hR = diffData[(y * 1024 + xp) * 4] / 255;
        const hU = diffData[(ym * 1024 + x) * 4] / 255;
        const hD = diffData[(yp * 1024 + x) * 4] / 255;

        const dx = (hL - hR) * 3.5;
        const dy = (hU - hD) * 1.5;
        const dz = 1.0;
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const idx = (y * 1024 + x) * 4;
        nData[idx] = Math.floor(((dx / len) * 0.5 + 0.5) * 255);
        nData[idx + 1] = Math.floor(((dy / len) * 0.5 + 0.5) * 255);
        nData[idx + 2] = Math.floor(((dz / len) * 0.5 + 0.5) * 255);
        nData[idx + 3] = 255;
      }
    }
    nCtx.putImageData(nImgData, 0, 0);

    const normalTex = new THREE.CanvasTexture(normalCanvas);
    normalTex.wrapS = THREE.RepeatWrapping;
    normalTex.wrapT = THREE.RepeatWrapping;

    return { diffuse: diffuseTex, normal: normalTex };
  }

  /**
   * 2. Polished industrial concrete floor texture with subtle reflectivity
   */
  createPolishedFloorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Smooth studio floor tint
    ctx.fillStyle = '#22252a';
    ctx.fillRect(0, 0, 1024, 1024);

    // Large floor tile grid seams
    ctx.strokeStyle = 'rgba(12, 14, 16, 0.6)';
    ctx.lineWidth = 2;
    for (let x = 0; x <= 1024; x += 256) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += 256) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Subtle clouding / specular polish variation
    for (let i = 0; i < 8; i++) {
      const cx = Math.random() * 1024;
      const cy = Math.random() * 1024;
      const rad = 150 + Math.random() * 250;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grad.addColorStop(0, 'rgba(45, 48, 55, 0.2)');
      grad.addColorStop(1, 'rgba(34, 37, 42, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  /**
   * 3. Carved-Out Serif "Bruto" Wall Texture & Mask
   * Produces:
   * - Front concrete face with carved-out title-case "Bruto" and beveled inner edge
   * - Alpha/Emissive mask for inner warm Dijon glow
   */
  createCarvedBrutoWallTextures() {
    const width = 2048;
    const height = 1024;

    // A. Front Face Canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Fill with vertical board-formed concrete
    ctx.fillStyle = '#1c1e22';
    ctx.fillRect(0, 0, width, height);

    // Draw board seams
    ctx.fillStyle = '#16181b';
    for (let x = 0; x < width; x += 180) {
      ctx.fillRect(x, 0, 3, height);
    }

    // Text metrics for "Bruto"
    const cx = width / 2;
    const cy = height / 2 + 10;
    const fontStr = '700 420px "Playfair Display", "Didot", "Bodoni MT", "Georgia", serif';

    ctx.save();
    ctx.font = fontStr;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '0.04em';

    // 1. Deep carved-out cavity (inner dark floor of cutout)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 35;
    ctx.shadowOffsetY = 15;
    ctx.fillStyle = '#08090a';
    ctx.fillText('Bruto', cx, cy);

    // 2. Beveled perimeter: light catching top edge of carved letters
    ctx.shadowBlur = 0;
    ctx.lineWidth = 14;
    ctx.strokeStyle = 'rgba(15, 17, 20, 0.9)';
    ctx.strokeText('Bruto', cx, cy);

    // Top highlight rim
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(230, 235, 245, 0.4)';
    ctx.strokeText('Bruto', cx, cy - 2);

    // Bottom shadow rim
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.strokeText('Bruto', cx, cy + 3);

    ctx.restore();

    // B. Inner Cavity & Emissive Glow Canvas (Dijon Canvas backlight)
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = width;
    glowCanvas.height = height;
    const gCtx = glowCanvas.getContext('2d');

    gCtx.fillStyle = '#000000';
    gCtx.fillRect(0, 0, width, height);

    gCtx.save();
    gCtx.font = fontStr;
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';
    gCtx.letterSpacing = '0.04em';

    // Outer rich Dijon Canvas glow
    gCtx.shadowColor = '#e2a33c'; // Warm Dijon Gold
    gCtx.shadowBlur = 70;
    gCtx.fillStyle = '#f5b041';
    gCtx.fillText('Bruto', cx, cy);

    // Inner bright core
    gCtx.shadowBlur = 25;
    gCtx.fillStyle = '#fff2d6';
    gCtx.fillText('Bruto', cx, cy);
    gCtx.restore();

    const diffTex = new THREE.CanvasTexture(canvas);
    diffTex.colorSpace = THREE.SRGBColorSpace;

    const emissiveTex = new THREE.CanvasTexture(glowCanvas);
    emissiveTex.colorSpace = THREE.SRGBColorSpace;

    return { diffuse: diffTex, emissive: emissiveTex };
  }

  /**
   * 4. Stepped Carrara Marble Plinths:
   * - Upper Plinth: Inscribed with "BRUTO STUDIOS - EST. 2026"
   * - Lower Plinth: Inscribed with "HEAVY-DUTY DIGITAL. TYPEFOUNDRY. COMPLEX SYSTEMS."
   */
  createUpperPlinthTexture() {
    const width = 1600;
    const height = 400;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Luminous Carrara marble base
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#f9fafb');
    grad.addColorStop(0.5, '#f4f5f8');
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Delicate grey Carrara marble veins
    this.drawMarbleVeins(ctx, width, height, 5);

    // Inscription: "BRUTO STUDIOS - EST. 2026"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '800 52px "Syne", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '0.22em';

    // Chiseled shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#1c1e22'; // Dark charcoal chiseled lettering
    ctx.fillText('BRUTO STUDIOS - EST. 2026', width / 2, height / 2);

    // Subtle edge highlight
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.strokeText('BRUTO STUDIOS - EST. 2026', width / 2, height / 2 - 1);
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  createLowerPlinthTexture() {
    const width = 2048;
    const height = 400;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Luminous Carrara marble base
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fafbfc');
    grad.addColorStop(0.5, '#f3f4f7');
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Veins
    this.drawMarbleVeins(ctx, width, height, 6);

    // Inscription: "HEAVY-DUTY DIGITAL. TYPEFOUNDRY. COMPLEX SYSTEMS."
    // Set in rich Dijon Canvas / antique bronze accent color!
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '800 44px "Syne", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '0.28em';

    // Chiseled bevel shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 2;

    // Rich Dijon Canvas tone (#5c4826 / #6d542e as seen in the photograph)
    ctx.fillStyle = '#634f2d';
    ctx.fillText('HEAVY-DUTY DIGITAL. TYPEFOUNDRY. COMPLEX SYSTEMS.', width / 2, height / 2);

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  drawMarbleVeins(ctx, w, h, count = 5) {
    ctx.save();
    for (let v = 0; v < count; v++) {
      let x = Math.random() * w;
      let y = Math.random() > 0.5 ? 0 : h;
      let angle = (Math.PI * 0.28) + (Math.random() - 0.5) * 0.4;
      if (y === h) angle = -angle;

      ctx.beginPath();
      ctx.moveTo(x, y);

      const steps = 140;
      const stepLen = 12;
      ctx.strokeStyle = `rgba(110, 115, 125, ${0.07 + Math.random() * 0.1})`;
      ctx.lineWidth = 1.2 + Math.random() * 2.4;

      for (let s = 0; s < steps; s++) {
        angle += (Math.random() - 0.5) * 0.35;
        x += Math.cos(angle) * stepLen;
        y += Math.sin(angle) * stepLen;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  /**
   * 5. Twilight Dusk Mountain Vista (visible through the side window apertures)
   */
  createDuskSkyTexture() {
    const width = 1024;
    const height = 512;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Dusk twilight gradient: deep indigo -> dusky blue -> warm peach/amber horizon
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#0a101d');   // Deep indigo night sky
    grad.addColorStop(0.4, '#1b263b'); // Twilight cobalt
    grad.addColorStop(0.7, '#384c6b'); // Dusk slate
    grad.addColorStop(0.88, '#706478');// Soft twilight purple
    grad.addColorStop(1, '#a67c6d');   // Warm dusk horizon glow
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Distant mountain silhouette layers
    // Layer 1: Far mountains (misty blue)
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += 40) {
      const my = height - 120 - Math.sin(x * 0.008) * 45 - Math.sin(x * 0.02) * 25;
      ctx.lineTo(x, my);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Layer 2: Nearer mountain range (dark charcoal ridge)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += 30) {
      const my = height - 70 - Math.sin(x * 0.012 + 2.0) * 35 - Math.cos(x * 0.03) * 15;
      ctx.lineTo(x, my);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  /**
   * 6. Illuminated Tablet Screen Texture (Typefoundry Specimen)
   */
  createTabletScreenTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    // Warm white lit paper display
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, 512, 360);

    // Top status bar
    ctx.fillStyle = '#9ca3af';
    ctx.font = '500 13px "Space Mono", monospace';
    ctx.fillText('BRUTO TYPEFOUNDRY // SPECIMEN 01', 24, 32);

    // Big letter specimen
    ctx.fillStyle = '#111827';
    ctx.font = '700 72px "Playfair Display", serif';
    ctx.fillText('Aa Bb 012', 24, 110);

    // Sub-specimen lines
    ctx.font = '600 24px "Space Mono", monospace';
    ctx.fillStyle = '#4b5563';
    ctx.fillText('FF  TT  RR  BR  GG  MM', 24, 160);

    ctx.font = '400 16px "Space Mono", monospace';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 24, 205);
    ctx.fillText('abcdefghijklmnopqrstuvwxyz', 24, 235);
    ctx.fillText('0123456789 () [] {} #%*@', 24, 265);

    // Active typeface badge in Dijon Canvas
    ctx.fillStyle = '#e2a33c';
    ctx.fillRect(24, 305, 140, 26);
    ctx.fillStyle = '#111827';
    ctx.font = '700 12px "Space Mono", monospace';
    ctx.fillText('DISPLAY SERIF', 36, 322);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  /**
   * 7. Architectural Wall Clock Texture (16:49 PORTUGAL)
   */
  createClockTexture(hours = 16, minutes = 49) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 380;
    const ctx = canvas.getContext('2d');

    // Transparent background on concrete wall
    ctx.clearRect(0, 0, 256, 380);

    const cx = 128;
    const cy = 110;
    const radius = 80;

    // Clock dial tick marks
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const x1 = cx + Math.sin(angle) * (radius - 8);
      const y1 = cy - Math.cos(angle) * (radius - 8);
      const x2 = cx + Math.sin(angle) * radius;
      const y2 = cy - Math.cos(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Hour hand
    const hourAngle = ((hours % 12) + minutes / 60) * (Math.PI / 6);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.sin(hourAngle) * (radius * 0.5), cy - Math.cos(hourAngle) * (radius * 0.5));
    ctx.stroke();

    // Minute hand
    const minAngle = (minutes / 60) * Math.PI * 2;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.sin(minAngle) * (radius * 0.75), cy - Math.cos(minAngle) * (radius * 0.75));
    ctx.stroke();

    // Center pivot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    // Digital Time Text: "16:49"
    ctx.textAlign = 'center';
    ctx.font = '700 36px "Space Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`, cx, 240);

    // Location: "PORTUGAL"
    ctx.font = '700 16px "Space Mono", monospace';
    ctx.letterSpacing = '0.35em';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.fillText('PORTUGAL', cx, 275);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
}

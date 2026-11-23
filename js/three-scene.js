// =========================================================================
// 3D AI CORE & INTERACTIVE PARTICLE CONSTELLATION
// Theme: Refined Forest Emerald (#10b981) & Obsidian Dark Graphite
// Aesthetics: Soft atmospheric lighting, zero harsh neon glare
// Technology: Three.js (WebGL) + HTML5 Canvas
// =========================================================================

function initAICore() {
  const container = document.getElementById('ai-core-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 450;
  const height = container.clientHeight || 450;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // 1. Central Icosahedron Quantum Sphere (Refined Emerald Wireframe)
  const innerSphereGeo = new THREE.IcosahedronGeometry(1.4, 4);
  const innerSphereMat = new THREE.MeshPhongMaterial({
    color: 0x071109,
    emissive: 0x059669,
    emissiveIntensity: 0.22,
    wireframe: true,
    transparent: true,
    opacity: 0.85,
  });
  const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
  coreGroup.add(innerSphere);

  // 2. Gyroscope Outer Rings (Subtle Emerald & Mint)
  const ring1Geo = new THREE.TorusGeometry(2.3, 0.018, 16, 100);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.65, wireframe: true });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  coreGroup.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x059669, transparent: true, opacity: 0.55, wireframe: true });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = Math.PI / 3;
  coreGroup.add(ring2);

  const ring3Geo = new THREE.TorusGeometry(3.2, 0.015, 16, 100);
  const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.45, wireframe: true });
  const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
  ring3.rotation.y = Math.PI / 4;
  coreGroup.add(ring3);

  // 3. Floating Holographic Data Particles (Emerald, Sage & Soft White)
  const particlesCount = 650;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  const cEmerald = new THREE.Color(0x10b981);
  const cForest = new THREE.Color(0x059669);
  const cSoftWhite = new THREE.Color(0xa7f3d0);

  for (let i = 0; i < particlesCount; i++) {
    const radius = 2.0 + Math.random() * 2.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const mixed = Math.random() > 0.5 ? cEmerald : (Math.random() > 0.5 ? cForest : cSoftWhite);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 0.042,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  const particleSystem = new THREE.Points(particlesGeo, particlesMat);
  coreGroup.add(particleSystem);

  // Soft Ambient Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const light1 = new THREE.PointLight(0x10b981, 1.4, 50);
  light1.position.set(5, 5, 5);
  scene.add(light1);

  const light2 = new THREE.PointLight(0x059669, 1.2, 50);
  light2.position.set(-5, -5, -3);
  scene.add(light2);

  // Smooth mouse tilt tracking with damping
  let targetRotationX = 0;
  let targetRotationY = 0;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotationX = mouseY * 0.45;
    targetRotationY = mouseX * 0.45;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      targetRotationX = mouseY * 0.25;
      targetRotationY = mouseX * 0.25;
    }
  }, { passive: true });

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Rotations
    innerSphere.rotation.x += 0.25 * delta;
    innerSphere.rotation.y += 0.35 * delta;

    ring1.rotation.x += 0.4 * delta;
    ring1.rotation.y += 0.2 * delta;

    ring2.rotation.y += 0.3 * delta;
    ring2.rotation.z += 0.35 * delta;

    ring3.rotation.x += 0.2 * delta;
    ring3.rotation.z += 0.25 * delta;

    particleSystem.rotation.y -= 0.15 * delta;

    // Mouse tilt easing
    coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;
    coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05;

    renderer.render(scene, camera);
  }
  animate();

  // Responsive Resize
  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth || 450;
    const h = container.clientHeight || 450;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// --- 2. Ambient Constellation Canvas Background ---
function initConstellationBackground() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
  const particles = [];
  const colors = ['#10b981', '#059669', '#34d399', '#6ee7b7'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    });
  }

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    for (let p of particles) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        p.x -= (dx / dist) * 0.5;
        p.y -= (dy / dist) * 0.5;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }
  render();
}

window.addEventListener('DOMContentLoaded', () => {
  initAICore();
  initConstellationBackground();
});

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, RotateCw, Sparkles, ChevronDown, ChevronUp, Sun, Flame } from 'lucide-react';

interface Hero3DSceneProps {
  onExploreClick: () => void;
  onOrderClick: () => void;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ onExploreClick, onOrderClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [controlsOpen, setControlsOpen] = useState(true);
  const [activePreset, setActivePreset] = useState<'hero' | 'label' | 'cap' | 'angle'>('hero');
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingMood, setLightingMood] = useState<'golden' | 'studio' | 'dusk'>('golden');
  const [isLoaded, setIsLoaded] = useState(false);

  // References for scene control outside React render loop
  const sceneRef = useRef<{
    targetCamPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentCamPos: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    bottleGroup: THREE.Group | null;
    floatingGroup: THREE.Group | null;
    sunMesh: THREE.Mesh | null;
    keyLight: THREE.DirectionalLight | null;
    rimLight: THREE.PointLight | null;
    hemiLight: THREE.HemisphereLight | null;
    autoRotateRef: boolean;
    mouseOffset: { x: number; y: number };
  }>({
    targetCamPos: new THREE.Vector3(0, 0.4, 4.3),
    targetLookAt: new THREE.Vector3(0, 0.35, 0),
    currentCamPos: new THREE.Vector3(0, 0.8, 5.5),
    currentLookAt: new THREE.Vector3(0, 0.35, 0),
    bottleGroup: null,
    floatingGroup: null,
    sunMesh: null,
    keyLight: null,
    rimLight: null,
    hemiLight: null,
    autoRotateRef: true,
    mouseOffset: { x: 0, y: 0 },
  });

  // Camera preset positions
  const setCameraView = useCallback((preset: 'hero' | 'label' | 'cap' | 'angle') => {
    setActivePreset(preset);
    const s = sceneRef.current;
    if (preset === 'hero') {
      s.targetCamPos.set(0, 0.4, 4.3);
      s.targetLookAt.set(0, 0.35, 0);
    } else if (preset === 'label') {
      s.targetCamPos.set(0, 0.25, 2.4);
      s.targetLookAt.set(0, 0.25, 0);
    } else if (preset === 'cap') {
      s.targetCamPos.set(0.6, 1.45, 1.9);
      s.targetLookAt.set(0, 1.35, 0);
    } else if (preset === 'angle') {
      s.targetCamPos.set(1.6, 0.9, 3.8);
      s.targetLookAt.set(0, 0.4, 0);
    }
  }, []);

  // Update lighting mood
  const changeLightingMood = useCallback((mood: 'golden' | 'studio' | 'dusk') => {
    setLightingMood(mood);
    const s = sceneRef.current;
    if (!s.keyLight || !s.rimLight || !s.hemiLight) return;

    if (mood === 'golden') {
      s.keyLight.color.setHex(0xffdfa8);
      s.keyLight.intensity = 2.4;
      s.rimLight.color.setHex(0xb99550);
      s.rimLight.intensity = 3.2;
      s.hemiLight.color.setHex(0xd6ad60);
      s.hemiLight.groundColor.setHex(0x23180f);
    } else if (mood === 'studio') {
      s.keyLight.color.setHex(0xfff6ea);
      s.keyLight.intensity = 2.8;
      s.rimLight.color.setHex(0xffeedd);
      s.rimLight.intensity = 2.2;
      s.hemiLight.color.setHex(0x9ca3af);
      s.hemiLight.groundColor.setHex(0x10100e);
    } else if (mood === 'dusk') {
      s.keyLight.color.setHex(0xff8844);
      s.keyLight.intensity = 2.0;
      s.rimLight.color.setHex(0xffaa55);
      s.rimLight.intensity = 3.6;
      s.hemiLight.color.setHex(0x5c2b14);
      s.hemiLight.groundColor.setHex(0x0c0b0a);
    }
  }, []);

  useEffect(() => {
    sceneRef.current.autoRotateRef = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL safely
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x10100e, 0.08);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.8, 5.5);

    // 3. Renderer configuration
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment Reflection via RoomEnvironment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Graceful fallback
    }

    // 5. Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xd6ad60, 0x23180f, 1.2);
    scene.add(hemiLight);
    sceneRef.current.hemiLight = hemiLight;

    const keyLight = new THREE.DirectionalLight(0xffdfa8, 2.4);
    keyLight.position.set(3, 4, 3.5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 12;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);
    sceneRef.current.keyLight = keyLight;

    const fillLight = new THREE.DirectionalLight(0xf0e2c5, 0.9);
    fillLight.position.set(-3.5, 1.5, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xb99550, 3.2, 10);
    rimLight.position.set(0, 0.8, -1.8);
    scene.add(rimLight);
    sceneRef.current.rimLight = rimLight;

    // 6. Radiant Golden Sun Disc / Halo Backdrop
    const sunCanvas = document.createElement('canvas');
    sunCanvas.width = 512;
    sunCanvas.height = 512;
    const sCtx = sunCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(256, 256, 10, 256, 256, 256);
      grad.addColorStop(0, 'rgba(255, 215, 120, 0.95)');
      grad.addColorStop(0.25, 'rgba(217, 155, 60, 0.7)');
      grad.addColorStop(0.55, 'rgba(185, 149, 80, 0.35)');
      grad.addColorStop(0.85, 'rgba(73, 48, 32, 0.1)');
      grad.addColorStop(1, 'rgba(16, 16, 14, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 512, 512);
    }
    const sunTex = new THREE.CanvasTexture(sunCanvas);
    sunTex.colorSpace = THREE.SRGBColorSpace;
    const sunGeo = new THREE.PlaneGeometry(3.8, 3.8);
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTex,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(0, 0.45, -0.6);
    scene.add(sunMesh);
    sceneRef.current.sunMesh = sunMesh;

    // 7. Ground Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shCtx = shadowCanvas.getContext('2d');
    if (shCtx) {
      const grad = shCtx.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      shCtx.fillStyle = grad;
      shCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.98;
    scene.add(shadowMesh);

    // 8. Composite 3D Bottle Assembly (Multi-Part Procedural Model)
    const bottleGroup = new THREE.Group();
    sceneRef.current.bottleGroup = bottleGroup;

    // 8a. Bottle Body Geometry (Lathe with realistic profile)
    const bottlePoints: THREE.Vector2[] = [];
    // Base filleting
    bottlePoints.push(new THREE.Vector2(0, -0.95));
    bottlePoints.push(new THREE.Vector2(0.46, -0.95));
    bottlePoints.push(new THREE.Vector2(0.52, -0.90));
    bottlePoints.push(new THREE.Vector2(0.54, -0.80));
    // Main cylindrical body
    bottlePoints.push(new THREE.Vector2(0.55, 0.20));
    // Tapered shoulder
    bottlePoints.push(new THREE.Vector2(0.52, 0.48));
    bottlePoints.push(new THREE.Vector2(0.42, 0.72));
    bottlePoints.push(new THREE.Vector2(0.30, 0.88));
    // Neck
    bottlePoints.push(new THREE.Vector2(0.24, 0.95));
    bottlePoints.push(new THREE.Vector2(0.24, 1.25));
    // Threaded lip rim
    bottlePoints.push(new THREE.Vector2(0.27, 1.28));
    bottlePoints.push(new THREE.Vector2(0.27, 1.34));
    bottlePoints.push(new THREE.Vector2(0.23, 1.36));
    bottlePoints.push(new THREE.Vector2(0.20, 1.36));
    bottlePoints.push(new THREE.Vector2(0, 1.36));

    const outerBottleGeo = new THREE.LatheGeometry(bottlePoints, 48);

    // Realistic heavy beverage container glass/resin material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.92,
      transparent: true,
      opacity: isSoftwareGl ? 0.35 : 1.0,
      ior: 1.52,
      thickness: 0.8,
      attenuationColor: new THREE.Color(0xf6ede2),
      attenuationDistance: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });
    const bottleMesh = new THREE.Mesh(outerBottleGeo, glassMat);
    if (!isSoftwareGl) bottleMesh.castShadow = true;
    bottleGroup.add(bottleMesh);

    // 8b. Inner Rich Badam Ragda Drink Liquid
    const liquidPoints: THREE.Vector2[] = [];
    liquidPoints.push(new THREE.Vector2(0, -0.92));
    liquidPoints.push(new THREE.Vector2(0.44, -0.92));
    liquidPoints.push(new THREE.Vector2(0.51, -0.78));
    liquidPoints.push(new THREE.Vector2(0.51, 0.20));
    liquidPoints.push(new THREE.Vector2(0.48, 0.46));
    liquidPoints.push(new THREE.Vector2(0.38, 0.70));
    liquidPoints.push(new THREE.Vector2(0.22, 0.92));
    liquidPoints.push(new THREE.Vector2(0.21, 1.05)); // Liquid fill level
    liquidPoints.push(new THREE.Vector2(0, 1.05));

    const liquidGeo = new THREE.LatheGeometry(liquidPoints, 40);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0xedd6b4, // Creamy golden Badam Ragda tone
      roughness: 0.45,
      metalness: 0.05,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    bottleGroup.add(liquidMesh);

    // 8c. Bottle Label with Authentic Balaji Logo
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024;
    labelCanvas.height = 768;
    const lCtx = labelCanvas.getContext('2d');

    const labelTex = new THREE.CanvasTexture(labelCanvas);
    labelTex.colorSpace = THREE.SRGBColorSpace;
    labelTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Draw initial luxury label styling
    const renderLabelCanvas = (logoImg?: HTMLImageElement) => {
      if (!lCtx) return;
      // Dark matte obsidian label background
      lCtx.fillStyle = '#141412';
      lCtx.fillRect(0, 0, 1024, 768);

      // Antique Gold double filigree border
      lCtx.strokeStyle = '#B99550';
      lCtx.lineWidth = 10;
      lCtx.strokeRect(30, 30, 964, 708);

      lCtx.lineWidth = 3;
      lCtx.strokeStyle = '#D9B570';
      lCtx.strokeRect(46, 46, 932, 676);

      // Corner ornamental accents
      lCtx.fillStyle = '#B99550';
      const corners = [
        [50, 50],
        [974, 50],
        [50, 718],
        [974, 718],
      ];
      corners.forEach(([cx, cy]) => {
        lCtx.beginPath();
        lCtx.arc(cx, cy, 14, 0, Math.PI * 2);
        lCtx.fill();
      });

      // Top brand header
      lCtx.fillStyle = '#FAF6ED';
      lCtx.font = 'bold 36px "Cinzel", Georgia, serif';
      lCtx.textAlign = 'center';
      lCtx.letterSpacing = '6px';
      lCtx.fillText('ESTD. BHIWANI • HARYANA', 512, 110);

      // Central Emblem / Logo
      if (logoImg && logoImg.complete) {
        // Draw the circular emblem with gold border ring
        lCtx.save();
        lCtx.beginPath();
        lCtx.arc(512, 330, 175, 0, Math.PI * 2);
        lCtx.closePath();
        lCtx.clip();
        lCtx.drawImage(logoImg, 512 - 175, 330 - 175, 350, 350);
        lCtx.restore();

        // Gold Ring around logo
        lCtx.strokeStyle = '#B99550';
        lCtx.lineWidth = 8;
        lCtx.beginPath();
        lCtx.arc(512, 330, 178, 0, Math.PI * 2);
        lCtx.stroke();
      } else {
        // Fallback emblem placeholder while image loads
        lCtx.fillStyle = '#221910';
        lCtx.beginPath();
        lCtx.arc(512, 330, 160, 0, Math.PI * 2);
        lCtx.fill();
        lCtx.strokeStyle = '#B99550';
        lCtx.lineWidth = 6;
        lCtx.stroke();

        lCtx.fillStyle = '#B99550';
        lCtx.font = 'bold 44px "Cinzel", serif';
        lCtx.fillText('BALA JI BBR', 512, 310);
        lCtx.font = '28px "Plus Jakarta Sans", sans-serif';
        lCtx.fillStyle = '#FAF6ED';
        lCtx.fillText('THE POWER HOUSE', 512, 360);
      }

      // Title below emblem
      lCtx.fillStyle = '#B99550';
      lCtx.font = 'bold 54px "Cinzel", Georgia, serif';
      lCtx.fillText('BALAJI BADAM RAGDA', 512, 560);

      // Hindi / Tagline
      lCtx.fillStyle = '#FAF6ED';
      lCtx.font = '600 30px "Plus Jakarta Sans", sans-serif';
      lCtx.fillText('पिएगा रगड़ा तो हो जाएगा तगड़ा!', 512, 615);

      lCtx.fillStyle = '#A39276';
      lCtx.font = '24px "Plus Jakarta Sans", sans-serif';
      lCtx.fillText('NEAR OLD BUS STAND, BHIWANI • 100% PURE DESI CRAFT', 512, 665);

      labelTex.needsUpdate = true;
    };

    renderLabelCanvas();

    // Load actual user uploaded logo asset
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    logoImg.src = '/assets/aistudio/Screenshot_2026-10-23_164847_ab531a95.png';
    logoImg.onload = () => {
      renderLabelCanvas(logoImg);
      setIsLoaded(true);
    };
    logoImg.onerror = () => {
      setIsLoaded(true);
    };

    // Label cylinder wrapped on the body
    const labelGeo = new THREE.CylinderGeometry(0.555, 0.555, 0.95, 48, 1, true, -Math.PI * 0.45, Math.PI * 0.9);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      roughness: 0.35,
      metalness: 0.25,
      side: THREE.FrontSide,
    });
    labelMat.polygonOffset = true;
    labelMat.polygonOffsetFactor = -1;
    labelMat.polygonOffsetUnits = -1;
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.y = -0.3;
    labelMesh.rotation.y = Math.PI; // Face forward
    bottleGroup.add(labelMesh);

    // 8d. Gold Neck Foil Band
    const neckBandGeo = new THREE.CylinderGeometry(0.245, 0.245, 0.16, 36);
    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: 0xb99550, // Antique Gold
      metalness: 0.92,
      roughness: 0.22,
    });
    const neckBand = new THREE.Mesh(neckBandGeo, goldMetalMat);
    neckBand.position.y = 1.08;
    bottleGroup.add(neckBand);

    // 8e. Ribbed Antique Gold Crown Cap
    const capGroup = new THREE.Group();
    const capTopGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.08, 36);
    const capTop = new THREE.Mesh(capTopGeo, goldMetalMat);
    capGroup.add(capTop);

    // Cap bevel ring
    const capRingGeo = new THREE.TorusGeometry(0.265, 0.02, 16, 40);
    capRingGeo.rotateX(Math.PI / 2);
    const capRing = new THREE.Mesh(capRingGeo, goldMetalMat);
    capGroup.add(capRing);

    capGroup.position.y = 1.38;
    bottleGroup.add(capGroup);

    // Position bottle group centered in viewport
    bottleGroup.position.set(0, 0.15, 0);
    bottleGroup.rotation.y = 0; // Front label facing viewer directly
    scene.add(bottleGroup);

    // 9. Floating Traditional Ingredients (Almonds & Cardamom) - Offset outward to avoid text collision
    const floatingGroup = new THREE.Group();
    sceneRef.current.floatingGroup = floatingGroup;

    // Procedural Almond Geometry
    const almondShape = new THREE.Shape();
    almondShape.moveTo(0, 0.22);
    almondShape.bezierCurveTo(0.12, 0.15, 0.16, -0.05, 0.14, -0.2);
    almondShape.bezierCurveTo(0.1, -0.28, 0.04, -0.32, 0, -0.34);
    almondShape.bezierCurveTo(-0.04, -0.32, -0.1, -0.28, -0.14, -0.2);
    almondShape.bezierCurveTo(-0.16, -0.05, -0.12, 0.15, 0, 0.22);

    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };
    const almondGeo = new THREE.ExtrudeGeometry(almondShape, extrudeSettings);
    almondGeo.scale(0.85, 0.85, 0.85);

    const almondMat = new THREE.MeshStandardMaterial({
      color: 0xc49a6c, // Warm almond skin
      roughness: 0.65,
      metalness: 0.08,
    });

    const cardamomeGeo = new THREE.SphereGeometry(0.1, 16, 16);
    cardamomeGeo.scale(0.8, 1.6, 0.8);
    const cardamomMat = new THREE.MeshStandardMaterial({
      color: 0x8ea06b, // Green cardamom
      roughness: 0.7,
      metalness: 0.05,
    });

    // Positions pushed comfortably away from left headline text and right badge
    const floatingItems: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      floatPhase: number;
    }[] = [];

    const positions = [
      { x: -1.85, y: 0.9, z: 0.2, type: 'almond', rot: [0.3, 0.5, 0.2] },
      { x: 1.65, y: 0.45, z: 0.7, type: 'almond', rot: [-0.4, 0.8, 0.1] },
      { x: -1.95, y: -0.65, z: 0.4, type: 'cardamom', rot: [0.5, 0.2, -0.3] },
      { x: 1.45, y: -0.6, z: 0.5, type: 'almond', rot: [0.2, -0.4, 0.5] },
      { x: -1.75, y: 0.15, z: -0.4, type: 'almond', rot: [0.1, 0.3, 0.4] },
      { x: 1.75, y: 1.05, z: -0.3, type: 'cardamom', rot: [-0.2, 0.6, 0.2] },
    ];

    positions.forEach((pos, i) => {
      const isAlmond = pos.type === 'almond';
      const mesh = new THREE.Mesh(isAlmond ? almondGeo : cardamomeGeo, isAlmond ? almondMat : cardamomMat);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(pos.rot[0], pos.rot[1], pos.rot[2]);
      floatingGroup.add(mesh);
      floatingItems.push({
        mesh,
        baseX: pos.x,
        baseY: pos.y,
        baseZ: pos.z,
        rotSpeedX: 0.005 * (i % 2 === 0 ? 1 : -1),
        rotSpeedY: 0.008 * (i % 3 === 0 ? -1 : 1),
        floatPhase: i * 1.2,
      });
    });

    scene.add(floatingGroup);

    // 10. Golden Dust Particle Field
    const particleCount = isSoftwareGl ? 30 : 90;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd77a,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 11. Mouse / Pointer Interaction for Parallax
    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      sceneRef.current.mouseOffset.x = normX * 0.35;
      sceneRef.current.mouseOffset.y = normY * 0.2;
    };
    window.addEventListener('mousemove', handlePointerMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 12. Lossless Render & Animation Loop with Software Pacing
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();
      const s = sceneRef.current;

      // Exponential damping for camera movement
      s.currentCamPos.x = THREE.MathUtils.damp(
        s.currentCamPos.x,
        s.targetCamPos.x + s.mouseOffset.x,
        3.5,
        delta
      );
      s.currentCamPos.y = THREE.MathUtils.damp(
        s.currentCamPos.y,
        s.targetCamPos.y + s.mouseOffset.y,
        3.5,
        delta
      );
      s.currentCamPos.z = THREE.MathUtils.damp(
        s.currentCamPos.z,
        s.targetCamPos.z,
        3.5,
        delta
      );

      s.currentLookAt.x = THREE.MathUtils.damp(s.currentLookAt.x, s.targetLookAt.x, 3.5, delta);
      s.currentLookAt.y = THREE.MathUtils.damp(s.currentLookAt.y, s.targetLookAt.y, 3.5, delta);
      s.currentLookAt.z = THREE.MathUtils.damp(s.currentLookAt.z, s.targetLookAt.z, 3.5, delta);

      camera.position.copy(s.currentCamPos);
      camera.lookAt(s.currentLookAt);

      // Auto rotation and gentle levitation
      if (bottleGroup) {
        if (s.autoRotateRef) {
          bottleGroup.rotation.y += delta * 0.45;
        }
        bottleGroup.position.y = 0.15 + Math.sin(time * 1.5) * 0.04;
      }

      // Golden halo sun disc subtle breathe
      if (sunMesh) {
        const breathe = 1 + Math.sin(time * 1.8) * 0.04;
        sunMesh.scale.set(breathe, breathe, 1);
      }

      // Floating ingredients gentle bobbing & rotation
      floatingItems.forEach((item) => {
        item.mesh.position.y = item.baseY + Math.sin(time * 1.4 + item.floatPhase) * 0.07;
        item.mesh.position.x = item.baseX + Math.cos(time * 0.8 + item.floatPhase) * 0.03;
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
      });

      // Ambient particle slow drift
      particles.rotation.y = time * 0.03;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full h-[95vh] min-h-[640px] max-h-[1050px] overflow-hidden bg-[#10100E] flex items-center justify-center">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
        data-testid="hero-3d-canvas"
      />

      {/* Hero Editorial Overlay Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pointer-events-none flex flex-col justify-between h-full pt-28 pb-32">
        {/* Top/Left Editorial Headline */}
        <div className="max-w-xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B99550]/40 bg-[#10100E]/75 backdrop-blur-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#B99550]" />
            <span className="text-xs uppercase tracking-widest text-[#B99550] font-medium font-sans">
              Authentic Akhaara Craft • Bhiwani
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#10100E] font-serif leading-[1.1] mb-4 bg-[#FAF6ED] px-5 py-3.5 inline-block border-l-4 border-[#B99550] shadow-xl max-w-md">
            DESI ROOTS.<br />
            <span className="text-[#10100E] tracking-tight">
              POWERFUL TASTE.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#F0E2C5]/90 font-sans font-light leading-relaxed mb-6 max-w-md">
            The traditional spirit of Bhiwani Badam Ragda. Stone-ground California almonds, pure bilona ghee, saffron, and century-old pehlwaan discipline.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-none border border-[#B99550] bg-[#B99550] text-[#10100E] font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#FAF6ED] hover:border-[#FAF6ED] active:scale-95 shadow-[0_4px_24px_rgba(185,149,80,0.25)]"
            >
              Explore Collection
            </button>
            <button
              onClick={onOrderClick}
              className="px-6 py-3.5 rounded-none border border-[#B99550]/60 bg-[#10100E]/80 text-[#F0E2C5] font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#B99550] hover:text-[#B99550] active:scale-95"
            >
              Order on WhatsApp
            </button>
          </div>
        </div>

        {/* Right Tagline Badge */}
        <div className="self-end pointer-events-auto hidden md:block max-w-sm text-right bg-[#10100E]/70 p-4 border-r-2 border-[#B99550] backdrop-blur-xs">
          <p className="text-[10px] uppercase tracking-widest text-[#B99550] font-sans mb-1 font-semibold">
            Brand Creed • Bhiwani
          </p>
          <p className="text-lg lg:text-xl font-serif italic text-[#FAF6ED] leading-snug">
            “Piyega Ragda Toh Ho Jayega Tagda!”
          </p>
          <p className="text-xs font-medium text-[#FAF6ED]/80 font-['Noto_Sans_Devanagari',sans-serif] mt-1">
            (पिएगा रगड़ा तो हो जाएगा तगड़ा!)
          </p>
          <p className="text-[11px] text-[#A39276] mt-1.5 font-sans">
            Near Old Bus Stand, Bhiwani, Haryana
          </p>
        </div>
      </div>

      {/* Unified Bottom Control Dock (Three.js Skill Requirement: <= 15% footprint, collapsible, bottom-center) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-full max-w-[840px] px-4 pointer-events-auto">
        <div className="flex flex-col items-center">
          {/* Collapse / Expand Toggle Button */}
          <button
            onClick={() => setControlsOpen(!controlsOpen)}
            aria-label={controlsOpen ? 'Collapse 3D scene controls' : 'Expand 3D scene controls'}
            className="flex items-center gap-1.5 px-3 py-1 rounded-t-md text-[11px] uppercase tracking-wider font-sans font-medium text-[#B99550] bg-[#1a1714] border-t border-x border-[#B99550]/40 transition-colors hover:bg-[#25201b]"
          >
            {controlsOpen ? (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Hide Controls</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>3D View Controls</span>
              </>
            )}
          </button>

          {/* Dock Body */}
          {controlsOpen && (
            <div className="w-full bg-[#141210] border border-[#B99550]/40 rounded-b-md p-3 shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex flex-wrap items-center justify-between gap-4 text-xs">
              {/* Camera Views */}
              <div className="flex items-center gap-2">
                <span className="text-[#A39276] font-medium uppercase tracking-wider text-[10px] hidden sm:inline">
                  Camera:
                </span>
                <div className="flex items-center gap-1 bg-[#201c18] p-1 rounded">
                  <button
                    onClick={() => setCameraView('hero')}
                    className={`px-2.5 py-1 rounded transition-colors text-[11px] font-medium ${
                      activePreset === 'hero' ? 'bg-[#B99550] text-[#10100E]' : 'text-[#FAF6ED] hover:bg-[#2e2822]'
                    }`}
                  >
                    Hero
                  </button>
                  <button
                    onClick={() => setCameraView('label')}
                    className={`px-2.5 py-1 rounded transition-colors text-[11px] font-medium ${
                      activePreset === 'label' ? 'bg-[#B99550] text-[#10100E]' : 'text-[#FAF6ED] hover:bg-[#2e2822]'
                    }`}
                  >
                    Label
                  </button>
                  <button
                    onClick={() => setCameraView('cap')}
                    className={`px-2.5 py-1 rounded transition-colors text-[11px] font-medium ${
                      activePreset === 'cap' ? 'bg-[#B99550] text-[#10100E]' : 'text-[#FAF6ED] hover:bg-[#2e2822]'
                    }`}
                  >
                    Gold Cap
                  </button>
                  <button
                    onClick={() => setCameraView('angle')}
                    className={`px-2.5 py-1 rounded transition-colors text-[11px] font-medium ${
                      activePreset === 'angle' ? 'bg-[#B99550] text-[#10100E]' : 'text-[#FAF6ED] hover:bg-[#2e2822]'
                    }`}
                  >
                    Angle
                  </button>
                </div>
              </div>

              {/* Lighting Presets */}
              <div className="flex items-center gap-2">
                <span className="text-[#A39276] font-medium uppercase tracking-wider text-[10px] hidden sm:inline">
                  Lighting:
                </span>
                <div className="flex items-center gap-1 bg-[#201c18] p-1 rounded">
                  <button
                    onClick={() => changeLightingMood('golden')}
                    title="Golden Sun"
                    className={`p-1.5 rounded transition-colors ${
                      lightingMood === 'golden' ? 'bg-[#B99550] text-[#10100E]' : 'text-[#FAF6ED] hover:bg-[#2e2822]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => changeLightingMood('studio')}
                    title="Studio Daylight"
                    className={`p-1.5 rounded transition-colors ${
                      lightingMood === 'studio' ? 'bg-[#B99550] text-[#10100E]' : 'text-[#FAF6ED] hover:bg-[#2e2822]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => changeLightingMood('dusk')}
                    title="Akhaara Sunset"
                    className={`p-1.5 rounded transition-colors ${
                      lightingMood === 'dusk' ? 'bg-[#B99550] text-[#10100E]' : 'text-[#FAF6ED] hover:bg-[#2e2822]'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Spin Toggle */}
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-[11px] font-medium ${
                  autoRotate ? 'bg-[#B99550]/20 text-[#B99550] border border-[#B99550]/50' : 'bg-[#201c18] text-[#FAF6ED]'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                <span>{autoRotate ? 'Spin: On' : 'Spin: Off'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

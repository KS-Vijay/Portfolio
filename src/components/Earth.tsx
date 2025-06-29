import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Earth = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);
  const frameRef = useRef<number>();
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  
  // Mouse interaction state with velocity tracking
  const interactionRef = useRef({
    isDown: false,
    isHovering: false,
    isFirstHover: true,
    x: 0,
    y: 0,
    targetRotationX: 0,
    targetRotationY: 0,
    currentRotationX: 0,
    currentRotationY: 0,
    targetScale: 1,
    currentScale: 1,
    targetGlow: 0.3,
    currentGlow: 0.3,
    mousePosition: { x: 0, y: 0 },
    previousMousePosition: { x: 0, y: 0 },
    mouseVelocity: { x: 0, y: 0 },
    centerPosition: { x: 0, y: 0 },
    lastUpdateTime: 0
  });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Store center position for cursor tracking
    const rect = renderer.domElement.getBoundingClientRect();
    interactionRef.current.centerPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create Earth geometry
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);

    // Create procedural earth texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d')!;

    // Create ocean base
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1e40af');
    gradient.addColorStop(0.5, '#2563eb');
    gradient.addColorStop(1, '#1e3a8a');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add continents (simplified)
    context.fillStyle = '#22c55e';
    context.beginPath();
    // Africa
    context.ellipse(512, 300, 80, 120, 0, 0, 2 * Math.PI);
    context.fill();
    
    // Europe
    context.beginPath();
    context.ellipse(480, 200, 40, 30, 0, 0, 2 * Math.PI);
    context.fill();
    
    // Asia
    context.beginPath();
    context.ellipse(650, 220, 100, 80, 0, 0, 2 * Math.PI);
    context.fill();
    
    // Americas
    context.beginPath();
    context.ellipse(200, 250, 60, 150, 0, 0, 2 * Math.PI);
    context.fill();
    
    context.beginPath();
    context.ellipse(150, 180, 40, 80, 0, 0, 2 * Math.PI);
    context.fill();

    const earthTexture = new THREE.CanvasTexture(canvas);

    // Create normal map for surface detail
    const normalCanvas = document.createElement('canvas');
    normalCanvas.width = 512;
    normalCanvas.height = 256;
    const normalContext = normalCanvas.getContext('2d')!;
    
    // Create noise pattern for normal map
    const imageData = normalContext.createImageData(normalCanvas.width, normalCanvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = Math.random() * 50 + 128;
      imageData.data[i] = noise;     // R
      imageData.data[i + 1] = noise; // G
      imageData.data[i + 2] = 255;   // B
      imageData.data[i + 3] = 255;   // A
    }
    normalContext.putImageData(imageData, 0, 0);
    const normalTexture = new THREE.CanvasTexture(normalCanvas);

    // Earth material with enhanced properties
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.5, 0.5),
      shininess: 30,
      specular: new THREE.Color(0x111111),
    });

    // Create Earth mesh
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    earthRef.current = earth;
    scene.add(earth);

    // Create cloud layer
    const cloudGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    
    // Create cloud texture
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 512;
    cloudCanvas.height = 256;
    const cloudContext = cloudCanvas.getContext('2d')!;
    
    // Create cloud pattern
    cloudContext.fillStyle = 'rgba(255, 255, 255, 0)';
    cloudContext.fillRect(0, 0, cloudCanvas.width, cloudCanvas.height);
    
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * cloudCanvas.width;
      const y = Math.random() * cloudCanvas.height;
      const radius = Math.random() * 30 + 10;
      const opacity = Math.random() * 0.8 + 0.2;
      
      cloudContext.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      cloudContext.beginPath();
      cloudContext.arc(x, y, radius, 0, 2 * Math.PI);
      cloudContext.fill();
    }
    
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });

    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudsRef.current = clouds;
    scene.add(clouds);

    // Add atmospheric glow with enhanced shader
    const atmosphereGeometry = new THREE.SphereGeometry(1.05, 32, 32);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowIntensity: { value: 0.3 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float glowIntensity;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * glowIntensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphereRef.current = atmosphere;
    scene.add(atmosphere);

    // Mouse event handlers
    const handleMouseDown = (event: MouseEvent) => {
      interactionRef.current.isDown = true;
      interactionRef.current.x = event.clientX;
      interactionRef.current.y = event.clientY;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const handleMouseMove = (event: MouseEvent) => {
      const currentTime = performance.now();
      const deltaTime = currentTime - interactionRef.current.lastUpdateTime;
      
      // Calculate velocity only if enough time has passed
      if (deltaTime > 0) {
        const deltaX = event.clientX - interactionRef.current.previousMousePosition.x;
        const deltaY = event.clientY - interactionRef.current.previousMousePosition.y;
        
        // Calculate velocity (pixels per millisecond)
        interactionRef.current.mouseVelocity = {
          x: deltaX / deltaTime,
          y: deltaY / deltaTime
        };
      }

      // Update mouse position for raycasting
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Store absolute mouse position
      interactionRef.current.mousePosition = {
        x: event.clientX,
        y: event.clientY
      };

      // Check for hover interaction
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObject(earthRef.current!);
      
      if (intersects.length > 0) {
        if (!interactionRef.current.isHovering) {
          interactionRef.current.isHovering = true;
          interactionRef.current.targetScale = 1.1;
          interactionRef.current.targetGlow = 0.8;
          renderer.domElement.style.cursor = interactionRef.current.isDown ? 'grabbing' : 'grab';
        }

        // Calculate position relative to center
        const deltaX = (event.clientX - interactionRef.current.centerPosition.x) / rect.width;
        const deltaY = (event.clientY - interactionRef.current.centerPosition.y) / rect.height;
        
        // Calculate velocity magnitude for speed adjustment
        const velocityMagnitude = Math.sqrt(
          interactionRef.current.mouseVelocity.x ** 2 + 
          interactionRef.current.mouseVelocity.y ** 2
        );
        
        // Clamp velocity for reasonable rotation speeds
        const velocityMultiplier = Math.min(velocityMagnitude * 20, 3);
        const baseRotationSpeed = interactionRef.current.isFirstHover ? 0.3 : 0.8;
        
        // Apply velocity-based rotation with smooth transition for first hover
        const rotationSpeed = baseRotationSpeed * (1 + velocityMultiplier);
        
        interactionRef.current.targetRotationY = deltaX * Math.PI * rotationSpeed;
        interactionRef.current.targetRotationX = -deltaY * Math.PI * (rotationSpeed * 0.6);
        
        // Mark that we've had our first hover
        if (interactionRef.current.isFirstHover) {
          interactionRef.current.isFirstHover = false;
        }
      } else {
        if (interactionRef.current.isHovering) {
          interactionRef.current.isHovering = false;
          interactionRef.current.targetScale = 1;
          interactionRef.current.targetGlow = 0.3;
          renderer.domElement.style.cursor = 'default';
          
          // Reset rotation when not hovering
          interactionRef.current.targetRotationX = 0;
          interactionRef.current.targetRotationY = 0;
        }
      }

      // Handle dragging
      if (!interactionRef.current.isDown) {
        // Update previous position and time for next calculation
        interactionRef.current.previousMousePosition = {
          x: event.clientX,
          y: event.clientY
        };
        interactionRef.current.lastUpdateTime = currentTime;
        return;
      }

      const dragDeltaX = event.clientX - interactionRef.current.x;
      const dragDeltaY = event.clientY - interactionRef.current.y;

      interactionRef.current.targetRotationY += dragDeltaX * 0.01;
      interactionRef.current.targetRotationX += dragDeltaY * 0.01;

      // Limit vertical rotation
      interactionRef.current.targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, interactionRef.current.targetRotationX));

      interactionRef.current.x = event.clientX;
      interactionRef.current.y = event.clientY;
      
      // Update previous position and time
      interactionRef.current.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      interactionRef.current.lastUpdateTime = currentTime;
    };

    const handleMouseUp = () => {
      interactionRef.current.isDown = false;
      renderer.domElement.style.cursor = interactionRef.current.isHovering ? 'grab' : 'default';
    };

    const handleMouseLeave = () => {
      interactionRef.current.isDown = false;
      interactionRef.current.isHovering = false;
      interactionRef.current.targetScale = 1;
      interactionRef.current.targetGlow = 0.3;
      interactionRef.current.targetRotationX = 0;
      interactionRef.current.targetRotationY = 0;
      renderer.domElement.style.cursor = 'default';
    };

    // Update center position on resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Update center position
      const rect = renderer.domElement.getBoundingClientRect();
      interactionRef.current.centerPosition = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    };

    // Set initial cursor style
    renderer.domElement.style.cursor = 'default';

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Adaptive interpolation based on whether it's the first hover
      const lerpFactor = interactionRef.current.isFirstHover ? 0.05 : 0.15;
      interactionRef.current.currentRotationX += (interactionRef.current.targetRotationX - interactionRef.current.currentRotationX) * lerpFactor;
      interactionRef.current.currentRotationY += (interactionRef.current.targetRotationY - interactionRef.current.currentRotationY) * lerpFactor;
      interactionRef.current.currentScale += (interactionRef.current.targetScale - interactionRef.current.currentScale) * 0.1;
      interactionRef.current.currentGlow += (interactionRef.current.targetGlow - interactionRef.current.currentGlow) * 0.1;

      if (earthRef.current) {
        earthRef.current.rotation.x = interactionRef.current.currentRotationX;
        earthRef.current.rotation.y = interactionRef.current.currentRotationY;
        earthRef.current.scale.setScalar(interactionRef.current.currentScale);
        
        // Add subtle auto-rotation when not interacting
        if (!interactionRef.current.isDown && !interactionRef.current.isHovering) {
          interactionRef.current.targetRotationY += 0.002;
        }
      }
      
      if (cloudsRef.current) {
        cloudsRef.current.rotation.x = interactionRef.current.currentRotationX;
        cloudsRef.current.rotation.y = interactionRef.current.currentRotationY + 0.1;
        cloudsRef.current.scale.setScalar(interactionRef.current.currentScale);
      }

      if (atmosphereRef.current) {
        atmosphereRef.current.scale.setScalar(interactionRef.current.currentScale);
        // Update glow intensity
        (atmosphereRef.current.material as THREE.ShaderMaterial).uniforms.glowIntensity.value = interactionRef.current.currentGlow;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Dispose of geometries and materials
      earthGeometry.dispose();
      cloudGeometry.dispose();
      atmosphereGeometry.dispose();
      earthMaterial.dispose();
      cloudMaterial.dispose();
      atmosphereMaterial.dispose();
      earthTexture.dispose();
      normalTexture.dispose();
      cloudTexture.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full relative"
      style={{ minHeight: '400px' }}
    />
  );
};

export default Earth;

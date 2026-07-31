import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Laptop3DCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & CAMERA SETUP
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    container.appendChild(renderer.domElement);

    // 2. DYNAMIC DASHBOARD CANVAS TEXTURE
    const canvas2d = document.createElement('canvas');
    canvas2d.width = 1024;
    canvas2d.height = 640;
    const ctx = canvas2d.getContext('2d');

    const drawDashboardUI = () => {
      // Dark space background
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, 1024, 640);

      // Top Navigation Bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(20, 20, 984, 50);

      // Logo / Title
      ctx.fillStyle = '#a855f7';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('⚡ BCA DIGITAL PLATFORM', 40, 52);

      // Status Badge
      ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.fillRect(800, 32, 180, 26);
      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('● LIVE DASHBOARD', 820, 49);

      // Left Column: Semester & Subject Cards
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.roundRect(20, 90, 300, 240, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('Semester 1 & 2 Modules', 40, 120);

      // Subjects items
      const subjects = [
        { code: 'BCA-101', name: 'Problem Solving C', progress: 0.85, color: '#a855f7' },
        { code: 'BCA-201', name: 'OOP using C++', progress: 0.72, color: '#06b6d4' },
        { code: 'BCA-202', name: 'Data Structures', progress: 0.90, color: '#10b981' }
      ];

      subjects.forEach((sub, i) => {
        const y = 145 + i * 55;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(35, y, 270, 42);

        ctx.fillStyle = sub.color;
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(sub.code, 45, y + 25);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '13px sans-serif';
        ctx.fillText(sub.name, 110, y + 25);

        // Progress bar
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(230, y + 18, 60, 6);
        ctx.fillStyle = sub.color;
        ctx.fillRect(230, y + 18, 60 * sub.progress, 6);
      });

      // Middle Column: Code Editor
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.roundRect(340, 90, 340, 240, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('main.cpp — BCA Code Studio', 360, 115);

      const codeLines = [
        { text: '#include <iostream>', color: '#c084fc' },
        { text: 'using namespace std;', color: '#38bdf8' },
        { text: 'int main() {', color: '#f43f5e' },
        { text: '  cout << "BCA 2026";', color: '#34d399' },
        { text: '  return 0;', color: '#facc15' },
        { text: '}', color: '#f43f5e' }
      ];

      codeLines.forEach((line, i) => {
        ctx.fillStyle = line.color;
        ctx.font = '13px monospace';
        ctx.fillText(line.text, 360, 145 + i * 26);
      });

      // Right Column: Analytics Chart
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.roundRect(700, 90, 304, 240, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('Performance Analytics', 720, 120);

      // Draw Purple Chart Wave
      ctx.beginPath();
      ctx.moveTo(720, 280);
      ctx.bezierCurveTo(760, 240, 800, 260, 840, 200);
      ctx.bezierCurveTo(880, 150, 920, 220, 970, 160);
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Chart Glow Fill
      ctx.lineTo(970, 300);
      ctx.lineTo(720, 300);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
      ctx.fill();

      // Bottom Row: PDF Viewer Preview & Downloads
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.roundRect(20, 350, 984, 260, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('📄 PDF Question Papers & SGBAU Solved Notes Archive', 40, 385);

      // PDF Thumbnails
      const pdfs = [
        { title: 'C Programming End-Sem PYQ 2025', tag: 'PDF • 3.8 MB' },
        { title: 'OOP using Java Winter 2025 SGBAU', tag: 'PDF • 640 KB' },
        { title: 'Data Structures Lab Manual Code', tag: 'PDF • 1.9 MB' }
      ];

      pdfs.forEach((pdf, i) => {
        const x = 40 + i * 320;
        ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
        ctx.roundRect(x, 410, 290, 170, 8);
        ctx.fill();
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
        ctx.stroke();

        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(pdf.title, x + 15, 450);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px sans-serif';
        ctx.fillText(pdf.tag, x + 15, 480);

        ctx.fillStyle = '#a855f7';
        ctx.fillRect(x + 15, 520, 110, 32);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('OPEN PDF', x + 40, 541);
      });
    };

    drawDashboardUI();
    const screenTexture = new THREE.CanvasTexture(canvas2d);
    screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 3. 3D LAPTOP GEOMETRY & MATERIALS
    const laptopGroup = new THREE.Group();

    // Materials
    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0d14,
      metalness: 0.85,
      roughness: 0.2,
      envMapIntensity: 1.5
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e1b2e,
      metalness: 0.9,
      roughness: 0.1
    });

    const keyboardDeckMaterial = new THREE.MeshStandardMaterial({
      color: 0x080910,
      metalness: 0.7,
      roughness: 0.4
    });

    const screenGlassMaterial = new THREE.MeshStandardMaterial({
      map: screenTexture,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0x221133,
      emissiveIntensity: 0.4
    });

    // A) Base Chassis
    const baseGeometry = new THREE.BoxGeometry(2.8, 0.08, 1.9);
    const baseMesh = new THREE.Mesh(baseGeometry, chassisMaterial);
    baseMesh.position.y = 0.04;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    laptopGroup.add(baseMesh);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.8, 0.005, 0.55);
    const trackpadMesh = new THREE.Mesh(trackpadGeo, keyboardDeckMaterial);
    trackpadMesh.position.set(0, 0.085, 0.5);
    laptopGroup.add(trackpadMesh);

    // Keyboard Area Cutout
    const kbAreaGeo = new THREE.BoxGeometry(2.4, 0.005, 0.9);
    const kbAreaMesh = new THREE.Mesh(kbAreaGeo, keyboardDeckMaterial);
    kbAreaMesh.position.set(0, 0.085, -0.25);
    laptopGroup.add(kbAreaMesh);

    // B) Screen Lid Group (Hinged at back)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.08, -0.9);

    // Outer Back Lid
    const lidGeo = new THREE.BoxGeometry(2.8, 1.85, 0.04);
    const lidMesh = new THREE.Mesh(lidGeo, chassisMaterial);
    lidMesh.position.set(0, 0.9, 0);
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    // Screen Display Panel
    const screenGeo = new THREE.PlaneGeometry(2.68, 1.72);
    const screenMesh = new THREE.Mesh(screenGeo, screenGlassMaterial);
    screenMesh.position.set(0, 0.9, 0.022);
    lidGroup.add(screenMesh);

    // Tilt Lid Open (approx 110 degrees)
    lidGroup.rotation.x = -THREE.MathUtils.degToRad(18);
    laptopGroup.add(lidGroup);

    // Center and Rotate Laptop to Isometric 3/4 Perspective
    laptopGroup.rotation.y = THREE.MathUtils.degToRad(-25);
    laptopGroup.rotation.x = THREE.MathUtils.degToRad(12);
    laptopGroup.position.set(0, -0.2, 0);

    scene.add(laptopGroup);

    // 4. LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Soft Purple Ambient Glow Underneath (#9333EA)
    const purpleGlowLight = new THREE.PointLight(0x9333ea, 5, 6);
    purpleGlowLight.position.set(0, -0.5, 0);
    scene.add(purpleGlowLight);

    // Cyan Edge Highlight (#06B6D4)
    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 2.5);
    cyanLight.position.set(-3, 3, 2);
    scene.add(cyanLight);

    // Top Key Light
    const topLight = new THREE.DirectionalLight(0xffffff, 1.8);
    topLight.position.set(3, 5, 4);
    topLight.castShadow = true;
    scene.add(topLight);

    // 5. ANIMATION & INTERACTIVE MOUSE PARALLAX
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.4;
      mouseY = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animation
      laptopGroup.position.y = -0.2 + Math.sin(elapsedTime * 1.5) * 0.05;

      // Smooth mouse parallax interpolation
      laptopGroup.rotation.y += (THREE.MathUtils.degToRad(-25) + mouseX - laptopGroup.rotation.y) * 0.05;
      laptopGroup.rotation.x += (THREE.MathUtils.degToRad(12) + mouseY - laptopGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 6. RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="hero-3d-laptop-canvas" 
      style={{ 
        width: '100%', 
        height: '460px', 
        position: 'relative',
        cursor: 'grab' 
      }} 
    />
  );
};

export default Laptop3DCanvas;

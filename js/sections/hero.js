/* ═══════════════════════════════════════════════════════════
   js/sections/hero.js
   Hero section: Three.js globe with glowing symbiont veins,
   mouse-reactive nanite swarms, CTA iris-flash transition
   
   Key scroll triggers:
   - Globe fades/scales down as user scrolls past hero
   - Nanite particles react to mouse position
═══════════════════════════════════════════════════════════ */

import { scene, camera, onFrame } from '../core/three-setup.js';
import { createParticleSystem } from '../effects/particles.js';
import { prefersReducedMotion, isMobile, lerp, throttle } from '../core/utils.js';

let globe, glowMesh, veinPoints;
let mouseX = 0, mouseY = 0;
let particleSys;

/**
 * Initialize the hero section
 */
export function initHero() {
    if (!scene) return;

    createGlobe();
    createVeins();

    if (!prefersReducedMotion()) {
        particleSys = createParticleSystem(scene, 'nanite');
        setupMouseTracking();
    }

    setupCTA();
    setupScrollFade();
}

/**
 * Create the stylized rotating globe
 */
function createGlobe() {
    // Main sphere — dark with wireframe
    const geo = new THREE.IcosahedronGeometry(1.5, 5);
    const mat = new THREE.MeshBasicMaterial({
        color: 0x0a1628,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
    });
    globe = new THREE.Mesh(geo, mat);
    scene.add(globe);

    // Inner glow sphere
    const glowGeo = new THREE.IcosahedronGeometry(1.48, 4);
    const glowMat = new THREE.MeshBasicMaterial({
        color: 0x00f0d4,
        transparent: true,
        opacity: 0.04,
        side: THREE.BackSide,
    });
    glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    // Animate the globe rotation each frame
    onFrame((t) => {
        if (globe) {
            globe.rotation.y = t * 0.08;
            globe.rotation.x = Math.sin(t * 0.03) * 0.1;
        }
        if (glowMesh) {
            glowMesh.rotation.y = t * 0.06;
        }
    });
}

/**
 * Create glowing symbiont vein particles on the globe surface
 */
function createVeins() {
    const count = isMobile() ? 120 : 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const teal = new THREE.Color(0x00f0d4);
    const gold = new THREE.Color(0xf0c850);

    for (let i = 0; i < count; i++) {
        // Distribute on sphere surface using spherical coords
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 1.52 + Math.random() * 0.05;

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        // Random teal-gold gradient
        const mix = Math.random();
        const c = teal.clone().lerp(gold, mix);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
        size: isMobile() ? 2.5 : 3.0,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
    });

    veinPoints = new THREE.Points(geo, mat);
    scene.add(veinPoints);

    // Rotate veins with globe
    onFrame((t) => {
        if (veinPoints) {
            veinPoints.rotation.y = t * 0.08;
            veinPoints.rotation.x = Math.sin(t * 0.03) * 0.1;
        }
    });
}

/**
 * Mouse tracking for nanite particle reaction
 */
function setupMouseTracking() {
    const onMove = throttle((e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, 16);

    document.addEventListener('mousemove', onMove);

    // Subtly shift particles based on mouse
    onFrame(() => {
        if (particleSys && particleSys.points) {
            particleSys.points.rotation.y = lerp(particleSys.points.rotation.y, mouseX * 0.3, 0.02);
            particleSys.points.rotation.x = lerp(particleSys.points.rotation.x, mouseY * 0.15, 0.02);
        }
    });
}

/**
 * CTA button: iris/portal flash transition
 */
function setupCTA() {
    const btn = document.getElementById('cta-launch');
    const iris = document.getElementById('iris-overlay');
    if (!btn || !iris) return;

    btn.addEventListener('click', () => {
        iris.classList.add('active');
        // After flash, scroll to about section
        setTimeout(() => {
            const about = document.getElementById('about');
            if (about) {
                about.scrollIntoView({ behavior: 'smooth' });
            }
            // Remove class after animation
            setTimeout(() => iris.classList.remove('active'), 600);
        }, 600);
    });
}

/**
 * Fade & scale globe as user scrolls past hero
 */
function setupScrollFade() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    gsap.to(camera.position, {
        z: 8,
        ease: 'none',
        scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
    });

    // Update particle system each frame
    if (particleSys) {
        let lastTime = 0;
        onFrame((t) => {
            const delta = t - lastTime;
            lastTime = t;
            if (delta > 0 && delta < 0.1) {
                particleSys.update(delta);
            }
        });
    }
}

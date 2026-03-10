/* ═══════════════════════════════════════════════════════════
   js/sections/hero.js
   SPIDER-VERSE Hero
   Three.js Multiversal Collider Ring (Portal) + Glitch text
═══════════════════════════════════════════════════════════ */

import { scene, camera, onFrame } from '../core/three-setup.js';
import { createParticleSystem } from '../effects/particles.js';
import { prefersReducedMotion, isMobile, lerp, throttle } from '../core/utils.js';

let portalTorus, portalGlow;
let mouseX = 0, mouseY = 0;
let particleSys;

export function initHero() {
    if (!scene) return;
    scene.background = new THREE.Color(0x0f1118);

    createColliderPortal();

    if (!prefersReducedMotion()) {
        particleSys = createParticleSystem(scene, 'collider');
        setupMouseTracking();
    }

    setupCTA();
    setupScrollFade();
    setupCountdownTimer();
}

/**
 * Handles the countdown logic to April 15
 */
function setupCountdownTimer() {
    const domDays = document.getElementById('t-days');
    const domHours = document.getElementById('t-hours');
    const domMins = document.getElementById('t-mins');
    const domSecs = document.getElementById('t-secs');

    if (!domDays || !domHours || !domMins || !domSecs) return;

    const currentYear = new Date().getFullYear();
    // Target: April 15 of the current year. (Month is 0-indexed, so 3 is April)
    let targetDate = new Date(currentYear, 3, 15, 9, 0, 0).getTime();

    // If April 15 has already passed this year, point to next year.
    if (new Date().getTime() > targetDate) {
        targetDate = new Date(currentYear + 1, 3, 15, 9, 0, 0).getTime();
    }

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            domDays.innerText = '00';
            domHours.innerText = '00';
            domMins.innerText = '00';
            domSecs.innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        domDays.innerText = days.toString().padStart(2, '0');
        domHours.innerText = hours.toString().padStart(2, '0');
        domMins.innerText = minutes.toString().padStart(2, '0');
        domSecs.innerText = seconds.toString().padStart(2, '0');
    }

    updateTimer(); // Initial call
    setInterval(updateTimer, 1000);
}

/**
 * Creates the Multiversal Super-Collider Portal (spinning rings)
 */
function createColliderPortal() {
    // Main collider ring
    const geo1 = new THREE.TorusGeometry(3, 0.4, 16, 100);
    const mat1 = new THREE.MeshBasicMaterial({
        color: 0xff0040,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
    });
    portalTorus = new THREE.Mesh(geo1, mat1);
    scene.add(portalTorus);

    // Inner fast-spinning ring (cyan)
    const geo2 = new THREE.TorusGeometry(2.5, 0.1, 8, 50);
    const mat2 = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.8,
    });
    portalGlow = new THREE.Mesh(geo2, mat2);
    portalGlow.rotation.x = Math.PI / 2;
    scene.add(portalGlow);

    // Magenta center deep void
    const voidGeo = new THREE.CircleGeometry(2.3, 32);
    const voidMat = new THREE.MeshBasicMaterial({
        color: 0xd900ff,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
    });
    const portalVoid = new THREE.Mesh(voidGeo, voidMat);
    portalVoid.position.z = -0.5;
    scene.add(portalVoid);

    onFrame((t) => {
        if (portalTorus) {
            portalTorus.rotation.z = t * 0.2;
            portalTorus.rotation.x = Math.sin(t * 0.5) * 0.1;
        }
        if (portalGlow) {
            portalGlow.rotation.z = -t * 1.5;
            portalGlow.rotation.y = Math.cos(t * 1.5) * 0.2;
            // Glitch scale
            const s = 1 + Math.random() * 0.05;
            portalGlow.scale.set(s, s, s);
        }
    });
}

function setupMouseTracking() {
    const onMove = throttle((e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, 16);

    document.addEventListener('mousemove', onMove);

    onFrame(() => {
        if (portalTorus) {
            portalTorus.rotation.y = lerp(portalTorus.rotation.y, mouseX * 0.2, 0.05);
            portalTorus.rotation.x = lerp(portalTorus.rotation.x, mouseY * -0.2, 0.05);
        }
        if (particleSys && particleSys.points) {
            particleSys.points.rotation.y = lerp(particleSys.points.rotation.y, mouseX * 0.5, 0.05);
        }
    });
}

function setupCTA() {
    const btn = document.getElementById('cta-launch');
    const flash = document.getElementById('portal-flash');
    if (!btn || !flash) return;

    btn.addEventListener('click', () => {
        flash.classList.add('active');
        setTimeout(() => {
            const about = document.getElementById('about');
            if (about) about.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => flash.classList.remove('active'), 800);
        }, 400); // 400ms is halfway through the animation
    });
}

function setupScrollFade() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    gsap.to(camera.position, {
        z: 12, // Pull away from portal
        ease: 'power1.out',
        scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
    });

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

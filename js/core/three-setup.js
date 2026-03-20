/* ═══════════════════════════════════════════════════════════
   js/core/three-setup.js
   Shared Three.js scene, camera, renderer, resize handler,
   and animation loop
   
   Usage: import { scene, camera, renderer, onFrame } from './three-setup.js'
   Extend: call onFrame(callback) to add per-frame logic
═══════════════════════════════════════════════════════════ */

// Three.js is loaded via importmap (see index.html) — must be imported, NOT a global
import * as THREE from 'three';
export { THREE };

/** @type {THREE.Scene} */
export let scene;
/** @type {THREE.PerspectiveCamera} */
export let camera;
/** @type {THREE.WebGLRenderer} */
export let renderer;

/** List of callbacks to run each frame */
const frameCallbacks = [];

/**
 * Initialize the shared Three.js renderer on a given canvas
 * @param {string} canvasId - ID of the <canvas> element
 * @returns {{ scene, camera, renderer }}
 */
export function initThree(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn(`[three-setup] Canvas #${canvasId} not found`);
        return {};
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Resize handler
    window.addEventListener('resize', onResize);

    // Start animation loop
    animate();

    return { scene, camera, renderer };
}

function onResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Register a callback to run every frame
 * @param {function(number): void} cb - Receives elapsed time in seconds
 */
export function onFrame(cb) {
    if (typeof cb === 'function') frameCallbacks.push(cb);
}

function animate() {
    requestAnimationFrame(animate);
    const elapsed = performance.now() * 0.001;
    for (const cb of frameCallbacks) cb(elapsed);
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

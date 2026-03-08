/* ═══════════════════════════════════════════════════════════
   js/effects/particles.js
   Switchable particle system for nanites, spores, circuits, etc.
   
   Uses Three.js Points with configurable presets.
   Usage:
     import { createParticleSystem, switchPreset } from './particles.js'
     const ps = createParticleSystem(scene, 'nanite')
     // Later: switchPreset(ps, 'spore')
   
   Presets: nanite, spore, circuit, ember, crystal, wind
═══════════════════════════════════════════════════════════ */

import { randomRange, prefersReducedMotion } from '../core/utils.js';

const PRESETS = {
    nanite: {
        count: 300,
        color: 0x00f0d4,
        size: 2.0,
        speed: 0.3,
        spread: 15,
        opacity: 0.7,
    },
    spore: {
        count: 200,
        color: 0x2ecc71,
        size: 3.0,
        speed: 0.15,
        spread: 12,
        opacity: 0.5,
    },
    circuit: {
        count: 250,
        color: 0xf0c850,
        size: 1.5,
        speed: 0.5,
        spread: 14,
        opacity: 0.6,
    },
    ember: {
        count: 200,
        color: 0xff8c42,
        size: 2.5,
        speed: 0.4,
        spread: 10,
        opacity: 0.65,
    },
    crystal: {
        count: 150,
        color: 0x9b59ff,
        size: 3.5,
        speed: 0.2,
        spread: 16,
        opacity: 0.5,
    },
    wind: {
        count: 180,
        color: 0x00d4ff,
        size: 1.8,
        speed: 0.6,
        spread: 18,
        opacity: 0.4,
    },
};

/**
 * Create a particle system and add it to a scene
 * @param {THREE.Scene} targetScene
 * @param {string} presetName - One of the preset keys
 * @returns {{ points: THREE.Points, update: function, switchPreset: function }}
 */
export function createParticleSystem(targetScene, presetName = 'nanite') {
    if (prefersReducedMotion()) {
        return { points: null, update: () => { }, switchPreset: () => { } };
    }

    const preset = PRESETS[presetName] || PRESETS.nanite;
    const maxCount = 400; // Allocate max buffer once

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(maxCount * 3);
    const velocities = new Float32Array(maxCount * 3);

    // Initialize positions
    for (let i = 0; i < maxCount; i++) {
        positions[i * 3] = randomRange(-preset.spread, preset.spread);
        positions[i * 3 + 1] = randomRange(-preset.spread, preset.spread);
        positions[i * 3 + 2] = randomRange(-preset.spread * 0.5, preset.spread * 0.5);
        velocities[i * 3] = randomRange(-1, 1) * preset.speed;
        velocities[i * 3 + 1] = randomRange(-1, 1) * preset.speed;
        velocities[i * 3 + 2] = randomRange(-0.5, 0.5) * preset.speed;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setDrawRange(0, preset.count);

    const material = new THREE.PointsMaterial({
        color: preset.color,
        size: preset.size,
        transparent: true,
        opacity: preset.opacity,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    targetScene.add(points);

    let currentPreset = { ...preset };

    /**
     * Update particle positions each frame
     * @param {number} delta - Time since last frame (seconds)
     */
    function update(delta) {
        const posAttr = geometry.attributes.position;
        const arr = posAttr.array;
        const sp = currentPreset.spread;

        for (let i = 0; i < currentPreset.count; i++) {
            const ix = i * 3;
            arr[ix] += velocities[ix] * delta * 60;
            arr[ix + 1] += velocities[ix + 1] * delta * 60;
            arr[ix + 2] += velocities[ix + 2] * delta * 60;

            // Wrap around
            if (arr[ix] > sp) arr[ix] = -sp;
            if (arr[ix] < -sp) arr[ix] = sp;
            if (arr[ix + 1] > sp) arr[ix + 1] = -sp;
            if (arr[ix + 1] < -sp) arr[ix + 1] = sp;
        }
        posAttr.needsUpdate = true;
    }

    /**
     * Switch to a different preset
     * @param {string} newPresetName
     */
    function switchTo(newPresetName) {
        const p = PRESETS[newPresetName];
        if (!p) return;
        currentPreset = { ...p };
        material.color.setHex(p.color);
        material.size = p.size;
        material.opacity = p.opacity;
        geometry.setDrawRange(0, p.count);

        // Re-randomize velocities
        for (let i = 0; i < maxCount; i++) {
            velocities[i * 3] = randomRange(-1, 1) * p.speed;
            velocities[i * 3 + 1] = randomRange(-1, 1) * p.speed;
            velocities[i * 3 + 2] = randomRange(-0.5, 0.5) * p.speed;
        }
    }

    return { points, update, switchPreset: switchTo };
}

export { PRESETS };

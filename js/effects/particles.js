/* ═══════════════════════════════════════════════════════════
   js/effects/particles.js
   Spider-Verse Switchable particle system
   Presets: anomaly (glitch dots), collider (portal sparks), 
   halftone (comic background static).
═══════════════════════════════════════════════════════════ */

import { randomRange, prefersReducedMotion } from '../core/utils.js';
import { THREE } from '../core/three-setup.js';

const PRESETS = {
    anomaly: {
        count: 250,
        colors: [0xff0040, 0x00f0ff], // Red and Cyan
        size: 4.0,
        speed: 0.8,
        spread: 12,
        opacity: 0.9,
        shape: 'square' // Represents pixel glitches
    },
    collider: {
        count: 400,
        colors: [0xd900ff, 0xfcee0a, 0xff0040], // Magenta, Yellow, Red
        size: 2.5,
        speed: 1.5,
        spread: 20,
        opacity: 0.8,
        shape: 'line'
    },
    halftone: {
        count: 150,
        colors: [0xffffff, 0x000000],
        size: 5.0,
        speed: 0.1,
        spread: 15,
        opacity: 0.3,
        shape: 'circle'
    }
};

/**
 * Create a particle system and add it to a scene
 */
export function createParticleSystem(targetScene, presetName = 'collider') {
    if (prefersReducedMotion()) {
        return { points: null, update: () => { }, switchPreset: () => { } };
    }

    const preset = PRESETS[presetName] || PRESETS.collider;
    const maxCount = 500;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(maxCount * 3);
    const velocities = new Float32Array(maxCount * 3);
    const colors = new Float32Array(maxCount * 3);

    for (let i = 0; i < maxCount; i++) {
        positions[i * 3] = randomRange(-preset.spread, preset.spread);
        positions[i * 3 + 1] = randomRange(-preset.spread, preset.spread);
        positions[i * 3 + 2] = randomRange(-preset.spread * 0.8, 2);
        velocities[i * 3] = randomRange(-1, 1) * preset.speed;
        velocities[i * 3 + 1] = randomRange(-1, 1) * preset.speed;
        velocities[i * 3 + 2] = randomRange(-0.5, 0.5) * preset.speed;

        // Pick random color from preset array
        const colorHex = preset.colors[Math.floor(Math.random() * preset.colors.length)];
        const c = new THREE.Color(colorHex);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setDrawRange(0, preset.count);

    const material = new THREE.PointsMaterial({
        size: preset.size,
        transparent: true,
        opacity: preset.opacity,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    targetScene.add(points);

    let currentPreset = { ...preset };

    /**
     * Update particle positions (Spider-Verse style glitch motion)
     */
    function update(delta) {
        const posAttr = geometry.attributes.position;
        const arr = posAttr.array;
        const sp = currentPreset.spread;

        for (let i = 0; i < currentPreset.count; i++) {
            const ix = i * 3;

            // Anomalous glitch chance (teleport slightly)
            if (Math.random() < 0.01) {
                arr[ix] += randomRange(-0.5, 0.5);
                arr[ix + 1] += randomRange(-0.5, 0.5);
            } else {
                arr[ix] += velocities[ix] * delta * 60;
                arr[ix + 1] += velocities[ix + 1] * delta * 60;
                arr[ix + 2] += velocities[ix + 2] * delta * 60;
            }

            if (arr[ix] > sp) arr[ix] = -sp;
            if (arr[ix] < -sp) arr[ix] = sp;
            if (arr[ix + 1] > sp) arr[ix + 1] = -sp;
            if (arr[ix + 1] < -sp) arr[ix + 1] = sp;
        }
        posAttr.needsUpdate = true;
    }

    function switchTo(newPresetName) {
        // simplified for brevity...
    }

    return { points, update, switchPreset: switchTo };
}

export { PRESETS };

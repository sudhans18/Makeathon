import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

const TRACKS = [
    {
        label: 'HW-01',
        family: 'hardware',
        title: 'Adaptive Build Systems',
        subtitle: 'Responsive fabrication and sensor-heavy prototypes.',
        desc: 'Design hardware that can survive chaotic field conditions, recover state, and keep providing useful data.',
        problems: [
            { title: 'Field Mesh Beacon', desc: 'Build a resilient beacon network for unstable outdoor environments with local failover logic.', tag: 'embedded' },
            { title: 'Sensor Fusion Hub', desc: 'Combine multiple noisy sensor inputs into a reliable situational awareness dashboard.', tag: 'iot' },
            { title: 'Rapid Repair Shell', desc: 'Prototype a modular enclosure system that makes on-site maintenance fast and tool-light.', tag: 'hardware' },
        ],
    },
    {
        label: 'HW-02',
        family: 'hardware',
        title: 'Mobility Interfaces',
        subtitle: 'Assistive motion, control feedback, and compact power.',
        desc: 'Focus on wearables, stabilization, and low-latency human-machine interaction for moving users.',
        problems: [
            { title: 'Balance Assist Band', desc: 'Create a wearable feedback system that helps users correct posture and gait in real time.', tag: 'wearable' },
            { title: 'Smart Brake Module', desc: 'Prototype a compact braking controller for lightweight mobility platforms.', tag: 'controls' },
            { title: 'Impact Telemetry Pad', desc: 'Capture and interpret shock patterns to improve rider safety decisions.', tag: 'safety' },
        ],
    },
    {
        label: 'HW-03',
        family: 'hardware',
        title: 'Atmospheric Monitoring',
        subtitle: 'Air, heat, and anomaly sensing in dense spaces.',
        desc: 'Build distributed sensing devices that track environmental drift and visualize dangerous conditions clearly.',
        problems: [
            { title: 'Microclimate Node', desc: 'Develop a compact unit that measures heat pockets, humidity changes, and airflow loss.', tag: 'climate' },
            { title: 'Hazard Strip Array', desc: 'Create a deployable sensor strip that maps air quality across a corridor or lab.', tag: 'instrumentation' },
            { title: 'Thermal Drift Alert', desc: 'Detect gradual thermal anomalies before they become visible system failures.', tag: 'monitoring' },
        ],
    },
    {
        label: 'HW-04',
        family: 'hardware',
        title: 'Energy Capture',
        subtitle: 'Harvesting and storing small bursts efficiently.',
        desc: 'Explore kinetic, thermal, or incidental power capture systems for low-duty edge devices.',
        problems: [
            { title: 'Stairwell Harvester', desc: 'Prototype a system that captures repeat footfall energy and buffers it for intermittent loads.', tag: 'energy' },
            { title: 'Heat Sink Battery Aid', desc: 'Use excess thermal gradients to assist low-power battery charging.', tag: 'power' },
            { title: 'Burst Buffer Board', desc: 'Design a board that smooths erratic harvested power into usable, stable output.', tag: 'pcb' },
        ],
    },
    {
        label: 'HW-05',
        family: 'hardware',
        title: 'Human-Environment Layers',
        subtitle: 'Interfaces between people, space, and infrastructure.',
        desc: 'Create devices that read presence, context, and intent while staying legible and safe for public use.',
        problems: [
            { title: 'Crowd Flow Tile', desc: 'Build a smart floor tile that detects foot traffic density and movement direction.', tag: 'smart-space' },
            { title: 'Context Beacon', desc: 'Prototype an indicator device that adapts messaging to occupancy and ambient conditions.', tag: 'interface' },
            { title: 'Touchless Panel Kit', desc: 'Design a public control panel that reduces contact while preserving reliable input.', tag: 'ux-hardware' },
        ],
    },
    {
        label: 'HW-06',
        family: 'hardware',
        title: 'Core Fabrication',
        subtitle: 'Mechanisms, joints, and modular systems.',
        desc: 'Concentrate on practical build quality, part reuse, and mechanical systems that can evolve after deployment.',
        problems: [
            { title: 'Snap-Lock Frame', desc: 'Create a repeatable frame system for quick assembly of experimental rigs.', tag: 'mechanical' },
            { title: 'Service Joint Stack', desc: 'Design a joint assembly that tolerates repeated teardown without alignment drift.', tag: 'manufacturing' },
            { title: 'Modular Test Cradle', desc: 'Build an adjustable test cradle for rapid prototyping across different device sizes.', tag: 'fabrication' },
        ],
    },
    {
        label: 'SW-01',
        family: 'software',
        title: 'Decision Systems',
        subtitle: 'Real-time software for fast, uncertain environments.',
        desc: 'Develop software that can prioritize, explain, and adapt under shifting constraints.',
        problems: [
            { title: 'Priority Shift Engine', desc: 'Build a planner that reorders tasks continuously as risk and urgency change.', tag: 'backend' },
            { title: 'Explainable Alert Layer', desc: 'Design a system that flags anomalies and surfaces plain-language reasons for action.', tag: 'ai' },
            { title: 'Multi-Stream Triage', desc: 'Handle competing event streams without starving critical signals.', tag: 'systems' },
        ],
    },
    {
        label: 'SW-02',
        family: 'software',
        title: 'Spatial Platforms',
        subtitle: 'Software that interprets motion, map state, and proximity.',
        desc: 'Create services and interfaces that make complex physical environments easier to navigate and monitor.',
        problems: [
            { title: 'Indoor Path Mesh', desc: 'Generate adaptive indoor routing when corridors, elevators, or access states change.', tag: 'mapping' },
            { title: 'Proximity Risk Engine', desc: 'Detect emerging congestion and unsafe clustering from live location data.', tag: 'analytics' },
            { title: 'View-State Overlay', desc: 'Build a visual layer that explains spatial changes across floors or zones.', tag: 'frontend' },
        ],
    },
    {
        label: 'SW-03',
        family: 'software',
        title: 'Security Logic',
        subtitle: 'Resilient systems, auditability, and trust boundaries.',
        desc: 'Focus on identity, encrypted communication, and incident response without sacrificing operator speed.',
        problems: [
            { title: 'Ephemeral Access Broker', desc: 'Issue short-lived credentials across devices with strong audit trails.', tag: 'security' },
            { title: 'Trace Compression Tool', desc: 'Summarize suspicious behavior across large event logs into operator-friendly views.', tag: 'forensics' },
            { title: 'Silent Fallback Channel', desc: 'Maintain secure communication when primary network paths degrade.', tag: 'networking' },
        ],
    },
    {
        label: 'SW-04',
        family: 'software',
        title: 'Data Narratives',
        subtitle: 'Turn volatile telemetry into clear operator stories.',
        desc: 'Build software that explains systems through timelines, patterns, and actionable summaries.',
        problems: [
            { title: 'Signal Storyboard', desc: 'Transform raw time-series streams into meaningful incident narratives.', tag: 'visualization' },
            { title: 'Pattern Drift Lens', desc: 'Highlight slow, subtle changes before they trigger obvious failures.', tag: 'observability' },
            { title: 'Operator Replay Board', desc: 'Create an interface for replaying decision points during an event.', tag: 'product' },
        ],
    },
    {
        label: 'SW-05',
        family: 'software',
        title: 'Automation Threads',
        subtitle: 'Workflow engines, orchestration, and recovery logic.',
        desc: 'Design systems that automate repetitive work but keep humans in control during exceptions.',
        problems: [
            { title: 'Escalation Router', desc: 'Route alerts and tasks based on role, load, and historical response quality.', tag: 'workflow' },
            { title: 'Recovery Sequence Builder', desc: 'Create a safe automation engine for repeatable recovery procedures.', tag: 'automation' },
            { title: 'Operator Override Panel', desc: 'Design a UI that makes automation state and intervention points obvious.', tag: 'ui' },
        ],
    },
    {
        label: 'SW-06',
        family: 'software',
        title: 'Core Intelligence',
        subtitle: 'Model-assisted systems with strong human oversight.',
        desc: 'Explore model-driven systems that support planning, summarization, and anomaly classification responsibly.',
        problems: [
            { title: 'Anomaly Classifier Desk', desc: 'Prototype a review workflow for model-suggested anomaly categories with feedback loops.', tag: 'ml' },
            { title: 'Ops Summary Agent', desc: 'Build a summarizer that condenses noisy telemetry into practical action items.', tag: 'agents' },
            { title: 'Confidence Gatekeeper', desc: 'Design a guardrail layer that controls when model output is allowed to act.', tag: 'governance' },
        ],
    },
];

const WEB_POSITIONS = [
    new THREE.Vector3(-38, 6, -8),
    new THREE.Vector3(36, -5, 12),
    new THREE.Vector3(4, 28, -22),
    new THREE.Vector3(-12, -28, 14),
    new THREE.Vector3(8, 4, 40),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(32, 20, -15),
    new THREE.Vector3(-28, -14, 28),
    new THREE.Vector3(14, -24, -36),
    new THREE.Vector3(-18, 20, 24),
    new THREE.Vector3(42, -10, -20),
    new THREE.Vector3(-6, 10, -44),
];

const WEB_ROTATIONS = [
    [0.4, 0.8, 0.2],
    [0.6, -0.5, 0.45],
    [-0.35, 0.3, -0.6],
    [0.25, -0.8, -0.2],
    [-0.5, 0.45, 0.75],
    [0.15, 0.2, -0.1],
    [0.7, 0.55, -0.25],
    [-0.45, 0.25, 0.6],
    [0.35, -0.7, 0.15],
    [-0.6, 0.65, -0.4],
    [0.2, 0.95, 0.4],
    [-0.3, -0.25, -0.75],
];

export function initProblems() {
    const container = document.getElementById('track-selector');
    const canvas = document.getElementById('track-selector-canvas');
    const ui = document.getElementById('track-selector-ui');
    const panel = document.getElementById('dimension-panel');

    if (!container || !canvas || !ui || !panel) return;

    const trackByLabel = new Map(TRACKS.map((track) => [track.label, track]));
    const buttons = new Map();
    const originalRotations = [];
    let activeLabel = TRACKS[0].label;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x01000a);
    scene.fog = new THREE.FogExp2(0x01000a, 0.014);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
    camera.position.set(0, 0, 70);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xff4400, 0.5);
    scene.add(ambient);

    const movingLight = new THREE.PointLight(0xff7700, 4, 150);
    scene.add(movingLight);

    const threadGroup = new THREE.Group();
    const webGroup = new THREE.Group();
    root.add(threadGroup);
    root.add(webGroup);

    const anchorMeshes = [];

    TRACKS.forEach((track, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `track-selector__button track-selector__button--${track.family}`;
        button.setAttribute('aria-label', `${track.label} ${track.title}`);
        button.dataset.label = track.label;
        button.innerHTML = `
            <span class="track-selector__pulse track-selector__pulse--1" aria-hidden="true"></span>
            <span class="track-selector__pulse track-selector__pulse--2" aria-hidden="true"></span>
            <span class="track-selector__pulse track-selector__pulse--3" aria-hidden="true"></span>
            <span class="track-selector__button-label">
                <span class="track-selector__icon">&#x2B21;</span>
                <span>${track.label}</span>
            </span>
        `;
        button.addEventListener('click', () => onTrackSelect(track.label));
        ui.appendChild(button);
        buttons.set(track.label, button);

        const web = buildCobweb(index, track.family === 'hardware');
        const [rx, ry, rz] = WEB_ROTATIONS[index];
        web.position.copy(WEB_POSITIONS[index]);
        web.rotation.set(rx, ry, rz);
        originalRotations.push({ x: rx, y: ry, z: rz });
        webGroup.add(web);
        anchorMeshes.push(web);
    });

    buildThreadNetwork(threadGroup);

    const targetRotation = new THREE.Vector2(0.18, -0.12);
    const currentRotation = new THREE.Vector2(targetRotation.x, targetRotation.y);
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let zoom = 70;

    function onTrackSelect(label) {
        activeLabel = label;
        container.dispatchEvent(new CustomEvent('trackselect', {
            detail: { label },
        }));
        renderPanel(trackByLabel.get(label));
        buttons.forEach((button, key) => {
            button.style.zIndex = key === label ? '12' : '8';
        });
    }

    function renderPanel(track) {
        if (!track) return;

        panel.innerHTML = `
            <div class="dimension-panel__header">
                <span class="dimension-panel__eyebrow">${track.label} / ${track.family}</span>
                <h3 class="dimension-panel__title">${track.title}</h3>
                <p class="dimension-panel__desc">${track.subtitle} ${track.desc}</p>
            </div>
            <div class="problem-grid">
                ${track.problems.map((problem) => `
                    <article class="problem-card">
                        <span class="problem-card__tag">${problem.tag}</span>
                        <h4 class="problem-card__title">${problem.title}</h4>
                        <p class="problem-card__desc">${problem.desc}</p>
                    </article>
                `).join('')}
            </div>
        `;

        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.problem-card',
                { opacity: 0, scale: 0.82, rotation: () => Math.random() * 6 - 3 },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.45,
                    stagger: 0.08,
                    ease: 'back.out(1.4)',
                }
            );
        }
    }

    function resize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }

    function updateButtons() {
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        TRACKS.forEach((track, index) => {
            const button = buttons.get(track.label);
            if (!button) return;

            const projected = WEB_POSITIONS[index].clone().applyMatrix4(webGroup.matrixWorld).project(camera);
            const x = (projected.x * 0.5 + 0.5) * width;
            const y = (-projected.y * 0.5 + 0.5) * height;

            button.style.left = `${x}px`;
            button.style.top = `${y}px`;

            const outside = projected.z < -1 || projected.x < -1.25 || projected.x > 1.25 || projected.y < -1.25 || projected.y > 1.25;
            const opacity = projected.z > 1 ? 0.2 : projected.z > 0.8 ? 0.45 : 1;
            button.style.opacity = outside ? '0' : String(opacity);
            button.style.pointerEvents = outside ? 'none' : 'auto';
        });
    }

    function animate() {
        if (!container.isConnected) {
            renderer.dispose();
            return;
        }

        requestAnimationFrame(animate);

        const time = performance.now() * 0.001;
        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;
        camera.position.z += (zoom - camera.position.z) * 0.12;
        root.rotation.x = currentRotation.y;
        root.rotation.y = currentRotation.x;

        anchorMeshes.forEach((mesh, index) => {
            const base = originalRotations[index];
            const phase = index * 0.63;
            const wobble = Math.sin(time * (0.65 + index * 0.035) + phase) * 0.014;
            mesh.rotation.x = base.x + wobble;
            mesh.rotation.y = base.y - wobble * 1.15;
            mesh.rotation.z = base.z + wobble * 0.8;
        });

        if (anchorMeshes[5]) {
            anchorMeshes[5].rotation.z = originalRotations[5].z + time * 0.035;
        }

        movingLight.position.set(
            Math.cos(time * 0.32) * 34,
            Math.sin(time * 0.46) * 22,
            Math.sin(time * 0.28) * 26
        );
        movingLight.intensity = 2.5 + Math.sin(time * 1.2) * 2;

        updateButtons();
        renderer.render(scene, camera);
    }

    container.addEventListener('mousedown', (event) => {
        isDragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
    });

    container.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;
        targetRotation.x += dx * 0.005;
        targetRotation.y += dy * 0.005;
        targetRotation.y = THREE.MathUtils.clamp(targetRotation.y, -0.75, 0.75);
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('wheel', (event) => {
        zoom = THREE.MathUtils.clamp(zoom + event.deltaY * 0.02, 52, 96);
        camera.position.z += (zoom - camera.position.z) * 0.14;
    }, { passive: true });

    window.addEventListener('resize', resize);

    resize();
    onTrackSelect(activeLabel);
    animate();
}

function buildCobweb(index, isHardware) {
    const group = new THREE.Group();
    const ringCount = 4 + (index % 3);
    const spokes = 7 + (index % 4);
    const maxRadius = 16 + ((index * 3) % 9);
    const color = isHardware ? 0xffddcc : 0xff5522;
    const haloColor = isHardware ? 0xffffff : 0xff8844;

    const points = [];
    for (let ring = 1; ring <= ringCount; ring += 1) {
        const radius = (ring / ringCount) * maxRadius;
        for (let spoke = 0; spoke <= spokes; spoke += 1) {
            const angle = (spoke / spokes) * Math.PI * 2;
            points.push(
                new THREE.Vector3(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    Math.sin(angle * 3 + index) * 0.3
                )
            );
        }
    }

    for (let spoke = 0; spoke < spokes; spoke += 1) {
        const angle = (spoke / spokes) * Math.PI * 2;
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(
            new THREE.Vector3(
                Math.cos(angle) * maxRadius,
                Math.sin(angle) * maxRadius,
                Math.cos(angle * 2 + index) * 0.45
            )
        );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const halo = new THREE.LineSegments(
        geometry,
        new THREE.LineBasicMaterial({
            color: haloColor,
            transparent: true,
            opacity: 0.2,
        })
    );
    halo.scale.setScalar(1.04);

    const core = new THREE.LineSegments(
        geometry,
        new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity: isHardware ? 0.58 : 0.72,
        })
    );

    group.add(halo);
    group.add(core);
    return group;
}

function buildThreadNetwork(group) {
    const nodes = [];
    for (let index = 0; index < 100; index += 1) {
        nodes.push(new THREE.Vector3(
            randRange(-80, 80),
            randRange(-60, 60),
            randRange(-80, 80)
        ));
    }

    const haloPositions = [];
    const nearCorePositions = [];
    const farCorePositions = [];

    for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
            const distance = nodes[i].distanceTo(nodes[j]);
            if (distance <= 18) {
                haloPositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
                const target = Math.abs(nodes[i].z) > 42 || Math.abs(nodes[j].z) > 42 ? farCorePositions : nearCorePositions;
                target.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
            }
        }
    }

    const haloGeometry = new THREE.BufferGeometry();
    haloGeometry.setAttribute('position', new THREE.Float32BufferAttribute(haloPositions, 3));

    const nearCoreGeometry = new THREE.BufferGeometry();
    nearCoreGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nearCorePositions, 3));

    const farCoreGeometry = new THREE.BufferGeometry();
    farCoreGeometry.setAttribute('position', new THREE.Float32BufferAttribute(farCorePositions, 3));

    const halo = new THREE.LineSegments(
        haloGeometry,
        new THREE.LineBasicMaterial({
            color: 0xff7744,
            transparent: true,
            opacity: 0.25,
        })
    );
    halo.scale.setScalar(1.04);

    const nearCore = new THREE.LineSegments(
        nearCoreGeometry,
        new THREE.LineBasicMaterial({
            color: 0xff5500,
            transparent: true,
            opacity: 1,
        })
    );

    const farCore = new THREE.LineSegments(
        farCoreGeometry,
        new THREE.LineBasicMaterial({
            color: 0xff2200,
            transparent: true,
            opacity: 0.5,
        })
    );

    group.add(halo);
    group.add(nearCore);
    group.add(farCore);

    for (let strand = 0; strand < 35; strand += 1) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(randRange(-80, 80), randRange(-60, 60), randRange(-80, 80)),
            new THREE.Vector3(randRange(-80, 80), randRange(-60, 60), randRange(-80, 80)),
        ]);

        const line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: 0xff5522,
                transparent: true,
                opacity: randRange(0.2, 0.45),
            })
        );

        group.add(line);
    }
}

function randRange(min, max) {
    return min + Math.random() * (max - min);
}

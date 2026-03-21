import React from 'react';
import { createRoot } from 'react-dom/client';
import TrackSelectorComponent from './TrackSelectorComponent.jsx';

export function initTrackSelector() {
    const container = document.getElementById('track-selector-container');
    if (!container) return;

    // Using an existing #track-selector-container as the React root
    const root = createRoot(container);
    root.render(React.createElement(TrackSelectorComponent));
}

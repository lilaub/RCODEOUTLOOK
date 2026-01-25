/**
 * Product Positioning Workshop - Interactive App
 * Marketing Management Exercise
 */

// ============================================
// Data Configuration
// ============================================

const competitors = [
    { name: 'Red Bull', color: '#1e40af', attributes: { price: 4, health: 2, innovation: 3, performance: 4, appeal: 5 } },
    { name: 'Monster', color: '#16a34a', attributes: { price: 3, health: 2, innovation: 3, performance: 4, appeal: 4 } },
    { name: 'Rockstar', color: '#eab308', attributes: { price: 2, health: 2, innovation: 2, performance: 3, appeal: 3 } },
    { name: '5-Hour Energy', color: '#dc2626', attributes: { price: 4, health: 3, innovation: 4, performance: 3, appeal: 3 } },
    { name: 'Celsius', color: '#f97316', attributes: { price: 4, health: 5, innovation: 4, performance: 5, appeal: 3 } },
    { name: 'ZOA', color: '#8b5cf6', attributes: { price: 3, health: 4, innovation: 3, performance: 4, appeal: 3 } },
    { name: 'Alani Nu', color: '#ec4899', attributes: { price: 3, health: 4, innovation: 4, performance: 3, appeal: 3 } },
    { name: 'GHOST', color: '#06b6d4', attributes: { price: 3, health: 3, innovation: 5, performance: 3, appeal: 2 } }
];

const segments = [
    {
        id: 'wellness-warriors',
        name: 'Wellness Warriors',
        icon: '🧘',
        description: 'Health-conscious professionals who want clean energy without compromising their wellness goals.',
        size: 'Large',
        growth: 'High',
        accessibility: 'Medium'
    },
    {
        id: 'productive-parents',
        name: 'Productive Parents',
        icon: '👨‍👩‍👧',
        description: 'Busy parents juggling work and family who need reliable energy to get through demanding days.',
        size: 'Medium',
        growth: 'Medium',
        accessibility: 'High'
    },
    {
        id: 'sustainable-students',
        name: 'Sustainable Students',
        icon: '🎓',
        description: 'Eco-conscious college students who prioritize sustainability in their purchasing decisions.',
        size: 'Medium',
        growth: 'High',
        accessibility: 'Medium'
    },
    {
        id: 'mindful-athletes',
        name: 'Mindful Athletes',
        icon: '🏃',
        description: 'Performance-focused athletes who are increasingly ingredient-conscious and seek clean fuel.',
        size: 'Small',
        growth: 'High',
        accessibility: 'Low'
    },
    {
        id: 'remote-workers',
        name: 'Remote Workers',
        icon: '💻',
        description: 'Work-from-home professionals who need sustained focus and energy for productive home office days.',
        size: 'Large',
        growth: 'High',
        accessibility: 'High'
    }
];

const axisLabels = {
    price: { low: 'Low Price', high: 'High Price' },
    health: { low: 'Low Health Focus', high: 'High Health Focus' },
    innovation: { low: 'Traditional', high: 'Innovative' },
    performance: { low: 'Lifestyle-Oriented', high: 'Performance-Oriented' },
    appeal: { low: 'Niche Appeal', high: 'Mainstream Appeal' }
};

// ============================================
// Application State
// ============================================

const state = {
    currentSection: 'intro',
    studentName: '',
    studentId: '',
    mapBrands: {}, // { brandName: { x: 0-100, y: 0-100 } }
    xAxis: 'price',
    yAxis: 'health',
    gapAnalysis: {
        crowdedArea: '',
        whiteSpace: '',
        opportunityRationale: ''
    },
    segmentScores: {}, // { segmentId: { attractiveness: 3, fit: 3, accessibility: 3 } }
    primarySegment: '',
    secondarySegment: '',
    segmentJustification: '',
    pop: [], // Points of Parity
    pod: [], // Points of Difference
    positioningStatement: {
        target: '',
        need: '',
        category: '',
        benefit: '',
        competitor: '',
        rtb: ''
    },
    dcuRatings: {
        desirable: 3,
        deliverable: 3,
        differentiating: 3
    },
    dcuJustifications: {
        desirable: '',
        deliverable: '',
        differentiating: ''
    },
    marketingMix: {
        product: '',
        price: '',
        place: '',
        promotion: ''
    }
};

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadSavedState();
    setupEventListeners();
});

function initializeApp() {
    renderBrandPalette();
    renderSegmentCards();
    renderEvaluationTable();
    populateSegmentDropdowns();
    updateAxisLabels();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.section));
    });

    // Auto-save on input changes
    document.querySelectorAll('input, textarea, select').forEach(el => {
        el.addEventListener('change', saveState);
        el.addEventListener('input', debounce(saveState, 500));
    });

    // Positioning statement live preview
    document.querySelectorAll('[id^="ps"]').forEach(el => {
        el.addEventListener('input', updateStatementPreview);
    });
}

// ============================================
// Navigation
// ============================================

function navigateTo(sectionId) {
    // Update state
    state.currentSection = sectionId;

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });

    // Update sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
    });

    // Section-specific initialization
    if (sectionId === 'summary') {
        updateSummary();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    saveState();
}

// ============================================
// Perceptual Map
// ============================================

function renderBrandPalette() {
    const palette = document.getElementById('brandPalette');
    if (!palette) return;

    palette.innerHTML = competitors.map(brand => `
        <div class="brand-item ${state.mapBrands[brand.name] ? 'placed' : ''}"
             draggable="true"
             data-brand="${brand.name}">
            <span class="brand-dot" style="background: ${brand.color};"></span>
            ${brand.name}
        </div>
    `).join('');

    // Setup drag handlers
    palette.querySelectorAll('.brand-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
    });

    // Setup EnergyBoost drag
    const energyBoost = document.querySelector('.brand-item.energyboost');
    if (energyBoost) {
        energyBoost.addEventListener('dragstart', handleDragStart);
    }
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.brand);
    e.dataTransfer.effectAllowed = 'move';
}

function updateAxisLabels() {
    const xAxis = document.getElementById('xAxis')?.value || 'price';
    const yAxis = document.getElementById('yAxis')?.value || 'health';

    state.xAxis = xAxis;
    state.yAxis = yAxis;

    // Update labels
    document.getElementById('xAxisLabelLeft').textContent = axisLabels[xAxis].low;
    document.getElementById('xAxisLabelRight').textContent = axisLabels[xAxis].high;
    document.getElementById('yAxisLabelBottom').textContent = axisLabels[yAxis].low;
    document.getElementById('yAxisLabelTop').textContent = axisLabels[yAxis].high;

    // Update quadrant labels
    const quadrantLabels = {
        q1: `${axisLabels[xAxis].high.split(' ').pop()} & ${axisLabels[yAxis].high.split(' ').pop()}`,
        q2: `${axisLabels[xAxis].low.split(' ').pop()} & ${axisLabels[yAxis].high.split(' ').pop()}`,
        q3: `${axisLabels[xAxis].low.split(' ').pop()} & ${axisLabels[yAxis].low.split(' ').pop()}`,
        q4: `${axisLabels[xAxis].high.split(' ').pop()} & ${axisLabels[yAxis].low.split(' ').pop()}`
    };

    document.querySelectorAll('.map-quadrant').forEach(q => {
        const quadrant = q.classList[1];
        q.querySelector('.quadrant-label').textContent = quadrantLabels[quadrant];
    });

    // Re-render placed brands
    renderPlacedBrands();
    saveState();
}

function initializeMapDragDrop() {
    const map = document.getElementById('perceptualMap');
    if (!map) return;

    map.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    map.addEventListener('drop', (e) => {
        e.preventDefault();
        const brandName = e.dataTransfer.getData('text/plain');
        const rect = map.getBoundingClientRect();

        // Calculate position as percentage
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = 100 - ((e.clientY - rect.top) / rect.height) * 100; // Invert Y for top = high

        // Clamp values
        const clampedX = Math.max(0, Math.min(100, x));
        const clampedY = Math.max(0, Math.min(100, y));

        // Update state
        state.mapBrands[brandName] = { x: clampedX, y: clampedY };

        // Update UI
        renderBrandPalette();
        renderPlacedBrands();
        saveState();
    });
}

function renderPlacedBrands() {
    const map = document.getElementById('perceptualMap');
    if (!map) return;

    // Remove existing placed brands
    map.querySelectorAll('.map-brand').forEach(el => el.remove());

    // Add placed brands
    Object.entries(state.mapBrands).forEach(([name, pos]) => {
        const brand = competitors.find(c => c.name === name) ||
                     { name: 'EnergyBoost', color: '#10b981' };

        const brandEl = document.createElement('div');
        brandEl.className = 'map-brand';
        brandEl.style.left = `${pos.x}%`;
        brandEl.style.top = `${100 - pos.y}%`; // Invert Y back for positioning
        brandEl.style.borderColor = brand.color;
        brandEl.draggable = true;
        brandEl.dataset.brand = name;
        brandEl.innerHTML = `
            <span class="brand-dot" style="background: ${brand.color};"></span>
            ${name}
        `;

        // Allow repositioning
        brandEl.addEventListener('dragstart', handleDragStart);

        // Double-click to remove
        brandEl.addEventListener('dblclick', () => {
            delete state.mapBrands[name];
            renderBrandPalette();
            renderPlacedBrands();
            saveState();
        });

        map.appendChild(brandEl);
    });
}

// Initialize map when section becomes active
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.target.id === 'perceptual-map' && mutation.target.classList.contains('active')) {
            initializeMapDragDrop();
            renderPlacedBrands();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('perceptual-map');
    if (section) {
        observer.observe(section, { attributes: true, attributeFilter: ['class'] });
        initializeMapDragDrop();
    }
});

// ============================================
// Target Segments
// ============================================

function renderSegmentCards() {
    const container = document.getElementById('segmentCards');
    if (!container) return;

    container.innerHTML = segments.map(seg => `
        <div class="segment-card ${state.primarySegment === seg.id ? 'selected' : ''}"
             data-segment="${seg.id}"
             onclick="selectSegment('${seg.id}')">
            <h4>
                <span class="segment-icon">${seg.icon}</span>
                ${seg.name}
            </h4>
            <p>${seg.description}</p>
            <div class="segment-stats">
                <span class="stat">
                    <span class="stat-label">Size:</span>
                    <span class="stat-value ${seg.size.toLowerCase()}">${seg.size}</span>
                </span>
                <span class="stat">
                    <span class="stat-label">Growth:</span>
                    <span class="stat-value ${seg.growth.toLowerCase()}">${seg.growth}</span>
                </span>
                <span class="stat">
                    <span class="stat-label">Access:</span>
                    <span class="stat-value ${seg.accessibility.toLowerCase()}">${seg.accessibility}</span>
                </span>
            </div>
        </div>
    `).join('');
}

function selectSegment(segmentId) {
    document.querySelectorAll('.segment-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.segment === segmentId);
    });

    document.getElementById('primarySegment').value = segmentId;
    state.primarySegment = segmentId;
    saveState();
}

function renderEvaluationTable() {
    const tbody = document.getElementById('evaluationTableBody');
    if (!tbody) return;

    tbody.innerHTML = segments.map(seg => {
        const scores = state.segmentScores[seg.id] || { attractiveness: 3, fit: 3, accessibility: 3 };
        const total = scores.attractiveness + scores.fit + scores.accessibility;

        return `
            <tr>
                <td>${seg.icon} ${seg.name}</td>
                <td>
                    <input type="number" min="1" max="5" value="${scores.attractiveness}"
                           onchange="updateSegmentScore('${seg.id}', 'attractiveness', this.value)">
                </td>
                <td>
                    <input type="number" min="1" max="5" value="${scores.fit}"
                           onchange="updateSegmentScore('${seg.id}', 'fit', this.value)">
                </td>
                <td>
                    <input type="number" min="1" max="5" value="${scores.accessibility}"
                           onchange="updateSegmentScore('${seg.id}', 'accessibility', this.value)">
                </td>
                <td class="total-score">${total}</td>
            </tr>
        `;
    }).join('');
}

function updateSegmentScore(segmentId, criterion, value) {
    if (!state.segmentScores[segmentId]) {
        state.segmentScores[segmentId] = { attractiveness: 3, fit: 3, accessibility: 3 };
    }
    state.segmentScores[segmentId][criterion] = parseInt(value) || 3;
    renderEvaluationTable();
    saveState();
}

function populateSegmentDropdowns() {
    const options = segments.map(seg =>
        `<option value="${seg.id}">${seg.icon} ${seg.name}</option>`
    ).join('');

    const primary = document.getElementById('primarySegment');
    const secondary = document.getElementById('secondarySegment');

    if (primary) {
        primary.innerHTML = '<option value="">Select primary segment...</option>' + options;
        primary.value = state.primarySegment;
    }
    if (secondary) {
        secondary.innerHTML = '<option value="">Select secondary segment...</option>' + options;
        secondary.value = state.secondarySegment;
    }
}

function updateSegmentSelection() {
    state.primarySegment = document.getElementById('primarySegment')?.value || '';
    state.secondarySegment = document.getElementById('secondarySegment')?.value || '';
    renderSegmentCards();
    saveState();
}

// ============================================
// Positioning Statement
// ============================================

function handleTagInput(event, type) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = event.target;
        const value = input.value.trim();
        if (value) {
            addTag(type, value);
            input.value = '';
        }
    }
}

function addTag(type, value) {
    const list = type === 'pop' ? state.pop : state.pod;
    if (!list.includes(value)) {
        list.push(value);
        renderTags(type);
        saveState();
    }
}

function removeTag(type, value) {
    const list = type === 'pop' ? state.pop : state.pod;
    const index = list.indexOf(value);
    if (index > -1) {
        list.splice(index, 1);
        renderTags(type);
        saveState();
    }
}

function renderTags(type) {
    const container = document.getElementById(`${type}Tags`);
    const list = type === 'pop' ? state.pop : state.pod;

    if (!container) return;

    container.innerHTML = list.map(tag => `
        <span class="tag">
            ${tag}
            <span class="tag-remove" onclick="removeTag('${type}', '${tag}')">&times;</span>
        </span>
    `).join('');
}

function updateStatementPreview() {
    const preview = document.getElementById('statementPreview');
    if (!preview) return;

    const ps = {
        target: document.getElementById('psTarget')?.value || '',
        need: document.getElementById('psNeed')?.value || '',
        category: document.getElementById('psCategory')?.value || '',
        benefit: document.getElementById('psBenefit')?.value || '',
        competitor: document.getElementById('psCompetitor')?.value || '',
        rtb: document.getElementById('psRtb')?.value || ''
    };

    // Update state
    state.positioningStatement = ps;

    // Check if any fields are filled
    const hasContent = Object.values(ps).some(v => v.trim());

    if (!hasContent) {
        preview.innerHTML = '<p class="preview-placeholder">Fill in the fields above to see your positioning statement...</p>';
        return;
    }

    // Build the statement with highlighting
    const highlight = (text, fallback) =>
        text ? `<span class="statement-highlight">${text}</span>` : `<em>[${fallback}]</em>`;

    preview.innerHTML = `
        <p>
            For ${highlight(ps.target, 'target segment')}
            who ${highlight(ps.need, 'statement of need')},
            EnergyBoost is a ${highlight(ps.category, 'product category')}
            that ${highlight(ps.benefit, 'key benefit')}.
            Unlike ${highlight(ps.competitor, 'competitive alternative')},
            our product ${highlight(ps.rtb, 'reason to believe')}.
        </p>
    `;

    saveState();
}

function updateDcuDisplay() {
    ['desirable', 'deliverable', 'differentiating'].forEach(criterion => {
        const input = document.getElementById(`${criterion}Rating`);
        const display = document.getElementById(`${criterion}Value`);
        if (input && display) {
            display.textContent = input.value;
            state.dcuRatings[criterion] = parseInt(input.value);
        }
    });
    saveState();
}

// ============================================
// Summary & Export
// ============================================

function updateSummary() {
    updateExecutiveSummary();
    updateMapInsights();
    updateTargetSummary();
    updatePositioningSummary();
}

function updateExecutiveSummary() {
    const container = document.getElementById('executiveSummary');
    if (!container) return;

    const segment = segments.find(s => s.id === state.primarySegment);
    const name = document.getElementById('studentName')?.value || 'Team';

    container.innerHTML = `
        <p><strong>Prepared by:</strong> ${name}</p>
        <p><strong>Target Segment:</strong> ${segment ? `${segment.icon} ${segment.name}` : 'Not selected'}</p>
        <p><strong>Key Positioning:</strong> ${state.positioningStatement.benefit || 'Not defined'}</p>
        <p><strong>Competitive Differentiation:</strong> ${state.pod.join(', ') || 'Not defined'}</p>
    `;
}

function updateMapInsights() {
    const container = document.getElementById('mapInsights');
    if (!container) return;

    container.innerHTML = `
        <p><strong>Most Crowded Area:</strong> ${state.gapAnalysis.crowdedArea || 'Not analyzed'}</p>
        <p><strong>White Space Identified:</strong> ${state.gapAnalysis.whiteSpace || 'Not analyzed'}</p>
        <p><strong>Strategic Opportunity:</strong> ${state.gapAnalysis.opportunityRationale || 'Not analyzed'}</p>
    `;
}

function updateTargetSummary() {
    const container = document.getElementById('targetSummary');
    if (!container) return;

    const primary = segments.find(s => s.id === state.primarySegment);
    const secondary = segments.find(s => s.id === state.secondarySegment);

    container.innerHTML = `
        <p><strong>Primary Target:</strong> ${primary ? `${primary.icon} ${primary.name}` : 'Not selected'}</p>
        ${primary ? `<p>${primary.description}</p>` : ''}
        ${secondary ? `<p><strong>Secondary Target:</strong> ${secondary.icon} ${secondary.name}</p>` : ''}
        <p><strong>Justification:</strong> ${state.segmentJustification || 'Not provided'}</p>
    `;
}

function updatePositioningSummary() {
    const container = document.getElementById('positioningSummary');
    if (!container) return;

    const ps = state.positioningStatement;
    const hasStatement = Object.values(ps).some(v => v.trim());

    if (!hasStatement) {
        container.innerHTML = '<p><em>Positioning statement not yet created.</em></p>';
        return;
    }

    container.innerHTML = `
        <p>
            For <strong>${ps.target || '[target]'}</strong>
            who <strong>${ps.need || '[need]'}</strong>,
            EnergyBoost is a <strong>${ps.category || '[category]'}</strong>
            that <strong>${ps.benefit || '[benefit]'}</strong>.
            Unlike <strong>${ps.competitor || '[competitor]'}</strong>,
            our product <strong>${ps.rtb || '[reason to believe]'}</strong>.
        </p>
        <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--border);">
        <p><strong>Points of Parity:</strong> ${state.pop.join(', ') || 'None listed'}</p>
        <p><strong>Points of Difference:</strong> ${state.pod.join(', ') || 'None listed'}</p>
        <p><strong>D-C-U Scores:</strong>
            Desirable: ${state.dcuRatings.desirable}/5,
            Deliverable: ${state.dcuRatings.deliverable}/5,
            Differentiating: ${state.dcuRatings.differentiating}/5
        </p>
    `;
}

function exportToPDF() {
    // Prepare the summary and trigger print
    updateSummary();
    window.print();
}

function exportToJSON() {
    // Collect all data
    const exportData = {
        metadata: {
            studentName: document.getElementById('studentName')?.value || '',
            studentId: document.getElementById('studentId')?.value || '',
            exportDate: new Date().toISOString(),
            exercise: 'Product Positioning Workshop - EnergyBoost'
        },
        perceptualMap: {
            xAxis: state.xAxis,
            yAxis: state.yAxis,
            brandPositions: state.mapBrands,
            gapAnalysis: {
                crowdedArea: document.getElementById('crowdedArea')?.value || '',
                whiteSpace: document.getElementById('whiteSpace')?.value || '',
                opportunityRationale: document.getElementById('opportunityRationale')?.value || ''
            }
        },
        targetSegments: {
            scores: state.segmentScores,
            primarySegment: state.primarySegment,
            secondarySegment: state.secondarySegment,
            justification: document.getElementById('segmentJustification')?.value || ''
        },
        positioning: {
            pointsOfParity: state.pop,
            pointsOfDifference: state.pod,
            statement: state.positioningStatement,
            dcuEvaluation: {
                desirable: {
                    rating: state.dcuRatings.desirable,
                    justification: document.getElementById('desirableJustification')?.value || ''
                },
                deliverable: {
                    rating: state.dcuRatings.deliverable,
                    justification: document.getElementById('deliverableJustification')?.value || ''
                },
                differentiating: {
                    rating: state.dcuRatings.differentiating,
                    justification: document.getElementById('differentiatingJustification')?.value || ''
                }
            }
        },
        marketingMix: {
            product: document.getElementById('mixProduct')?.value || '',
            price: document.getElementById('mixPrice')?.value || '',
            place: document.getElementById('mixPlace')?.value || '',
            promotion: document.getElementById('mixPromotion')?.value || ''
        }
    };

    // Download as JSON
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `positioning-workshop-${exportData.metadata.studentName.replace(/\s+/g, '-') || 'submission'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Progress saved! Your work has been downloaded as a JSON file.');
}

function printSummary() {
    updateSummary();
    window.print();
}

function submitExercise() {
    const confirm = window.confirm(
        'Are you ready to submit your exercise?\n\n' +
        'Make sure you have:\n' +
        '• Completed the perceptual map\n' +
        '• Selected your target segment\n' +
        '• Written your positioning statement\n' +
        '• Filled in the marketing mix recommendations'
    );

    if (confirm) {
        exportToJSON();
        alert('Exercise submitted successfully! Share the downloaded file with your instructor.');
    }
}

// ============================================
// State Management
// ============================================

function saveState() {
    // Collect form data
    state.studentName = document.getElementById('studentName')?.value || '';
    state.studentId = document.getElementById('studentId')?.value || '';

    state.gapAnalysis = {
        crowdedArea: document.getElementById('crowdedArea')?.value || '',
        whiteSpace: document.getElementById('whiteSpace')?.value || '',
        opportunityRationale: document.getElementById('opportunityRationale')?.value || ''
    };

    state.segmentJustification = document.getElementById('segmentJustification')?.value || '';

    state.dcuJustifications = {
        desirable: document.getElementById('desirableJustification')?.value || '',
        deliverable: document.getElementById('deliverableJustification')?.value || '',
        differentiating: document.getElementById('differentiatingJustification')?.value || ''
    };

    state.marketingMix = {
        product: document.getElementById('mixProduct')?.value || '',
        price: document.getElementById('mixPrice')?.value || '',
        place: document.getElementById('mixPlace')?.value || '',
        promotion: document.getElementById('mixPromotion')?.value || ''
    };

    // Save to localStorage
    try {
        localStorage.setItem('positioningWorkshopState', JSON.stringify(state));
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function loadSavedState() {
    try {
        const saved = localStorage.getItem('positioningWorkshopState');
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.assign(state, parsed);
            restoreFormState();
        }
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
    }
}

function restoreFormState() {
    // Restore simple fields
    const simpleFields = {
        'studentName': state.studentName,
        'studentId': state.studentId,
        'crowdedArea': state.gapAnalysis.crowdedArea,
        'whiteSpace': state.gapAnalysis.whiteSpace,
        'opportunityRationale': state.gapAnalysis.opportunityRationale,
        'segmentJustification': state.segmentJustification,
        'psTarget': state.positioningStatement.target,
        'psNeed': state.positioningStatement.need,
        'psCategory': state.positioningStatement.category,
        'psBenefit': state.positioningStatement.benefit,
        'psCompetitor': state.positioningStatement.competitor,
        'psRtb': state.positioningStatement.rtb,
        'desirableJustification': state.dcuJustifications.desirable,
        'deliverableJustification': state.dcuJustifications.deliverable,
        'differentiatingJustification': state.dcuJustifications.differentiating,
        'mixProduct': state.marketingMix.product,
        'mixPrice': state.marketingMix.price,
        'mixPlace': state.marketingMix.place,
        'mixPromotion': state.marketingMix.promotion
    };

    Object.entries(simpleFields).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el && value) el.value = value;
    });

    // Restore selects
    if (state.xAxis) document.getElementById('xAxis').value = state.xAxis;
    if (state.yAxis) document.getElementById('yAxis').value = state.yAxis;

    // Restore DCU ratings
    ['desirable', 'deliverable', 'differentiating'].forEach(criterion => {
        const input = document.getElementById(`${criterion}Rating`);
        const display = document.getElementById(`${criterion}Value`);
        if (input && state.dcuRatings[criterion]) {
            input.value = state.dcuRatings[criterion];
            if (display) display.textContent = state.dcuRatings[criterion];
        }
    });

    // Restore tags
    renderTags('pop');
    renderTags('pod');

    // Restore dropdowns
    populateSegmentDropdowns();

    // Restore evaluation table
    renderEvaluationTable();

    // Update previews
    updateStatementPreview();
    updateAxisLabels();
}

// ============================================
// Utilities
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make functions globally available
window.navigateTo = navigateTo;
window.handleTagInput = handleTagInput;
window.addTag = addTag;
window.removeTag = removeTag;
window.updateAxisLabels = updateAxisLabels;
window.updateSegmentScore = updateSegmentScore;
window.updateSegmentSelection = updateSegmentSelection;
window.updateDcuDisplay = updateDcuDisplay;
window.selectSegment = selectSegment;
window.exportToPDF = exportToPDF;
window.exportToJSON = exportToJSON;
window.printSummary = printSummary;
window.submitExercise = submitExercise;

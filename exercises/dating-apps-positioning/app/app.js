/**
 * Dating Apps Perceptual Mapping - Factor Analysis Workshop
 * Implements PCA for creating data-driven perceptual maps
 */

// ============================================
// Demo Dataset for Classroom Demonstrations
// ============================================

const demoData = {
    apps: [
        'Tinder', 'Bumble', 'Hinge', 'OkCupid', 'Match.com',
        'Coffee Meets Bagel', 'The League', 'eHarmony',
        'Plenty of Fish', 'Grindr', 'Raya'
    ],
    attributes: [
        'Serious relationship focus',
        'Casual/hookup friendly',
        'Large user base',
        'Quality of matches',
        'Algorithm effectiveness',
        'Ease of use',
        'Free features value',
        'Premium worthiness',
        'Exclusivity',
        'Safety features'
    ],
    // Ratings matrix: each app rated on each attribute (1-7 scale)
    // Designed to produce clear factor structure for teaching
    ratings: {
        'Tinder': {
            'Serious relationship focus': 2,
            'Casual/hookup friendly': 7,
            'Large user base': 7,
            'Quality of matches': 3,
            'Algorithm effectiveness': 4,
            'Ease of use': 7,
            'Free features value': 5,
            'Premium worthiness': 4,
            'Exclusivity': 1,
            'Safety features': 4
        },
        'Bumble': {
            'Serious relationship focus': 5,
            'Casual/hookup friendly': 4,
            'Large user base': 6,
            'Quality of matches': 5,
            'Algorithm effectiveness': 5,
            'Ease of use': 6,
            'Free features value': 5,
            'Premium worthiness': 5,
            'Exclusivity': 2,
            'Safety features': 6
        },
        'Hinge': {
            'Serious relationship focus': 6,
            'Casual/hookup friendly': 2,
            'Large user base': 5,
            'Quality of matches': 6,
            'Algorithm effectiveness': 6,
            'Ease of use': 5,
            'Free features value': 4,
            'Premium worthiness': 6,
            'Exclusivity': 3,
            'Safety features': 5
        },
        'OkCupid': {
            'Serious relationship focus': 5,
            'Casual/hookup friendly': 4,
            'Large user base': 5,
            'Quality of matches': 5,
            'Algorithm effectiveness': 6,
            'Ease of use': 4,
            'Free features value': 6,
            'Premium worthiness': 4,
            'Exclusivity': 1,
            'Safety features': 4
        },
        'Match.com': {
            'Serious relationship focus': 7,
            'Casual/hookup friendly': 1,
            'Large user base': 5,
            'Quality of matches': 5,
            'Algorithm effectiveness': 5,
            'Ease of use': 4,
            'Free features value': 2,
            'Premium worthiness': 5,
            'Exclusivity': 3,
            'Safety features': 6
        },
        'Coffee Meets Bagel': {
            'Serious relationship focus': 6,
            'Casual/hookup friendly': 2,
            'Large user base': 3,
            'Quality of matches': 6,
            'Algorithm effectiveness': 5,
            'Ease of use': 5,
            'Free features value': 4,
            'Premium worthiness': 5,
            'Exclusivity': 4,
            'Safety features': 6
        },
        'The League': {
            'Serious relationship focus': 5,
            'Casual/hookup friendly': 3,
            'Large user base': 2,
            'Quality of matches': 6,
            'Algorithm effectiveness': 4,
            'Ease of use': 4,
            'Free features value': 2,
            'Premium worthiness': 6,
            'Exclusivity': 7,
            'Safety features': 5
        },
        'eHarmony': {
            'Serious relationship focus': 7,
            'Casual/hookup friendly': 1,
            'Large user base': 4,
            'Quality of matches': 6,
            'Algorithm effectiveness': 7,
            'Ease of use': 3,
            'Free features value': 1,
            'Premium worthiness': 5,
            'Exclusivity': 4,
            'Safety features': 7
        },
        'Plenty of Fish': {
            'Serious relationship focus': 3,
            'Casual/hookup friendly': 5,
            'Large user base': 6,
            'Quality of matches': 3,
            'Algorithm effectiveness': 3,
            'Ease of use': 5,
            'Free features value': 7,
            'Premium worthiness': 2,
            'Exclusivity': 1,
            'Safety features': 3
        },
        'Grindr': {
            'Serious relationship focus': 2,
            'Casual/hookup friendly': 7,
            'Large user base': 5,
            'Quality of matches': 3,
            'Algorithm effectiveness': 3,
            'Ease of use': 6,
            'Free features value': 5,
            'Premium worthiness': 3,
            'Exclusivity': 2,
            'Safety features': 3
        },
        'Raya': {
            'Serious relationship focus': 4,
            'Casual/hookup friendly': 4,
            'Large user base': 1,
            'Quality of matches': 7,
            'Algorithm effectiveness': 3,
            'Ease of use': 5,
            'Free features value': 1,
            'Premium worthiness': 7,
            'Exclusivity': 7,
            'Safety features': 6
        }
    }
};

// ============================================
// Suggested Data
// ============================================

const suggestedApps = [
    'Tinder', 'Bumble', 'Hinge', 'OkCupid', 'Match.com',
    'Coffee Meets Bagel', 'The League', 'Raya', 'eHarmony',
    'Plenty of Fish', 'Grindr', 'HER', 'Facebook Dating',
    'Happn', 'Zoosk', 'Badoo', 'Ship', 'Thursday'
];

const suggestedAttributes = [
    'Serious relationship focus', 'Casual/hookup friendly', 'Large user base',
    'Quality of matches', 'Algorithm effectiveness', 'Ease of use',
    'Profile depth', 'Free features value', 'Premium worthiness',
    'Safety features', 'User attractiveness', 'Exclusivity',
    'LGBTQ+ friendly', 'Age diversity', 'Conversation starters',
    'Video/voice features', 'Social reputation', 'Matching control'
];

// App colors for visualization
const appColors = [
    '#e11d48', '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
    '#d946ef', '#ec4899', '#f43f5e', '#ef4444', '#f59e0b',
    '#84cc16', '#10b981', '#0ea5e9'
];

// ============================================
// Application State
// ============================================

const state = {
    currentStep: 1,
    apps: [],
    attributes: [],
    ratings: {}, // { 'AppName': { 'Attribute': rating } }
    factorAnalysis: null, // Will hold PCA results
    factorLabels: {
        factor1Low: '',
        factor1High: '',
        factor2Low: '',
        factor2High: ''
    }
};

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderSuggestedApps();
    renderSuggestedAttributes();
    renderAppsList();
    renderAttributesList();
    updateCounts();
    setupEventListeners();
    updateProgress();
});

function setupEventListeners() {
    // Enter key handlers
    document.getElementById('appInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addApp();
    });
    document.getElementById('attrInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addAttribute();
    });

    // Auto-save
    document.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('change', saveState);
    });

    // Factor label inputs
    ['factor1Low', 'factor1High', 'factor2Low', 'factor2High'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                state.factorLabels[id] = el.value;
                updateMapAxisLabels();
                saveState();
            });
        }
    });
}

// ============================================
// Step Navigation
// ============================================

function goToStep(step) {
    // Validation
    if (step === 2 && (state.apps.length < 4 || state.attributes.length < 4)) {
        document.getElementById('step1Validation').textContent =
            'Please add at least 4 apps and 4 attributes to continue.';
        return;
    }

    if (step === 2) {
        renderRatingMatrix();
    }

    if (step === 4 && !state.factorAnalysis) {
        return; // Need to run analysis first
    }

    if (step === 4) {
        renderPerceptualMap();
    }

    if (step === 5) {
        generateInsights();
    }

    state.currentStep = step;

    // Update UI
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');

    updateProgress();
    saveState();
}

function updateProgress() {
    const percent = (state.currentStep / 5) * 100;
    document.getElementById('progressFill').style.width = `${percent}%`;

    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        if (stepNum === state.currentStep) {
            step.classList.add('active');
        } else if (stepNum < state.currentStep) {
            step.classList.add('completed');
        }
    });
}

// ============================================
// Step 1: Data Collection
// ============================================

function renderSuggestedApps() {
    const container = document.getElementById('suggestedApps');
    container.innerHTML = suggestedApps.slice(0, 10).map(app => `
        <button class="quick-add-btn ${state.apps.includes(app) ? 'added' : ''}"
                onclick="quickAddApp('${app}')"
                ${state.apps.includes(app) ? 'disabled' : ''}>
            ${app}
        </button>
    `).join('');
}

function renderSuggestedAttributes() {
    const container = document.getElementById('suggestedAttrs');
    container.innerHTML = suggestedAttributes.slice(0, 8).map(attr => `
        <button class="quick-add-btn ${state.attributes.includes(attr) ? 'added' : ''}"
                onclick="quickAddAttribute('${attr}')"
                ${state.attributes.includes(attr) ? 'disabled' : ''}>
            ${attr}
        </button>
    `).join('');
}

function addApp() {
    const input = document.getElementById('appInput');
    const value = input.value.trim();
    if (value && !state.apps.includes(value)) {
        state.apps.push(value);
        state.ratings[value] = {};
        input.value = '';
        renderAppsList();
        renderSuggestedApps();
        updateCounts();
        saveState();
    }
}

function quickAddApp(app) {
    if (!state.apps.includes(app)) {
        state.apps.push(app);
        state.ratings[app] = {};
        renderAppsList();
        renderSuggestedApps();
        updateCounts();
        saveState();
    }
}

function removeApp(app) {
    state.apps = state.apps.filter(a => a !== app);
    delete state.ratings[app];
    renderAppsList();
    renderSuggestedApps();
    updateCounts();
    saveState();
}

function renderAppsList() {
    const container = document.getElementById('appsList');
    container.innerHTML = state.apps.map(app => `
        <div class="item-tag">
            ${app}
            <span class="item-remove" onclick="removeApp('${app}')">&times;</span>
        </div>
    `).join('');
}

function addAttribute() {
    const input = document.getElementById('attrInput');
    const value = input.value.trim();
    if (value && !state.attributes.includes(value)) {
        state.attributes.push(value);
        input.value = '';
        renderAttributesList();
        renderSuggestedAttributes();
        updateCounts();
        saveState();
    }
}

function quickAddAttribute(attr) {
    if (!state.attributes.includes(attr)) {
        state.attributes.push(attr);
        renderAttributesList();
        renderSuggestedAttributes();
        updateCounts();
        saveState();
    }
}

function removeAttribute(attr) {
    state.attributes = state.attributes.filter(a => a !== attr);
    // Remove attribute from all ratings
    Object.keys(state.ratings).forEach(app => {
        delete state.ratings[app][attr];
    });
    renderAttributesList();
    renderSuggestedAttributes();
    updateCounts();
    saveState();
}

function renderAttributesList() {
    const container = document.getElementById('attrsList');
    container.innerHTML = state.attributes.map(attr => `
        <div class="item-tag">
            ${attr}
            <span class="item-remove" onclick="removeAttribute('${attr}')">&times;</span>
        </div>
    `).join('');
}

function updateCounts() {
    document.getElementById('appCount').textContent = `${state.apps.length} apps`;
    document.getElementById('attrCount').textContent = `${state.attributes.length} attributes`;

    // Enable/disable next button
    const canProceed = state.apps.length >= 4 && state.attributes.length >= 4;
    document.getElementById('step1Next').disabled = !canProceed;
    document.getElementById('step1Validation').textContent = canProceed ? '' :
        'Add at least 4 apps and 4 attributes';
}

// ============================================
// Step 2: Rating Matrix
// ============================================

function renderRatingMatrix() {
    const table = document.getElementById('ratingMatrix');

    // Header row
    let html = '<thead><tr><th></th>';
    state.attributes.forEach(attr => {
        html += `<th class="rotate"><span>${attr}</span></th>`;
    });
    html += '</tr></thead><tbody>';

    // Data rows
    state.apps.forEach(app => {
        html += `<tr><td>${app}</td>`;
        state.attributes.forEach(attr => {
            const currentRating = state.ratings[app]?.[attr];
            html += `<td class="rating-cell">
                <div class="rating-buttons">
                    ${[1, 2, 3, 4, 5, 6, 7].map(n => `
                        <button class="rating-btn ${currentRating === n ? 'selected' : ''}"
                                onclick="setRating('${app}', '${attr}', ${n})">${n}</button>
                    `).join('')}
                    <button class="rating-btn ${currentRating === 0 ? 'selected dont-know' : ''}"
                            onclick="setRating('${app}', '${attr}', 0)">?</button>
                </div>
            </td>`;
        });
        html += '</tr>';
    });

    html += '</tbody>';
    table.innerHTML = html;
    updateRatingStats();
}

function setRating(app, attr, value) {
    if (!state.ratings[app]) state.ratings[app] = {};
    state.ratings[app][attr] = value;

    // Update button styles
    const buttons = document.querySelectorAll(`.rating-cell button`);
    renderRatingMatrix(); // Re-render to update selection
    saveState();
}

function updateRatingStats() {
    const total = state.apps.length * state.attributes.length;
    let completed = 0;

    state.apps.forEach(app => {
        state.attributes.forEach(attr => {
            if (state.ratings[app]?.[attr] !== undefined) {
                completed++;
            }
        });
    });

    document.getElementById('ratingsCompleted').textContent = completed;
    document.getElementById('ratingsTotal').textContent = total;
    document.getElementById('ratingsPercent').textContent =
        total > 0 ? `${Math.round((completed / total) * 100)}%` : '0%';
}

// ============================================
// Step 3: Factor Analysis (PCA)
// ============================================

function runFactorAnalysis() {
    // Build data matrix (apps x attributes)
    const dataMatrix = [];
    const validApps = [];

    state.apps.forEach(app => {
        const row = [];
        let hasAllRatings = true;

        state.attributes.forEach(attr => {
            const rating = state.ratings[app]?.[attr];
            if (rating === undefined || rating === 0) {
                hasAllRatings = false;
            }
            row.push(rating || 4); // Default to neutral if missing
        });

        if (hasAllRatings || row.filter(r => r !== 4).length > 0) {
            dataMatrix.push(row);
            validApps.push(app);
        }
    });

    if (dataMatrix.length < 3) {
        alert('Please rate at least 3 apps to run factor analysis.');
        return;
    }

    // Standardize data
    const standardized = standardizeMatrix(dataMatrix);

    // Calculate correlation matrix
    const corrMatrix = correlationMatrix(standardized);

    // Perform PCA using power iteration
    const pca = performPCA(corrMatrix, 2);

    // Apply varimax rotation if selected
    let loadings = pca.loadings;
    if (document.getElementById('useVarimax').checked) {
        loadings = varimaxRotation(loadings);
    }

    // Calculate factor scores for each app
    const factorScores = calculateFactorScores(standardized, loadings);

    // Store results
    state.factorAnalysis = {
        loadings: loadings,
        eigenvalues: pca.eigenvalues,
        varianceExplained: pca.varianceExplained,
        factorScores: factorScores,
        validApps: validApps
    };

    // Enable next button
    document.getElementById('step3Next').disabled = false;

    // Display results
    displayFactorResults();
    saveState();
}

function standardizeMatrix(matrix) {
    const numCols = matrix[0].length;
    const result = [];

    // Calculate mean and std for each column
    const means = [];
    const stds = [];

    for (let j = 0; j < numCols; j++) {
        let sum = 0;
        for (let i = 0; i < matrix.length; i++) {
            sum += matrix[i][j];
        }
        means.push(sum / matrix.length);

        let sqSum = 0;
        for (let i = 0; i < matrix.length; i++) {
            sqSum += Math.pow(matrix[i][j] - means[j], 2);
        }
        stds.push(Math.sqrt(sqSum / matrix.length) || 1);
    }

    // Standardize
    for (let i = 0; i < matrix.length; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            row.push((matrix[i][j] - means[j]) / stds[j]);
        }
        result.push(row);
    }

    return result;
}

function correlationMatrix(standardized) {
    const n = standardized[0].length;
    const corr = [];

    for (let i = 0; i < n; i++) {
        corr[i] = [];
        for (let j = 0; j < n; j++) {
            let sum = 0;
            for (let k = 0; k < standardized.length; k++) {
                sum += standardized[k][i] * standardized[k][j];
            }
            corr[i][j] = sum / standardized.length;
        }
    }

    return corr;
}

function performPCA(corrMatrix, numComponents) {
    const n = corrMatrix.length;
    const eigenvalues = [];
    const eigenvectors = [];

    // Power iteration to find eigenvectors
    let matrix = corrMatrix.map(row => [...row]);

    for (let comp = 0; comp < numComponents; comp++) {
        // Initialize random vector
        let v = Array(n).fill(0).map(() => Math.random() - 0.5);
        v = normalize(v);

        // Power iteration
        for (let iter = 0; iter < 100; iter++) {
            const newV = multiplyMatrixVector(matrix, v);
            v = normalize(newV);
        }

        // Calculate eigenvalue
        const Av = multiplyMatrixVector(matrix, v);
        const eigenvalue = dotProduct(v, Av);
        eigenvalues.push(eigenvalue);
        eigenvectors.push(v);

        // Deflate matrix
        matrix = deflateMatrix(matrix, v, eigenvalue);
    }

    // Calculate variance explained
    const totalVariance = corrMatrix.reduce((sum, row, i) => sum + corrMatrix[i][i], 0);
    const varianceExplained = eigenvalues.map(ev => (ev / totalVariance) * 100);

    // Loadings are eigenvectors scaled by sqrt of eigenvalues
    const loadings = eigenvectors.map((ev, i) =>
        ev.map(val => val * Math.sqrt(eigenvalues[i]))
    );

    return {
        eigenvalues,
        varianceExplained,
        loadings: transpose(loadings) // Attributes x Factors
    };
}

function varimaxRotation(loadings, maxIter = 100) {
    const n = loadings.length;
    const k = loadings[0].length;
    let rotated = loadings.map(row => [...row]);

    for (let iter = 0; iter < maxIter; iter++) {
        for (let i = 0; i < k - 1; i++) {
            for (let j = i + 1; j < k; j++) {
                // Calculate rotation angle
                let num = 0, denom = 0;
                for (let m = 0; m < n; m++) {
                    const u = rotated[m][i] * rotated[m][i] - rotated[m][j] * rotated[m][j];
                    const v = 2 * rotated[m][i] * rotated[m][j];
                    num += u * v;
                    denom += u * u - v * v;
                }

                const theta = 0.25 * Math.atan2(2 * num, denom);

                // Rotate
                const cos = Math.cos(theta);
                const sin = Math.sin(theta);
                for (let m = 0; m < n; m++) {
                    const temp = rotated[m][i] * cos + rotated[m][j] * sin;
                    rotated[m][j] = -rotated[m][i] * sin + rotated[m][j] * cos;
                    rotated[m][i] = temp;
                }
            }
        }
    }

    return rotated;
}

function calculateFactorScores(standardized, loadings) {
    const scores = [];
    const numFactors = loadings[0].length;

    for (let i = 0; i < standardized.length; i++) {
        const appScores = [];
        for (let f = 0; f < numFactors; f++) {
            let score = 0;
            for (let j = 0; j < standardized[i].length; j++) {
                score += standardized[i][j] * loadings[j][f];
            }
            appScores.push(score);
        }
        scores.push(appScores);
    }

    return scores;
}

// Matrix utilities
function normalize(v) {
    const norm = Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
    return v.map(val => val / (norm || 1));
}

function multiplyMatrixVector(matrix, vector) {
    return matrix.map(row =>
        row.reduce((sum, val, i) => sum + val * vector[i], 0)
    );
}

function dotProduct(a, b) {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function deflateMatrix(matrix, eigenvector, eigenvalue) {
    const n = matrix.length;
    const result = [];
    for (let i = 0; i < n; i++) {
        result[i] = [];
        for (let j = 0; j < n; j++) {
            result[i][j] = matrix[i][j] - eigenvalue * eigenvector[i] * eigenvector[j];
        }
    }
    return result;
}

function transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

// ============================================
// Display Factor Results
// ============================================

function displayFactorResults() {
    const results = document.getElementById('analysisResults');
    results.style.display = 'grid';

    const fa = state.factorAnalysis;

    // Variance chart
    const varianceChart = document.getElementById('varianceChart');
    const maxVar = Math.max(...fa.varianceExplained);
    varianceChart.innerHTML = fa.varianceExplained.map((v, i) => `
        <div class="variance-bar">
            <div class="bar ${i > 0 ? 'secondary' : ''}"
                 style="height: ${(v / maxVar) * 100}px;"></div>
            <span class="value">${v.toFixed(1)}%</span>
            <span class="label">Factor ${i + 1}</span>
        </div>
    `).join('');

    document.getElementById('totalVariance').textContent =
        fa.varianceExplained.slice(0, 2).reduce((a, b) => a + b, 0).toFixed(1) + '%';

    // Loadings table
    const loadingsTable = document.getElementById('loadingsTable');
    let html = '<thead><tr><th>Attribute</th><th>Factor 1</th><th>Factor 2</th></tr></thead><tbody>';

    state.attributes.forEach((attr, i) => {
        const l1 = fa.loadings[i][0];
        const l2 = fa.loadings[i][1];
        html += `<tr>
            <td>${attr}</td>
            <td><span class="loading-value ${getLoadingClass(l1)}">${l1.toFixed(3)}</span></td>
            <td><span class="loading-value ${getLoadingClass(l2)}">${l2.toFixed(3)}</span></td>
        </tr>`;
    });
    html += '</tbody>';
    loadingsTable.innerHTML = html;

    // Top loadings hints
    displayTopLoadings();
}

function getLoadingClass(value) {
    if (value > 0.4) return 'high-positive';
    if (value < -0.4) return 'high-negative';
    return '';
}

function displayTopLoadings() {
    const fa = state.factorAnalysis;

    // Factor 1
    const f1Sorted = state.attributes
        .map((attr, i) => ({ attr, loading: fa.loadings[i][0] }))
        .sort((a, b) => b.loading - a.loading);

    const f1High = f1Sorted.slice(0, 3).map(x => `+${x.attr}`).join(', ');
    const f1Low = f1Sorted.slice(-3).reverse().map(x => `-${x.attr}`).join(', ');
    document.getElementById('factor1TopLoadings').innerHTML =
        `<strong>High:</strong> ${f1High}<br><strong>Low:</strong> ${f1Low}`;

    // Factor 2
    const f2Sorted = state.attributes
        .map((attr, i) => ({ attr, loading: fa.loadings[i][1] }))
        .sort((a, b) => b.loading - a.loading);

    const f2High = f2Sorted.slice(0, 3).map(x => `+${x.attr}`).join(', ');
    const f2Low = f2Sorted.slice(-3).reverse().map(x => `-${x.attr}`).join(', ');
    document.getElementById('factor2TopLoadings').innerHTML =
        `<strong>High:</strong> ${f2High}<br><strong>Low:</strong> ${f2Low}`;
}

// ============================================
// Step 4: Perceptual Map
// ============================================

function renderPerceptualMap() {
    const fa = state.factorAnalysis;
    if (!fa) return;

    const svg = document.getElementById('mapSvg');
    const appsGroup = document.getElementById('appsGroup');
    appsGroup.innerHTML = '';

    // Get SVG dimensions
    const rect = svg.getBoundingClientRect();
    const width = rect.width || 600;
    const height = rect.height || 600;
    const padding = 60;

    // Find score ranges
    const scores = fa.factorScores;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    scores.forEach(s => {
        minX = Math.min(minX, s[0]);
        maxX = Math.max(maxX, s[0]);
        minY = Math.min(minY, s[1]);
        maxY = Math.max(maxY, s[1]);
    });

    // Add some padding to ranges
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    minX -= rangeX * 0.1;
    maxX += rangeX * 0.1;
    minY -= rangeY * 0.1;
    maxY += rangeY * 0.1;

    // Plot apps
    const showLabels = document.getElementById('showLabels').checked;
    const pointSize = parseInt(document.getElementById('pointSize').value);

    fa.validApps.forEach((app, i) => {
        const x = padding + ((scores[i][0] - minX) / (maxX - minX)) * (width - 2 * padding);
        const y = height - padding - ((scores[i][1] - minY) / (maxY - minY)) * (height - 2 * padding);
        const color = appColors[i % appColors.length];

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'app-point');
        g.setAttribute('data-app', app);
        g.onclick = () => showAppDetails(app, i);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', pointSize / 2);
        circle.setAttribute('fill', color);
        g.appendChild(circle);

        if (showLabels) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', y - pointSize / 2 - 5);
            text.textContent = app;
            g.appendChild(text);
        }

        appsGroup.appendChild(g);
    });

    // Update axis labels
    updateMapAxisLabels();

    // Render legend
    renderMapLegend();
}

function updateMapAxisLabels() {
    const labels = state.factorLabels;
    document.getElementById('xAxisLeft').textContent = labels.factor1Low || 'Factor 1 Low';
    document.getElementById('xAxisRight').textContent = labels.factor1High || 'Factor 1 High';
    document.getElementById('yAxisBottom').textContent = labels.factor2Low || 'Factor 2 Low';
    document.getElementById('yAxisTop').textContent = labels.factor2High || 'Factor 2 High';
}

function renderMapLegend() {
    const fa = state.factorAnalysis;
    const legend = document.getElementById('mapLegend');

    legend.innerHTML = fa.validApps.map((app, i) => `
        <div class="legend-item" onclick="showAppDetails('${app}', ${i})">
            <span class="legend-dot" style="background: ${appColors[i % appColors.length]};"></span>
            ${app}
        </div>
    `).join('');
}

function showAppDetails(app, index) {
    const panel = document.getElementById('appDetailsPanel');
    const fa = state.factorAnalysis;

    panel.style.display = 'block';
    document.getElementById('selectedAppName').textContent = app;
    document.getElementById('selectedAppF1').textContent = fa.factorScores[index][0].toFixed(2);
    document.getElementById('selectedAppF2').textContent = fa.factorScores[index][1].toFixed(2);

    // Show ratings
    const ratingsContainer = document.getElementById('selectedAppRatings');
    ratingsContainer.innerHTML = state.attributes.map(attr => {
        const rating = state.ratings[app]?.[attr];
        return rating ? `<span class="rating-tag">${attr}: ${rating}</span>` : '';
    }).filter(Boolean).join('');
}

function updateMap() {
    renderPerceptualMap();
}

function resetMapView() {
    document.getElementById('showLabels').checked = true;
    document.getElementById('pointSize').value = 40;
    renderPerceptualMap();
}

// ============================================
// Step 5: Insights
// ============================================

function generateInsights() {
    const fa = state.factorAnalysis;
    if (!fa) return;

    const summary = document.getElementById('mapSummary');

    // Find clusters (apps close together)
    const clusters = findClusters(fa.factorScores, fa.validApps);

    // Find outliers
    const outliers = findOutliers(fa.factorScores, fa.validApps);

    summary.innerHTML = `
        <p><strong>Apps Analyzed:</strong> ${fa.validApps.length}</p>
        <p><strong>Variance Explained:</strong> ${fa.varianceExplained.slice(0, 2).reduce((a, b) => a + b, 0).toFixed(1)}%</p>
        <p><strong>Potential Clusters:</strong> ${clusters.length > 0 ? clusters.map(c => c.join(', ')).join(' | ') : 'No clear clusters'}</p>
        <p><strong>Most Differentiated:</strong> ${outliers.join(', ') || 'None identified'}</p>
    `;
}

function findClusters(scores, apps, threshold = 1.0) {
    const clusters = [];
    const used = new Set();

    for (let i = 0; i < scores.length; i++) {
        if (used.has(i)) continue;

        const cluster = [apps[i]];
        used.add(i);

        for (let j = i + 1; j < scores.length; j++) {
            if (used.has(j)) continue;

            const dist = Math.sqrt(
                Math.pow(scores[i][0] - scores[j][0], 2) +
                Math.pow(scores[i][1] - scores[j][1], 2)
            );

            if (dist < threshold) {
                cluster.push(apps[j]);
                used.add(j);
            }
        }

        if (cluster.length > 1) {
            clusters.push(cluster);
        }
    }

    return clusters;
}

function findOutliers(scores, apps) {
    // Find apps furthest from center
    const distances = scores.map((s, i) => ({
        app: apps[i],
        dist: Math.sqrt(s[0] * s[0] + s[1] * s[1])
    }));

    distances.sort((a, b) => b.dist - a.dist);
    return distances.slice(0, 3).map(d => d.app);
}

// ============================================
// Export Functions
// ============================================

function exportData() {
    const data = {
        metadata: {
            exportDate: new Date().toISOString(),
            exercise: 'Dating Apps Perceptual Mapping'
        },
        apps: state.apps,
        attributes: state.attributes,
        ratings: state.ratings,
        factorAnalysis: state.factorAnalysis ? {
            loadings: state.factorAnalysis.loadings,
            varianceExplained: state.factorAnalysis.varianceExplained,
            factorScores: state.factorAnalysis.factorScores,
            validApps: state.factorAnalysis.validApps
        } : null,
        factorLabels: state.factorLabels,
        analysis: {
            clusterAnalysis: document.getElementById('clusterAnalysis')?.value || '',
            differentiationAnalysis: document.getElementById('differentiationAnalysis')?.value || '',
            whiteSpaceAnalysis: document.getElementById('whiteSpaceAnalysis')?.value || '',
            targetPosition: document.getElementById('targetPosition')?.value || '',
            positioningSupport: document.getElementById('positioningSupport')?.value || '',
            methodologyReflection: document.getElementById('methodologyReflection')?.value || ''
        }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dating-apps-positioning-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportReport() {
    // Generate a printable report
    alert('Generating report... Use Print (Ctrl+P) to save as PDF.');
    window.print();
}

function submitExercise() {
    if (confirm('Ready to submit? Make sure you have completed all analysis sections.')) {
        exportData();
        alert('Exercise submitted! Share the downloaded JSON file with your instructor.');
    }
}

// ============================================
// State Management
// ============================================

function saveState() {
    try {
        // Collect analysis text
        const analysisFields = ['clusterAnalysis', 'differentiationAnalysis', 'whiteSpaceAnalysis',
            'targetPosition', 'positioningSupport', 'methodologyReflection'];

        const analysis = {};
        analysisFields.forEach(id => {
            const el = document.getElementById(id);
            if (el) analysis[id] = el.value;
        });

        const saveData = {
            ...state,
            analysis
        };

        localStorage.setItem('datingAppsPositioningState', JSON.stringify(saveData));
    } catch (e) {
        console.warn('Could not save state:', e);
    }
}

function loadState() {
    try {
        const saved = localStorage.getItem('datingAppsPositioningState');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(state, data);

            // Restore analysis fields
            if (data.analysis) {
                Object.entries(data.analysis).forEach(([id, value]) => {
                    const el = document.getElementById(id);
                    if (el) el.value = value;
                });
            }

            // Restore factor labels
            if (data.factorLabels) {
                Object.entries(data.factorLabels).forEach(([id, value]) => {
                    const el = document.getElementById(id);
                    if (el) el.value = value;
                });
            }
        }
    } catch (e) {
        console.warn('Could not load state:', e);
    }
}

// ============================================
// Demo Mode & Data Import
// ============================================

/**
 * Load the demo dataset for classroom demonstrations
 * This allows instructors to quickly show the full analysis
 */
function loadDemoData() {
    if (state.apps.length > 0) {
        if (!confirm('This will replace your current data. Continue?')) {
            return;
        }
    }

    // Clear current state
    state.apps = [...demoData.apps];
    state.attributes = [...demoData.attributes];
    state.ratings = JSON.parse(JSON.stringify(demoData.ratings));
    state.factorAnalysis = null;

    // Update UI
    renderAppsList();
    renderAttributesList();
    renderSuggestedApps();
    renderSuggestedAttributes();
    updateCounts();

    // Show success message
    showNotification('Demo data loaded! Click "Continue to Rating Matrix" to proceed.');

    saveState();
}

/**
 * Load demo data and automatically run analysis (for quick demos)
 */
function loadDemoAndAnalyze() {
    loadDemoData();

    // Small delay to let UI update, then proceed
    setTimeout(() => {
        goToStep(2); // Go to rating matrix
        setTimeout(() => {
            goToStep(3); // Go to factor analysis
            setTimeout(() => {
                runFactorAnalysis();
                setTimeout(() => {
                    goToStep(4); // Show the map
                }, 500);
            }, 300);
        }, 300);
    }, 300);
}

/**
 * Trigger file input for Excel import
 */
function importExcel() {
    const input = document.getElementById('excelFileInput');
    if (input) {
        input.click();
    }
}

/**
 * Handle Excel file selection and parsing
 */
function handleExcelFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check file extension
    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
        alert('Please select an Excel file (.xlsx, .xls) or CSV file (.csv)');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Get first sheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            if (jsonData.length < 2) {
                alert('Excel file appears to be empty or invalid.');
                return;
            }

            // Parse the data
            parseExcelData(jsonData);

        } catch (error) {
            console.error('Error reading Excel file:', error);
            alert('Error reading file. Make sure it\'s a valid Excel file.\n\nIf you don\'t have the Excel library loaded, please check that the page has internet access.');
        }
    };

    reader.onerror = function() {
        alert('Error reading file. Please try again.');
    };

    reader.readAsArrayBuffer(file);

    // Reset file input so same file can be selected again
    event.target.value = '';
}

/**
 * Parse Excel data and load into app state
 * Expected format:
 * - Row 1: Header with attribute names (first cell can be empty or "App")
 * - Row 2+: App name in first column, ratings in subsequent columns
 */
function parseExcelData(jsonData) {
    // First row is headers (attributes)
    const headers = jsonData[0];
    const attributes = headers.slice(1).filter(h => h && String(h).trim());

    if (attributes.length < 4) {
        alert('Excel file must have at least 4 attributes (columns).');
        return;
    }

    // Parse apps and ratings
    const apps = [];
    const ratings = {};

    for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        const appName = row[0];

        if (!appName || !String(appName).trim()) continue;

        const appNameStr = String(appName).trim();
        apps.push(appNameStr);
        ratings[appNameStr] = {};

        for (let j = 1; j < row.length && j <= attributes.length; j++) {
            const attrName = attributes[j - 1];
            let value = row[j];

            // Convert to number if possible
            if (value !== undefined && value !== null && value !== '') {
                value = Number(value);
                if (!isNaN(value) && value >= 1 && value <= 7) {
                    ratings[appNameStr][attrName] = Math.round(value);
                }
            }
        }
    }

    if (apps.length < 3) {
        alert('Excel file must have at least 3 apps (rows).');
        return;
    }

    // Confirm before replacing
    if (state.apps.length > 0) {
        if (!confirm(`Found ${apps.length} apps and ${attributes.length} attributes. This will replace your current data. Continue?`)) {
            return;
        }
    }

    // Update state
    state.apps = apps;
    state.attributes = attributes;
    state.ratings = ratings;
    state.factorAnalysis = null;

    // Update UI
    renderAppsList();
    renderAttributesList();
    renderSuggestedApps();
    renderSuggestedAttributes();
    updateCounts();

    showNotification(`Imported ${apps.length} apps and ${attributes.length} attributes from Excel!`);
    saveState();
}

/**
 * Show a notification message to the user
 */
function showNotification(message) {
    // Check if notification container exists, create if not
    let container = document.getElementById('notificationContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notificationContainer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
        `;
        document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    notification.textContent = message;

    container.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/**
 * Download a sample Excel template for students
 */
function downloadExcelTemplate() {
    // Create a sample template
    const templateData = [
        ['App Name', 'Serious relationship focus', 'Casual/hookup friendly', 'Large user base', 'Quality of matches', 'Ease of use', 'Free features value', 'Exclusivity', 'Safety features'],
        ['Tinder', '', '', '', '', '', '', '', ''],
        ['Bumble', '', '', '', '', '', '', '', ''],
        ['Hinge', '', '', '', '', '', '', '', ''],
        ['(Add more apps...)', '', '', '', '', '', '', '', '']
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_array ?
        XLSX.utils.aoa_to_sheet(templateData) :
        XLSX.utils.aoa_to_sheet(templateData);

    XLSX.utils.book_append_sheet(wb, ws, 'Ratings');

    // Download
    XLSX.writeFile(wb, 'dating-apps-survey-template.xlsx');
}

/**
 * Clear all data and start fresh
 */
function clearAllData() {
    if (!confirm('This will clear all apps, attributes, and ratings. Are you sure?')) {
        return;
    }

    state.apps = [];
    state.attributes = [];
    state.ratings = {};
    state.factorAnalysis = null;
    state.currentStep = 1;

    // Clear localStorage
    localStorage.removeItem('datingAppsPositioningState');

    // Update UI
    renderAppsList();
    renderAttributesList();
    renderSuggestedApps();
    renderSuggestedAttributes();
    updateCounts();
    goToStep(1);

    showNotification('All data cleared!');
}

// Make functions globally available
window.goToStep = goToStep;
window.addApp = addApp;
window.quickAddApp = quickAddApp;
window.removeApp = removeApp;
window.addAttribute = addAttribute;
window.quickAddAttribute = quickAddAttribute;
window.removeAttribute = removeAttribute;
window.setRating = setRating;
window.runFactorAnalysis = runFactorAnalysis;
window.updateMap = updateMap;
window.resetMapView = resetMapView;
window.showAppDetails = showAppDetails;
window.exportData = exportData;
window.exportReport = exportReport;
window.submitExercise = submitExercise;
window.loadDemoData = loadDemoData;
window.loadDemoAndAnalyze = loadDemoAndAnalyze;
window.importExcel = importExcel;
window.handleExcelFile = handleExcelFile;
window.downloadExcelTemplate = downloadExcelTemplate;
window.clearAllData = clearAllData;

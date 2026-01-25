# Dating Apps Perceptual Mapping Workshop

An advanced marketing research exercise that teaches students how to create data-driven perceptual maps using factor analysis (PCA).

## Overview

Unlike traditional positioning exercises where students manually select dimensions, this exercise guides students through the actual research process used in industry:

1. **Generate attributes** - Students identify dimensions consumers use to evaluate dating apps
2. **Rate products** - Students rate each app on each attribute (1-7 scale)
3. **Factor analysis** - The app runs PCA to discover underlying dimensions
4. **Interpret factors** - Students analyze loadings to understand what factors represent
5. **Strategic analysis** - Students use the map to identify opportunities

## Key Features

- **Real PCA implementation** in JavaScript (no server required)
- **Varimax rotation** option for clearer factor interpretation
- **Interactive perceptual map** with zoom, labels, and click-to-explore
- **Variance explained visualization** to assess model quality
- **Factor loading table** with color-coded significance
- **Auto-save** progress to browser localStorage
- **Export** to JSON for grading and class aggregation

## Learning Objectives

Students will learn to:

1. Generate meaningful product attributes for a category
2. Collect perceptual data using rating scales
3. Interpret factor analysis output (loadings, variance explained)
4. Create and analyze perceptual maps
5. Identify strategic positioning opportunities

## Files

```
dating-apps-positioning/
├── README.md                    # This file
├── EXERCISE_INSTRUCTIONS.md     # Detailed student guide
└── app/
    ├── index.html               # Main application
    ├── styles.css               # Styling
    └── app.js                   # PCA implementation & interactivity
```

## Getting Started

### Quick Start

```bash
cd app
python -m http.server 8000
# Open http://localhost:8000 in browser
```

Or simply open `app/index.html` directly in a modern browser.

### For Instructors

1. Share the app URL or files with students
2. Optionally distribute `EXERCISE_INSTRUCTIONS.md` as a handout
3. Collect JSON exports for grading
4. Consider aggregating class data for a combined analysis

## The Factor Analysis Process

### What the App Does

1. **Standardization**: Centers and scales ratings (z-scores)
2. **Correlation Matrix**: Computes correlations between attributes
3. **PCA**: Uses power iteration to extract principal components
4. **Rotation**: Applies Varimax rotation for simpler interpretation
5. **Factor Scores**: Projects apps onto the new dimensions

### Minimum Requirements

- At least **4 apps** rated
- At least **4 attributes** defined
- At least **3 apps with complete ratings** for analysis

### Interpreting Results

- **Variance Explained > 50%**: Good two-factor representation
- **Loadings > 0.5 or < -0.5**: Strong attribute-factor relationship
- **Factor Scores**: Position on the perceptual map

## Technical Notes

### PCA Implementation

The app implements Principal Component Analysis from scratch:

```javascript
// Key steps:
1. Standardize data matrix (apps × attributes)
2. Compute correlation matrix
3. Extract eigenvectors via power iteration
4. Calculate loadings = eigenvectors × sqrt(eigenvalues)
5. Apply Varimax rotation (optional)
6. Compute factor scores = standardized data × loadings
```

### Browser Compatibility

- Chrome, Firefox, Safari, Edge (modern versions)
- No external dependencies
- All processing client-side

### Data Privacy

- All data stays in browser (localStorage)
- No server communication
- Students control their own data export

## Customization

### Changing the Product Category

To adapt for a different category (e.g., streaming services, coffee shops):

1. Update suggested products in `app.js`:
```javascript
const suggestedApps = ['Netflix', 'Disney+', 'Hulu', ...];
```

2. Update suggested attributes:
```javascript
const suggestedAttributes = ['Content library', 'Original shows', ...];
```

3. Update text in `index.html` and `EXERCISE_INSTRUCTIONS.md`

### Adding More Factors

The PCA implementation supports extracting more than 2 factors. Modify:

```javascript
const pca = performPCA(corrMatrix, 3); // Extract 3 factors
```

Note: Visualization would need updates for 3+ dimensions.

## Grading Rubric

| Component | Points |
|-----------|--------|
| Attribute Generation | 15 |
| Rating Completeness | 15 |
| Factor Interpretation | 25 |
| Map Analysis | 25 |
| Strategic Recommendations | 10 |
| Methodology Reflection | 10 |
| **Total** | **100** |

## Extension Activities

### Class Aggregation

1. Have all students export their JSON data
2. Combine rating matrices
3. Run factor analysis on pooled data
4. Compare individual vs. aggregate maps

### Competitive Analysis Project

1. Assign different product categories to teams
2. Each team runs the full analysis
3. Present findings and strategic recommendations

## Troubleshooting

### "Need more data" error
Ensure at least 3 apps have ratings (not all "?" marks)

### Low variance explained
- Add more attributes to capture more variance
- Check that ratings vary (not all 4s)
- Some categories may have >2 underlying dimensions

### Factors don't make sense
- Try enabling/disabling Varimax rotation
- Review which attributes have high loadings
- Consider if attributes are well-defined

## References

- Hair, J.F. et al. (2019). Multivariate Data Analysis
- Keller, K.L. (2013). Strategic Brand Management
- Green, P.E. & Srinivasan, V. (1978). Conjoint Analysis in Consumer Research

---

*Created for Marketing Research Methods courses*

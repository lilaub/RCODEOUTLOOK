# Product Positioning Workshop

An interactive marketing management exercise for undergraduate students demonstrating product positioning concepts.

## Overview

This exercise uses a realistic case study (EnergyBoost energy drink launch) to teach students how to:

1. **Analyze competitive positioning** using perceptual maps
2. **Evaluate and select target segments** systematically
3. **Develop positioning statements** using industry frameworks
4. **Align marketing mix** with positioning strategy

## Files Included

```
positioning-exercise/
├── README.md                    # This file
├── EXERCISE_INSTRUCTIONS.md     # Detailed exercise guide for students
└── app/
    ├── index.html               # Main application
    ├── styles.css               # Styling
    └── app.js                   # Interactive functionality
```

## Getting Started

### For Instructors

1. **Host the application** - Upload the `app/` folder to any web server or use a local server:
   ```bash
   cd app
   python -m http.server 8000
   # or
   npx serve .
   ```

2. **Share with students** - Provide students with:
   - The URL to access the app
   - The `EXERCISE_INSTRUCTIONS.md` document (or print it)

3. **Collect submissions** - Students can export their work as JSON files for grading

### For Students

1. Open the app in a web browser
2. Enter your name/team name
3. Work through each section:
   - **Perceptual Map**: Drag brands onto the positioning grid
   - **Target Segments**: Evaluate and select your target
   - **Positioning Statement**: Build your statement using the framework
   - **Summary**: Review and export your work

## Learning Objectives

By completing this exercise, students will be able to:

- Analyze competitive positioning in a real-world market context
- Create perceptual maps to visualize brand positions
- Identify meaningful market segments and target audiences
- Develop effective positioning statements using industry frameworks
- Evaluate positioning strategies using the D-C-U framework

## Exercise Duration

- **Full exercise**: 75-90 minutes
- **Can be split** into two 40-45 minute sessions:
  - Session 1: Perceptual mapping + target segments
  - Session 2: Positioning statement + marketing mix

## Key Concepts Covered

- **Perceptual Mapping**: Visualizing competitive positions on key dimensions
- **Target Market Selection**: Evaluating segments on attractiveness, fit, and accessibility
- **Points of Parity (POP)**: Must-have attributes to compete
- **Points of Difference (POD)**: Differentiating attributes
- **Positioning Statement Framework**: For/Who/Is a/That/Unlike/Our product
- **D-C-U Framework**: Desirable, Deliverable, Differentiating

## Customization

### Changing the Case Study

To adapt this exercise for a different product/industry, modify the following in `app.js`:

1. `competitors` array - Update brand names and attributes
2. `segments` array - Change target segment descriptions
3. Update text content in `index.html`

### Adding New Dimensions

Add new axis options in `app.js`:

```javascript
const axisLabels = {
    price: { low: 'Low Price', high: 'High Price' },
    // Add new dimensions here
    quality: { low: 'Low Quality', high: 'High Quality' }
};
```

## Grading

A suggested grading rubric is included in `EXERCISE_INSTRUCTIONS.md`:

| Component | Points |
|-----------|--------|
| Perceptual Map | 20 |
| Target Selection | 15 |
| Positioning Statement | 25 |
| Marketing Mix Alignment | 20 |
| Overall Strategic Thinking | 20 |
| **Total** | **100** |

## Technical Notes

- **No server required** - The app runs entirely in the browser
- **Auto-save** - Student progress is saved to localStorage
- **Export options** - JSON download and print/PDF
- **Responsive** - Works on tablets and desktops
- **No dependencies** - Pure HTML, CSS, and JavaScript

## Support

For questions or issues, contact your course instructor.

---

*Created for Marketing Management undergraduate courses*

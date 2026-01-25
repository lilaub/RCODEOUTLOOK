# 💕 Dating Apps Perceptual Mapping Workshop

## An Interactive Marketing Research Exercise Using Factor Analysis

---

## 📋 Overview

This interactive web-based exercise teaches students how to create **data-driven perceptual maps** using **Principal Component Analysis (PCA)** - the same methodology used by professional marketing researchers.

Unlike traditional exercises where dimensions are chosen subjectively, students will:
1. Generate their own evaluation attributes
2. Rate dating apps on those attributes
3. Let factor analysis reveal the underlying dimensions
4. Interpret and visualize the results

**No software installation required** - runs entirely in your web browser!

---

## 🎯 Learning Objectives

By completing this exercise, students will be able to:

| Objective | Description |
|-----------|-------------|
| **Generate Attributes** | Identify relevant criteria consumers use to evaluate products |
| **Collect Perceptual Data** | Use rating scales to capture brand perceptions |
| **Apply Factor Analysis** | Understand how PCA reduces many variables to key dimensions |
| **Interpret Factor Loadings** | Read and explain what each factor represents |
| **Create Perceptual Maps** | Visualize competitive positioning from factor scores |
| **Strategic Analysis** | Identify clusters, gaps, and market opportunities |

---

## ⏱️ Time Required

| Format | Duration |
|--------|----------|
| **Full Exercise** | 90-120 minutes |
| **Split Session 1** | 45-60 min (Steps 1-3: Data collection + Factor Analysis) |
| **Split Session 2** | 45-60 min (Steps 4-5: Map analysis + Strategic insights) |

---

## 🚀 Quick Start Guide

### Step 1: Open the App

**Option A - Direct Open:**
- Navigate to the `app` folder
- Double-click `index.html`
- The app opens in your default browser

**Option B - Local Server (if Option A doesn't work):**
```bash
cd app
python -m http.server 8080
# Open http://localhost:8080 in your browser
```

### Step 2: Follow the 5-Step Process

The app guides you through each step:

```
Step 1: List Apps & Attributes  →  What dating apps do you know?
                                    How do people evaluate them?

Step 2: Rating Matrix           →  Rate each app on each attribute (1-7)

Step 3: Factor Analysis         →  Click "Run Factor Analysis" to
                                    discover underlying dimensions

Step 4: Perceptual Map          →  Explore the interactive map

Step 5: Strategic Insights      →  Analyze clusters, gaps, opportunities
```

---

## 📱 Step-by-Step Instructions

### Step 1: List Apps & Attributes

**Dating Apps (aim for 8-12):**
- List apps you're familiar with
- Include major players (Tinder, Bumble, Hinge) and niche apps
- Quick-add buttons help you get started

**Evaluation Attributes (aim for 10-15):**
Think about how people compare dating apps:

| Category | Example Attributes |
|----------|-------------------|
| **Purpose** | Serious relationships, Casual dating, Hookup-friendly |
| **Users** | User base size, Match quality, User attractiveness |
| **Features** | Algorithm quality, Profile depth, Messaging features |
| **Cost** | Free features, Premium value, Subscription price |
| **Experience** | Ease of use, Safety features, App design |
| **Social** | Reputation/stigma, Exclusivity, LGBTQ+ friendly |

### Step 2: Rate Each App

- Use the **1-7 scale** for each app-attribute combination
- **1** = Very Low / Doesn't have this quality
- **4** = Neutral / Average
- **7** = Very High / Strongly has this quality
- **?** = Don't know (skip this rating)

**Tips:**
- Rate based on your perception or general reputation
- Try to use the full range of the scale
- Be consistent in how you interpret attributes

### Step 3: Factor Analysis

Click **"Run Factor Analysis"** to:
- Discover patterns in your ratings
- Extract the two main underlying dimensions
- See which attributes define each factor

**Understanding the Results:**

| Output | What It Means |
|--------|---------------|
| **Variance Explained** | How much of the total variation the factors capture (>50% is good) |
| **Factor Loadings** | How strongly each attribute relates to each factor |
| **High Positive (green)** | Attribute increases with this factor |
| **High Negative (red)** | Attribute decreases with this factor |

**Name Your Factors:**
Based on the loadings, give each factor a descriptive name.

*Example:*
- Factor 1: "Casual" → "Serious" (if relationship-focus attributes load high)
- Factor 2: "Mainstream" → "Exclusive" (if exclusivity attributes load high)

### Step 4: Perceptual Map

Explore the interactive map:
- Each dot represents a dating app
- Position is based on factor scores
- Click apps to see their details
- Toggle labels on/off
- Adjust point sizes

**What to Look For:**
- **Clusters**: Apps positioned close together (similar perceptions)
- **Outliers**: Apps in unique positions (differentiated)
- **Gaps**: Empty areas (potential opportunities)

### Step 5: Strategic Insights

Answer the analysis questions:
1. What clusters do you observe? Why are these apps perceived similarly?
2. Which apps have unique positions? What makes them different?
3. Where are the "white spaces"? What new app could fill this gap?
4. If launching a new dating app, what position would you target?

---

## 📊 The Factor Analysis Process Explained

### What is Factor Analysis?

Factor analysis discovers hidden patterns by finding combinations of variables that tend to move together.

**Example:** If users rate apps high on both "exclusive" and "expensive," these might reflect a single underlying "premium" dimension.

### How PCA Works (Simplified)

```
Your Ratings          Factor Analysis         Perceptual Map
─────────────         ───────────────         ──────────────

App × Attributes  →   Finds patterns    →    2D visualization
(many variables)      in correlations        (2 key dimensions)

Tinder: [5,3,6,2...]  Factor 1: Casual→Serious
Bumble: [4,5,5,3...]  Factor 2: Mass→Exclusive   [Tinder •]
Hinge:  [6,6,4,4...]                                    [Bumble •]
...                                              [Hinge •]
```

### Interpreting Factor Loadings

| Loading Value | Interpretation |
|---------------|----------------|
| **> 0.5** | Strongly defines the HIGH end of this factor |
| **< -0.5** | Strongly defines the LOW end of this factor |
| **Near 0** | Not related to this factor |

---

## 💾 Saving Your Work

### Auto-Save
Your progress is automatically saved in your browser's local storage.

### Export Options

| Format | Use For |
|--------|---------|
| **JSON Download** | Submit to instructor, backup your work |
| **Print/PDF** | Create a report for your portfolio |

---

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Need more data" error** | Rate at least 3 apps with complete ratings (not all "?") |
| **Low variance explained** | Add more attributes, ensure ratings vary (not all 4s) |
| **Factors don't make sense** | Try toggling Varimax rotation, review which attributes load highest |
| **Map looks wrong** | Check if you have enough variation in your ratings |
| **App won't open** | Try using a local server (python -m http.server) |

---

## 📁 Files Included

```
dating-apps-positioning/
│
├── README.md                      ← You are here
├── EXERCISE_INSTRUCTIONS.md       ← Detailed academic exercise guide
│
└── app/
    ├── index.html                 ← Main application (open this!)
    ├── styles.css                 ← Styling
    └── app.js                     ← Factor analysis + interactivity
```

---

## 👩‍🏫 For Instructors

### Grading Rubric (Suggested)

| Component | Points | Criteria |
|-----------|--------|----------|
| Attribute Generation | 15 | Comprehensive, relevant, distinct |
| Rating Quality | 15 | Thoughtful, consistent, uses full scale |
| Factor Interpretation | 25 | Correctly reads loadings, meaningful labels |
| Map Analysis | 25 | Insightful observations about clusters/gaps |
| Strategic Recommendations | 10 | Feasible, supported by analysis |
| Methodology Reflection | 10 | Understands limitations |
| **Total** | **100** | |

### Class Aggregation Option

For more robust results:
1. Have each student export their JSON data
2. Combine the rating matrices
3. Run factor analysis on pooled data
4. Compare individual vs. aggregate maps
5. Discuss how sample size affects results

### Discussion Questions

1. Why did different students identify different factors?
2. How might the results differ if we surveyed 1,000 users?
3. What are the limitations of perceptual mapping?
4. How do real companies use this research?

---

## 🔧 Technical Notes

### Browser Compatibility
- Chrome, Firefox, Safari, Edge (modern versions)
- JavaScript must be enabled

### No External Dependencies
- Pure HTML, CSS, JavaScript
- All processing happens in your browser
- No data sent to any server

### Privacy
- Your data stays in your browser
- Nothing is uploaded or shared
- You control what you export

---

## 📚 Further Reading

- **Factor Analysis**: Hair, J.F. et al. (2019). *Multivariate Data Analysis*, Chapter 3
- **Perceptual Mapping**: Keller, K.L. (2013). *Strategic Brand Management*
- **Positioning**: Ries, A. & Trout, J. (2001). *Positioning: The Battle for Your Mind*

---

## 📝 Citation

If using this exercise in academic work:

```
Dating Apps Perceptual Mapping Workshop. (2026).
Interactive Marketing Research Exercise.
```

---

## 🎉 Good Luck!

This exercise demonstrates real marketing research methodology. The skills you learn here - collecting perceptual data, running factor analysis, interpreting results, and making strategic recommendations - are directly applicable to industry marketing research.

**Have fun exploring the dating app market!**

---

*Questions? Contact your instructor.*

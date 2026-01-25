# Email to Colleagues: Dating Apps Perceptual Mapping Exercise

---

**To:** [Marketing Faculty / Colleagues]

**Subject:** New Interactive Exercise: Perceptual Mapping with Factor Analysis (Free Resource)

---

Dear Colleagues,

I wanted to share an interactive exercise I've developed for teaching **perceptual mapping and factor analysis** in marketing courses. It uses the **dating app market** as a case study—a topic that resonates well with undergraduate students.

## What Makes This Exercise Different

Unlike traditional positioning exercises where students subjectively choose map dimensions, this exercise walks students through the **actual research methodology** used in industry:

1. Students generate their own evaluation attributes
2. They rate dating apps on those attributes (1-7 scale)
3. The app runs **Principal Component Analysis (PCA)** to discover underlying dimensions
4. Students interpret factor loadings and name the dimensions
5. An interactive perceptual map is generated from the factor scores

**The entire exercise runs in a web browser—no SPSS, R, or software installation required.** The factor analysis is implemented in JavaScript and executes instantly.

## Learning Outcomes

Students completing this exercise will be able to:
- Generate relevant product evaluation attributes
- Collect and structure perceptual data
- Interpret factor loadings and variance explained
- Create data-driven perceptual maps
- Identify strategic positioning opportunities

## Time Required

- **Full exercise:** 90-120 minutes
- **Can be split** into two 45-60 minute sessions

## How to Access

See **Appendix A** below for download instructions and **Appendix B** for student distribution guidelines.

I've found this exercise works particularly well for:
- Marketing Research Methods courses
- Marketing Management / Strategy courses
- Consumer Behavior courses (positioning module)
- Digital Marketing courses

Please feel free to use, adapt, or share this resource. I'd welcome any feedback or suggestions for improvement.

Best regards,

[Your Name]

---
---

# APPENDIX A: How to Access the Exercise

## Option 1: Download from GitHub (Recommended)

1. Go to: **https://github.com/pvsundar/RCODEOUTLOOK**

2. Switch to branch: **`claude/marketing-positioning-exercise-R6e8M`**
   - Click the branch dropdown (shows "main")
   - Select `claude/marketing-positioning-exercise-R6e8M`

3. Find and click: **`dating-apps-exercise.zip`**

4. Click the **Download** button (⬇️ icon on the right side)

5. Extract the ZIP file to your preferred location

## Option 2: Clone with Git

```bash
git clone https://github.com/pvsundar/RCODEOUTLOOK.git
cd RCODEOUTLOOK
git checkout claude/marketing-positioning-exercise-R6e8M
```

## Files You'll Receive

```
dating-apps-positioning/
│
├── README.md                      # Comprehensive guide with instructions
├── EXERCISE_INSTRUCTIONS.md       # Detailed academic exercise document
│
└── app/
    ├── index.html                 # Main application
    ├── styles.css                 # Styling
    └── app.js                     # Factor analysis implementation
```

---

# APPENDIX B: Distributing to Students

## Option 1: Upload to Your LMS (Canvas, Blackboard, Moodle, etc.)

1. Upload the entire `dating-apps-positioning` folder as a ZIP file
2. Students download and extract to their computer
3. They double-click `index.html` to run the app

**Sample LMS Instructions for Students:**
> Download the ZIP file, extract it, navigate to the `app` folder, and double-click `index.html` to open the exercise in your browser.

## Option 2: Host on a Web Server

If your institution has web hosting:

1. Upload the contents of the `app` folder to your server
2. Share the URL with students
3. Students access directly in their browser—no download needed

## Option 3: Share via Cloud Storage

1. Upload the folder to Google Drive, OneDrive, or Dropbox
2. Share the link with students
3. Students download and run locally

---

# APPENDIX C: Exercise Overview for Students

## The Case: Dating Apps Market

Students analyze the competitive landscape of dating apps (Tinder, Bumble, Hinge, etc.) by:

| Step | Activity | Time |
|------|----------|------|
| 1 | List 8-12 dating apps they know | 10 min |
| 2 | Generate 10-15 evaluation attributes | 15 min |
| 3 | Rate each app on each attribute (1-7) | 25 min |
| 4 | Run factor analysis and interpret results | 20 min |
| 5 | Analyze perceptual map and write strategic insights | 25 min |

## Sample Attributes Students Might Generate

- Serious relationship focus
- Hookup/casual friendly
- User base size
- Match quality
- Algorithm effectiveness
- Free features value
- Premium worthiness
- Safety features
- Ease of use
- Exclusivity
- LGBTQ+ friendly
- Social reputation/stigma

## Key Concepts Reinforced

| Concept | How It's Applied |
|---------|------------------|
| **Perceptual Mapping** | Visual output of the exercise |
| **Factor Analysis / PCA** | Hands-on execution with real-time results |
| **Factor Loadings** | Students interpret which attributes define each dimension |
| **Variance Explained** | Students assess model quality |
| **Market Positioning** | Strategic analysis of clusters and white spaces |
| **Competitive Analysis** | Identifying differentiation opportunities |

---

# APPENDIX D: Suggested Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| **Attribute Generation** | 15 | Comprehensive, relevant, distinct attributes that meaningfully differentiate apps |
| **Rating Quality** | 15 | Thoughtful ratings, uses full scale, internally consistent |
| **Factor Interpretation** | 25 | Correctly identifies high-loading attributes, provides meaningful factor labels |
| **Map Analysis** | 25 | Insightful observations about clusters, outliers, and gaps |
| **Strategic Recommendations** | 10 | Feasible recommendations supported by map analysis |
| **Methodology Reflection** | 10 | Demonstrates understanding of limitations and research process |
| **Total** | **100** | |

---

# APPENDIX E: Discussion Questions for Class

1. **On Factor Analysis:**
   - Why did different students identify different underlying dimensions?
   - What does "variance explained" tell us about our model?
   - How would results differ with 1,000 survey respondents vs. one student?

2. **On Perceptual Mapping:**
   - Are perceptual maps "objective truth" or constructed representations?
   - How might a company's desired position differ from its perceived position?
   - What are the limitations of reducing a market to two dimensions?

3. **On Strategy:**
   - Which position on your map is most attractive? Why?
   - How do successful apps maintain differentiated positions?
   - What would it take for a new entrant to disrupt this market?

---

# APPENDIX F: Technical Requirements

## For Students

| Requirement | Details |
|-------------|---------|
| **Browser** | Chrome, Firefox, Safari, or Edge (modern versions) |
| **JavaScript** | Must be enabled (default in all browsers) |
| **Internet** | Not required after download—runs entirely offline |
| **Software** | None—no installation needed |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| App doesn't open | Try right-click → "Open with" → Browser |
| Blank screen | Ensure JavaScript is enabled in browser settings |
| Factor analysis won't run | Need at least 3 apps rated with complete data |
| Low variance explained | Add more attributes or ensure rating variation |

---

# APPENDIX G: Adapting for Other Product Categories

The exercise can be modified for other markets by editing the JavaScript file (`app.js`):

**Change suggested products:**
```javascript
const suggestedApps = [
    'Netflix', 'Disney+', 'Hulu', 'HBO Max', ...
];
```

**Change suggested attributes:**
```javascript
const suggestedAttributes = [
    'Content library size', 'Original content quality', ...
];
```

**Potential adaptations:**
- Streaming services
- Coffee shop chains
- Fast food restaurants
- Smartphone brands
- Athletic shoe brands
- Social media platforms
- Airlines
- Hotels

---

*End of Email and Appendices*

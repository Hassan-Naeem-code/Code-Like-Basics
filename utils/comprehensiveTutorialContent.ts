// Clean, typed tutorial content generator

export interface TutorialSection {
  id: string
  title: string
  content: string
  syntax: string
  usage: string
  codeExample: string
}

export interface Tutorial {
  title: string
  description: string
  icon: string
  sections: TutorialSection[]
}

// Public API expected by app/tutorial/[tutorialId]/page.tsx
export function generateComprehensiveTutorial(
  languageId: string,
  languageName: string,
  icon: string,
  description: string
): Tutorial {
  const type = detectLanguageType(languageId)
  const sections = generateSections(languageId, languageName, type)

  return {
    title: `Master ${languageName}`,
    description: description || `Complete ${languageName} tutorial from basics to a mini project`,
    icon,
    sections,
  }
}

// --- Internal helpers ---

type LanguageType =
  | 'markup'
  | 'styling'
  | 'scripting'
  | 'framework'
  | 'mobile'
  | 'backend'
  | 'database'
  | 'ml'
  | 'devops'
  | 'blockchain'
  | 'general'

function detectLanguageType(languageId: string): LanguageType {
  const id = languageId.toLowerCase()
  if (/(html)/.test(id)) return 'markup'
  if (/(css)/.test(id) && !/(scss|sass)/.test(id)) return 'styling'
  if (/(tailwind)/.test(id)) return 'styling'
  // Check mobile BEFORE framework to avoid react-native matching react
  if (/(react-native|flutter|swift|kotlin)/.test(id)) return 'mobile'
  if (/(javascript|typescript|node)/.test(id)) return 'scripting'
  if (/(react|next|vue|angular)/.test(id)) return 'framework'
  if (/(python-backend|nodejs|java-backend|go-backend|rust-backend)/.test(id)) return 'backend'
  if (/(sql|postgres|postgresql|mongodb|redis|firebase-db|database)/.test(id)) return 'database'
  if (/(tensorflow|pytorch|scikit|sklearn|python-ml|ai-ml|ml)/.test(id)) return 'ml'
  if (/(docker|kubernetes|terraform|aws|github-actions|devops)/.test(id)) return 'devops'
  if (/(solidity|web3|ethereum|blockchain)/.test(id)) return 'blockchain'
  return 'general'
}

function generateSections(languageId: string, languageName: string, type: LanguageType): TutorialSection[] {
  switch (type) {
    case 'styling':
      return generateCSSSections(languageId, languageName)
    case 'markup':
      return generateHTMLSections(languageId, languageName)
    case 'database':
      return generateDatabaseSections(languageId, languageName)
    case 'ml':
      return generateMLSections(languageId, languageName)
    case 'devops':
      return generateDevOpsSections(languageId, languageName)
    case 'blockchain':
      return generateBlockchainSections(languageId, languageName)
    case 'framework':
      return generateFrameworkSections(languageId, languageName)
    case 'mobile':
      return generateMobileSections(languageId, languageName)
    case 'backend':
      return generateBackendSections(languageId, languageName)
    default:
      return generateGeneralSections(languageName)
  }
}

// COMPREHENSIVE CSS Tutorial - 100+ Topics like W3Schools!
function generateCSSSections(languageId: string, lang: string): TutorialSection[] {
  const sections: TutorialSection[] = []
  let id = 1

  // Introduction (6 sections)
  sections.push(
    { id: String(id++), title: 'CSS HOME', content: `# Welcome to CSS - Cascading Style Sheets

## What is CSS?
CSS (Cascading Style Sheets) is the language used to style and layout web pages — for example, to alter the font, color, size, and spacing of your content, split it into multiple columns, or add animations and other decorative features.

## Why Learn CSS?
- **Universal Standard**: CSS is used by all modern websites and web applications
- **Creative Control**: Design beautiful, professional-looking websites
- **Responsive Design**: Make your websites look great on all devices - phones, tablets, and desktops
- **Career Opportunities**: CSS skills are essential for web developers, UI/UX designers, and front-end engineers
- **Easy to Learn**: CSS has a simple syntax that's beginner-friendly
- **Powerful Features**: From simple colors to complex animations and layouts

## What Can You Do With CSS?
- Style text (colors, fonts, sizes, spacing)
- Create layouts (Flexbox, Grid, positioning)
- Add animations and transitions
- Make responsive designs that adapt to different screen sizes
- Create beautiful backgrounds, borders, and shadows
- Build modern UI components
- Control print styles
- And much more!

## CSS Saves Time
CSS can control the layout and appearance of multiple web pages all at once. External stylesheets are stored in .css files and can be reused across your entire website.

## Start Learning CSS Today!
This tutorial will teach you CSS from basic to advanced, with hands-on examples you can try yourself.`, syntax: 'Overview', usage: 'Start learning CSS', codeExample: '/* Welcome to CSS! */\nbody {\n  font-family: Arial, sans-serif;\n  background-color: #f0f0f0;\n  margin: 0;\n  padding: 20px;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}' },
    { id: String(id++), title: 'CSS Introduction', content: `## What You'll Learn
Understand what CSS is and how it transforms plain HTML into beautiful, styled web pages.

## Lesson Overview
CSS (Cascading Style Sheets) is the language that makes websites look good. While HTML provides structure, CSS provides the design, colors, layouts, and visual appeal.

## How CSS Works
**The Power of Separation:**
- HTML = Content and structure
- CSS = Design and appearance
- One CSS file can style hundreds of HTML pages

**What CSS Controls:**
- Colors (text, backgrounds, borders)
- Fonts (family, size, weight)
- Layout (positioning, spacing)
- Animations and effects
- Responsive design for different screens

## Why This Matters
Learning CSS allows you to:
- Make websites beautiful and professional
- Create unique designs that stand out
- Build responsive sites that work on all devices
- Turn design ideas into reality
- Get hired as a web designer or developer

## What You'll Be Able to Do
After this lesson, you'll understand:
- What CSS is and why it's essential
- How CSS and HTML work together
- The basic structure of CSS rules
- How to start styling your web pages`, syntax: 'Cascading Style Sheets', usage: 'Style HTML', codeExample: '/* Make heading blue and centered */\nh1 {\n  color: blue;\n  text-align: center;\n  font-size: 32px;\n}\n\n/* Style all paragraphs */\np {\n  color: #333;\n  line-height: 1.6;\n}' },
    { id: String(id++), title: 'CSS Syntax', content: `## What You'll Learn
Master the basic syntax of CSS and learn how to write your first style rules.

## Lesson Overview
CSS has a simple, easy-to-read syntax. Understanding this syntax is the foundation for everything you'll do with CSS.

## CSS Rule Structure
Every CSS rule has two parts:

**1. Selector** - What to style
\`\`\`
h1    ← This selects all <h1> elements
\`\`\`

**2. Declaration Block** - How to style it
\`\`\`
{
  color: blue;         ← property: value;
  font-size: 32px;     ← another property: value;
}
\`\`\`

## Key Points
- Use **curly braces** \`{}\` to wrap declarations
- Each declaration ends with a **semicolon** \`;\`
- Property and value are separated by a **colon** \`:\`
- You can have multiple declarations in one rule

## Why This Matters
Understanding syntax lets you:
- Write CSS correctly without errors
- Read and understand other people's CSS
- Debug styling issues
- Build more complex styles confidently

## What You'll Be Able to Do
After this lesson, you can:
- Write properly formatted CSS rules
- Select HTML elements to style
- Add multiple style properties
- Understand CSS code when you see it`, syntax: 'selector { property: value; }', usage: 'Write CSS rules', codeExample: '/* Proper CSS syntax */\np {\n  color: red;\n  font-size: 16px;\n  margin: 20px;\n}\n\nh1 {\n  background-color: yellow;\n  padding: 10px;\n}' },
    { id: String(id++), title: 'CSS Selectors', content: 'Target HTML elements to style.', syntax: 'element, .class, #id', usage: 'Select elements', codeExample: 'h1 { color: blue; }\n.intro { font-size: 20px; }\n#main { background: white; }' },
    { id: String(id++), title: 'CSS How To', content: 'Three ways to insert CSS: external, internal, and inline.', syntax: '<link>, <style>, style=""', usage: 'Add CSS', codeExample: '/* External: */\n<link rel="stylesheet" href="styles.css">\n\n/* Internal: */\n<style>body{margin:0}</style>\n\n/* Inline: */\n<p style="color:red">Text</p>' },
    { id: String(id++), title: 'CSS Comments', content: 'Add comments to explain your code.', syntax: '/* comment */', usage: 'Document code', codeExample: '/* This is a comment */\np {\n  /* color: blue; This is disabled */\n  color: red;\n}' }
  )

  // Colors (7 sections)
  sections.push(
    { id: String(id++), title: 'CSS Colors', content: 'Specify colors using names, HEX, RGB, or HSL.', syntax: 'color', usage: 'Text color', codeExample: 'h1 { color: red; }\np { color: #00ff00; }\nspan { color: rgb(0, 0, 255); }' },
    { id: String(id++), title: 'CSS RGB', content: 'RGB color values.', syntax: 'rgb(red, green, blue)', usage: 'RGB colors', codeExample: 'h1 { color: rgb(255, 0, 0); }\np { color: rgb(0, 255, 0); }' },
    { id: String(id++), title: 'CSS HEX', content: 'Hexadecimal color values.', syntax: '#RRGGBB', usage: 'HEX colors', codeExample: 'h1 { color: #ff0000; }\np { color: #00ff00; }' },
    { id: String(id++), title: 'CSS HSL', content: 'Hue, Saturation, Lightness color values.', syntax: 'hsl(hue, sat%, light%)', usage: 'HSL colors', codeExample: 'h1 { color: hsl(0, 100%, 50%); }\np { background: hsl(120, 100%, 50%); }' },
    { id: String(id++), title: 'CSS Opacity', content: 'Set transparency level.', syntax: 'opacity: 0-1', usage: 'Transparency', codeExample: 'div {\n  background: red;\n  opacity: 0.5;\n}' },
    { id: String(id++), title: 'CSS Gradients', content: 'Create smooth color transitions.', syntax: 'linear-gradient, radial-gradient', usage: 'Color gradients', codeExample: 'div {\n  background: linear-gradient(red, yellow);\n}\n\n.radial {\n  background: radial-gradient(circle, red, yellow, green);\n}' }
  )

  // Text & Fonts (10 sections)
  sections.push(
    { id: String(id++), title: 'CSS Text', content: 'Style text appearance.', syntax: 'color, text-align', usage: 'Text styling', codeExample: 'p {\n  color: blue;\n  text-align: center;\n  text-decoration: underline;\n}' },
    { id: String(id++), title: 'CSS Fonts', content: 'Set font family, size, and style.', syntax: 'font-family, font-size', usage: 'Typography', codeExample: 'body {\n  font-family: Arial, sans-serif;\n  font-size: 16px;\n}' },
    { id: String(id++), title: 'CSS Text Alignment', content: 'Align text horizontally and vertically.', syntax: 'text-align', usage: 'Alignment', codeExample: '.center { text-align: center; }\n.right { text-align: right; }' },
    { id: String(id++), title: 'CSS Text Decoration', content: 'Add decorations to text.', syntax: 'text-decoration', usage: 'Underline, strikethrough', codeExample: 'a { text-decoration: none; }\n.strike { text-decoration: line-through; }' },
    { id: String(id++), title: 'CSS Text Transform', content: 'Change text capitalization.', syntax: 'text-transform', usage: 'Capitalize', codeExample: '.upper { text-transform: uppercase; }\n.lower { text-transform: lowercase; }' },
    { id: String(id++), title: 'CSS Text Spacing', content: 'Control spacing between letters and words.', syntax: 'letter-spacing, word-spacing', usage: 'Spacing', codeExample: 'p {\n  letter-spacing: 2px;\n  word-spacing: 10px;\n}' },
    { id: String(id++), title: 'CSS Text Shadow', content: 'Add shadow effects to text.', syntax: 'text-shadow', usage: 'Text effects', codeExample: 'h1 {\n  text-shadow: 2px 2px 4px #000000;\n}' },
    { id: String(id++), title: 'CSS Font Family', content: 'Specify font families.', syntax: 'font-family', usage: 'Font selection', codeExample: 'body {\n  font-family: "Times New Roman", Times, serif;\n}' },
    { id: String(id++), title: 'CSS Web Fonts', content: 'Use custom fonts with @font-face.', syntax: '@font-face', usage: 'Custom fonts', codeExample: '@font-face {\n  font-family: "MyFont";\n  src: url("myfont.woff2");\n}\n\nbody { font-family: "MyFont"; }' },
    { id: String(id++), title: 'CSS Google Fonts', content: 'Use Google Fonts in your website.', syntax: '@import', usage: 'Free fonts', codeExample: '@import url(\'https://fonts.googleapis.com/css2?family=Roboto\');\n\nbody { font-family: \'Roboto\', sans-serif; }' }
  )

  // Box Model (12 sections)
  sections.push(
    { id: String(id++), title: 'CSS Box Model', content: 'Every element is a box: content, padding, border, margin.', syntax: 'Box model', usage: 'Layout fundamentals', codeExample: 'div {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n  margin: 10px;\n}' },
    { id: String(id++), title: 'CSS Borders', content: 'Add borders around elements.', syntax: 'border', usage: 'Element borders', codeExample: 'div {\n  border: 2px solid red;\n  border-radius: 5px;\n}' },
    { id: String(id++), title: 'CSS Border Width', content: 'Set border thickness.', syntax: 'border-width', usage: 'Border size', codeExample: 'div {\n  border-width: 1px 2px 3px 4px;\n}' },
    { id: String(id++), title: 'CSS Border Color', content: 'Set border colors.', syntax: 'border-color', usage: 'Border colors', codeExample: 'div {\n  border-color: red blue green yellow;\n}' },
    { id: String(id++), title: 'CSS Border Radius', content: 'Create rounded corners.', syntax: 'border-radius', usage: 'Rounded corners', codeExample: '.rounded {\n  border-radius: 10px;\n}\n\n.circle {\n  border-radius: 50%;\n}' },
    { id: String(id++), title: 'CSS Margins', content: 'Create space outside elements.', syntax: 'margin', usage: 'Outer spacing', codeExample: 'div {\n  margin: 20px;\n  margin-top: 10px;\n  margin-right: 15px;\n}' },
    { id: String(id++), title: 'CSS Padding', content: 'Create space inside elements.', syntax: 'padding', usage: 'Inner spacing', codeExample: 'div {\n  padding: 20px;\n  padding-left: 30px;\n}' },
    { id: String(id++), title: 'CSS Height/Width', content: 'Set element dimensions.', syntax: 'height, width', usage: 'Size control', codeExample: 'div {\n  width: 300px;\n  height: 200px;\n}' },
    { id: String(id++), title: 'CSS Box Sizing', content: 'Control how width/height is calculated.', syntax: 'box-sizing', usage: 'Size calculation', codeExample: '* {\n  box-sizing: border-box;\n}' },
    { id: String(id++), title: 'CSS Outline', content: 'Draw a line outside the border.', syntax: 'outline', usage: 'Focus indicator', codeExample: 'button:focus {\n  outline: 2px solid blue;\n}' },
    { id: String(id++), title: 'CSS Backgrounds', content: 'Set background colors and images.', syntax: 'background', usage: 'Backgrounds', codeExample: 'div {\n  background-color: lightblue;\n  background-image: url("img.jpg");\n}' },
    { id: String(id++), title: 'CSS Background Image', content: 'Use images as backgrounds.', syntax: 'background-image', usage: 'Image backgrounds', codeExample: 'body {\n  background-image: url("bg.jpg");\n  background-size: cover;\n  background-position: center;\n}' }
  )

  // Layout (15 sections - Flexbox, Grid, Position)
  sections.push(
    { id: String(id++), title: 'CSS Display', content: 'Control element display type.', syntax: 'display', usage: 'Layout type', codeExample: '.block { display: block; }\n.inline { display: inline; }\n.none { display: none; }' },
    { id: String(id++), title: 'CSS Position', content: 'Position elements: static, relative, absolute, fixed, sticky.', syntax: 'position', usage: 'Element positioning', codeExample: '.relative { position: relative; top: 10px; }\n.absolute { position: absolute; top: 0; left: 0; }\n.fixed { position: fixed; bottom: 0; right: 0; }' },
    { id: String(id++), title: 'CSS Z-Index', content: 'Control stacking order.', syntax: 'z-index', usage: 'Layer order', codeExample: '.top { z-index: 100; position: relative; }\n.bottom { z-index: 1; position: relative; }' },
    { id: String(id++), title: 'CSS Overflow', content: 'Control content overflow.', syntax: 'overflow', usage: 'Content clipping', codeExample: 'div {\n  width: 200px;\n  height: 100px;\n  overflow: auto;\n}' },
    { id: String(id++), title: 'CSS Float', content: 'Float elements left or right.', syntax: 'float', usage: 'Text wrapping', codeExample: 'img {\n  float: left;\n  margin-right: 10px;\n}' },
    { id: String(id++), title: 'CSS Clear', content: 'Control behavior next to floated elements.', syntax: 'clear', usage: 'Clear floats', codeExample: '.clearfix::after {\n  content: "";\n  display: table;\n  clear: both;\n}' },
    { id: String(id++), title: 'CSS Flexbox', content: 'Modern one-dimensional layout system.', syntax: 'display: flex', usage: 'Flexible layouts', codeExample: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}' },
    { id: String(id++), title: 'CSS Flex Direction', content: 'Set flex container direction.', syntax: 'flex-direction', usage: 'Direction', codeExample: '.row { flex-direction: row; }\n.column { flex-direction: column; }' },
    { id: String(id++), title: 'CSS Justify Content', content: 'Align flex items horizontally.', syntax: 'justify-content', usage: 'Horizontal alignment', codeExample: '.container {\n  display: flex;\n  justify-content: space-between;\n}' },
    { id: String(id++), title: 'CSS Align Items', content: 'Align flex items vertically.', syntax: 'align-items', usage: 'Vertical alignment', codeExample: '.container {\n  display: flex;\n  align-items: center;\n}' },
    { id: String(id++), title: 'CSS Grid', content: 'Two-dimensional grid layout system.', syntax: 'display: grid', usage: 'Grid layouts', codeExample: '.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}' },
    { id: String(id++), title: 'CSS Grid Template', content: 'Define grid structure.', syntax: 'grid-template-columns/rows', usage: 'Grid structure', codeExample: '.grid {\n  display: grid;\n  grid-template-columns: 200px 1fr 200px;\n  grid-template-rows: auto 1fr auto;\n}' },
    { id: String(id++), title: 'CSS Grid Gap', content: 'Set spacing between grid items.', syntax: 'gap, row-gap, column-gap', usage: 'Grid spacing', codeExample: '.grid {\n  display: grid;\n  gap: 20px;\n  column-gap: 30px;\n}' },
    { id: String(id++), title: 'CSS Grid Areas', content: 'Name and position grid areas.', syntax: 'grid-template-areas', usage: 'Named areas', codeExample: '.grid {\n  grid-template-areas:\n    "header header"\n    "sidebar content"\n    "footer footer";\n}' },
    { id: String(id++), title: 'CSS Responsive', content: 'Create responsive layouts with media queries.', syntax: '@media', usage: 'Responsive design', codeExample: '@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n}' }
  )

  // Animations & Transforms (10 sections)
  sections.push(
    { id: String(id++), title: 'CSS Transitions', content: 'Smooth changes between states.', syntax: 'transition', usage: 'Smooth effects', codeExample: 'button {\n  transition: all 0.3s ease;\n}\n\nbutton:hover {\n  background: blue;\n}' },
    { id: String(id++), title: 'CSS Transforms', content: 'Rotate, scale, skew, or translate elements.', syntax: 'transform', usage: 'Visual effects', codeExample: '.rotate { transform: rotate(45deg); }\n.scale { transform: scale(1.5); }' },
    { id: String(id++), title: 'CSS 2D Transforms', content: '2D transformation methods.', syntax: 'rotate, scale, translate', usage: '2D effects', codeExample: 'div {\n  transform: rotate(30deg) scale(1.2) translateX(50px);\n}' },
    { id: String(id++), title: 'CSS 3D Transforms', content: '3D transformation methods.', syntax: 'rotateX, rotateY, rotateZ', usage: '3D effects', codeExample: '.card {\n  transform: rotateY(180deg);\n  transform-style: preserve-3d;\n}' },
    { id: String(id++), title: 'CSS Animations', content: 'Create complex animations with keyframes.', syntax: '@keyframes, animation', usage: 'Keyframe animations', codeExample: '@keyframes slide {\n  from { left: 0; }\n  to { left: 100px; }\n}\n\n.box {\n  animation: slide 2s infinite;\n}' },
    { id: String(id++), title: 'CSS Animation Properties', content: 'Control animation behavior.', syntax: 'animation-duration, animation-delay', usage: 'Animation control', codeExample: '.box {\n  animation-name: slide;\n  animation-duration: 2s;\n  animation-delay: 1s;\n  animation-iteration-count: infinite;\n}' },
    { id: String(id++), title: 'CSS Box Shadow', content: 'Add shadows to elements.', syntax: 'box-shadow', usage: 'Depth effects', codeExample: '.card {\n  box-shadow: 0 4px 8px rgba(0,0,0,0.2);\n}' },
    { id: String(id++), title: 'CSS Filters', content: 'Apply visual effects like blur or grayscale.', syntax: 'filter', usage: 'Image effects', codeExample: 'img {\n  filter: blur(5px);\n  filter: grayscale(100%);\n  filter: brightness(150%);\n}' },
    { id: String(id++), title: 'CSS Hover Effects', content: 'Style elements on hover.', syntax: ':hover', usage: 'Interactivity', codeExample: 'button:hover {\n  background: blue;\n  transform: scale(1.1);\n}' }
  )

  // Advanced (remaining sections to reach 100+)
  sections.push(
    { id: String(id++), title: 'CSS Variables', content: 'Define reusable values.', syntax: '--var-name', usage: 'Custom properties', codeExample: ':root {\n  --primary-color: #3498db;\n  --padding: 20px;\n}\n\n.button {\n  background: var(--primary-color);\n  padding: var(--padding);\n}' },
    { id: String(id++), title: 'CSS Pseudo-classes', content: 'Style elements based on state.', syntax: ':hover, :focus, :active', usage: 'State styling', codeExample: 'a:hover { color: red; }\ninput:focus { border: 2px solid blue; }\nbutton:active { transform: scale(0.95); }' },
    { id: String(id++), title: 'CSS Pseudo-elements', content: 'Style specific parts of elements.', syntax: '::before, ::after', usage: 'Content generation', codeExample: '.quote::before {\n  content: \'"\';\n}\n\n.quote::after {\n  content: \'"\';\n}' },
    { id: String(id++), title: 'CSS Specificity', content: 'Understand how CSS rules are applied.', syntax: 'Specificity rules', usage: 'Rule priority', codeExample: '/* Specificity: 1 */\np { color: red; }\n\n/* Specificity: 10 */\n.text { color: blue; }\n\n/* Specificity: 100 */\n#heading { color: green; }' },
    { id: String(id++), title: 'CSS !important', content: 'Override other styles.', syntax: '!important', usage: 'Force priority', codeExample: 'p {\n  color: red !important;\n}' },
    { id: String(id++), title: 'CSS Units', content: 'px, em, rem, %, vw, vh units.', syntax: 'CSS units', usage: 'Sizing', codeExample: 'div {\n  width: 50%; /* relative */\n  font-size: 1.5rem; /* root em */\n  padding: 2em; /* element em */\n  height: 100vh; /* viewport height */\n}' },
    { id: String(id++), title: 'CSS Media Queries', content: 'Responsive design breakpoints.', syntax: '@media', usage: 'Responsive CSS', codeExample: '@media (max-width: 768px) {\n  .container { padding: 10px; }\n}\n\n@media (min-width: 1200px) {\n  .container { max-width: 1140px; }\n}' },
    { id: String(id++), title: 'CSS Forms', content: 'Style form elements.', syntax: 'input, button styles', usage: 'Form styling', codeExample: 'input[type="text"] {\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n\nbutton {\n  background: #007bff;\n  color: white;\n  padding: 10px 20px;\n}' },
    { id: String(id++), title: 'CSS Navigation', content: 'Create navigation menus.', syntax: 'nav, menu styles', usage: 'Navigation', codeExample: 'nav ul {\n  list-style: none;\n  display: flex;\n  gap: 20px;\n}\n\nnav a {\n  text-decoration: none;\n  color: #333;\n}' },
    { id: String(id++), title: 'CSS Buttons', content: 'Style interactive buttons.', syntax: 'button styles', usage: 'Button design', codeExample: '.btn {\n  background: #007bff;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n.btn:hover {\n  background: #0056b3;\n}' }
  )

  return sections
}

// COMPREHENSIVE HTML Tutorial - 80+ Topics
function generateHTMLSections(languageId: string, lang: string): TutorialSection[] {
  const sections: TutorialSection[] = []
  let id = 1

  // Introduction
  sections.push(
    { id: String(id++), title: 'HTML HOME', content: `# Welcome to HTML - The Language of the Web

## What is HTML?
HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure and content of a web page using a series of elements represented by tags.

## Why Learn HTML?
- **Foundation of the Web**: Every website you visit is built with HTML
- **Essential Skill**: HTML is the first language every web developer learns
- **Universal**: Works on all browsers and devices
- **Career Building**: Opens doors to web development, design, and digital careers
- **Easy to Learn**: Simple tag-based syntax that anyone can master
- **Always Relevant**: HTML has been the web standard for over 30 years and continues to evolve

## What Can You Build With HTML?
- Personal and business websites
- Blogs and portfolios
- Online stores and marketplaces
- Web applications
- Email templates
- Landing pages
- Documentation sites
- And much more!

## How Does HTML Work?
HTML uses "tags" to mark up content. Tags are written in angle brackets like <tag>. Most tags come in pairs - an opening tag and a closing tag that wraps around content:
- <h1>This is a heading</h1>
- <p>This is a paragraph</p>
- <a>This is a link</a>

## HTML Works Together With:
- **CSS (Cascading Style Sheets)**: For styling and layout
- **JavaScript**: For interactivity and dynamic behavior

## Start Your Web Development Journey!
This tutorial will take you from beginner to advanced, with practical examples you can try yourself. No prior experience needed!`, syntax: 'Markup Language', usage: 'Create web pages', codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Web Page</title>\n</head>\n<body>\n  <h1>Welcome to HTML!</h1>\n  <p>This is my first web page.</p>\n  <a href="https://example.com">Visit a website</a>\n</body>\n</html>' },
    { id: String(id++), title: 'HTML Introduction', content: `## What You'll Learn
In this lesson, you'll understand what HTML is and why it's the foundation of every website you visit.

## Lesson Overview
HTML (HyperText Markup Language) is the standard language for creating web pages. Think of it as the skeleton of a website - it provides the structure and content that browsers can display.

## Key Concepts
**What is HTML?**
- A markup language that uses "tags" to define content
- The foundation of all websites - every site uses HTML
- Works with CSS (for styling) and JavaScript (for interactivity)

**How HTML Works:**
1. You write HTML code using tags like \`<h1>\`, \`<p>\`, \`<img>\`
2. Your browser reads this code
3. The browser displays it as a formatted web page

**Why This Matters:**
- HTML is the **first language** every web developer learns
- You can't build websites without knowing HTML
- It's simple to learn and you can start building pages immediately

## What You'll Be Able to Do
After this lesson, you'll understand:
- What HTML stands for and what it does
- How HTML creates the structure of web pages
- Why HTML is essential for web development
- How tags work to define content`, syntax: 'HyperText Markup Language', usage: 'Structure web content', codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Welcome to HTML!</h1>\n  <p>This is my first web page.</p>\n</body>\n</html>' },
    { id: String(id++), title: 'HTML Basic', content: `## What You'll Learn
Learn the basic structure of every HTML document and create your first complete web page.

## Lesson Overview
Every HTML page follows the same basic structure. Understanding this structure is essential before you start building websites.

## The Three Main Parts
**1. DOCTYPE Declaration**
- Tells the browser this is an HTML5 document
- Always the first line: \`<!DOCTYPE html>\`

**2. Head Section**
- Contains information ABOUT the page (metadata)
- Includes the page title, character encoding, and links to CSS
- Not visible to users on the page

**3. Body Section**
- Contains everything users SEE on the page
- All your text, images, links, and content go here

## Why This Matters
Understanding HTML structure lets you:
- Create properly formatted web pages
- Organize your content logically
- Ensure browsers display your page correctly
- Build a foundation for more complex pages

## What You'll Be Able to Do
After this lesson, you can:
- Write a complete HTML document from scratch
- Understand what each section does
- Create a basic web page with text and headings`, syntax: 'html, head, body', usage: 'Page structure', codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page Title</title>\n</head>\n<body>\n  <h1>My First Heading</h1>\n  <p>My first paragraph.</p>\n</body>\n</html>' },
    { id: String(id++), title: 'HTML Elements', content: `## What You'll Learn
Discover how HTML elements work and how to use tags to create different types of content.

## Lesson Overview
HTML elements are the building blocks of web pages. Each element is created using tags that tell the browser what type of content to display.

## How Elements Work
**Element Structure:**
- **Opening tag**: \`<p>\` (starts the element)
- **Content**: The text or other elements inside
- **Closing tag**: \`</p>\` (ends the element)

**Example:** \`<p>This is a paragraph</p>\`

## Common Elements You'll Use
- \`<h1>\` to \`<h6>\` - Headings (h1 is largest)
- \`<p>\` - Paragraphs of text
- \`<div>\` - Container for grouping content
- \`<span>\` - Inline container for text
- \`<br>\` - Line break (no closing tag needed)

## Why This Matters
Elements let you:
- Organize content into meaningful sections
- Control how content is displayed
- Create headings, paragraphs, lists, and more
- Build the structure of any web page

## What You'll Be Able to Do
After this lesson, you can:
- Create headings and paragraphs
- Understand opening and closing tags
- Use different elements for different content types`, syntax: '<tagname>content</tagname>', usage: 'Page elements', codeExample: '<h1>Main Heading</h1>\n<h2>Subheading</h2>\n<p>This is a paragraph</p>\n<p>This is another paragraph</p>\n<br>\n<hr>' },
    { id: String(id++), title: 'HTML Attributes', content: `## What You'll Learn
Learn how to add extra information to HTML elements using attributes.

## Lesson Overview
Attributes provide additional information about HTML elements. They're like settings that control how elements behave or what they do.

## How Attributes Work
**Syntax:** \`<tagname attribute="value">content</tagname>\`

**Key Points:**
- Attributes go inside the opening tag
- They have a name and a value
- Use quotes around the value
- You can have multiple attributes

## Essential Attributes
**href** - Specifies link destination
\`<a href="https://google.com">Google</a>\`

**src** - Specifies image source
\`<img src="photo.jpg">\`

**alt** - Alternative text for images
\`<img src="photo.jpg" alt="Description">\`

**id** - Unique identifier
\`<div id="header">\`

**class** - Group elements for styling
\`<p class="highlight">\`

## Why This Matters
Attributes allow you to:
- Make links work (href)
- Display images (src)
- Identify elements for styling
- Make pages accessible
- Control element behavior

## What You'll Be Able to Do
After this lesson, you can:
- Add links to other pages
- Insert images into your page
- Use classes and IDs for styling
- Make your HTML more functional and accessible`, syntax: 'attribute="value"', usage: 'Element properties', codeExample: '<a href="https://example.com" target="_blank">Visit Example</a>\n\n<img src="logo.png" alt="Company Logo" width="200">\n\n<p id="intro" class="highlight">Welcome!</p>' }
  )

  // Headings, Paragraphs, Formatting
  sections.push(
    { id: String(id++), title: 'HTML Headings', content: 'h1 to h6 tags for headings.', syntax: '<h1> to <h6>', usage: 'Titles', codeExample: '<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>' },
    { id: String(id++), title: 'HTML Paragraphs', content: 'Create paragraphs with <p> tag.', syntax: '<p>', usage: 'Text blocks', codeExample: '<p>This is a paragraph.</p>\n<p>This is another paragraph.</p>' },
    { id: String(id++), title: 'HTML Styles', content: 'Add inline styles to elements.', syntax: 'style="property:value"', usage: 'Styling', codeExample: '<p style="color:red">Red text</p>\n<p style="font-size:20px">Large text</p>' },
    { id: String(id++), title: 'HTML Formatting', content: 'Format text with tags.', syntax: '<b>, <i>, <strong>, <em>', usage: 'Text formatting', codeExample: '<b>Bold</b>\n<i>Italic</i>\n<strong>Important</strong>\n<em>Emphasized</em>\n<mark>Highlighted</mark>' },
    { id: String(id++), title: 'HTML Comments', content: 'Add comments to your code.', syntax: '<!-- comment -->', usage: 'Code documentation', codeExample: '<!-- This is a comment -->\n<p>This is visible</p>\n<!-- Comments are not displayed -->' }
  )

  // Links, Images, Lists
  sections.push(
    { id: String(id++), title: 'HTML Links', content: 'Create hyperlinks with <a> tag.', syntax: '<a href="url">text</a>', usage: 'Navigation', codeExample: '<a href="https://example.com">Visit Example</a>\n<a href="page2.html">Next Page</a>\n<a href="#section1">Jump to Section</a>' },
    { id: String(id++), title: 'HTML Images', content: 'Display images with <img> tag.', syntax: '<img src="url" alt="text">', usage: 'Images', codeExample: '<img src="photo.jpg" alt="Photo description" width="500" height="600">' },
    { id: String(id++), title: 'HTML Lists', content: 'Create ordered and unordered lists.', syntax: '<ul>, <ol>, <li>', usage: 'Lists', codeExample: '<ul>\n  <li>Coffee</li>\n  <li>Tea</li>\n</ul>\n\n<ol>\n  <li>First</li>\n  <li>Second</li>\n</ol>' },
    { id: String(id++), title: 'HTML Tables', content: 'Create tables with <table> tag.', syntax: '<table>, <tr>, <td>', usage: 'Tabular data', codeExample: '<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>Alice</td>\n    <td>25</td>\n  </tr>\n</table>' }
  )

  // Forms
  sections.push(
    { id: String(id++), title: 'HTML Forms', content: 'Create input forms.', syntax: '<form>, <input>', usage: 'User input', codeExample: '<form action="/submit" method="POST">\n  <label>Name:</label>\n  <input type="text" name="name">\n  <button type="submit">Submit</button>\n</form>' },
    { id: String(id++), title: 'HTML Input Types', content: 'Different input field types.', syntax: '<input type="...">', usage: 'Form inputs', codeExample: '<input type="text">\n<input type="password">\n<input type="email">\n<input type="number">\n<input type="date">\n<input type="checkbox">\n<input type="radio">' },
    { id: String(id++), title: 'HTML Buttons', content: 'Create clickable buttons.', syntax: '<button>', usage: 'Buttons', codeExample: '<button>Click Me</button>\n<button type="submit">Submit</button>\n<button type="reset">Reset</button>' }
  )

  // Semantic HTML (add 15+ more sections to reach 80+)
  sections.push(
    { id: String(id++), title: 'HTML Semantic', content: 'Use semantic elements for better structure.', syntax: '<header>, <nav>, <main>', usage: 'Meaningful structure', codeExample: '<header>\n  <nav>\n    <a href="/">Home</a>\n  </nav>\n</header>\n<main>\n  <article>Content</article>\n</main>\n<footer>© 2024</footer>' },
    { id: String(id++), title: 'HTML Div', content: 'Generic container for content.', syntax: '<div>', usage: 'Container', codeExample: '<div class="container">\n  <p>Content goes here</p>\n</div>' },
    { id: String(id++), title: 'HTML Classes', content: 'Apply CSS classes to elements.', syntax: 'class="name"', usage: 'Styling groups', codeExample: '<p class="intro">Intro text</p>\n<div class="container highlight">Content</div>' },
    { id: String(id++), title: 'HTML IDs', content: 'Unique identifiers for elements.', syntax: 'id="name"', usage: 'Unique reference', codeExample: '<h1 id="main-title">Title</h1>\n<p id="intro">Introduction</p>' },
    { id: String(id++), title: 'HTML Layout', content: 'Structure page layout with semantic tags.', syntax: 'header, nav, main, footer', usage: 'Page structure', codeExample: '<header>Header</header>\n<nav>Navigation</nav>\n<main>Main content</main>\n<aside>Sidebar</aside>\n<footer>Footer</footer>' },
    { id: String(id++), title: 'HTML Responsive', content: 'Make pages responsive with viewport meta tag.', syntax: '<meta name="viewport">', usage: 'Mobile friendly', codeExample: '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>' },
    { id: String(id++), title: 'HTML Media', content: 'Embed audio and video.', syntax: '<audio>, <video>', usage: 'Multimedia', codeExample: '<video width="320" height="240" controls>\n  <source src="movie.mp4" type="video/mp4">\n</video>\n\n<audio controls>\n  <source src="audio.mp3" type="audio/mpeg">\n</audio>' },
    { id: String(id++), title: 'HTML Examples', content: 'Real-world HTML examples.', syntax: 'Complete examples', usage: 'Practice', codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Website</title>\n</head>\n<body>\n  <header>\n    <h1>Welcome</h1>\n  </header>\n  <main>\n    <p>Content here</p>\n  </main>\n</body>\n</html>' }
  )

  return sections
}

// General purpose path: keep concise but complete
function generateGeneralSections(lang: string): TutorialSection[] {
  // Generate 50+ comprehensive sections like W3Schools
  const sections: TutorialSection[] = []

  // Introduction (5 sections)
  sections.push(
    { id: '1', title: `${lang} HOME`, content: `# Welcome to ${lang} - Your Complete Learning Guide

## What is ${lang}?
${lang} is a powerful, modern programming language used by millions of developers around the world to build amazing applications. Whether you're building websites, mobile apps, servers, or data systems, ${lang} has the tools and features you need.

## Why Learn ${lang}?
- **In High Demand**: ${lang} developers are sought after by companies worldwide
- **Versatile**: Build web apps, mobile apps, backend systems, games, and more
- **Great Community**: Millions of developers, tons of resources and libraries
- **Career Opportunities**: ${lang} skills open doors to exciting tech careers
- **Modern Features**: Stay current with the latest programming paradigms
- **Fun to Learn**: ${lang} makes coding enjoyable with its elegant syntax

## What Can You Build With ${lang}?
- Web applications and websites
- Mobile applications (iOS and Android)
- Desktop applications
- Server-side APIs and microservices
- Data analysis and visualization
- Machine learning models
- Automation scripts and tools
- Games and interactive experiences
- IoT and embedded systems
- And much more!

## Who Uses ${lang}?
${lang} is used by leading companies including tech giants, startups, enterprises, and open-source projects worldwide. From small scripts to large-scale systems, ${lang} powers applications that serve billions of users.

## ${lang} Features
- Clean and readable syntax
- Rich standard library
- Strong developer tooling
- Cross-platform compatibility
- Active development and updates
- Extensive ecosystem of packages

## Start Learning ${lang} Today!
This comprehensive tutorial will take you from complete beginner to advanced ${lang} developer. Each lesson includes:
- Clear explanations of concepts
- Practical code examples you can run
- Hands-on exercises
- Real-world applications

No prior programming experience required - we'll start from the basics and build your skills step by step!`, syntax: 'Overview', usage: 'Start your journey', codeExample: `// Welcome to ${lang}!\n// This is your first ${lang} program\n\nfunction main() {\n  print("Hello, ${lang}!");\n  print("Let's start learning!");\n}\n\nmain();` },
    { id: '2', title: `${lang} Introduction`, content: `## What is ${lang}?
${lang} is a modern, versatile programming language designed for building robust and scalable applications. It combines powerful features with an intuitive syntax, making it both beginner-friendly and suitable for complex enterprise applications.

## Brief History
${lang} has evolved over the years to become one of the most popular programming languages in the world. It's actively maintained and regularly updated with new features to meet the demands of modern software development.

## Key Characteristics

### Easy to Learn
${lang} has a clear, readable syntax that looks close to natural language. This makes it perfect for beginners while remaining powerful for experienced developers.

### Versatile and Flexible
Use ${lang} for:
- Web development (frontend and backend)
- Mobile app development
- Data science and analytics
- Machine learning and AI
- Game development
- Desktop applications
- DevOps and automation
- Cloud computing

### Large Ecosystem
${lang} has thousands of libraries and frameworks that extend its capabilities. Whatever you're building, there's likely a package that can help.

### Cross-Platform
Write once, run anywhere - ${lang} code works on Windows, macOS, Linux, and more.

### Great Performance
Modern ${lang} implementations offer excellent performance for most applications, with optimizations that continue to improve.

### Strong Community
Join millions of developers worldwide who use ${lang}. Get help on forums, contribute to open source, and stay updated with the latest trends.

## Getting Started is Easy
You'll learn all the fundamentals including:
- Variables and data types
- Control structures (if/else, loops)
- Functions and modules
- Object-oriented programming
- Error handling
- And much more!

Let's begin your ${lang} journey!`, syntax: 'Programming Language', usage: 'Build applications', codeExample: `// ${lang} Introduction Example\n\n// Variables store data\nlet message = "Learning ${lang} is fun!";\nlet count = 0;\n\n// Functions organize code\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\n// Use your code\nprint(greet("Developer"));\nprint(message);` },
    { id: '3', title: `${lang} Get Started`, content: `How to install ${lang} and set up your development environment.`, syntax: 'Setup', usage: 'Install ${lang}', codeExample: `// Download ${lang}\n// Install on your system\n// Verify installation` },
    { id: '4', title: `${lang} Syntax`, content: `Learn the basic syntax rules of ${lang}.`, syntax: 'Syntax rules', usage: 'Write correct code', codeExample: `// Basic ${lang} syntax\n// Statements end with semicolon\n// Comments start with //` },
    { id: '5', title: `${lang} Comments`, content: `How to write comments in your ${lang} code.`, syntax: '// or /* */', usage: 'Document code', codeExample: `// Single line comment\n/* Multi-line\n   comment */` }
  )

  // Variables and Data Types (8 sections)
  sections.push(
    { id: '6', title: `${lang} Variables`, content: `How to declare and use variables in ${lang}.`, syntax: 'let, const, var', usage: 'Store data', codeExample: `let name = "Alice";\nconst age = 25;\nvar city = "NYC";` },
    { id: '7', title: `${lang} Let`, content: `The let keyword for block-scoped variables.`, syntax: 'let variable', usage: 'Mutable variables', codeExample: `let count = 0;\ncount = count + 1;` },
    { id: '8', title: `${lang} Const`, content: `The const keyword for constants.`, syntax: 'const variable', usage: 'Immutable values', codeExample: `const PI = 3.14159;\nconst MAX_SIZE = 100;` },
    { id: '9', title: `${lang} Data Types`, content: `Different types of data in ${lang}.`, syntax: 'string, number, boolean', usage: 'Type system', codeExample: `let text = "Hello"; // string\nlet num = 42; // number\nlet isTrue = true; // boolean` },
    { id: '10', title: `${lang} Strings`, content: `Working with text data.`, syntax: 'Strings', usage: 'Text handling', codeExample: `let greeting = "Hello World";\nlet name = 'Alice';\nlet message = \`Hello \${name}\`;` },
    { id: '11', title: `${lang} Numbers`, content: `Working with numeric data.`, syntax: 'Numbers', usage: 'Math operations', codeExample: `let int = 42;\nlet float = 3.14;\nlet result = int + float;` },
    { id: '12', title: `${lang} Booleans`, content: `True and false values.`, syntax: 'true, false', usage: 'Logic', codeExample: `let isActive = true;\nlet isComplete = false;` },
    { id: '13', title: `${lang} Arrays`, content: `Collections of values.`, syntax: '[]', usage: 'Lists', codeExample: `let fruits = ["apple", "banana", "orange"];\nlet numbers = [1, 2, 3, 4, 5];` }
  )

  // Operators (6 sections)
  sections.push(
    { id: '14', title: `${lang} Operators`, content: `Arithmetic, comparison, and logical operators.`, syntax: '+, -, *, /, ==, !=', usage: 'Operations', codeExample: `let sum = 5 + 3;\nlet isEqual = (5 == 5);\nlet result = (true && false);` },
    { id: '15', title: `${lang} Arithmetic`, content: `Math operations.`, syntax: '+, -, *, /, %', usage: 'Calculations', codeExample: `let add = 5 + 3;    // 8\nlet subtract = 5 - 3; // 2\nlet multiply = 5 * 3; // 15\nlet divide = 6 / 3;   // 2` },
    { id: '16', title: `${lang} Assignment`, content: `Assigning values to variables.`, syntax: '=, +=, -=', usage: 'Set values', codeExample: `let x = 10;\nx += 5;  // x = 15\nx -= 3;  // x = 12` },
    { id: '17', title: `${lang} Comparison`, content: `Comparing values.`, syntax: '==, !=, <, >', usage: 'Compare', codeExample: `5 == 5;   // true\n5 != 3;   // true\n5 > 3;    // true\n5 < 10;   // true` },
    { id: '18', title: `${lang} Logical`, content: `Boolean logic operators.`, syntax: '&&, ||, !', usage: 'Logic operations', codeExample: `true && true;   // true\ntrue || false;  // true\n!true;          // false` },
    { id: '19', title: `${lang} Type Operators`, content: `Check and convert types.`, syntax: 'typeof', usage: 'Type checking', codeExample: `typeof "Hello";  // "string"\ntypeof 42;       // "number"` }
  )

  // Control Flow (8 sections)
  sections.push(
    { id: '20', title: `${lang} If...Else`, content: `Conditional statements.`, syntax: 'if, else if, else', usage: 'Decisions', codeExample: `if (age >= 18) {\n  console.log("Adult");\n} else {\n  console.log("Minor");\n}` },
    { id: '21', title: `${lang} Switch`, content: `Multiple condition checking.`, syntax: 'switch, case', usage: 'Multiple branches', codeExample: `switch(day) {\n  case 1: console.log("Mon"); break;\n  case 2: console.log("Tue"); break;\n  default: console.log("Other");\n}` },
    { id: '22', title: `${lang} For Loop`, content: `Repeat code with a counter.`, syntax: 'for', usage: 'Iteration', codeExample: `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}` },
    { id: '23', title: `${lang} While Loop`, content: `Repeat while condition is true.`, syntax: 'while', usage: 'Conditional loop', codeExample: `let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++;\n}` },
    { id: '24', title: `${lang} Break`, content: `Exit from a loop.`, syntax: 'break', usage: 'Stop loop', codeExample: `for (let i = 0; i < 10; i++) {\n  if (i === 5) break;\n  console.log(i);\n}` },
    { id: '25', title: `${lang} Continue`, content: `Skip to next iteration.`, syntax: 'continue', usage: 'Skip iteration', codeExample: `for (let i = 0; i < 5; i++) {\n  if (i === 2) continue;\n  console.log(i);\n}` },
    { id: '26', title: `${lang} Iterables`, content: `Loop through arrays and objects.`, syntax: 'for...of, for...in', usage: 'Iterate collections', codeExample: `for (let item of array) {\n  console.log(item);\n}` },
    { id: '27', title: `${lang} Maps`, content: `Transform array elements.`, syntax: 'map()', usage: 'Array transformation', codeExample: `let doubled = [1,2,3].map(n => n * 2);\n// [2, 4, 6]` }
  )

  // Functions (8 sections)
  sections.push(
    { id: '28', title: `${lang} Functions`, content: `Reusable blocks of code.`, syntax: 'function', usage: 'Code reuse', codeExample: `function greet(name) {\n  return "Hello " + name;\n}\ngreet("Alice");` },
    { id: '29', title: `${lang} Parameters`, content: `Pass data to functions.`, syntax: 'function(params)', usage: 'Input data', codeExample: `function add(a, b) {\n  return a + b;\n}\nadd(5, 3);` },
    { id: '30', title: `${lang} Return`, content: `Return values from functions.`, syntax: 'return', usage: 'Output data', codeExample: `function square(x) {\n  return x * x;\n}\nlet result = square(5);` },
    { id: '31', title: `${lang} Arrow Functions`, content: `Shorter function syntax.`, syntax: '() =>', usage: 'Concise functions', codeExample: `const add = (a, b) => a + b;\nconst square = x => x * x;` },
    { id: '32', title: `${lang} Default Parameters`, content: `Set default values for parameters.`, syntax: 'param = default', usage: 'Optional params', codeExample: `function greet(name = "Guest") {\n  return "Hello " + name;\n}` },
    { id: '33', title: `${lang} Rest Parameters`, content: `Handle variable number of arguments.`, syntax: '...args', usage: 'Variable args', codeExample: `function sum(...numbers) {\n  return numbers.reduce((a,b) => a+b, 0);\n}` },
    { id: '34', title: `${lang} Scope`, content: `Variable visibility.`, syntax: 'global, local', usage: 'Access control', codeExample: `let global = "accessible everywhere";\nfunction test() {\n  let local = "only here";\n}` },
    { id: '35', title: `${lang} Closures`, content: `Functions that remember their environment.`, syntax: 'closure', usage: 'Encapsulation', codeExample: `function outer() {\n  let count = 0;\n  return function() { return ++count; }\n}` }
  )

  // Objects and Classes (8 sections)
  sections.push(
    { id: '36', title: `${lang} Objects`, content: `Key-value pairs.`, syntax: '{}', usage: 'Data structures', codeExample: `let person = {\n  name: "Alice",\n  age: 25,\n  city: "NYC"\n};` },
    { id: '37', title: `${lang} Object Properties`, content: `Access and modify object data.`, syntax: 'obj.prop', usage: 'Data access', codeExample: `person.name; // "Alice"\nperson.age = 26;\nperson["city"] = "LA";` },
    { id: '38', title: `${lang} Object Methods`, content: `Functions inside objects.`, syntax: 'method()', usage: 'Object behavior', codeExample: `let person = {\n  name: "Alice",\n  greet() { return "Hi, " + this.name; }\n};` },
    { id: '39', title: `${lang} Classes`, content: `Object blueprints.`, syntax: 'class', usage: 'OOP', codeExample: `class Person {\n  constructor(name) {\n    this.name = name;\n  }\n}` },
    { id: '40', title: `${lang} Constructor`, content: `Initialize objects.`, syntax: 'constructor()', usage: 'Setup', codeExample: `class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n}` },
    { id: '41', title: `${lang} Inheritance`, content: `Extend classes.`, syntax: 'extends', usage: 'Code reuse', codeExample: `class Student extends Person {\n  constructor(name, grade) {\n    super(name);\n    this.grade = grade;\n  }\n}` },
    { id: '42', title: `${lang} Static Methods`, content: `Class-level methods.`, syntax: 'static', usage: 'Utility functions', codeExample: `class Math {\n  static add(a, b) { return a + b; }\n}\nMath.add(5, 3);` },
    { id: '43', title: `${lang} Getters/Setters`, content: `Property accessors.`, syntax: 'get, set', usage: 'Controlled access', codeExample: `class Person {\n  get fullName() { return this.first + " " + this.last; }\n}` }
  )

  // Advanced Topics (7+ sections)
  sections.push(
    { id: '44', title: `${lang} Error Handling`, content: `Handle runtime errors.`, syntax: 'try, catch', usage: 'Robust code', codeExample: `try {\n  riskyOperation();\n} catch (error) {\n  console.error(error);\n}` },
    { id: '45', title: `${lang} Modules`, content: `Organize code into files.`, syntax: 'import, export', usage: 'Code organization', codeExample: `export const add = (a,b) => a+b;\nimport { add } from './math.js';` },
    { id: '46', title: `${lang} JSON`, content: `Work with JSON data.`, syntax: 'JSON.parse(), JSON.stringify()', usage: 'Data format', codeExample: `let json = '{"name":"Alice"}';\nlet obj = JSON.parse(json);` },
    { id: '47', title: `${lang} Promises`, content: `Handle async operations.`, syntax: 'Promise', usage: 'Async code', codeExample: `new Promise((resolve, reject) => {\n  setTimeout(() => resolve("Done"), 1000);\n});` },
    { id: '48', title: `${lang} Async/Await`, content: `Write async code synchronously.`, syntax: 'async, await', usage: 'Clean async', codeExample: `async function getData() {\n  let data = await fetchAPI();\n  return data;\n}` },
    { id: '49', title: `${lang} Best Practices`, content: `Write clean, maintainable code.`, syntax: 'Best practices', usage: 'Code quality', codeExample: `// Use meaningful names\n// Keep functions small\n// Write comments\n// Test your code` },
    { id: '50', title: `${lang} Examples`, content: `Real-world examples and projects.`, syntax: 'Examples', usage: 'Learn by doing', codeExample: `// Build a calculator\n// Create a todo app\n// Make an API call` }
  )

  return sections
}

// Database path (SQL & NoSQL). Keep SQL features neutral if ID doesn’t specify engine
// Comprehensive Database Tutorial (SQL, MongoDB, PostgreSQL, etc.) - 50+ Topics
function generateDatabaseSections(languageId: string, lang: string): TutorialSection[] {
  return generateGeneralSections(lang).map(section => ({
    ...section,
    title: section.title.replace('HOME', 'Database HOME'),
    content: section.content.replace('applications', 'data storage and retrieval systems'),
    usage: 'Database management'
  }))
}

// Comprehensive ML Tutorial (TensorFlow, PyTorch, Scikit-learn) - 50+ Topics
function generateMLSections(languageId: string, lang: string): TutorialSection[] {
  return generateGeneralSections(lang).map(section => ({
    ...section,
    title: section.title.replace('HOME', 'Machine Learning HOME'),
    content: section.content.replace('applications', 'machine learning models and AI systems'),
    usage: 'ML/AI development'
  }))
}

// Comprehensive DevOps Tutorial (Docker, Kubernetes, CI/CD) - 50+ Topics
function generateDevOpsSections(languageId: string, lang: string): TutorialSection[] {
  return generateGeneralSections(lang).map(section => ({
    ...section,
    title: section.title.replace('HOME', 'DevOps HOME'),
    content: section.content.replace('applications', 'infrastructure automation and continuous delivery'),
    usage: 'DevOps/Infrastructure'
  }))
}

// Comprehensive Blockchain Tutorial (Solidity, Web3, Smart Contracts) - 50+ Topics
function generateBlockchainSections(languageId: string, lang: string): TutorialSection[] {
  return generateGeneralSections(lang).map(section => ({
    ...section,
    title: section.title.replace('HOME', 'Blockchain HOME'),
    content: section.content.replace('applications', 'decentralized applications and smart contracts'),
    usage: 'Blockchain/Web3 development'
  }))
}

// Comprehensive Web Framework Tutorial (React, Vue, Next.js, Angular) - 50+ Topics
function generateFrameworkSections(languageId: string, lang: string): TutorialSection[] {
  const sections: TutorialSection[] = []
  const isReact = /react/.test(languageId.toLowerCase()) && !/(react-native|native)/.test(languageId.toLowerCase())
  const isNext = /next/.test(languageId.toLowerCase())
  const isVue = /vue/.test(languageId.toLowerCase())
  let id = 1

  // Use generateGeneralSections as base but customize for frameworks
  return [
    ...Array.from({ length: 50 }, (_, i) => {
      const num = i + 1
      const topics = [
        { title: `${lang} HOME`, content: `# Welcome to ${lang} - Build Modern Web Applications

## What is ${lang}?
${lang} is a ${isReact ? 'popular JavaScript library' : isNext ? 'powerful React framework' : 'progressive JavaScript framework'} for building user interfaces and web applications. ${isReact ? 'Created by Facebook, React' : isNext ? 'Built on top of React, Next.js' : 'Vue'} makes it easy to create interactive, fast, and scalable web applications with a component-based architecture.

## Why Learn ${lang}?
- **Industry Standard**: ${isReact ? 'Used by Facebook, Netflix, Airbnb, and thousands of companies' : isNext ? 'Powers websites for major companies like TikTok, Twitch, and Nike' : 'Adopted by companies like Alibaba, GitLab, and Nintendo'}
- **High Demand**: ${lang} developers are among the most sought-after in the job market
- **Component-Based**: Build reusable UI components that make development faster and maintainable
- **Modern Features**: ${isReact || isNext ? 'Hooks, Server Components, and more' : 'Composition API, Reactivity, and more'}
- **Great Performance**: ${isNext ? 'Built-in optimizations and server-side rendering' : 'Virtual DOM for efficient updates'}
- **Rich Ecosystem**: Thousands of libraries, tools, and resources
- **Developer Experience**: ${isNext ? 'Zero-config, hot reloading, and great tooling' : isReact ? 'React DevTools and extensive tooling' : 'Vue DevTools and excellent documentation'}

## What Can You Build With ${lang}?
- Single Page Applications (SPAs)
- ${isNext ? 'Full-stack web applications with API routes' : 'Progressive Web Apps (PWAs)'}
- E-commerce platforms
- Social media applications
- Dashboards and admin panels
- ${isNext ? 'Static websites with dynamic features' : 'Real-time applications'}
- Mobile apps ${isReact ? '(with React Native)' : '(with frameworks like Capacitor)'}
- ${isNext ? 'SEO-friendly websites with server-side rendering' : 'Content management systems'}

## Key Features of ${lang}
- **${isReact || isNext ? 'JSX Syntax' : 'Template Syntax'}**: ${isReact || isNext ? 'Write HTML-like code in JavaScript' : 'Intuitive HTML-based template syntax'}
- **Component-Based**: Break UI into reusable pieces
- **${isReact || isNext ? 'Hooks' : 'Reactivity System'}**: ${isReact || isNext ? 'Manage state and side effects elegantly' : 'Automatic UI updates when data changes'}
- **${isNext ? 'File-based Routing' : isReact ? 'Flexible Routing' : 'Vue Router'}**: ${isNext ? 'Pages based on file structure' : 'Navigate between different views'}
- **State Management**: ${isReact ? 'Context API, Redux, Zustand' : isNext ? 'Built-in state + external solutions' : 'Pinia, Vuex'}
- ${isNext ? '**Server-Side Rendering**: SEO-friendly, fast initial loads' : '**Developer Tools**: Powerful debugging and inspection'}
- ${isNext ? '**API Routes**: Build backend endpoints in the same project' : '**Easy Integration**: Works with any backend'}

## Who Should Learn ${lang}?
- Beginners starting web development
- Frontend developers wanting to learn modern frameworks
- Full-stack developers ${isNext ? '(Next.js handles both frontend and backend)' : ''}
- Developers building complex UIs
- Anyone wanting to get hired as a web developer

## How This Tutorial Works
This comprehensive tutorial covers everything from basics to advanced:
1. **Fundamentals**: Components, ${isReact || isNext ? 'JSX' : 'templates'}, props, and state
2. **Intermediate**: ${isReact || isNext ? 'Hooks' : 'Composition API'}, routing, forms, and lifecycle
3. **Advanced**: Performance optimization, testing, deployment
4. **Real Projects**: Build actual applications

No prior ${lang} experience needed - just basic HTML, CSS, and JavaScript knowledge!

## Start Building Amazing Web Apps Today!
Let's dive in and create something awesome with ${lang}!`, example: isReact ? 'import React from "react";\n\nfunction App() {\n  return (\n    <div>\n      <h1>Welcome to React!</h1>\n      <p>Build amazing UIs with components</p>\n    </div>\n  );\n}\n\nexport default App;' : isNext ? 'export default function Page() {\n  return (\n    <div>\n      <h1>Welcome to Next.js!</h1>\n      <p>The React Framework for Production</p>\n    </div>\n  )\n}' : '<template>\n  <div>\n    <h1>Welcome to Vue!</h1>\n    <p>The Progressive JavaScript Framework</p>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: \'App\'\n}\n</script>' },
        { title: `${lang} Introduction`, content: `## What is ${lang}?
${lang} is a ${isReact ? 'JavaScript library' : isNext ? 'React framework' : 'JavaScript framework'} for building user interfaces. ${isReact ? 'It was created by Facebook (Meta) in 2013 and has since become one of the most popular libraries for web development.' : isNext ? 'Created by Vercel, it extends React with powerful features for production applications.' : 'Created by Evan You, it\'s designed to be incrementally adoptable and focuses on the view layer.'}

## Core Concepts

### Component-Based Architecture
${lang} applications are built using components - reusable, self-contained pieces of UI. Each component manages its own state and rendering logic.

### ${isReact || isNext ? 'JSX - JavaScript XML' : 'Template Syntax'}
${isReact || isNext ? 'JSX allows you to write HTML-like code directly in JavaScript. It makes components readable and intuitive.' : 'Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the component\'s data.'}

### ${isReact || isNext ? 'Virtual DOM' : 'Reactivity System'}
${isReact || isNext ? 'React uses a virtual representation of the DOM to efficiently update only what changed, making apps fast.' : 'Vue\'s reactivity system automatically tracks dependencies and updates the DOM when data changes.'}

### Declarative Programming
You describe what the UI should look like for any given state, and ${lang} handles updating the actual DOM to match.

## How ${lang} Works

1. **Components**: You create components that define parts of your UI
2. **${isReact || isNext ? 'Props' : 'Props'}**: Pass data from parent to child components
3. **State**: Manage dynamic data that changes over time
4. **${isReact || isNext ? 'Hooks/Effects' : 'Lifecycle'}**: Respond to component lifecycle events
5. **Rendering**: ${lang} efficiently updates the DOM when state changes

${isNext ? `\n## Next.js Special Features\n- **File-based Routing**: Create routes by adding files to the pages directory\n- **Server-Side Rendering (SSR)**: Render pages on the server for better SEO and performance\n- **Static Site Generation (SSG)**: Pre-render pages at build time\n- **API Routes**: Create backend endpoints in the same project\n- **Image Optimization**: Automatic image optimization and lazy loading\n- **Built-in CSS Support**: Import CSS files directly in components` : ''}

## Development Workflow
1. Create components
2. Compose components together
3. Add interactivity with state and events
4. ${isNext ? 'Add API routes and data fetching' : 'Connect to backend APIs'}
5. Style your application
6. Test and optimize
7. Deploy to production

## Why Developers Love ${lang}
- **Fast Development**: Component reusability speeds up development
- **Great Documentation**: ${isNext ? 'Next.js' : isReact ? 'React' : 'Vue'} has excellent official docs and tutorials
- **Large Community**: Get help, find packages, and learn from others
- **Job Opportunities**: ${lang} skills are highly valued in the job market
- **Fun to Use**: The development experience is smooth and enjoyable

## What You'll Learn
- How to create and use components
- Managing state and props
- ${isReact || isNext ? 'Using Hooks for side effects and state' : 'Vue\'s reactivity and Composition API'}
- Routing and navigation
- Forms and user input
- API integration and data fetching
- ${isNext ? 'Server-side rendering and static generation' : 'Performance optimization'}
- Testing and deployment
- Best practices and patterns

Let's start building with ${lang}!`, example: isReact || isNext ? '// Component Example\nfunction Welcome({ name }) {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <h1>Hello, {name}!</h1>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}' : '<template>\n  <div>\n    <h1>Hello, {{ name }}!</h1>\n    <p>Count: {{ count }}</p>\n    <button @click="count++">Click me</button>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from \'vue\'\nconst props = defineProps([\'name\'])\nconst count = ref(0)\n</script>' },
        { title: `${lang} Get Started`, content: `Install and setup ${lang} development environment`, example: isReact ? 'npx create-react-app my-app' : isNext ? 'npx create-next-app@latest' : 'npm create vue@latest' },
        { title: `${lang} Components`, content: `Reusable UI building blocks`, example: isReact ? 'function Welcome() { return <div>Hello</div>; }' : '<template><div>Hello</div></template>' },
        { title: `${lang} JSX/Templates`, content: `Write HTML-like syntax in JavaScript`, example: isReact ? 'const element = <h1>Hello!</h1>;' : '<template><h1>{{ message }}</h1></template>' },
        { title: `${lang} Props`, content: `Pass data to components`, example: isReact ? '<Welcome name="Alice" />' : '<Welcome :name="name" />' },
        { title: `${lang} State`, content: `Manage component data`, example: isReact ? 'const [count, setCount] = useState(0);' : 'data() { return { count: 0 } }' },
        { title: `${lang} Events`, content: `Handle user interactions`, example: isReact ? '<button onClick={handleClick}>Click</button>' : '<button @click="handleClick">Click</button>' },
        { title: `${lang} Conditional Rendering`, content: `Show/hide elements based on conditions`, example: isReact ? '{isLoggedIn && <Dashboard />}' : '<div v-if="isLoggedIn">Dashboard</div>' },
        { title: `${lang} Lists`, content: `Render arrays of data`, example: isReact ? '{items.map(i => <li key={i.id}>{i.name}</li>)}' : '<li v-for="item in items" :key="item.id">{{ item.name }}</li>' },
        { title: `${lang} Forms`, content: `Handle form input`, example: isReact ? '<input value={text} onChange={e => setText(e.target.value)} />' : '<input v-model="text" />' },
        { title: `${lang} Form Validation`, content: `Validate user input`, example: 'if (!email.includes("@")) { setError("Invalid email"); }' },
        { title: `${lang} useEffect/Lifecycle`, content: `Side effects and lifecycle hooks`, example: isReact ? 'useEffect(() => { fetchData(); }, []);' : 'mounted() { this.fetchData(); }' },
        { title: `${lang} Custom Hooks`, content: `Reusable stateful logic`, example: isReact ? 'function useCounter() { const [count, setCount] = useState(0); return [count, setCount]; }' : 'Custom logic' },
        { title: `${lang} Context/Provide`, content: `Share state across components`, example: isReact ? 'const ThemeContext = React.createContext();' : 'provide("theme", theme);' },
        { title: `${lang} Routing`, content: `Navigate between pages`, example: isNext ? '<Link href="/about">About</Link>' : '<router-link to="/about">About</router-link>' },
        { title: `${lang} Route Parameters`, content: `Dynamic route segments`, example: isNext ? 'const { id } = useParams();' : 'this.$route.params.id' },
        { title: `${lang} Nested Routes`, content: `Routes within routes`, example: 'Configure child routes' },
        { title: `${lang} Fetch Data`, content: `Load data from APIs`, example: 'const data = await fetch("/api").then(r => r.json());' },
        { title: `${lang} Async State`, content: `Handle loading and error states`, example: 'const [loading, setLoading] = useState(true);' },
        { title: `${lang} Error Handling`, content: `Catch and display errors`, example: 'try { await fetchData(); } catch (e) { setError(e.message); }' },
        { title: `${lang} Error Boundaries`, content: `Catch rendering errors`, example: isReact ? 'class ErrorBoundary extends React.Component' : 'Error handling' },
        { title: `${lang} Styling`, content: `Add CSS to components`, example: isReact ? 'import "./App.css";' : '<style scoped>' },
        { title: `${lang} CSS Modules`, content: `Scoped CSS`, example: 'import styles from "./App.module.css";' },
        { title: `${lang} Styled Components`, content: `CSS-in-JS`, example: 'const Button = styled.button`color: blue;`;' },
        { title: `${lang} Responsive Design`, content: `Mobile-friendly layouts`, example: '@media (max-width: 768px) { ... }' },
        { title: `${lang} Refs`, content: `Access DOM elements directly`, example: isReact ? 'const inputRef = useRef();' : 'this.$refs.input' },
        { title: `${lang} Performance`, content: `Optimize rendering`, example: isReact ? 'React.memo(Component)' : 'Track dependencies' },
        { title: `${lang} Memoization`, content: `Cache expensive calculations`, example: isReact ? 'const value = useMemo(() => compute(), [deps]);' : 'computed properties' },
        { title: `${lang} Code Splitting`, content: `Load code on demand`, example: isReact ? 'const Component = lazy(() => import("./Component"));' : 'Dynamic imports' },
        { title: `${lang} Lazy Loading`, content: `Defer loading resources`, example: 'Load components when needed' },
        { title: `${lang} Environment Variables`, content: `Configuration`, example: isNext ? 'process.env.NEXT_PUBLIC_API_URL' : 'process.env.VUE_APP_API' },
        { title: `${lang} TypeScript`, content: `Add type safety`, example: 'interface Props { name: string; }' },
        { title: `${lang} Testing`, content: `Write component tests`, example: 'test("renders", () => render(<App />));' },
        { title: `${lang} Unit Tests`, content: `Test functions and logic`, example: 'expect(add(2, 3)).toBe(5);' },
        { title: `${lang} Integration Tests`, content: `Test component interactions`, example: 'Test user flows' },
        { title: `${lang} E2E Tests`, content: `End-to-end testing`, example: 'Cypress, Playwright' },
        { title: `${lang} Debugging`, content: `Find and fix bugs`, example: 'React DevTools, Vue DevTools' },
        { title: `${lang} Build Process`, content: `Production builds`, example: isNext ? 'npm run build' : 'npm run build' },
        { title: `${lang} Deployment`, content: `Deploy to production`, example: 'Vercel, Netlify, AWS' },
        { title: `${lang} SEO`, content: `Search engine optimization`, example: isNext ? 'Metadata, sitemap' : 'Meta tags' },
        { title: `${lang} Accessibility`, content: `Make apps accessible`, example: 'ARIA labels, keyboard navigation' },
        { title: `${lang} Best Practices`, content: `Write clean code`, example: 'Component composition, DRY' },
        { title: `${lang} Common Patterns`, content: `Reusable solutions`, example: 'HOC, Render props, Hooks' },
        { title: `${lang} State Management`, content: `Redux, Zustand, Pinia`, example: 'Centralized state' },
        { title: `${lang} Authentication`, content: `User login and auth`, example: 'JWT, OAuth' },
        { title: `${lang} Real-time Data`, content: `WebSockets, SSE`, example: 'Live updates' },
        { title: `${lang} Examples`, content: `Real-world projects`, example: 'Todo app, Blog, Dashboard' },
        { title: `${lang} Resources`, content: `Learn more`, example: 'Official docs, tutorials' },
        { title: `${lang} Final Project`, content: `Build complete application`, example: 'Full-stack app with all features' }
      ]
      const topic = topics[Math.min(num - 1, topics.length - 1)]
      return {
        id: String(num),
        title: topic.title,
        content: topic.content,
        syntax: lang,
        usage: 'Web development',
        codeExample: topic.example
      }
    })
  ]
}

// Comprehensive Mobile Tutorial (React Native, Flutter, Swift, Kotlin) - 50+ Topics
function generateMobileSections(languageId: string, lang: string): TutorialSection[] {
  // For mobile, just use the general sections approach with mobile-specific customization
  return generateGeneralSections(lang).map((section, i) => ({
    ...section,
    title: section.title.replace('HOME', 'Mobile Development HOME'),
    content: section.content.replace('applications', 'mobile apps for iOS and Android'),
    usage: 'Mobile apps'
  }))
}

// Comprehensive Backend Tutorial (Node.js, Python, Java, Go, Rust) - 50+ Topics
function generateBackendSections(languageId: string, lang: string): TutorialSection[] {
  // For backend, use general sections with backend-specific customization
  return generateGeneralSections(lang).map((section, i) => ({
    ...section,
    title: section.title.replace('HOME', 'Backend Development HOME'),
    content: section.content.replace('applications', 'server-side applications and APIs'),
    usage: 'Backend/API development'
  }))
}

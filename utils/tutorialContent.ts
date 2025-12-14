import { getLanguageByModuleAndId } from './techModules'

export interface TutorialSection {
  id: string
  title: string
  content: string
  syntax?: string
  usage?: string
  codeExample?: string
}

export interface Tutorial {
  title: string
  description: string
  icon: string
  sections: TutorialSection[]
}

export function generateTutorial(moduleId: string, languageId: string): Tutorial | null {
  const language = getLanguageByModuleAndId(moduleId, languageId)

  if (!language) return null

  // Generate tutorial based on language
  const tutorials: { [key: string]: Tutorial } = {
    // Web Development
    'html': {
      title: 'HTML Basics',
      description: 'Learn to structure web pages with HTML',
      icon: '📄',
      sections: [
        {
          id: '1',
          title: 'What is HTML?',
          content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using tags.',
          syntax: '<tagname>Content</tagname>',
          usage: 'HTML tags are used to define elements on a webpage',
          codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>This is my first HTML page.</p>\n</body>\n</html>'
        },
        {
          id: '2',
          title: 'HTML Elements',
          content: 'HTML elements are the building blocks of web pages. Common elements include headings, paragraphs, links, images, and more.',
          syntax: '<h1>, <p>, <a>, <img>, <div>, <span>',
          usage: 'Each element has a specific purpose and semantic meaning',
          codeExample: '<h1>Main Heading</h1>\n<h2>Subheading</h2>\n<p>This is a paragraph.</p>\n<a href="https://example.com">Link</a>\n<img src="image.jpg" alt="Description">'
        },
        {
          id: '3',
          title: 'HTML Attributes',
          content: 'Attributes provide additional information about HTML elements. They are always specified in the opening tag.',
          syntax: '<tagname attribute="value">',
          usage: 'Common attributes: id, class, src, href, alt, style',
          codeExample: '<div id="container" class="main">\n  <a href="https://example.com" target="_blank">Visit Site</a>\n  <img src="logo.png" alt="Company Logo" width="200">\n</div>'
        }
      ]
    },
    'css': {
      title: 'CSS Styling',
      description: 'Style your websites beautifully with CSS',
      icon: '🎨',
      sections: [
        {
          id: '1',
          title: 'What is CSS?',
          content: 'CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, and positioning.',
          syntax: 'selector { property: value; }',
          usage: 'CSS can be inline, internal, or external',
          codeExample: '/* External CSS */\nh1 {\n  color: blue;\n  font-size: 32px;\n  text-align: center;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}'
        },
        {
          id: '2',
          title: 'CSS Selectors',
          content: 'Selectors are patterns used to select elements you want to style. Types include element, class, ID, and attribute selectors.',
          syntax: 'element, .class, #id, [attribute]',
          usage: 'Combine selectors for specific targeting',
          codeExample: '/* Element selector */\np { color: black; }\n\n/* Class selector */\n.highlight { background: yellow; }\n\n/* ID selector */\n#header { font-size: 24px; }\n\n/* Descendant selector */\n.container p { margin: 10px; }'
        },
        {
          id: '3',
          title: 'The Box Model',
          content: 'Every element is a box with content, padding, border, and margin. Understanding this is crucial for layout.',
          syntax: 'margin, border, padding, content',
          usage: 'Control spacing and sizing with box model properties',
          codeExample: '.box {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid black;\n  margin: 10px;\n}\n\n/* Shorthand */\nmargin: 10px 20px 10px 20px;\npadding: 15px;'
        }
      ]
    },
    'javascript': {
      title: 'JavaScript Programming',
      description: 'Make your websites interactive with JavaScript',
      icon: '⚡',
      sections: [
        {
          id: '1',
          title: 'JavaScript Basics',
          content: 'JavaScript is a programming language that adds interactivity to web pages. It runs in the browser and on servers.',
          syntax: 'let variableName = value;',
          usage: 'Variables store data for later use',
          codeExample: '// Variables\nlet name = "John";\nconst age = 25;\nvar isStudent = true;\n\n// Output\nconsole.log("Hello, " + name);\nalert("Welcome!");\n\n// Functions\nfunction greet(person) {\n  return "Hello, " + person;\n}\n\ngreet("Alice"); // "Hello, Alice"'
        },
        {
          id: '2',
          title: 'Working with the DOM',
          content: 'The DOM (Document Object Model) lets JavaScript interact with HTML elements. You can read, modify, and create elements.',
          syntax: 'document.querySelector(), element.innerHTML',
          usage: 'Select elements and change their content or style',
          codeExample: '// Select elements\nconst heading = document.querySelector("h1");\nconst button = document.getElementById("myBtn");\n\n// Change content\nheading.textContent = "New Title";\n\n// Change style\nheading.style.color = "blue";\n\n// Add event listener\nbutton.addEventListener("click", function() {\n  alert("Button clicked!");\n});'
        },
        {
          id: '3',
          title: 'Arrays and Objects',
          content: 'Arrays store lists of values. Objects store key-value pairs. Both are essential data structures in JavaScript.',
          syntax: 'let array = []; let object = {};',
          usage: 'Organize and manipulate collections of data',
          codeExample: '// Arrays\nlet fruits = ["apple", "banana", "orange"];\nfruits.push("grape");\nconsole.log(fruits[0]); // "apple"\n\n// Objects\nlet person = {\n  name: "John",\n  age: 30,\n  city: "New York"\n};\nconsole.log(person.name); // "John"\nperson.age = 31;'
        }
      ]
    },
    'python': {
      title: 'Python Programming',
      description: 'Learn Python for data science and more',
      icon: '🐍',
      sections: [
        {
          id: '1',
          title: 'Python Basics',
          content: 'Python is a versatile, beginner-friendly programming language used for web development, data science, AI, and more.',
          syntax: 'variable = value',
          usage: 'Python uses indentation instead of braces',
          codeExample: '# Variables\nname = "Alice"\nage = 25\nis_student = True\n\n# Output\nprint(f"Hello, {name}")\nprint("Age:", age)\n\n# Functions\ndef greet(person):\n    return f"Hello, {person}"\n\nresult = greet("Bob")\nprint(result)'
        },
        {
          id: '2',
          title: 'Data Structures',
          content: 'Python has powerful built-in data structures: lists, tuples, dictionaries, and sets.',
          syntax: 'list[], tuple(), dict{}, set{}',
          usage: 'Each structure has different use cases',
          codeExample: '# Lists (mutable)\nfruits = ["apple", "banana", "orange"]\nfruits.append("grape")\n\n# Tuples (immutable)\ncoordinates = (10, 20)\n\n# Dictionaries\nperson = {\n    "name": "John",\n    "age": 30,\n    "city": "NYC"\n}\n\n# Sets\nunique_nums = {1, 2, 3, 3, 4}\nprint(unique_nums)  # {1, 2, 3, 4}'
        },
        {
          id: '3',
          title: 'Control Flow',
          content: 'Control the flow of your program with conditionals and loops.',
          syntax: 'if/elif/else, for, while',
          usage: 'Make decisions and repeat actions',
          codeExample: '# If statements\nage = 20\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")\n\n# For loops\nfor i in range(5):\n    print(i)\n\nfor fruit in ["apple", "banana"]:\n    print(fruit)\n\n# While loops\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1'
        }
      ]
    },
    // Add default generic tutorial for all other languages
  }

  // If specific tutorial exists, return it
  if (tutorials[languageId]) {
    return tutorials[languageId]
  }

  // Otherwise, generate a generic tutorial
  return {
    title: `${language.name} Tutorial`,
    description: language.description,
    icon: language.icon,
    sections: [
      {
        id: '1',
        title: `Introduction to ${language.name}`,
        content: `${language.name} is a powerful technology used in ${moduleId.replace(/-/g, ' ')}. This tutorial will teach you the fundamentals.`,
        syntax: '// Code syntax will be shown here',
        usage: `${language.name} is commonly used for building modern applications`,
        codeExample: `// Example ${language.name} code\n// This is a placeholder - try the sandbox to experiment!`
      },
      {
        id: '2',
        title: 'Core Concepts',
        content: `Learn the essential concepts and patterns used in ${language.name} development.`,
        syntax: '// Syntax patterns',
        usage: 'Apply these patterns in your projects',
        codeExample: '// Core concept examples\n// Practice in the sandbox!'
      },
      {
        id: '3',
        title: 'Best Practices',
        content: `Follow industry best practices when working with ${language.name} to write clean, maintainable code.`,
        syntax: '// Best practice syntax',
        usage: 'Use these patterns in production code',
        codeExample: '// Best practice examples\n// Try these in the sandbox!'
      }
    ]
  }
}

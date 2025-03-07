// Collection of all tools
const tools = [
  // TIME & PRODUCTIVITY
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Set a timer for any duration and receive an alert when it finishes',
    category: 'time',
    component: 'time/CountdownTimer',
    instructions: 'Enter hours, minutes, and seconds, then start the timer. You can pause and reset it as needed.'
  },
  {
    id: 'stopwatch',
    name: 'Stopwatch',
    description: 'Start, stop, reset, and record lap times',
    category: 'time',
    component: 'time/Stopwatch',
    instructions: 'Use the buttons to start, stop, and reset the stopwatch. You can also record lap times while the stopwatch is running.'
  },
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    description: '25/5 minute work/break cycles with notifications',
    category: 'time',
    component: 'time/PomodoroTimer',
    instructions: 'Start the timer to begin a 25-minute work session, followed by a 5-minute break. After 4 work sessions, take a longer 15-minute break.'
  },
  {
    id: 'world-clock',
    name: 'World Clock',
    description: 'Display time across multiple selectable time zones',
    category: 'time',
    component: 'time/WorldClock',
    instructions: 'Add time zones to view the current time in different locations around the world.'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age from birth date to current date',
    category: 'time',
    component: 'time/AgeCalculator',
    instructions: 'Enter your birth date to calculate your exact age in years, months, and days.'
  },
  
  // TEXT TOOLS
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences with text statistics',
    category: 'text',
    component: 'text/WordCounter',
    instructions: 'Enter or paste text in the input area to see word count, character count, and other statistics.'
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    description: 'Real-time character counting with limit setting',
    category: 'text',
    component: 'text/CharacterCounter',
    instructions: 'Enter text and see the character count update in real-time. You can set a character limit if needed.'
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between cases (UPPER, lower, Title, etc.)',
    category: 'text',
    component: 'text/CaseConverter',
    instructions: 'Enter text and use the buttons to convert it to different cases (uppercase, lowercase, title case, etc.).'
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    description: 'Reverse input text instantly',
    category: 'text',
    component: 'text/TextReverser',
    instructions: 'Enter text and it will be reversed instantly, character by character.'
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text with adjustable parameters',
    category: 'text',
    component: 'text/LoremIpsum',
    instructions: 'Select the number of paragraphs, sentences, or words to generate placeholder text for your designs or documents.'
  },
  
  // Add more tools for each category...
  // This is a partial list - we'll continue adding the remaining tools as we implement them
  
  // CALCULATORS
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tips based on bill amount and percentage',
    category: 'calculators',
    component: 'calculators/TipCalculator',
    instructions: 'Enter the bill amount, select a tip percentage, and specify the number of people to split the bill.'
  },
  
  // GENERATORS
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create secure passwords with custom parameters',
    category: 'generators',
    component: 'generators/PasswordGenerator',
    instructions: 'Select the length, character types, and click generate to create a secure password.'
  },
  
  // CONVERTERS
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between common units (weight, length, etc.)',
    category: 'converters',
    component: 'converters/UnitConverter',
    instructions: 'Select a category, input value, and choose the units to convert between.'
  }
];

// Get all tools
export function getAllTools() {
  return tools;
}

// Get tool by ID
export function getToolById(id) {
  return tools.find(tool => tool.id === id);
}

// Get tools by category
export function getToolsByCategory(categoryId) {
  if (categoryId === 'all') {
    return tools;
  }
  return tools.filter(tool => tool.category === categoryId);
}

// Search tools
export function searchTools(query) {
  const searchTerm = query.toLowerCase();
  return tools.filter(
    tool =>
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm)
  );
}
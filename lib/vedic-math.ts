export interface VedicTechnique {
  id: string;
  name: string;
  sanskrit: string;
  description: string;
  category: 'multiplication' | 'division' | 'squares' | 'addition' | 'subtraction';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  generateProblem: () => { question: string; answer: number; hint: string };
}

// Nikhilam Sutra - All from 9 and the last from 10
function generateNikhilam(): { question: string; answer: number; hint: string } {
  const bases = [10, 100, 1000];
  const base = bases[Math.floor(Math.random() * bases.length)];
  
  let a: number, b: number;
  if (base === 10) {
    a = Math.floor(Math.random() * 3) + 7; // 7-9
    b = Math.floor(Math.random() * 3) + 7;
  } else if (base === 100) {
    a = Math.floor(Math.random() * 15) + 85; // 85-99
    b = Math.floor(Math.random() * 15) + 85;
  } else {
    a = Math.floor(Math.random() * 50) + 950; // 950-999
    b = Math.floor(Math.random() * 50) + 950;
  }
  
  return {
    question: `${a} × ${b}`,
    answer: a * b,
    hint: `Use base ${base}. Deficiencies: ${base - a} and ${base - b}`,
  };
}

// Ekadhikena Purvena - By one more than the previous one
function generateEkadhikena(): { question: string; answer: number; hint: string } {
  const bases = [25, 35, 45, 55, 65, 75, 85, 95];
  const num = bases[Math.floor(Math.random() * bases.length)];
  
  return {
    question: `${num}²`,
    answer: num * num,
    hint: `For squaring numbers ending in 5: Multiply the preceding digit by one more than itself, then append 25`,
  };
}

// Urdhva-Tiryagbhyam - Vertically and crosswise
function generateUrdhvaTiryak(): { question: string; answer: number; hint: string } {
  const a = Math.floor(Math.random() * 90) + 10; // 10-99
  const b = Math.floor(Math.random() * 90) + 10;
  
  return {
    question: `${a} × ${b}`,
    answer: a * b,
    hint: `Cross-multiply: (${Math.floor(a/10)}×${b%10} + ${a%10}×${Math.floor(b/10)}) for the middle digit`,
  };
}

// Yavadunam - Whatever the extent of its deficiency
function generateYavadunam(): { question: string; answer: number; hint: string } {
  const bases = [10, 100];
  const base = bases[Math.floor(Math.random() * bases.length)];
  
  let num: number;
  if (base === 10) {
    num = Math.floor(Math.random() * 3) + 7;
  } else {
    num = Math.floor(Math.random() * 20) + 80;
  }
  
  return {
    question: `${num}²`,
    answer: num * num,
    hint: `Base: ${base}. Deficiency: ${base - num}. Square the deficiency and adjust.`,
  };
}

// Anurupyena - Proportionally
function generateAnurupyena(): { question: string; answer: number; hint: string } {
  const multipliers = [2, 3, 4, 5];
  const mult = multipliers[Math.floor(Math.random() * multipliers.length)];
  const baseNum = Math.floor(Math.random() * 20) + 10;
  const num = baseNum * mult;
  
  return {
    question: `${num} ÷ ${mult}`,
    answer: baseNum,
    hint: `Think proportionally: What number times ${mult} equals ${num}?`,
  };
}

// Sankalana-Vyavakalanabhyam - By addition and subtraction
function generateSankalana(): { question: string; answer: number; hint: string } {
  const a = Math.floor(Math.random() * 50) + 50;
  const b = Math.floor(Math.random() * 50) + 50;
  
  return {
    question: `${a} + ${b}`,
    answer: a + b,
    hint: `Round to nearest ten, then adjust: ${Math.round(a/10)*10} + ${Math.round(b/10)*10} ± adjustment`,
  };
}

// Paravartya Yojayet - Transpose and adjust
function generateParavartya(): { question: string; answer: number; hint: string } {
  const divisor = Math.floor(Math.random() * 3) + 11; // 11-13
  const quotient = Math.floor(Math.random() * 9) + 1;
  const dividend = divisor * quotient + Math.floor(Math.random() * divisor);
  
  return {
    question: `${dividend} ÷ ${divisor}`,
    answer: Math.floor(dividend / divisor),
    hint: `Use the complement of ${divisor} from the base 10`,
  };
}

// Vinculum - Using bar numbers
function generateVinculum(): { question: string; answer: number; hint: string } {
  const a = Math.floor(Math.random() * 100) + 100;
  const b = Math.floor(Math.random() * 50) + 50;
  
  return {
    question: `${a} - ${b}`,
    answer: a - b,
    hint: `Convert to easier numbers using vinculum (bar) notation`,
  };
}

export const vedicTechniques: VedicTechnique[] = [
  {
    id: 'nikhilam',
    name: 'Nikhilam Sutra',
    sanskrit: 'निखिलं नवतश्चरमं दशतः',
    description: 'All from 9 and the last from 10 - Perfect for multiplying numbers close to powers of 10',
    category: 'multiplication',
    difficulty: 'beginner',
    generateProblem: generateNikhilam,
  },
  {
    id: 'ekadhikena',
    name: 'Ekadhikena Purvena',
    sanskrit: 'एकाधिकेन पूर्वेण',
    description: 'By one more than the previous one - Instantly square numbers ending in 5',
    category: 'squares',
    difficulty: 'beginner',
    generateProblem: generateEkadhikena,
  },
  {
    id: 'urdhva-tiryak',
    name: 'Urdhva-Tiryagbhyam',
    sanskrit: 'ऊर्ध्वतिर्यग्भ्याम्',
    description: 'Vertically and crosswise - General multiplication method for any numbers',
    category: 'multiplication',
    difficulty: 'intermediate',
    generateProblem: generateUrdhvaTiryak,
  },
  {
    id: 'yavadunam',
    name: 'Yavadunam',
    sanskrit: 'यावदूनम्',
    description: 'Whatever the extent of deficiency - For squaring numbers near a base',
    category: 'squares',
    difficulty: 'intermediate',
    generateProblem: generateYavadunam,
  },
  {
    id: 'anurupyena',
    name: 'Anurupyena',
    sanskrit: 'आनुरूप्येण',
    description: 'Proportionally - Simplify division using ratios',
    category: 'division',
    difficulty: 'beginner',
    generateProblem: generateAnurupyena,
  },
  {
    id: 'sankalana',
    name: 'Sankalana-Vyavakalanabhyam',
    sanskrit: 'सङ्कलन-व्यवकलनाभ्याम्',
    description: 'By addition and subtraction - Mental addition using rounding',
    category: 'addition',
    difficulty: 'beginner',
    generateProblem: generateSankalana,
  },
  {
    id: 'paravartya',
    name: 'Paravartya Yojayet',
    sanskrit: 'परावर्त्य योजयेत्',
    description: 'Transpose and adjust - Division method using complements',
    category: 'division',
    difficulty: 'advanced',
    generateProblem: generateParavartya,
  },
  {
    id: 'vinculum',
    name: 'Vinculum',
    sanskrit: 'विञ्चुलम्',
    description: 'Bar numbers - Simplify subtraction using complement notation',
    category: 'subtraction',
    difficulty: 'intermediate',
    generateProblem: generateVinculum,
  },
];

export function getTechniquesByCategory(category: VedicTechnique['category']): VedicTechnique[] {
  return vedicTechniques.filter((t) => t.category === category);
}

export function getTechniquesByDifficulty(difficulty: VedicTechnique['difficulty']): VedicTechnique[] {
  return vedicTechniques.filter((t) => t.difficulty === difficulty);
}

export function getTechniqueById(id: string): VedicTechnique | undefined {
  return vedicTechniques.find((t) => t.id === id);
}

import { Concept, Category } from './types';

export const INITIAL_CONCEPTS: Concept[] = [
  // --- Aesthetics & Movements ---
  {
    id: 'glitch-art',
    name: 'Glitch Art',
    category: Category.MOVEMENT,
    description: 'The practice of using digital or analog errors for aesthetic purposes by corrupting digital data or physically manipulating electronic devices.',
    relatedIds: ['databending', 'noise', 'generative-art'],
    tags: ['chaos', 'distortion', 'digital-decay']
  },
  {
    id: 'generative-art',
    name: 'Generative Art',
    category: Category.MOVEMENT,
    description: 'Art that in whole or in part has been created with the use of an autonomous system.',
    relatedIds: ['algorithmic-comp', 'chaos-theory', 'p5js', 'processing'],
    tags: ['autonomous', 'system', 'randomness']
  },
  {
    id: 'minimalism',
    name: 'Minimalism',
    category: Category.AESTHETIC,
    description: 'Design or style in which the simplest and fewest elements are used to create the maximum effect.',
    relatedIds: ['generative-art', 'ryoji-ikeda-style'],
    tags: ['clean', 'simple', 'reduction']
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: Category.AESTHETIC,
    description: 'A subgenre of science fiction in a dystopian futuristic setting that tends to focus on a "combination of low-life and high tech".',
    relatedIds: ['glitch-art', 'neon-noir'],
    tags: ['dystopia', 'neon', 'high-tech']
  },
  {
    id: 'biomorphism',
    name: 'Biomorphism',
    category: Category.AESTHETIC,
    description: 'Artistic design elements on naturally occurring patterns or shapes reminiscent of nature and living organisms.',
    relatedIds: ['reaction-diffusion', 'flocking', 'particle-systems'],
    tags: ['nature', 'organic', 'evolution']
  },

  // --- Concepts & Algorithms ---
  {
    id: 'reaction-diffusion',
    name: 'Reaction Diffusion',
    category: Category.CONCEPT,
    description: 'A mathematical model which explains how the concentration of one or more substances changes under the influence of two processes: local chemical reactions and diffusion.',
    relatedIds: ['biomorphism', 'glsl', 'simulation'],
    tags: ['math', 'pattern', 'nature']
  },
  {
    id: 'fft',
    name: 'FFT (Fast Fourier Transform)',
    category: Category.CONCEPT,
    description: 'An algorithm that computes the discrete Fourier transform of a sequence. Essential for audio visualization.',
    relatedIds: ['audio-reactive', 'supercollider', 'touchdesigner'],
    tags: ['audio', 'math', 'spectrum']
  },
  {
    id: 'flocking',
    name: 'Flocking (Boids)',
    category: Category.CONCEPT,
    description: 'The simulation of the flocking behavior of birds. Coined by Craig Reynolds with three simple rules: separation, alignment, and cohesion.',
    relatedIds: ['particle-systems', 'generative-art', 'agent-based'],
    tags: ['simulation', 'emergence', 'agents']
  },
  {
    id: 'raymarching',
    name: 'Raymarching',
    category: Category.CONCEPT,
    description: 'A technique for rendering 3D scenes where rays are marched iteratively until they hit a surface defined by a Signed Distance Function (SDF).',
    relatedIds: ['glsl', 'shaders', 'fractals'],
    tags: ['3d', 'rendering', 'math']
  },
  {
    id: 'markov-chain',
    name: 'Markov Chain',
    category: Category.CONCEPT,
    description: 'A stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.',
    relatedIds: ['algorithmic-comp', 'generative-text', 'electronic-music'],
    tags: ['probability', 'sequence', 'music']
  },

  // --- Technology & Tools ---
  {
    id: 'processing',
    name: 'Processing',
    category: Category.TOOL,
    description: 'A flexible software sketchbook and a language for learning how to code within the context of the visual arts.',
    relatedIds: ['java', 'p5js', 'generative-art'],
    tags: ['code', 'visual', 'education']
  },
  {
    id: 'p5js',
    name: 'p5.js',
    category: Category.TOOL,
    description: 'A JavaScript library for creative coding, with a focus on making coding accessible and inclusive.',
    relatedIds: ['processing', 'webgl', 'web-audio'],
    tags: ['javascript', 'web', 'canvas']
  },
  {
    id: 'glsl',
    name: 'GLSL (Shaders)',
    category: Category.TECHNOLOGY,
    description: 'OpenGL Shading Language. Used to write shaders that run on the GPU for high-performance graphics and computation.',
    relatedIds: ['raymarching', 'webgl', 'touchdesigner'],
    tags: ['gpu', 'graphics', 'performance']
  },
  {
    id: 'supercollider',
    name: 'SuperCollider',
    category: Category.TOOL,
    description: 'An environment and programming language for real-time audio synthesis and algorithmic composition.',
    relatedIds: ['algorithmic-comp', 'electronic-music', 'osc'],
    tags: ['audio', 'synthesis', 'code']
  },
  {
    id: 'touchdesigner',
    name: 'TouchDesigner',
    category: Category.TOOL,
    description: 'A node-based visual programming language for real-time interactive multimedia content.',
    relatedIds: ['glsl', 'projection-mapping', 'osc'],
    tags: ['nodes', 'visual', 'realtime']
  },
  {
    id: 'max-msp',
    name: 'Max/MSP',
    category: Category.TOOL,
    description: 'A visual programming language for music and multimedia developed by Cycling \'74.',
    relatedIds: ['pd', 'electronic-music', 'jitter'],
    tags: ['nodes', 'music', 'interaction']
  },
  
  // --- Fields ---
  {
    id: 'algorithmic-comp',
    name: 'Algorithmic Composition',
    category: Category.CONCEPT,
    description: 'The technique of using algorithms to create music.',
    relatedIds: ['supercollider', 'generative-art', 'markov-chain'],
    tags: ['music', 'math', 'composition']
  },
  {
    id: 'live-coding',
    name: 'Live Coding',
    category: Category.MOVEMENT,
    description: 'A performing arts form and a creativity technique centred upon the use of improvised interactive programming.',
    relatedIds: ['tidalcycles', 'sonic-pi', 'hydra'],
    tags: ['performance', 'code', 'realtime']
  }
];
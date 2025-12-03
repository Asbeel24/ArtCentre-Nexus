export enum Category {
  TECHNOLOGY = 'Technology',
  AESTHETIC = 'Aesthetic',
  MOVEMENT = 'Movement',
  CONCEPT = 'Concept',
  TOOL = 'Tool'
}

export interface Concept {
  id: string;
  name: string;
  category: Category;
  description: string;
  relatedIds: string[]; // Adjacency list for graph
  tags: string[];
}

export interface SynthesisResult {
  title: string;
  concept: string;
  visuals: string;
  audio: string;
  techStack: string[];
  rationale: string;
}

export type NetworkNode = {
  id: string;
  group: number;
  val: number; // size
  data: Concept;
};

export type NetworkLink = {
  source: string;
  target: string;
};
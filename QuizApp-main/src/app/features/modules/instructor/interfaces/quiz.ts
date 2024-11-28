export interface Quiz {
  code: string;
  _id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  group: string;
  instructor: string;
  participants: number;
  questions: Question[];
  questions_number: number;
  schadule: string;
  score_per_question: number;
  status: 'open' | 'closed';
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Question {
  _id: string;
  title: string;
  options: Options;
}

export interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
}

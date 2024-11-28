import { QuestionItem } from '../../questions/interfaces/question-item';

export interface Quiz {
  code: string;
  createdAt: string;
  description: string;
  difficulty: string;
  duration: number;
  group: string;
  instructor: string;
  questions: QuestionItem[];
  questions_number: number;
  schadule: string;
  score_per_question: number;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface QuizResponse {
  data: Quiz;
  message: string;
}

export interface ResponseSubmitQuiz {
  data: {
    _id: string;
    quiz: string;
    participant: string;
    score: number;
    started_at: string;
    finished_at: string;
    questions: Question[];
  };
  message: string;
}

interface Question {
  _id: string;
  title: string;
  options: Options;
  answer: string;
}

interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}
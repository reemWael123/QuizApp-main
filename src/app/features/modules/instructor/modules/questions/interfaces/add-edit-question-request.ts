export interface AddEditQuestionRequest {
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  difficulty: string;
  type: string;
}

export interface JoinQuiz {
  data: ParticipantData;
  message: string;
}

interface ParticipantData {
  quiz: string;
  participant: string;
  score: number;
  started_at: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

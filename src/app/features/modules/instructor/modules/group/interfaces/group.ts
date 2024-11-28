import { Student } from "../../student/interfaces/student";

export interface Group {
    _id: string;
    name: string;
    status: string;
    instructor: string;
    students: Student[];
    max_students: number;
}

import { Group } from "../../group/interfaces/group";


export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  group: Group;
}

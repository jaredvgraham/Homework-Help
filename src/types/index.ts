export interface Class {
  _id: string;
  name: string;
  subject: string;
  teacher: string;
  assignments: string[];
  school: string;
  students: string[];
  createdAt: Date;
  updatedAt: Date;
}

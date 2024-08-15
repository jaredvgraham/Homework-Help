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

export interface ClassAndDue {
  classId: string;
  dueDate: string;
}

export interface Question {
  question: string;
  options: { id: string; text: string }[];
  answer: string;
}

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  class: ClassAndDue[];
  teacher: string;
  students: string[];
  youtubeLinks?: string[];
  submissions: string[];
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  studentName: string;
  age: number;
  Major: string;
  EnrolledCourses : Course[]
}

export interface Course {
  id: string;
  courseName: string;
  instructor: string;
  maxStudents: number;
}
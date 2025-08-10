export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  duration: number; // in minutes
  order: number;
  completed?: boolean;
  keyTakeaways?: string[];
  imageUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  color: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating?: number;
  totalDuration: number;
  imageUrl?: string;
}

export interface Progress {
  courseId: string;
  completedLessons: string[];
  currentLesson?: string;
}

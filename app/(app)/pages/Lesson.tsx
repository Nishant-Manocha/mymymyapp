import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LessonViewer } from "../../../components/LessonViewer";
// import type { Lesson, Course } from "../../../types/lesson"; // Adjust the import path as needed
import { router, useLocalSearchParams } from "expo-router";
import { goBack } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import API from "../../../api/api";

const fetchCourse = async (courseId) => {
  console.log("Fetching course with ID:", courseId);
  const res = await API.get(`/courses/${courseId}`);
  return res.data;
};



export default function Lesson() {
  // const [courses, setCourses] = useState([]);
  const { lessonId, courseId } = useLocalSearchParams();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  // console.log(...lessons, courseId);

  useEffect(() => {
    async function course() {
      const course = await fetchCourse(courseId).then((res) => res.course);
      // console.log("Fetched course:", course);
      setCourse(course);
      const progressData = await API.get(
        `${process.env.SERVER_URL}/progress?type=course`
      ).then((res) => res.data);
      console.log("Progress data:", progressData);
      progressData.progress.length !== 0
        ? setLesson(
            course.lessons[
              `${
                progressData.progress[0].lessonIndex === 3
                  ? 0
                  : progressData.progress[0].lessonIndex + 1
              }`
            ]
          )
        : setLesson(course.lessons[0]);
    }
    course();
  }, [courseId]);
  // console.log(lesson);

  const handleLessonComplete = async () => {
    const nextLessonIndex =
      course.lessons.findIndex((l) => l._id === lesson._id) + 1;

    if (nextLessonIndex < course.lessons.length) {
      setLesson(course.lessons[nextLessonIndex]);
    } else if (nextLessonIndex === course.lessons.length) {
      // If there are no more lessons, you can navigate back or show a completion message
      router.back();
    }
    await API.post(`/courses/${courseId}/complete`, {
      lessonId: lesson._id,
      status:
        nextLessonIndex < course.lessons.length ? "in_progress" : "completed",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {lesson && (
        <LessonViewer
          lesson={lesson}
          onBack={() => goBack()}
          onComplete={handleLessonComplete}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

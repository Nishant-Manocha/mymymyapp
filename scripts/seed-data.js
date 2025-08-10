const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const lessonSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  courseId: { type: String, ref: 'Course' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true },
  order: { type: Number, required: true },
  keyTakeaways: [{ type: String }],
  imageUrl: { type: String },
  audioUrl: { type: String },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  language: { type: String, default: 'en' },
  quiz: [{
    id: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: String }],
    correct: { type: Number, required: true },
    explanation: { type: String }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Lesson = mongoose.model("AudioLesson", lessonSchema);



mongoose.connect("mongodb+srv://nishantmanocha885:Yic2Wxl1A7iBluFB@cluster1.r4mvn.mongodb.net/finguardALLData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateCourses() {
  const courses = await Lesson.find();

  for (let course of courses) {
    course.imageUrl = "https://your-default-image-url.com"; // or use custom logic per course
    await course.save();
  }

  console.log("Courses updated with image URLs");
  process.exit();
}

updateCourses();

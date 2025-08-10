const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  // ======== SCHEMAS ==========
  const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    dateOfBirth: { type: Date },
    profileImage: { type: String },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    preferences: {
      language: { type: String, default: "en" },
      notifications: { type: Boolean, default: true },
      darkMode: { type: Boolean, default: false },
    },
    securitySettings: {
      twoFactorEnabled: { type: Boolean, default: false },
      lastPasswordChange: { type: Date, default: Date.now },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  // Course Schema
  const courseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    icon: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true, // or false if optional
    },
    lessons: { type: Array },
    rating: { type: Number, min: 0, max: 5 },
    totalDuration: { type: Number, required: true }, // in minutes
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  // Lesson Schema
  const lessonSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    courseId: { type: String, ref: "Course" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    order: { type: Number, required: true },
    keyTakeaways: [{ type: String }],
    imageUrl: {
      type: String,
      required: true, // or false if optional
    },
    imageUrl: { type: String },
    audioUrl: { type: String },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    language: { type: String, default: "en" },
    quiz: [
      {
        id: { type: String, required: true },
        question: { type: String, required: true },
        options: [{ type: String }],
        correct: { type: Number, required: true },
        explanation: { type: String },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  // Quiz Schema
  const quizSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["fraud", "financial"], required: true },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    estimatedTime: { type: Number, required: true }, // in minutes
    questions: [
      {
        id: { type: String, required: true },
        question: { type: String, required: true },
        options: [{ type: String }],
        correctAnswer: { type: Number, required: true },
        explanation: { type: String, required: true },
      },
    ],
    completionStatus: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  // Scenario Schema
  const scenarioSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    situation: { type: String, required: true },
    imageUrl: { type: String },
    category: {
      type: String,
      enum: [
        "fraud-detection",
        "investment",
        "budgeting",
        "insurance",
        "retirement",
      ],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    timeLimit: { type: Number }, // in seconds
    choices: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        consequence: { type: String, required: true },
        explanation: { type: String, required: true },
        points: { type: Number, required: true },
      },
    ],
    learningObjective: { type: String, required: true },
    completionStatus: { type: Boolean, default: false },
    relatedLessonId: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  // User Progress Schema
  const userProgressSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: { type: String },
    lessonId: { type: String },
    quizId: { type: String },
    scenarioId: { type: String },
    type: {
      type: String,
      enum: ["course", "lesson", "quiz", "scenario"],
      required: true,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    lessonIndex: { type: Number, default: 0 }, // for lessons
    score: { type: Number },
    timeSpent: { type: Number }, // in minutes
    completedAt: { type: Date },
    answers: [
      {
        questionId: { type: String },
        selectedAnswer: { type: String },
        isCorrect: { type: Boolean },
        timeSpent: { type: Number },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  // Financial Goal Schema
  const goalSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    targetDate: { type: Date, required: true },
    category: { type: String, required: true },
    monthlyTarget: { type: Number, required: true },
    progress: { type: Number, default: 0 },
    description: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  // Contribution Schema
  const contributionSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ["initial", "monthly", "bonus", "extra"],
    },
    description: { type: String },
    paymentMethod: { type: String },
    transactionId: { type: String },
    createdAt: { type: Date, default: Date.now },
  });

  // Report Schema (for scam/fraud reports)
  const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true },
    description: { type: String, required: true },
    contactInfo: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    evidence: [
      {
        type: { type: String, enum: ["image", "document", "screenshot"] },
        url: { type: String },
        description: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "investigating", "resolved", "closed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resolution: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  // Security Analysis Schema (for URL/Hash verification)
  const securityAnalysisSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: ["url", "hash", "email", "file"],
      required: true,
    },
    input: { type: String, required: true },
    results: {
      riskScore: { type: Number, min: 0, max: 100 },
      threats: [{ type: String }],
      analysis: { type: String },
      recommendation: { type: String },
    },
    analysisEngine: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
    createdAt: { type: Date, default: Date.now },
  });

  // User Achievement Schema
  const achievementSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    points: { type: Number, default: 0 },
    level: { type: String, enum: ["bronze", "silver", "gold", "platinum"] },
    earnedAt: { type: Date, default: Date.now },
  });

  // Notification Schema
  const notificationSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["goal_reminder", "course_completion", "security_alert", "general"],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    actionUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
  });

  // ✅ Create Models
  const User = mongoose.model("User", userSchema);
  const Course = mongoose.model("Course", courseSchema);
  const Lesson = mongoose.model("AudioLesson", lessonSchema);
  const Quiz = mongoose.model("Quiz", quizSchema);
  const Scenario = mongoose.model("Scenario", scenarioSchema);
  const UserProgress = mongoose.model("UserProgress", userProgressSchema);
  const Goal = mongoose.model("Goal", goalSchema);
  const Contribution = mongoose.model("Contribution", contributionSchema);
  const Report = mongoose.model("Report", reportSchema);
  const SecurityAnalysis = mongoose.model(
    "SecurityAnalysis",
    securityAnalysisSchema
  );
  const Achievement = mongoose.model("Achievement", achievementSchema);
  const Notification = mongoose.model("Notification", notificationSchema);

  const authenticateToken = (req, res, next) => {
    try {
      console.log("Authenticating token...");
      const authHeader = req.headers["authorization"];
      const token = authHeader?.split(" ")[1]?.trim();

      // console.log("Authenticating token...", token);

      if (!token) {
        return res.status(401).json({ message: "Access token required" });
      }
      // console.log("Token received:", process.env.JWT_SECRET);
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not set in environment variables");
        return res.status(500).json({ message: "Server configuration error" });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          // console.error("Token verification failed:", err.message, err);
          return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = decoded; // clearer name for downstream usage
        console.log("Token authenticated for user");
        next();
      });
    } catch (error) {
      // console.error("Token authentication error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // ✅ Middleware for JWT Authentication
  // ... other models

  // ========= ROUTES ==========

  app.get("/api/lessons", async (req, res) => {
    try {
      const { language = "en" } = req.query;
      const lessons = await Lesson.find({ language });
      res.json({ success: true, lessons });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching lessons", error: error.message });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lesson = await Lesson.findOne({ id: req.params.id });
      if (!lesson) return res.status(404).json({ message: "Lesson not found" });
      res.json({ success: true, lesson });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching lesson", error: error.message });
    }
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const { difficulty, category } = req.query;
      let filter = {};
      if (difficulty) filter.difficulty = difficulty;
      if (category) filter.category = category;
      const courses = await Course.find(filter);
      res.json({ success: true, courses });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching courses", error: error.message });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ message: "Course not found" });
      res.json({ success: true, course });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching course", error: error.message });
    }
  });

  app.post("/api/courses/:id/complete", authenticateToken, async (req, res) => {
    try {
      console.log("Course Completion Request Received");
      const courseId = req.params.id;
      const { lessonId, status } = req.body;
      const course = await Course.findById(courseId);
      const lessonIndex = course.lessons.findIndex(
        (l) => l._id.toString() === lessonId
      );

      const progress = {
        userId: req.user.id,
        courseId,
        lessonIndex,
        type: "course",
        status,
        completedAt: new Date(),
      };

      const existing = await UserProgress.findOne({ courseId, type: "course" });

      if (existing) {
        await UserProgress.findByIdAndUpdate(existing._id, progress);
      } else {
        await new UserProgress(progress).save();
      }
      console.log("Progress updated for course:", courseId);
      res.json({ success: true, message: "Progress updated." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating progress", error: error.message });
    }
  });

  app.get("/api/quizzes", async (req, res) => {
    try {
      const { category, difficulty } = req.query;
      let filter = {};
      if (category !== "all") filter.category = category;
      if (difficulty !== "all") filter.difficulty = difficulty;

      const quizzes = await Quiz.find(filter);
      res.json({ success: true, quizzes });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching quizzes", error: error.message });
    }
  });
  app.get("/api/lessons", async (req, res) => {
    try {
      const { language = "en" } = req.query;

      let filter = { language };

      const lessons = await Lesson.find(filter);
      console.log(lessons);
      res.json({
        success: true,
        lessons,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching lessons", error: error.message });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lesson = await Lesson.findOne({ id: req.params.id });
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      res.json({
        success: true,
        lesson,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching lesson", error: error.message });
    }
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const { difficulty, category } = req.query;

      let filter = {};
      if (difficulty) filter.difficulty = difficulty;
      if (category) filter.category = category;

      const courses = await Course.find(filter);

      res.json({
        success: true,
        courses,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching courses", error: error.message });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      console.log("Course Fetch Request Received for ID:", req.params.id);
      const course = await Course.findById(req.params.id);
      console.log("Course found:", course);
      if (!course) return res.status(404).json({ message: "Course not found" });

      res.json({ success: true, course });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching course", error: error.message });
    }
  });
  /////authenticate token
  app.post("/api/courses/:id/complete", authenticateToken, async (req, res) => {
    try {
      console.log("Course Completion Request Received");
      const courseId = req.params.id;
      const { lessonId, status } = req.body;
      const course = await Course.findById(courseId);
      // console.log("Course found:", course.lessons, lessonId);
      const lessonIndex = course.lessons.findIndex((lesson) => {
        return lesson._id.toString() === lessonId;
      });
      console.log("Course Completion Request:", lessonIndex);

      const progress = {
        userId: req.user.id,
        courseId,
        lessonIndex,
        type: "course",
        status,
        completedAt: new Date(),
      };

      const oldProgress = await UserProgress.find({
        type: "course",
        courseId,
      });
      console.log(oldProgress);
      if (oldProgress.length > 0) {
        await UserProgress.findByIdAndUpdate(oldProgress[0]._id, progress);
      } else {
        await new UserProgress(progress).save();
      }
    } catch (error) {}
  });
  // ✅ Quiz Routes
  app.get("/api/quizzes", async (req, res) => {
    try {
      const { category, difficulty } = req.query;

      let filter = {};
      if (category !== "all") filter.category = category;
      if (difficulty !== "all") filter.difficulty = difficulty;

      const quizzes = await Quiz.find(filter);
      // console.log(quizzes);

      res.json({
        success: true,
        quizzes,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching quizzes", error: error.message });
    }
  });

  app.get("/api/quizzes/:id", async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json({
        success: true,
        quiz,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching quiz", error: error.message });
    }
  });
  /////authenticate token
  app.post("/api/quizzes/:id/submit", authenticateToken, async (req, res) => {
    try {
      const { answers } = req.body;
      console.log("request received", answers);
      const quizId = req.params.id;

      const quiz = await Quiz.findOne({ _id: quizId });
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      // Calculate score
      let correctAnswers = 0;
      const processedAnswers = answers.map((answer, index) => {
        const question = quiz.questions[index];
        const isCorrect = question && question.correctAnswer === answer;
        if (isCorrect) correctAnswers++;

        return {
          questionId: question?.id,
          selectedAnswer: answer,
          isCorrect,
          timeSpent: answer.timeSpent || 0,
        };
      });
      console.log("Processed Answers:", processedAnswers);
      const score = Math.round((correctAnswers / quiz.questions.length) * 100);

      console.log("Score calculated:", score);
      // Save progress
      const progress = {
        userId: req.user.id,
        quizId,
        type: "quiz",
        status: "completed",
        score,
        // timeSpent,
        answers: processedAnswers,
        completedAt: new Date(),
      };

      const oldProgress = await UserProgress.find({
        type: "quiz",
        quizId,
      });

      console.log("Prepared UserProgress object:", progress);
      if (oldProgress.length > 0) {
        await UserProgress.findByIdAndUpdate(oldProgress[0]._id, progress);
      } else {
        await new UserProgress(progress).save();
      }
      console.log("Progress successfully saved.");

      res.json({
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error submitting quiz", error: error.message });
    }
  });

  // ✅ Scenario Routes
  app.get("/api/scenarios", async (req, res) => {
    try {
      console.log("anxjdjc");
      const { category, difficulty } = req.query;

      let filter = {};
      if (category !== "all") filter.category = category;
      if (difficulty !== "all") filter.difficulty = difficulty;

      const scenarios = await Scenario.find(filter);

      res.json({
        success: true,
        scenarios,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching scenarios", error: error.message });
    }
  });

  app.get("/api/scenarios/:id", async (req, res) => {
    try {
      const scenario = await Scenario.findOne({ _id: req.params.id });
      if (!scenario) {
        return res.status(404).json({ message: "Scenario not found" });
      }

      res.json({
        success: true,
        scenario,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching scenario", error: error.message });
    }
  });

  app.post("/api/scenarios/:id/submit", authenticateToken, async (req, res) => {
    try {
      const { choiceId, timeSpent } = req.body;
      const scenarioId = req.params.id;
      console.log(req.user.id);

      console.log("Incoming request to submit scenario:");
      console.log("Scenario ID:", scenarioId);
      console.log("Choice ID:", choiceId);
      console.log("Time Spent:", timeSpent);
      console.log("Authenticated User ID:", req.user?.id);

      const scenario = await Scenario.findOne({ _id: scenarioId });
      if (!scenario) {
        console.log("Scenario not found in DB");
        return res.status(404).json({ message: "Scenario not found" });
      }

      // console.log(
      //   "Scenario found:",
      //   scenario.title || scenario.name || scenario.id
      // );
      // console.log("Available choices:", scenario.choices);

      const selectedChoice = scenario.choices.find(
        (choice) => choice.id === choiceId
      );

      if (!selectedChoice) {
        console.log("Invalid choice submitted:", choiceId);
        return res.status(400).json({ message: "Invalid choice" });
      }

      // console.log("Selected choice:", selectedChoice);

      const progress = {
        userId: req.user.id,
        scenarioId,
        type: "scenario",
        status: "completed",
        score: selectedChoice.points,
        timeSpent,
        answers: [
          {
            questionId: scenarioId,
            selectedAnswer: choiceId,
            isCorrect: selectedChoice.isCorrect,
            timeSpent,
          },
        ],
        completedAt: new Date(),
      };

      const oldProgress = await UserProgress.find({
        type: "scenario",
        scenarioId,
        userId: req.user.id,
      });

      // console.log("Prepared UserProgress object:", oldProgress);

      if (oldProgress.length > 0) {
        await UserProgress.findByIdAndUpdate(oldProgress[0]._id, progress);
      } else {
        await new UserProgress(progress).save();
      }

      console.log("Progress successfully saved.");

      res.json({
        success: true,
        choice: selectedChoice,
        points: selectedChoice.points,
      });
    } catch (error) {
      console.error("Error submitting scenario:", error);
      res
        .status(500)
        .json({ message: "Error submitting scenario", error: error.message });
    }
  });

  // ✅ User Progress Routes
  app.get("/api/progress", authenticateToken, async (req, res) => {
    try {
      console.log("Fetching user progress for user:", req.user.id);
      const { type } = req.query;

      let filter = { userId: req.user.id };

      if (type) filter.type = type;

      const progress = await UserProgress.find(filter).sort({ createdAt: -1 });

      console.log("User progress", progress);

      res.json({
        success: true,
        progress,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching progress", error: error.message });
    }
  });

  app.get("/api/progress/dashboard", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;

      // Get overall statistics
      const totalLessons = await Lesson.countDocuments();
      const totalQuizzes = await Quiz.countDocuments();
      const totalScenarios = await Scenario.countDocuments();

      const completedLessons = await UserProgress.countDocuments({
        userId,
        type: "lesson",
        status: "completed",
      });

      const completedQuizzes = await UserProgress.countDocuments({
        userId,
        type: "quiz",
        status: "completed",
      });

      const completedScenarios = await UserProgress.countDocuments({
        userId,
        type: "scenario",
        status: "completed",
      });

      // Get average scores
      const quizScores = await UserProgress.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            type: "quiz",
            status: "completed",
          },
        },
        { $group: { _id: null, avgScore: { $avg: "$score" } } },
      ]);

      const scenarioPoints = await UserProgress.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            type: "scenario",
            status: "completed",
          },
        },
        { $group: { _id: null, totalPoints: { $sum: "$score" } } },
      ]);

      res.json({
        success: true,
        dashboard: {
          lessons: {
            completed: completedLessons,
            total: totalLessons,
            percentage:
              totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : 0,
          },
          quizzes: {
            completed: completedQuizzes,
            total: totalQuizzes,
            percentage:
              totalQuizzes > 0
                ? Math.round((completedQuizzes / totalQuizzes) * 100)
                : 0,
            averageScore:
              quizScores.length > 0 ? Math.round(quizScores[0].avgScore) : 0,
          },
          scenarios: {
            completed: completedScenarios,
            total: totalScenarios,
            percentage:
              totalScenarios > 0
                ? Math.round((completedScenarios / totalScenarios) * 100)
                : 0,
            totalPoints:
              scenarioPoints.length > 0 ? scenarioPoints[0].totalPoints : 0,
          },
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching dashboard", error: error.message });
    }
  });

  // ✅ Financial Goals Routes  authenticate token
  app.get("/api/goals", authenticateToken, async (req, res) => {
    try {
      console.log("Fetching goals for user:", req.user.id);
      console.log("Fetching active goals for user:");
      const goals = await Goal.find({
        userId: req.user.id,
        isActive: true,
      }).sort({ createdAt: -1 });
      console.log("Goals found:", goals);
      res.json({
        success: true,
        goals,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching goals", error: error.message });
    }
  });
  ////authenticate token
  app.post("/api/goals", authenticateToken, async (req, res) => {
    try {
      const {
        title,
        targetAmount,
        targetDate,
        category,
        description,
        monthlyTarget,
      } = req.body;

      const goal = new Goal({
        userId: req.user.id,
        title,
        targetAmount,
        targetDate,
        category,
        description,
        monthlyTarget,
      });

      await goal.save();
      // console.log("Goal created:", goal);
      res.status(201).json({
        success: true,
        message: "Goal created successfully",
        goal,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating goal", error: error.message });
    }
  });
  ///////authenticate token
  app.put("/api/goals/:id", authenticateToken, async (req, res) => {
    try {
      console.log("Updating goal with ID:", req.params.id);
      const goal = await Goal.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }

      const { title, targetAmount, targetDate, description } = req.body;

      const calculateMonthlyTarget = (
        targetAmount,
        currentAmount,
        targetDate
      ) => {
        const target = new Date(targetDate);
        const current = new Date();
        const monthsRemaining = Math.max(
          1,
          Math.ceil(
            (target.getTime() - current.getTime()) / (1000 * 60 * 60 * 24 * 30)
          )
        );
        const remainingAmount = targetAmount - currentAmount;
        return Math.ceil(remainingAmount / monthsRemaining);
      };

      if (title) goal.title = title;
      if (targetAmount) goal.targetAmount = targetAmount;
      if (targetDate) goal.targetDate = targetDate;

      if (description) goal.description = description;
      goal.monthlyTarget = calculateMonthlyTarget(
        targetAmount,
        goal.currentAmount,
        targetDate
      );

      // Recalculate progress
      goal.progress =
        goal.targetAmount > 0
          ? Math.round((goal.currentAmount / goal.targetAmount) * 100)
          : 0;
      goal.updatedAt = new Date();

      await goal.save();
      // console.log("Goal updated:", goal);

      res.json({
        success: true,
        message: "Goal updated successfully",
        goal,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating goal", error: error.message });
    }
  });

  app.delete("/api/goals/:id", authenticateToken, async (req, res) => {
    try {
      const goal = await Goal.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }

      goal.isActive = false;
      await goal.save();

      res.json({
        success: true,
        message: "Goal deleted successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting goal", error: error.message });
    }
  });

  // ✅ Contributions Routes authenticate token
  app.get("/api/goals/contributions", async (req, res) => {
    try {
      const contributions = await Contribution.find({
        // goalId: req.params.goalId,
      }).sort({ createdAt: -1 });

      res.json({
        success: true,
        contributions,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching contributions",
        error: error.message,
      });
    }
  });
  /////////////authenticate token
  app.post("/api/goals/:goalId/contributions", async (req, res) => {
    try {
      console.log("Adding contribution to goal:", req.params.goalId);
      const { amount } = req.body;

      const goal = await Goal.findOne({
        _id: req.params.goalId,
        // userId: req.user.id,
      });
      console.log("Goal found:", goal);
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }

      const contribution = new Contribution({
        // userId: req.user.id,
        goalId: req.params.goalId,
        amount,
      });

      await contribution.save();
      console.log("Contribution created:", contribution);

      // Update goal's current amount and progress
      goal.currentAmount += amount;
      goal.progress =
        goal.targetAmount > 0
          ? Math.round((goal.currentAmount / goal.targetAmount) * 100)
          : 0;
      goal.updatedAt = new Date();
      await goal.save();
      console.log("Goal updated after contribution:", goal);

      res.status(201).json({
        success: true,
        message: "Contribution added successfully",
        contribution,
        updatedGoal: goal,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding contribution", error: error.message });
    }
  });
};

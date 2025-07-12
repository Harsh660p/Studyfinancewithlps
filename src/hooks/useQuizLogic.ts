import { useState } from "react";
import { quizQuestions } from "@/data/quizQuestions";

export const useQuizLogic = (onPointsEarned: (points: number) => void) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correct;
    if (isCorrect) {
      const points = quizQuestions[currentQuestion].points + (streak * 2); // Bonus for streak
      setScore(score + points);
      setStreak(streak + 1);
      onPointsEarned(points);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setStreak(0);
  };

  const totalPossiblePoints = quizQuestions.reduce((sum, q) => sum + q.points, 0);

  return {
    currentQuestion,
    score,
    selectedAnswer,
    showResult,
    quizCompleted,
    streak,
    questions: quizQuestions,
    totalPossiblePoints,
    handleAnswer,
    nextQuestion,
    resetQuiz
  };
};
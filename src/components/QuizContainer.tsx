import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";
import { useQuizLogic } from "@/hooks/useQuizLogic";

interface QuizContainerProps {
  onPointsEarned: (points: number) => void;
}

const QuizContainer = ({ onPointsEarned }: QuizContainerProps) => {
  const {
    currentQuestion,
    score,
    selectedAnswer,
    showResult,
    quizCompleted,
    streak,
    questions,
    totalPossiblePoints,
    handleAnswer,
    nextQuestion,
    resetQuiz
  } = useQuizLogic(onPointsEarned);

  if (quizCompleted) {
    return (
      <QuizResults 
        score={score} 
        totalPossiblePoints={totalPossiblePoints} 
        onReset={resetQuiz} 
      />
    );
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300 bg-card border-border">
      <CardHeader>
        <QuizProgress 
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          score={score}
          streak={streak}
        />
        <CardTitle className="text-xl flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-blue-500" />
          Money Quiz Challenge
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Test your financial knowledge and earn points!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <QuizQuestion
          question={questions[currentQuestion]}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onAnswer={handleAnswer}
          onNext={nextQuestion}
          isLastQuestion={currentQuestion === questions.length - 1}
          streak={streak}
        />
      </CardContent>
    </Card>
  );
};

export default QuizContainer;

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Zap } from "lucide-react";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  streak: number;
}

const QuizProgress = ({ currentQuestion, totalQuestions, score, streak }: QuizProgressProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Badge variant="outline" className="text-foreground border-border">
          Question {currentQuestion + 1}/{totalQuestions}
        </Badge>
        <div className="flex items-center gap-2">
          {streak > 0 && (
            <Badge className="bg-orange-500 text-white hover:bg-orange-600">
              <Zap className="h-3 w-3 mr-1" />
              {streak} Streak!
            </Badge>
          )}
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            <Star className="h-3 w-3 mr-1" />
            {score} pts
          </Badge>
        </div>
      </div>
      <Progress value={progress} className="mb-4" />
    </div>
  );
};

export default QuizProgress;

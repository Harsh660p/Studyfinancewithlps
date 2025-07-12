
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

interface QuizResultsProps {
  score: number;
  totalPossiblePoints: number;
  onReset: () => void;
}

const QuizResults = ({ score, totalPossiblePoints, onReset }: QuizResultsProps) => {
  const percentage = (score / totalPossiblePoints) * 100;

  return (
    <Card className="hover:shadow-xl transition-all duration-300 bg-card border-border">
      <CardHeader className="text-center">
        <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-bounce" />
        <CardTitle className="text-2xl bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Quiz Complete! 🎉
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="text-4xl font-bold text-green-600">{score} Points!</div>
        <Progress value={percentage} className="w-full" />
        <p className="text-lg text-foreground">
          You scored {percentage.toFixed(0)}% - {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good job!" : "Keep learning!"}
        </p>
        <Button onClick={onReset} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
          Take Quiz Again 🔄
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizResults;

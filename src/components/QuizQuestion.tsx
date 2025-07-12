
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswer: (answerIndex: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  streak: number;
}

const QuizQuestion = ({ 
  question, 
  selectedAnswer, 
  showResult, 
  onAnswer, 
  onNext, 
  isLastQuestion,
  streak 
}: QuizQuestionProps) => {
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-200/20">
        <h3 className="font-semibold text-lg mb-3 text-foreground leading-relaxed flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" />
          {question.question}
        </h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant={
              showResult
                ? index === question.correct
                  ? "default"
                  : index === selectedAnswer
                  ? "destructive"
                  : "outline"
                : "outline"
            }
            className={`w-full text-left justify-start h-auto p-4 min-h-[60px] transition-all duration-200 ${
              showResult && index === question.correct
                ? "bg-green-500 hover:bg-green-600 text-white border-green-500"
                : showResult && index === selectedAnswer && index !== question.correct
                ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => !showResult && onAnswer(index)}
            disabled={showResult}
          >
            <span className="font-semibold mr-3 text-base">{String.fromCharCode(65 + index)}.</span>
            <span className="text-sm leading-relaxed">{option}</span>
          </Button>
        ))}
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg border-2 ${
          isCorrect 
            ? "bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700" 
            : "bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700"
        }`}>
          <p className={`font-semibold ${isCorrect ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}>
            {isCorrect ? "✅ Correct!" : "❌ Not quite right"}
            {isCorrect && streak > 1 && ` +${streak * 2} bonus points for your streak!`}
          </p>
          <p className="text-foreground mt-2 leading-relaxed">{question.explanation}</p>
          <Button 
            onClick={onNext} 
            className="mt-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            {!isLastQuestion ? "Next Question →" : "See Results 🏆"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;


import QuizContainer from "./QuizContainer";

interface QuizSectionProps {
  onPointsEarned: (points: number) => void;
}

const QuizSection = ({ onPointsEarned }: QuizSectionProps) => {
  return <QuizContainer onPointsEarned={onPointsEarned} />;
};

export default QuizSection;

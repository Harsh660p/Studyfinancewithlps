
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Star, Lightbulb, Trophy, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: (data: {
    name: string;
    age: number;
    knowledgeLevel: string;
  }) => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [knowledgeLevel, setKnowledgeLevel] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    if (name && age && knowledgeLevel) {
      onComplete({
        name: name.trim(),
        age: parseInt(age),
        knowledgeLevel
      });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return name.trim().length > 0;
      case 2: return age && parseInt(age) > 0;
      case 3: return knowledgeLevel.length > 0;
      default: return false;
    }
  };

  const funFacts = [
    "💰 Students who learn about money early are 70% more likely to be financially successful!",
    "🎯 The average person makes over 35,000 financial decisions in their lifetime!",
    "📚 Financial literacy is now taught in schools across 45+ countries worldwide!"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <GraduationCap className="h-12 w-12 animate-bounce text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome to Student Finance Academy
            </h1>
            <BookOpen className="h-12 w-12 animate-bounce text-blue-400" />
          </div>
          <p className="text-xl text-slate-300">Created by Students of Lovely Public Sr. Sec. School</p>
          
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all ${
                  step <= currentStep ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-slate-800 border-slate-600 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
              {currentStep === 1 && <Star className="h-6 w-6 text-yellow-400" />}
              {currentStep === 2 && <Trophy className="h-6 w-6 text-green-400" />}
              {currentStep === 3 && <Sparkles className="h-6 w-6 text-purple-400" />}
              {currentStep === 1 && "Let's Get Started!"}
              {currentStep === 2 && "Tell Us About Yourself"}
              {currentStep === 3 && "Your Learning Level"}
            </CardTitle>
            <CardDescription className="text-slate-300">
              {currentStep === 1 && "First, what should we call you?"}
              {currentStep === 2 && "This helps us personalize your experience"}
              {currentStep === 3 && "So we can customize your learning journey"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Name */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white text-lg font-semibold">
                    What's your name, future finance expert? 🌟
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your first name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 text-lg bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                  />
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-blue-200 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    {funFacts[0]}
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Age */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="age" className="text-white text-lg font-semibold">
                    How old are you, {name}? 🎂
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-2 text-lg bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    min="5"
                    max="25"
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                  />
                </div>
                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-green-200 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    {funFacts[1]}
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Knowledge Level */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-white text-lg font-semibold">
                    What's your current knowledge about money, {name}? 🤔
                  </Label>
                  <div className="grid gap-3 mt-4">
                    {[
                      { value: "beginner", label: "Beginner", desc: "Just starting to learn about money", emoji: "🌱" },
                      { value: "intermediate", label: "Intermediate", desc: "I know some basics about saving and spending", emoji: "📚" },
                      { value: "advanced", label: "Advanced", desc: "I'm pretty good with money management", emoji: "🎓" }
                    ].map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setKnowledgeLevel(level.value)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          knowledgeLevel === level.value
                            ? 'bg-purple-900/30 border-purple-500 text-white'
                            : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{level.emoji}</span>
                          <div>
                            <p className="font-semibold">{level.label}</p>
                            <p className="text-sm opacity-80">{level.desc}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                  <p className="text-purple-200 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    {funFacts[2]}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between pt-4">
              {currentStep > 1 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  ← Back
                </Button>
              )}
              <div className="flex-1" />
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  Next →
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                >
                  Start Learning! 🚀
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeScreen;

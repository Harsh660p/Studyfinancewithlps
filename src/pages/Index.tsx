import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiggyBank, TrendingUp, Target, Gift, Calculator, Trophy, Star, Coins, DollarSign, Lightbulb, BookOpen, GamepadIcon, GraduationCap, IndianRupee, Award, Users, ChartBar, Brain, Zap } from "lucide-react";
import SavingsTips from "@/components/SavingsTips";
import QuizSection from "@/components/QuizSection";
import BudgetCalculator from "@/components/BudgetCalculator";
import GoalTracker from "@/components/GoalTracker";
import FinancialGames from "@/components/FinancialGames";
import WelcomeScreen from "@/components/WelcomeScreen";

const Index = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  const [participantName, setParticipantName] = useState("");
  const [participantAge, setParticipantAge] = useState(0);
  const [knowledgeLevel, setKnowledgeLevel] = useState("");

  const addPoints = (points: number) => {
    setUserPoints(prev => {
      const newPoints = prev + points;
      const newLevel = Math.floor(newPoints / 100) + 1;
      setUserLevel(newLevel);
      return newPoints;
    });
  };

  const handleWelcomeComplete = (data: {
    name: string;
    age: number;
    knowledgeLevel: string;
  }) => {
    setParticipantName(data.name);
    setParticipantAge(data.age);
    setKnowledgeLevel(data.knowledgeLevel);
    setShowWelcome(false);
  };

  const financialTips = [
    "💰 Save at least 20% of your income - it's a fundamental financial principle!",
    "🎯 Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound",
    "📱 Track your expenses carefully - every rupee counts!",
    "🏛️ Learn the difference between needs and wants - ancient wisdom for modern times",
    "💡 Compound interest is the eighth wonder of the world - harness its power!"
  ];

  const getPersonalizedTip = () => {
    const tips = [
      `${participantName}, remember: Save at least ₹20 out of every ₹100 you receive!`,
      `Great job ${participantName}! Track your expenses like successful people do.`,
      `${participantName}, always distinguish between needs and wants.`,
      `Hey ${participantName}! Compound interest is magical - learn how it works!`,
      `${participantName}, set SMART goals like successful individuals do!`
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header with Modern Professional Branding */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-b-4 border-blue-500 text-white py-8 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-8 w-8 animate-bounce text-white" />
            <h1 className="text-lg sm:text-xl font-bold text-white animate-fade-in">
              Financial Literacy Platform
            </h1>
            <BookOpen className="h-8 w-8 animate-bounce text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 flex-wrap">
            <Star className="h-6 w-6 sm:h-8 sm:w-8 animate-pulse text-yellow-300" />
            <h2 className="text-2xl sm:text-4xl font-bold text-white text-center">
              Welcome {participantName}! 👋
            </h2>
            <Star className="h-6 w-6 sm:h-8 sm:w-8 animate-pulse text-yellow-300" />
          </div>
          <p className="text-lg sm:text-xl text-blue-100 mb-4 font-semibold">
            Excellence in Financial Education 📚
            {knowledgeLevel && (
              <span className="ml-2 text-xs sm:text-sm bg-white/20 px-3 py-1 rounded-full inline-block mt-1 sm:mt-0 border border-white/30">
                {knowledgeLevel} Level
              </span>
            )}
          </p>
          
          {/* User Progress with Modern styling */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:from-orange-600 hover:to-orange-700 text-xs sm:text-sm border-2 border-orange-400">
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Level {userLevel}
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:from-green-600 hover:to-green-700 text-xs sm:text-sm border-2 border-green-400">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              {userPoints} Points
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold hover:from-blue-600 hover:to-blue-700 text-xs sm:text-sm border-2 border-blue-400">
              <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Indian Rupee
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
        {/* Daily Financial Tips Banner */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-6 sm:p-8 text-center shadow-2xl border-4 border-blue-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2 flex-wrap">
              <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 animate-pulse" />
              <span className="text-center">📚 Daily Financial Lesson 📚</span>
              <IndianRupee className="h-5 w-5 sm:h-6 sm:w-6 text-green-300 animate-pulse" />
            </h3>
            <p className="text-white text-base sm:text-lg font-bold leading-relaxed bg-white/20 rounded-lg p-4 border-2 border-white/30">
              {participantName ? getPersonalizedTip() : financialTips[Math.floor(Math.random() * financialTips.length)]}
            </p>
          </div>
        </div>

        {/* Main Navigation Tabs with Modern Theme */}
        <Tabs defaultValue="learn" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mb-6 sm:mb-8 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 h-auto p-2 rounded-xl">
            <TabsTrigger value="learn" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-700 text-xs sm:text-sm py-3 px-2 sm:px-3 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-200">
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Learn</span>
              <span className="sm:hidden">📚</span>
            </TabsTrigger>
            <TabsTrigger value="save" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white text-green-700 text-xs sm:text-sm py-3 px-2 sm:px-3 rounded-lg font-semibold transition-all duration-300 hover:bg-green-200">
              <PiggyBank className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Save</span>
              <span className="sm:hidden">💰</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-indigo-700 text-xs sm:text-sm py-3 px-2 sm:px-3 rounded-lg font-semibold transition-all duration-300 hover:bg-indigo-200">
              <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Budget</span>
              <span className="sm:hidden">🧮</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white text-purple-700 text-xs sm:text-sm py-3 px-2 sm:px-3 rounded-lg font-semibold transition-all duration-300 hover:bg-purple-200">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Goals</span>
              <span className="sm:hidden">🎯</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-pink-500 data-[state=active]:text-white text-pink-700 text-xs sm:text-sm py-3 px-2 sm:px-3 rounded-lg font-semibold transition-all duration-300 hover:bg-pink-200 col-span-3 sm:col-span-1">
              <GamepadIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Games</span>
              <span className="sm:hidden">🎮 Games</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="learn" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <QuizSection onPointsEarned={addPoints} />
              <SavingsTips />
            </div>
          </TabsContent>

          <TabsContent value="save" className="space-y-6">
            <SavingsTips showDetailed={true} />
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetCalculator />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <GoalTracker onGoalAchieved={() => addPoints(50)} />
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            {/* Educational Concepts Banner */}
            <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-2xl p-6 text-white shadow-2xl border-4 border-purple-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  <Brain className="h-6 w-6 text-yellow-300" />
                  CBSE Class 8-10 Mathematical & AI Concepts
                  <Zap className="h-6 w-6 text-yellow-300" />
                </h3>
                <p className="text-blue-100 text-sm">Learn through practical application of your curriculum</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-lg p-4 border border-white/30">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-yellow-300" />
                    Mathematical Concepts
                  </h4>
                  <ul className="text-sm space-y-1 text-blue-100">
                    <li>• <strong>Percentages:</strong> Interest calculations, profit/loss</li>
                    <li>• <strong>Ratios & Proportions:</strong> Budget allocation, savings ratios</li>
                    <li>• <strong>Linear Equations:</strong> Budget planning, expense tracking</li>
                    <li>• <strong>Compound Interest:</strong> Investment growth calculations</li>
                    <li>• <strong>Statistics:</strong> Data analysis of spending patterns</li>
                    <li>• <strong>Probability:</strong> Risk assessment in investments</li>
                    <li>• <strong>Graphs:</strong> Visual representation of financial data</li>
                  </ul>
                </div>
                
                <div className="bg-white/20 rounded-lg p-4 border border-white/30">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-yellow-300" />
                    AI & Logic Concepts
                  </h4>
                  <ul className="text-sm space-y-1 text-blue-100">
                    <li>• <strong>Pattern Recognition:</strong> Identifying spending habits</li>
                    <li>• <strong>Decision Making:</strong> Algorithmic approach to choices</li>
                    <li>• <strong>Data Processing:</strong> Analyzing financial information</li>
                    <li>• <strong>Logical Reasoning:</strong> Smart financial decisions</li>
                    <li>• <strong>Problem Solving:</strong> Systematic approach to budgeting</li>
                    <li>• <strong>Predictive Analysis:</strong> Forecasting savings goals</li>
                    <li>• <strong>Optimization:</strong> Maximizing savings efficiency</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-yellow-200 font-semibold">
                  🎯 Apply your classroom knowledge to real-world financial scenarios!
                </p>
              </div>
            </div>
            
            <FinancialGames onPointsEarned={addPoints} />
          </TabsContent>
        </Tabs>

        {/* Professional Footer */}
        <div className="mt-12 text-center relative">
          <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-600 shadow-lg">
            
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-3 gap-8 mb-6">
              
              {/* About Section */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    Financial Education Platform
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Empowering students with essential financial literacy skills through interactive learning, practical tools, and engaging content.
                </p>
              </div>
              
              {/* Features Section */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-3">
                  <ChartBar className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    Key Features
                  </h3>
                </div>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Interactive Financial Quizzes</li>
                  <li>• Budget Planning Tools</li>
                  <li>• Goal Tracking System</li>
                  <li>• Educational Games</li>
                </ul>
              </div>
              
              {/* Achievement Section */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    Your Progress
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-orange-500" />
                    <span className="text-slate-600 dark:text-slate-400">Level {userLevel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-slate-600 dark:text-slate-400">{userPoints} Points Earned</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-600">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Financial Education Platform - Currency: Indian Rupee (₹)
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                  <span>© 2024 Educational Platform</span>
                  <span className="hidden sm:inline">•</span>
                  <span>All Rights Reserved</span>
                </div>
              </div>
              
              {/* School Credit */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Built by Students of LOVELY PUBLIC SR.SEC.SCHOOL</span>
                  <BookOpen className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, Target, TrendingUp, Gift, Smartphone, Coffee, ShoppingBag, Gamepad2, Book, Music } from "lucide-react";

interface SavingsTipsProps {
  showDetailed?: boolean;
}

const SavingsTips = ({ showDetailed = false }: SavingsTipsProps) => {
  const [currentTip, setCurrentTip] = useState(0);

  const academicTips = [
    {
      icon: <PiggyBank className="h-6 w-6 text-pink-400" />,
      title: "The 50-30-20 Financial Formula",
      description: "Academic approach: 50% needs (school supplies), 30% wants (entertainment), 20% savings!",
      category: "Economics 101",
      color: "bg-slate-800 border-pink-500/30"
    },
    {
      icon: <Target className="h-6 w-6 text-blue-400" />,
      title: "SMART Goal Setting Theory",
      description: "Apply academic goal-setting: Specific, Measurable, Achievable, Relevant, Time-bound savings!",
      category: "Goal Theory",
      color: "bg-slate-800 border-blue-500/30"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-green-400" />,
      title: "Digital Financial Tracking",
      description: "Use technology for data collection - track your spending patterns like a research project!",
      category: "Data Science",
      color: "bg-slate-800 border-green-500/30"
    },
    {
      icon: <Coffee className="h-6 w-6 text-orange-400" />,
      title: "Opportunity Cost Analysis",
      description: "That daily $3 coffee represents $90+ monthly - understand the economic principle of trade-offs!",
      category: "Economics",
      color: "bg-slate-800 border-orange-500/30"
    },
    {
      icon: <Gift className="h-6 w-6 text-purple-400" />,
      title: "Gift Money Allocation Strategy",
      description: "Apply the 75-25 rule: Save 75% of gift money, allocate 25% for immediate gratification!",
      category: "Financial Planning",
      color: "bg-slate-800 border-purple-500/30"
    },
    {
      icon: <ShoppingBag className="h-6 w-6 text-red-400" />,
      title: "The 24-Hour Decision Model",
      description: "Apply delayed gratification theory - wait 24 hours before major purchases to avoid impulse buying!",
      category: "Behavioral Economics",
      color: "bg-slate-800 border-red-500/30"
    }
  ];

  const detailedAcademicTips = [
    {
      title: "📊 Student Financial Management Fundamentals",
      tips: [
        "Conduct a personal financial audit - track every transaction for comprehensive analysis",
        "Create budget categories using accounting principles: Assets, Liabilities, Equity",
        "Request monetary gifts instead of material items for increased financial flexibility",
        "Apply comparative analysis when making purchasing decisions"
      ]
    },
    {
      title: "🎓 Academic Approach to Smart Spending",
      tips: [
        "Invest in quality educational materials that provide long-term value",
        "Research and utilize student discount programs - maximize your purchasing power",
        "Consider refurbished educational technology for cost-effective solutions",
        "Time purchases strategically around academic calendar sales periods"
      ]
    },
    {
      title: "🔬 Research-Based Saving Strategies",
      tips: [
        "Implement the 'loose change hypothesis' - collect and save all coins received",
        "Calculate cost-per-use ratios for homemade vs. purchased snacks",
        "Utilize public resources like libraries for free educational entertainment",
        "Apply transportation cost analysis - walking/cycling vs. paid transportation"
      ]
    },
    {
      title: "📈 Building Your Financial Future: Academic Perspective",
      tips: [
        "Study compound interest mathematics - understand exponential growth principles",
        "Research banking products with parental guidance for practical financial experience",
        "Explore age-appropriate income opportunities following labor law guidelines",
        "Read peer-reviewed financial literacy resources designed for students"
      ]
    }
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % academicTips.length);
  };

  if (showDetailed) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
            📚 Comprehensive Student Savings Curriculum
          </h2>
          <p className="text-slate-400">Academic approach to financial literacy for student success!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {detailedAcademicTips.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-xl text-center text-white">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-3">
                      <span className="text-green-400 font-bold">✓</span>
                      <span className="text-slate-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-slate-800 border-slate-600">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
          📚 Academic Financial Principles
        </CardTitle>
        <CardDescription className="text-slate-400">Evidence-based money management for student success!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className={`border-2 ${academicTips[currentTip].color} transition-all duration-300`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              {academicTips[currentTip].icon}
              <Badge variant="secondary" className="bg-slate-700 text-slate-300 border-slate-600">{academicTips[currentTip].category}</Badge>
            </div>
            <h3 className="font-bold text-lg mb-2 text-white">{academicTips[currentTip].title}</h3>
            <p className="text-slate-300">{academicTips[currentTip].description}</p>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">
            Lesson {currentTip + 1} of {academicTips.length}
          </span>
          <Button onClick={nextTip} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            Next Lesson 📖
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsTips;

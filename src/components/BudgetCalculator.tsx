
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calculator, PieChart, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

const BudgetCalculator = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState({
    food: "",
    entertainment: "",
    clothes: "",
    school: "",
    transport: "",
    other: ""
  });
  const [showResult, setShowResult] = useState(false);

  const calculateBudget = () => {
    const totalIncome = parseFloat(income) || 0;
    const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + (parseFloat(expense) || 0), 0);
    
    setShowResult(true);
  };

  const resetCalculator = () => {
    setIncome("");
    setExpenses({
      food: "",
      entertainment: "",
      clothes: "",
      school: "",
      transport: "",
      other: ""
    });
    setShowResult(false);
  };

  const totalIncome = parseFloat(income) || 0;
  const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + (parseFloat(expense) || 0), 0);
  const remaining = totalIncome - totalExpenses;
  const savingsGoal = totalIncome * 0.2; // 20% savings goal
  const canSave = remaining >= savingsGoal;

  const expenseCategories = [
    { key: "food", label: "Food & Snacks", icon: "🍕", color: "bg-red-900/20 border border-red-500/30 text-red-200" },
    { key: "entertainment", label: "Movies, Games, Fun", icon: "🎮", color: "bg-blue-900/20 border border-blue-500/30 text-blue-200" },
    { key: "clothes", label: "Clothes & Accessories", icon: "👕", color: "bg-purple-900/20 border border-purple-500/30 text-purple-200" },
    { key: "school", label: "School Supplies", icon: "📚", color: "bg-green-900/20 border border-green-500/30 text-green-200" },
    { key: "transport", label: "Transport & Travel", icon: "🚌", color: "bg-yellow-900/20 border border-yellow-500/30 text-yellow-200" },
    { key: "other", label: "Other Expenses", icon: "💰", color: "bg-gray-800 border border-gray-600 text-gray-200" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
          💰 Student Budget Calculator
        </h2>
        <p className="text-slate-300">Take control of your money and plan like a pro!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-slate-800 border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calculator className="h-5 w-5 text-blue-400" />
              Your Monthly Money
            </CardTitle>
            <CardDescription className="text-slate-300">Enter your allowance, job earnings, and typical expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="income" className="text-base font-semibold text-white">💵 Total Monthly Income</Label>
              <Input
                id="income"
                type="number"
                placeholder="e.g., 1000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="mt-1 text-lg bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
              <p className="text-sm text-slate-400 mt-1">Allowance + job earnings + gifts</p>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold text-white">📊 Monthly Expenses</Label>
              {expenseCategories.map((category) => (
                <div key={category.key} className={`p-3 rounded-lg ${category.color}`}>
                  <Label htmlFor={category.key} className="flex items-center gap-2 mb-1 font-medium">
                    <span>{category.icon}</span>
                    {category.label}
                  </Label>
                  <Input
                    id={category.key}
                    type="number"
                    placeholder="0"
                    value={expenses[category.key as keyof typeof expenses]}
                    onChange={(e) => setExpenses({
                      ...expenses,
                      [category.key]: e.target.value
                    })}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={calculateBudget} className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                Calculate Budget 📊
              </Button>
              <Button onClick={resetCalculator} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                Reset 🔄
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-slate-800 border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <PieChart className="h-5 w-5 text-purple-400" />
              Your Budget Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {showResult ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium text-green-200">Monthly Income</p>
                    <p className="text-2xl font-bold text-green-300">₹{totalIncome}</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium text-red-200">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-300">₹{totalExpenses}</p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border-2 ${remaining >= 0 ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {remaining >= 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    )}
                    <span className={`font-semibold ${remaining >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                      {remaining >= 0 ? 'Money Left Over' : 'Over Budget'}
                    </span>
                  </div>
                  <p className={`text-3xl font-bold ${remaining >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    ₹{Math.abs(remaining).toFixed(2)}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2 text-white">
                    <TrendingUp className="h-4 w-4" />
                    Savings Analysis
                  </h4>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-sm mb-2 text-blue-200">Recommended Savings (20% of income): <strong>₹{savingsGoal.toFixed(2)}</strong></p>
                    <Progress value={remaining > 0 ? Math.min((remaining / savingsGoal) * 100, 100) : 0} className="mb-2" />
                    {canSave ? (
                      <Badge className="bg-green-500 text-black">✅ Great! You can meet your savings goal</Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-red-500 text-white">⚠️ Try to reduce expenses to save more</Badge>
                    )}
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded-lg">
                    <h5 className="font-semibold mb-2 text-yellow-200">💡 Quick Tips:</h5>
                    <ul className="text-sm space-y-1 text-yellow-200">
                      {remaining <= 0 && <li>• Look for the biggest expense categories to cut back</li>}
                      {totalExpenses > totalIncome * 0.8 && <li>• Try the 50-30-20 rule: 50% needs, 30% wants, 20% savings</li>}
                      <li>• Track your spending for a week to see where money really goes</li>
                      <li>• Set up automatic savings so you save before you spend</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter your income and expenses to see your budget breakdown!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetCalculator;

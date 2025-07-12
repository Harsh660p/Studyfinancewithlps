
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, Trash2, Trophy, Calendar, DollarSign } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

interface GoalTrackerProps {
  onGoalAchieved: () => void;
}

const GoalTracker = ({ onGoalAchieved }: GoalTrackerProps) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
    category: "Electronics"
  });

  const categories = [
    { value: "Electronics", icon: "📱", color: "bg-blue-100 text-blue-800" },
    { value: "Clothes", icon: "👕", color: "bg-purple-100 text-purple-800" },
    { value: "Entertainment", icon: "🎮", color: "bg-green-100 text-green-800" },
    { value: "Travel", icon: "✈️", color: "bg-orange-100 text-orange-800" },
    { value: "Emergency Fund", icon: "🚨", color: "bg-red-100 text-red-800" },
    { value: "Education", icon: "📚", color: "bg-yellow-100 text-yellow-800" }
  ];

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now().toString(),
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: 0,
        deadline: newGoal.deadline,
        category: newGoal.category
      };
      setGoals([...goals, goal]);
      setNewGoal({ name: "", targetAmount: "", deadline: "", category: "Electronics" });
      setShowAddForm(false);
    }
  };

  const addMoney = (goalId: string, amount: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newAmount = Math.min(goal.currentAmount + amount, goal.targetAmount);
        if (newAmount === goal.targetAmount && goal.currentAmount < goal.targetAmount) {
          onGoalAchieved();
        }
        return { ...goal, currentAmount: newAmount };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getWeeklySavingsNeeded = (goal: Goal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    const daysLeft = getDaysLeft(goal.deadline);
    const weeksLeft = Math.max(daysLeft / 7, 1);
    return remaining / weeksLeft;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🎯 Savings Goal Tracker
        </h2>
        <p className="text-gray-600">Set goals, track progress, and celebrate achievements!</p>
      </div>

      {/* Add Goal Button */}
      <div className="text-center">
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          {showAddForm ? "Cancel" : "Add New Goal"}
        </Button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              Create Your Savings Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goalName">What are you saving for?</Label>
                <Input
                  id="goalName"
                  placeholder="e.g., New iPhone, Gaming Setup"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="targetAmount">How much do you need?</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="e.g., 50000"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="deadline">When do you want it?</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full p-2 border rounded-md"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button onClick={addGoal} className="w-full bg-gradient-to-r from-green-500 to-blue-500">
              Create Goal 🎯
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      {goals.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No goals yet!</h3>
            <p className="text-gray-400">Create your first savings goal to get started</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = getDaysLeft(goal.deadline);
            const isCompleted = goal.currentAmount >= goal.targetAmount;
            const categoryInfo = categories.find(c => c.value === goal.category);
            const weeklySavings = getWeeklySavingsNeeded(goal);

            return (
              <Card key={goal.id} className={`hover:shadow-lg transition-all duration-300 ${isCompleted ? 'border-green-500 border-2' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{categoryInfo?.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{goal.name}</CardTitle>
                        <Badge className={categoryInfo?.color}>{goal.category}</Badge>
                      </div>
                    </div>
                    <Button
                      onClick={() => deleteGoal(goal.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">
                        ₹{goal.currentAmount.toFixed(2)} / ₹{goal.targetAmount.toFixed(2)}
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <p className="text-center text-sm font-semibold">
                      {progress.toFixed(1)}% Complete
                    </p>
                  </div>

                  {isCompleted ? (
                    <div className="bg-green-100 p-4 rounded-lg text-center">
                      <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <p className="text-green-800 font-bold text-lg">🎉 Goal Achieved! 🎉</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold">
                            {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Save ₹{weeklySavings.toFixed(2)} per week to reach your goal
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {[500, 1000, 2500].map(amount => (
                          <Button
                            key={amount}
                            onClick={() => addMoney(goal.id, amount)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            +₹{amount}
                          </Button>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GoalTracker;

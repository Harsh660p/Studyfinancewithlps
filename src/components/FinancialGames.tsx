
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, Coins, Trophy, Star, Target, Zap, ShoppingCart, PiggyBank, Brain, IndianRupee } from "lucide-react";

interface FinancialGamesProps {
  onPointsEarned: (points: number) => void;
}

const FinancialGames = ({ onPointsEarned }: FinancialGamesProps) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [spendingGameState, setSpendingGameState] = useState({
    budget: 15000,
    spent: 0,
    items: [],
    round: 1,
    score: 0,
    streak: 0,
    powerUps: { smartShopper: false, budgetGuard: false }
  });
  const [savingsGameState, setSavingsGameState] = useState({
    monthlyIncome: 8000,
    currentSavings: 0,
    month: 1,
    decisions: [],
    target: 25000,
    achievements: [],
    difficulty: 'normal'
  });

  const spendingGameItems = [
    { name: "Premium Snacks", price: 1200, necessary: false, icon: "🍿", category: "food", rarity: "common" },
    { name: "School Supplies", price: 1800, necessary: true, icon: "📚", category: "education", rarity: "common" },
    { name: "Designer T-Shirt", price: 3500, necessary: false, icon: "👕", category: "fashion", rarity: "rare" },
    { name: "Monthly Bus Pass", price: 2200, necessary: true, icon: "🚌", category: "transport", rarity: "common" },
    { name: "Gaming Headset", price: 6500, necessary: false, icon: "🎧", category: "entertainment", rarity: "epic" },
    { name: "Lunch Money (Week)", price: 2800, necessary: true, icon: "🍕", category: "food", rarity: "common" },
    { name: "Movie Tickets", price: 1500, necessary: false, icon: "🎬", category: "entertainment", rarity: "common" },
    { name: "Emergency Fund", price: 3500, necessary: true, icon: "💰", category: "savings", rarity: "rare" },
    { name: "Smartphone Case", price: 800, necessary: false, icon: "📱", category: "accessories", rarity: "common" },
    { name: "Study Lamp", price: 2500, necessary: true, icon: "💡", category: "education", rarity: "common" },
    { name: "Sports Equipment", price: 4200, necessary: false, icon: "⚽", category: "health", rarity: "rare" },
    { name: "Books & Novels", price: 1600, necessary: false, icon: "📖", category: "education", rarity: "common" }
  ];

  const savingsScenarios = [
    {
      scenario: "Your friend wants to go to an expensive restaurant",
      options: [
        { text: "Go and spend ₹2500", cost: 2500, points: 0 },
        { text: "Suggest a cheaper alternative (₹1000)", cost: 1000, points: 10 },
        { text: "Skip this time and save the money", cost: 0, points: 20 }
      ]
    },
    {
      scenario: "You see a game on sale for ₹3000 (originally ₹6000)",
      options: [
        { text: "Buy it immediately - great deal!", cost: 3000, points: 5 },
        { text: "Wait and think about it for a week", cost: 0, points: 15 },
        { text: "Check if friends have it to borrow first", cost: 0, points: 20 }
      ]
    },
    {
      scenario: "Your phone screen cracked",
      options: [
        { text: "Get the latest model (₹40000)", cost: 40000, points: 0 },
        { text: "Repair the current phone (₹8000)", cost: 8000, points: 15 },
        { text: "Use it cracked until you save for repair", cost: 0, points: 25 }
      ]
    }
  ];

  const startSpendingGame = () => {
    setCurrentGame("spending");
    setSpendingGameState({
      budget: 15000,
      spent: 0,
      items: [],
      round: 1,
      score: 0,
      streak: 0,
      powerUps: { smartShopper: false, budgetGuard: false }
    });
  };

  const startSavingsGame = () => {
    setCurrentGame("savings");
    setSavingsGameState({
      monthlyIncome: 8000,
      currentSavings: 0,
      month: 1,
      decisions: [],
      target: 25000,
      achievements: [],
      difficulty: 'normal'
    });
  };

  const buyItem = (item: any) => {
    if (spendingGameState.spent + item.price <= spendingGameState.budget) {
      const newSpent = spendingGameState.spent + item.price;
      const newItems = [...spendingGameState.items, item];
      let points = 0;
      let streakBonus = 0;
      
      if (item.necessary) {
        points = 15; // Good choice - increased points
        streakBonus = spendingGameState.streak * 2;
        setSpendingGameState(prev => ({ ...prev, streak: prev.streak + 1 }));
      } else if (item.price > 4000) {
        points = -8; // Expensive unnecessary item - more penalty
        setSpendingGameState(prev => ({ ...prev, streak: 0 }));
      } else if (!item.necessary && item.price < 2000) {
        points = -2; // Small unnecessary purchase
        setSpendingGameState(prev => ({ ...prev, streak: Math.max(0, prev.streak - 1) }));
      }

      // Rarity bonus
      const rarityBonus = item.rarity === 'epic' ? 5 : item.rarity === 'rare' ? 3 : 0;
      const totalPoints = points + streakBonus + rarityBonus;

      setSpendingGameState(prev => ({
        ...prev,
        spent: newSpent,
        items: newItems,
        score: prev.score + totalPoints
      }));

      if (totalPoints > 0) onPointsEarned(totalPoints);
    }
  };

  const finishSpendingGame = () => {
    const necessaryItems = spendingGameState.items.filter(item => item.necessary).length;
    const unnecessaryItems = spendingGameState.items.filter(item => !item.necessary).length;
    const moneyLeft = spendingGameState.budget - spendingGameState.spent;
    
    let finalScore = spendingGameState.score;
    if (necessaryItems >= 3) finalScore += 20; // Bought essential items
    if (moneyLeft >= 2000) finalScore += 15; // Saved money
    if (unnecessaryItems <= 1) finalScore += 10; // Avoided impulse buys
    
    onPointsEarned(Math.max(finalScore, 5));
    setCurrentGame(null);
  };

  const makeSavingsDecision = (option: any) => {
    const newSavings = Math.max(0, savingsGameState.currentSavings + savingsGameState.monthlyIncome - option.cost);
    const newDecisions = [...savingsGameState.decisions, option];
    
    setSavingsGameState({
      ...savingsGameState,
      currentSavings: newSavings,
      month: savingsGameState.month + 1,
      decisions: newDecisions
    });

    if (option.points > 0) onPointsEarned(option.points);

    if (savingsGameState.month >= 6 || newSavings >= savingsGameState.target) {
      // Game finished
      const totalPoints = newDecisions.reduce((sum, d) => sum + d.points, 0);
      if (newSavings >= savingsGameState.target) {
        onPointsEarned(50); // Bonus for reaching goal
      }
      setTimeout(() => setCurrentGame(null), 2000);
    }
  };

  const GameMenu = () => (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="indian-card-hover bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg cursor-pointer group" onClick={startSpendingGame}>
        <CardHeader className="text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-y-10 translate-x-10"></div>
          <ShoppingCart className="h-16 w-16 text-blue-600 mx-auto mb-3 animate-bounce group-hover:scale-110 transition-transform duration-300" />
          <CardTitle className="text-2xl font-bold text-blue-800">🛍️ Smart Shopping Arena</CardTitle>
          <CardDescription className="text-blue-600 font-medium">Master the art of smart spending with ₹15,000!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-3">
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">🎯 Strategy & Logic</Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700">🏆 Streak System</Badge>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-sm text-blue-800 font-semibold">✨ New Features:</p>
              <ul className="text-xs text-blue-600 mt-1 space-y-1">
                <li>• 12 diverse items to choose from</li>
                <li>• Streak multipliers & rarity bonuses</li>
                <li>• Smart shopping power-ups</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="indian-card-hover bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 shadow-lg cursor-pointer group" onClick={startSavingsGame}>
        <CardHeader className="text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full -translate-y-10 translate-x-10"></div>
          <PiggyBank className="h-16 w-16 text-green-600 mx-auto mb-3 animate-bounce group-hover:scale-110 transition-transform duration-300" />
          <CardTitle className="text-2xl font-bold text-green-800">💰 Savings Master Challenge</CardTitle>
          <CardDescription className="text-green-600 font-medium">Build ₹25,000 savings through smart decisions!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-3">
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700">💡 Life Simulation</Badge>
              <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700">🎖️ Achievements</Badge>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-sm text-green-800 font-semibold">✨ Enhanced Gameplay:</p>
              <ul className="text-xs text-green-600 mt-1 space-y-1">
                <li>• ₹8,000 monthly income challenges</li>
                <li>• Achievement system & badges</li>
                <li>• Difficulty progression levels</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SpendingGame = () => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-500" />
            Smart Spending Challenge
          </CardTitle>
          <Badge className="bg-blue-500 text-white">
            Score: {spendingGameState.score}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Budget Remaining</span>
            <span className="font-bold">₹{spendingGameState.budget - spendingGameState.spent}</span>
          </div>
          <Progress value={(spendingGameState.spent / spendingGameState.budget) * 100} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-xl border-2 border-orange-200">
          <div className="text-center">
            <p className="text-lg font-bold text-orange-800 mb-2">🛍️ Smart Shopping Challenge!</p>
            <p className="text-orange-700">Budget: ₹15,000 | Choose wisely between needs and wants!</p>
            {spendingGameState.streak > 0 && (
              <div className="mt-2 flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-bold text-yellow-700">Streak: {spendingGameState.streak}x Multiplier!</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {spendingGameItems.map((item, index) => {
            const canAfford = spendingGameState.spent + item.price <= spendingGameState.budget;
            const rarityColors = {
              common: 'border-gray-300 bg-gray-50',
              rare: 'border-blue-300 bg-blue-50',
              epic: 'border-purple-300 bg-purple-50'
            };
            
            return (
              <Button
                key={index}
                onClick={() => buyItem(item)}
                disabled={!canAfford}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105 ${
                  item.necessary 
                    ? 'border-green-400 bg-green-50 hover:bg-green-100' 
                    : rarityColors[item.rarity as keyof typeof rarityColors]
                } ${!canAfford ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="font-semibold text-sm text-center">{item.name}</span>
                <div className="flex flex-col gap-1 items-center">
                  <Badge variant={item.necessary ? "default" : "secondary"} className="text-xs">
                    ₹{item.price.toLocaleString()}
                  </Badge>
                  <div className="flex gap-1">
                    {item.necessary && <Badge className="bg-green-500 text-white text-xs">Need</Badge>}
                    {item.rarity === 'rare' && <Badge className="bg-blue-500 text-white text-xs">Rare</Badge>}
                    {item.rarity === 'epic' && <Badge className="bg-purple-500 text-white text-xs">Epic</Badge>}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        <div className="flex justify-between">
          <Button onClick={() => setCurrentGame(null)} variant="outline">
            Quit Game
          </Button>
          <Button onClick={finishSpendingGame} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Complete Challenge 🏆
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const SavingsGame = () => {
    const currentScenario = savingsScenarios[(savingsGameState.month - 1) % savingsScenarios.length];
    const progress = (savingsGameState.currentSavings / savingsGameState.target) * 100;

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-green-500" />
              Savings Decision Game
            </CardTitle>
            <Badge className="bg-green-500 text-white">
              Month {savingsGameState.month}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Savings Progress</span>
              <span className="font-bold">₹{savingsGameState.currentSavings} / ₹{savingsGameState.target}</span>
            </div>
            <Progress value={progress} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {savingsGameState.month <= 6 && savingsGameState.currentSavings < savingsGameState.target ? (
            <>
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-5 rounded-xl border-2 border-blue-200 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-blue-800">💰 Monthly Income: ₹{savingsGameState.monthlyIncome.toLocaleString()}</p>
                  <Badge className="bg-blue-500 text-white">Round {savingsGameState.month}</Badge>
                </div>
                <p className="text-lg font-semibold text-blue-700 bg-white/50 p-3 rounded-lg border border-blue-300">{currentScenario.scenario}</p>
              </div>

              <div className="space-y-3">
                {currentScenario.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => makeSavingsDecision(option)}
                    variant="outline"
                    className="w-full h-auto p-4 text-left justify-start"
                  >
                    <div>
                      <p className="font-semibold">{option.text}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant={option.cost === 0 ? "default" : "secondary"}>
                          Cost: ₹{option.cost}
                        </Badge>
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          {option.points} pts
                        </Badge>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </>
          ) : (
              <div className="text-center space-y-6 bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border-2 border-green-200">
                <div className="relative">
                  <Trophy className="h-20 w-20 text-yellow-500 mx-auto animate-bounce" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">✨</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {savingsGameState.currentSavings >= savingsGameState.target ? "🎉 Savings Master!" : "Financial Journey Complete!"}
                </h3>
                <div className="bg-white rounded-lg p-4 border border-green-300 shadow-inner">
                  <p className="text-xl font-bold text-green-700">
                    Final Savings: <span className="text-2xl text-green-600">₹{savingsGameState.currentSavings.toLocaleString()}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Target: ₹{savingsGameState.target.toLocaleString()} • Success Rate: {Math.round((savingsGameState.currentSavings / savingsGameState.target) * 100)}%
                  </p>
                </div>
                <Button onClick={() => setCurrentGame(null)} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Trophy className="h-5 w-5 mr-2" />
                  Play Again 🔄
                </Button>
              </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl border-4 border-purple-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Gamepad2 className="h-10 w-10 text-yellow-300 animate-bounce" />
              🎮 Financial Gaming Arena 🎮
              <Target className="h-10 w-10 text-green-300 animate-pulse" />
            </h2>
            <p className="text-xl text-blue-100 font-semibold mb-4">Master Money Management Through Gamified Learning!</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-white/20 text-white border border-white/30 text-sm font-semibold">
                <Brain className="h-4 w-4 mr-1" />
                Educational Gaming
              </Badge>
              <Badge className="bg-white/20 text-white border border-white/30 text-sm font-semibold">
                <IndianRupee className="h-4 w-4 mr-1" />
                Indian Currency
              </Badge>
              <Badge className="bg-white/20 text-white border border-white/30 text-sm font-semibold">
                <Trophy className="h-4 w-4 mr-1" />
                Achievement System
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {currentGame === null && <GameMenu />}
      {currentGame === "spending" && <SpendingGame />}
      {currentGame === "savings" && <SavingsGame />}
    </div>
  );
};

export default FinancialGames;

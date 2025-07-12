export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What's the best way to handle birthday money?",
    options: [
      "Spend it all immediately on whatever you want",
      "Save 75% and spend 25% on something fun",
      "Give it all to your parents",
      "Hide it under your mattress"
    ],
    correct: 1,
    explanation: "Saving most of your gift money while enjoying a small portion creates great habits!",
    points: 10
  },
  {
    question: "You want to buy a ₹3,000 game. You get ₹500 allowance weekly. How should you plan?",
    options: [
      "Ask parents for the money now",
      "Save ₹500 for 6 weeks straight", 
      "Save ₹400 weekly and spend ₹100, reaching your goal in 7-8 weeks",
      "Forget about the game"
    ],
    correct: 2,
    explanation: "Planning with a small buffer and allowing some spending money makes goals more achievable!",
    points: 15
  },
  {
    question: "What does 'compound interest' mean for your savings?",
    options: [
      "Your money earns money, which then earns more money",
      "You have to pay extra fees",
      "You can only access your money once a year",
      "Your parents get to spend your money"
    ],
    correct: 0,
    explanation: "Compound interest is like a snowball - your money grows faster over time!",
    points: 20
  },
  {
    question: "Your friend wants to borrow ₹1,000. What's the smartest approach?",
    options: [
      "Never lend money to friends",
      "Lend it immediately with no questions",
      "Discuss when they'll pay it back and be okay if they can't",
      "Charge them interest like a bank"
    ],
    correct: 2,
    explanation: "Being clear about expectations while being understanding protects both friendships and money!",
    points: 15
  },
  {
    question: "What's a 'needs vs wants' example for teens?",
    options: [
      "School supplies vs. designer shoes",
      "Food vs. water",
      "Phone vs. computer",
      "All of the above are needs"
    ],
    correct: 0,
    explanation: "Needs are essential for school/life, wants are nice-to-haves that can wait!",
    points: 10
  },
  {
    question: "How can you make saving money more fun?",
    options: [
      "Use a savings app with visual progress",
      "Set small rewards for reaching goals",
      "Challenge friends to save together",
      "All of the above"
    ],
    correct: 3,
    explanation: "Making saving social and rewarding helps build lasting habits!",
    points: 15
  },
  {
    question: "You earned ₹5,000 from a summer job. Using the 50-30-20 rule, how much should you save?",
    options: [
      "₹500",
      "₹1,000", 
      "₹1,500",
      "₹2,500"
    ],
    correct: 1,
    explanation: "The 20% rule means saving ₹1,000 out of every ₹5,000 you earn!",
    points: 15
  },
  {
    question: "What's the '24-hour rule' for spending?",
    options: [
      "Wait 24 hours before buying anything over ₹1,250",
      "Only shop during 24-hour sales",
      "Save for 24 days before buying anything",
      "Ask 24 people for their opinion first"
    ],
    correct: 0,
    explanation: "Waiting helps you avoid impulse purchases and make better decisions!",
    points: 10
  },
  {
    question: "Which is the best long-term money habit for teens?",
    options: [
      "Spending everything you get immediately",
      "Only saving money from jobs, not gifts",
      "Tracking all your money coming in and going out",
      "Never spending money on fun things"
    ],
    correct: 2,
    explanation: "Tracking your money flow helps you understand and improve your financial habits!",
    points: 20
  },
  {
    question: "Your savings goal is ₹15,000 for a new phone. You have ₹7,500. What's the best next step?",
    options: [
      "Give up on the goal",
      "Ask parents for the remaining ₹7,500",
      "Calculate how much to save weekly to reach your goal by a target date",
      "Buy a cheaper phone you don't really want"
    ],
    correct: 2,
    explanation: "Breaking down your remaining goal into manageable weekly amounts keeps you motivated!",
    points: 15
  }
];
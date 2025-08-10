export interface ScenarioChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  consequence: string;
  explanation: string;
  points: number;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  imageUrl?: string;
  category: 'fraud-detection' | 'investment' | 'budgeting' | 'insurance' | 'retirement';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeLimit?: number; // in seconds
  choices: ScenarioChoice[];
  learningObjective: string;
  relatedLessonId?: string;
}

export const scenarios: Scenario[] = [
  {
    id: 'ponzi-investment-offer',
    title: 'The Too-Good-To-Be-True Investment',
    description: 'A friend approaches you with an exciting investment opportunity',
    situation: `Your college friend Raj calls you excitedly: "I've found this amazing investment scheme! My cousin invested ₹50,000 last month and already got ₹15,000 back as returns. They guarantee 30% monthly returns with zero risk. The company is called 'Golden Future Investments' and they say they invest in cryptocurrency and forex trading. You just need to invest a minimum of ₹25,000 to start. But hurry, they're only accepting 100 more investors this month!"

What's your response?`,
    category: 'fraud-detection',
    difficulty: 'beginner',
    timeLimit: 60,
    choices: [
      {
        id: 'invest-immediately',
        text: 'Invest ₹25,000 immediately - 30% monthly returns sound amazing!',
        isCorrect: false,
        consequence: 'You lose your ₹25,000. The scheme collapses after 3 months, and you discover it was a Ponzi scheme.',
        explanation: 'This is a classic Ponzi scheme. No legitimate investment can guarantee 30% monthly returns (360% annually) with zero risk.',
        points: 0
      },
      {
        id: 'ask-for-documents',
        text: 'Ask for official documents, SEBI registration, and company details',
        isCorrect: true,
        consequence: 'Raj becomes evasive and says "documents are being processed." This confirms your suspicion.',
        explanation: 'Excellent! Legitimate investment companies must be registered with SEBI and provide proper documentation.',
        points: 25
      },
      {
        id: 'invest-small-amount',
        text: 'Invest a smaller amount (₹5,000) to test the waters',
        isCorrect: false,
        consequence: 'You get ₹1,500 back initially, which convinces you to invest more. Eventually, you lose ₹50,000 total.',
        explanation: 'Ponzi schemes often pay early investors to build credibility. Any amount invested is at risk.',
        points: 5
      },
      {
        id: 'research-and-decline',
        text: 'Research the company online and decline the offer',
        isCorrect: true,
        consequence: 'You find no legitimate information about the company. You save your money and warn Raj.',
        explanation: 'Perfect approach! Always research before investing. Legitimate companies have verifiable track records.',
        points: 30
      }
    ],
    learningObjective: 'Identify red flags in investment schemes and understand the importance of due diligence',
    relatedLessonId: 'fraud-awareness-basics'
  },

  {
    id: 'emergency-fund-dilemma',
    title: 'The Emergency Fund Challenge',
    description: 'You need to decide how to handle an unexpected expense',
    situation: `You've been diligently building your emergency fund for 8 months and have saved ₹1,20,000. Your car suddenly breaks down and needs a major repair costing ₹80,000. You have three options:

1. Use your emergency fund
2. Take a personal loan at 14% interest
3. Use your credit card (18% interest) and pay in EMIs

Your monthly salary is ₹60,000, and you typically save ₹15,000 per month. What do you do?`,
    category: 'budgeting',
    difficulty: 'intermediate',
    timeLimit: 45,
    choices: [
      {
        id: 'use-emergency-fund',
        text: 'Use ₹80,000 from emergency fund and rebuild it',
        isCorrect: true,
        consequence: 'You handle the crisis without debt. You rebuild your emergency fund in 6 months.',
        explanation: 'Correct! This is exactly what emergency funds are for - unexpected major expenses.',
        points: 30
      },
      {
        id: 'take-personal-loan',
        text: 'Take a personal loan to preserve emergency fund',
        isCorrect: false,
        consequence: 'You pay ₹12,000+ in interest over 12 months while your emergency fund earns only 4% in savings.',
        explanation: 'This defeats the purpose of an emergency fund. You\'re paying high interest unnecessarily.',
        points: 10
      },
      {
        id: 'use-credit-card',
        text: 'Use credit card and pay minimum amounts',
        isCorrect: false,
        consequence: 'You end up paying ₹1,20,000+ due to compound interest over 2 years.',
        explanation: 'Credit card debt is the most expensive option and can spiral out of control.',
        points: 0
      },
      {
        id: 'negotiate-payment',
        text: 'Use ₹40,000 from emergency fund and negotiate payment plan for rest',
        isCorrect: true,
        consequence: 'You minimize debt while preserving most of your emergency fund. Good compromise!',
        explanation: 'Smart approach! You balance using emergency funds while minimizing financial strain.',
        points: 25
      }
    ],
    learningObjective: 'Understand the proper use of emergency funds and evaluate financing options',
    relatedLessonId: 'emergency-fund-planning'
  },

  {
    id: 'insurance-sales-pressure',
    title: 'The Persistent Insurance Agent',
    description: 'An insurance agent is pressuring you to buy a policy',
    situation: `An insurance agent visits your office and presents a "limited-time offer": A ULIP (Unit Linked Insurance Plan) that combines insurance and investment. He claims:

- ₹10 lakh life cover for ₹20,000 annual premium
- "Guaranteed" 12% returns on investment portion
- "Tax-free" maturity after 15 years
- "Special discount" if you sign today
- "This offer expires tomorrow"

He's asking you to sign immediately and says you can cancel within 15 days if you change your mind. What do you do?`,
    category: 'insurance',
    difficulty: 'intermediate',
    timeLimit: 90,
    choices: [
      {
        id: 'sign-immediately',
        text: 'Sign immediately to get the discount',
        isCorrect: false,
        consequence: 'You discover the policy has high charges, poor returns, and the "guarantee" was misleading.',
        explanation: 'Never make financial decisions under pressure. ULIPs often have high charges and poor returns.',
        points: 0
      },
      {
        id: 'ask-for-documents',
        text: 'Ask for policy documents and time to review',
        isCorrect: true,
        consequence: 'You review the documents and find high charges and poor fund performance. You decline.',
        explanation: 'Excellent! Always review policy documents carefully before making insurance decisions.',
        points: 25
      },
      {
        id: 'compare-alternatives',
        text: 'Ask to compare with term insurance + mutual funds',
        isCorrect: true,
        consequence: 'You discover term insurance + SIP would give better returns with lower costs.',
        explanation: 'Perfect approach! Separating insurance and investment usually provides better value.',
        points: 30
      },
      {
        id: 'consult-advisor',
        text: 'Say you need to consult your financial advisor first',
        isCorrect: true,
        consequence: 'Your advisor confirms that ULIPs are generally not recommended due to high charges.',
        explanation: 'Smart move! Getting a second opinion on major financial decisions is always wise.',
        points: 20
      }
    ],
    learningObjective: 'Learn to evaluate insurance products and resist sales pressure tactics',
    relatedLessonId: 'insurance-planning'
  },

  {
    id: 'retirement-planning-start',
    title: 'The Retirement Planning Wake-Up Call',
    description: 'You realize you need to start planning for retirement',
    situation: `You're 28 years old, earning ₹8 lakh annually. A colleague mentions that to maintain your current lifestyle after retirement at 60, you'll need about ₹2 crore (in today's value). You currently have no retirement savings.

Your options:
- Start a PPF account (₹1.5 lakh annual limit, 15-year lock-in, tax-free returns)
- Begin SIP in ELSS funds (tax saving + market returns)
- Increase EPF contribution (safe but lower returns)
- Invest in NPS (additional tax benefits, market-linked returns)

You can allocate ₹20,000 monthly towards retirement. How do you proceed?`,
    category: 'retirement',
    difficulty: 'advanced',
    timeLimit: 120,
    choices: [
      {
        id: 'only-ppf',
        text: 'Put everything in PPF for safety',
        isCorrect: false,
        consequence: 'PPF alone won\'t generate enough corpus for retirement due to inflation and limited contribution.',
        explanation: 'PPF is safe but has contribution limits and may not beat inflation over long term.',
        points: 10
      },
      {
        id: 'diversified-approach',
        text: 'Diversify: ₹12,500 PPF + ₹7,500 ELSS SIP',
        isCorrect: true,
        consequence: 'You build a balanced portfolio with tax benefits and growth potential.',
        explanation: 'Excellent diversification! Combines safety of PPF with growth potential of equity.',
        points: 30
      },
      {
        id: 'aggressive-equity',
        text: 'Invest everything in equity mutual funds for maximum growth',
        isCorrect: false,
        consequence: 'High volatility causes stress and you might panic during market downturns.',
        explanation: 'Too aggressive for retirement planning. Some stability is important for long-term goals.',
        points: 15
      },
      {
        id: 'systematic-planning',
        text: 'Create a systematic plan: PPF + ELSS + NPS combination',
        isCorrect: true,
        consequence: 'You create a robust retirement portfolio with multiple tax benefits and risk diversification.',
        explanation: 'Outstanding! This approach maximizes tax benefits while ensuring adequate growth.',
        points: 35
      }
    ],
    learningObjective: 'Understand retirement planning strategies and the importance of starting early',
    relatedLessonId: 'retirement-planning'
  },

  {
    id: 'credit-card-trap',
    title: 'The Credit Card Spending Spiral',
    description: 'You\'re facing a credit card debt situation',
    situation: `You have three credit cards with the following balances:
- Card A: ₹45,000 (18% interest)
- Card B: ₹30,000 (21% interest)  
- Card C: ₹25,000 (24% interest)

You're paying minimum amounts (₹2,000 total) but balances aren't reducing much. You get a personal loan offer at 14% interest for ₹1 lakh. Your monthly income is ₹50,000.

What's your strategy?`,
    category: 'budgeting',
    difficulty: 'intermediate',
    timeLimit: 75,
    choices: [
      {
        id: 'continue-minimums',
        text: 'Continue paying minimum amounts and hope for the best',
        isCorrect: false,
        consequence: 'Your debt grows to ₹1.5 lakh in 2 years due to compound interest.',
        explanation: 'Minimum payments mostly go toward interest. Principal barely reduces.',
        points: 0
      },
      {
        id: 'debt-avalanche',
        text: 'Focus extra payments on highest interest card (Card C) first',
        isCorrect: true,
        consequence: 'You save ₹15,000 in interest and become debt-free 18 months earlier.',
        explanation: 'Debt avalanche method saves the most money by targeting highest interest debt first.',
        points: 25
      },
      {
        id: 'personal-loan-consolidation',
        text: 'Take personal loan to pay off all credit cards',
        isCorrect: true,
        consequence: 'You reduce your interest rate from 18-24% to 14% and have a fixed repayment schedule.',
        explanation: 'Smart debt consolidation! Lower interest rate and structured repayment plan.',
        points: 30
      },
      {
        id: 'balance-transfer',
        text: 'Transfer all balances to Card A (lowest interest) and close others',
        isCorrect: false,
        consequence: 'You save some interest but still face high rates and potential for re-accumulating debt.',
        explanation: 'Partial solution. Doesn\'t address the root cause and interest is still high.',
        points: 15
      }
    ],
    learningObjective: 'Learn effective debt management strategies and understand the cost of credit card debt',
    relatedLessonId: 'debt-management'
  },

  {
    id: 'investment-market-crash',
    title: 'Market Crash Panic',
    description: 'The stock market crashes and your investments are down 30%',
    situation: `March 2020: The stock market has crashed due to COVID-19. Your SIP portfolio worth ₹3 lakh is now worth ₹2.1 lakh. You've been investing ₹10,000 monthly for 2.5 years.

News channels are predicting further falls. Your friends are selling their investments. Your family is worried and asking you to "save whatever is left."

What do you do?`,
    category: 'investment',
    difficulty: 'advanced',
    timeLimit: 60,
    choices: [
      {
        id: 'sell-everything',
        text: 'Sell everything to prevent further losses',
        isCorrect: false,
        consequence: 'You lock in your losses. When markets recover in 6 months, you miss out on gains.',
        explanation: 'Panic selling is one of the biggest investment mistakes. Markets are cyclical.',
        points: 0
      },
      {
        id: 'stop-sip-hold',
        text: 'Stop SIP but hold existing investments',
        isCorrect: false,
        consequence: 'You miss buying at lower prices. Your recovery takes longer than it could have.',
        explanation: 'Stopping SIP during downturns means missing the opportunity to buy at lower prices.',
        points: 10
      },
      {
        id: 'continue-sip',
        text: 'Continue SIP as planned - markets will recover',
        isCorrect: true,
        consequence: 'You buy more units at lower prices. Your portfolio recovers and grows significantly.',
        explanation: 'Excellent discipline! Continuing SIP during downturns is key to long-term wealth creation.',
        points: 30
      },
      {
        id: 'increase-sip',
        text: 'Increase SIP amount to take advantage of lower prices',
        isCorrect: true,
        consequence: 'You accelerate your wealth creation by buying more units at discounted prices.',
        explanation: 'Outstanding strategy! Increasing investments during market downturns can boost long-term returns.',
        points: 35
      }
    ],
    learningObjective: 'Understand market volatility and the importance of staying disciplined during downturns',
    relatedLessonId: 'investment-psychology'
  },

  {
    id: 'tax-saving-rush',
    title: 'Last-Minute Tax Saving Rush',
    description: 'It\'s March and you need to save tax urgently',
    situation: `It's March 15th, and you realize you haven't made any tax-saving investments this year. Your annual income is ₹12 lakh, putting you in the 30% tax bracket. You need to save ₹1.5 lakh under Section 80C to maximize tax benefits.

Your options:
- ELSS mutual funds (3-year lock-in, market-linked returns)
- PPF (15-year lock-in, safe returns around 7-8%)
- Life insurance premium (long-term commitment)
- Fixed deposits (5-year lock-in, around 6% returns)

You have ₹1.5 lakh available to invest. What's your strategy?`,
    category: 'investment',
    difficulty: 'intermediate',
    timeLimit: 90,
    choices: [
      {
        id: 'all-in-elss',
        text: 'Invest entire ₹1.5 lakh in ELSS funds',
        isCorrect: false,
        consequence: 'Good tax saving but you put all eggs in one basket. Market volatility affects entire investment.',
        explanation: 'ELSS is good but diversification is important even within tax-saving investments.',
        points: 20
      },
      {
        id: 'diversified-80c',
        text: 'Diversify: ₹75k ELSS + ₹50k PPF + ₹25k life insurance',
        isCorrect: true,
        consequence: 'You achieve tax savings with balanced risk and good diversification.',
        explanation: 'Excellent diversification! Balances growth potential with safety and insurance coverage.',
        points: 30
      },
      {
        id: 'safe-ppf-fd',
        text: 'Play safe: ₹1.5 lakh in PPF and FDs only',
        isCorrect: false,
        consequence: 'You save tax but miss out on potential higher returns from equity exposure.',
        explanation: 'Too conservative. Some equity exposure is beneficial for long-term wealth creation.',
        points: 15
      },
      {
        id: 'insurance-heavy',
        text: 'Buy high-premium insurance policies for tax saving',
        isCorrect: false,
        consequence: 'You get tax benefits but poor returns. Insurance becomes a burden with high premiums.',
        explanation: 'Insurance should be bought for protection, not primarily for tax saving.',
        points: 5
      }
    ],
    learningObjective: 'Learn to balance tax saving with investment objectives and avoid last-minute decisions',
    relatedLessonId: 'tax-planning'
  },

  {
    id: 'cryptocurrency-fomo',
    title: 'Cryptocurrency FOMO',
    description: 'Everyone around you is making money from crypto',
    situation: `Bitcoin has risen 300% in the last year. Your WhatsApp groups are full of people sharing screenshots of their crypto gains. A colleague shows you his portfolio - he invested ₹50,000 and it's now worth ₹2 lakh.

You have ₹1 lakh in savings. Everyone is saying "this is the future of money" and "you'll regret not investing." You're feeling left out and worried about missing the opportunity.

What do you do?`,
    category: 'investment',
    difficulty: 'advanced',
    timeLimit: 75,
    choices: [
      {
        id: 'invest-all-savings',
        text: 'Invest all ₹1 lakh - don\'t want to miss out!',
        isCorrect: false,
        consequence: 'Crypto crashes 60% next month. You lose ₹60,000 and panic sell at the bottom.',
        explanation: 'FOMO investing often leads to buying at peaks. Never invest more than you can afford to lose.',
        points: 0
      },
      {
        id: 'small-allocation',
        text: 'Invest ₹10,000 (10% of savings) as experimental allocation',
        isCorrect: true,
        consequence: 'You participate in crypto without risking your financial stability. Good risk management.',
        explanation: 'Smart approach! Crypto should be a small part of portfolio due to high volatility.',
        points: 25
      },
      {
        id: 'avoid-completely',
        text: 'Avoid crypto completely - too risky and speculative',
        isCorrect: true,
        consequence: 'You avoid the stress and volatility. Focus on traditional investments with better fundamentals.',
        explanation: 'Valid choice! Avoiding investments you don\'t understand is perfectly reasonable.',
        points: 20
      },
      {
        id: 'research-first',
        text: 'Spend time learning about blockchain and crypto before investing',
        isCorrect: true,
        consequence: 'You gain knowledge and make informed decisions rather than emotional ones.',
        explanation: 'Excellent! Understanding an investment before putting money is crucial for success.',
        points: 30
      }
    ],
    learningObjective: 'Understand FOMO in investing and the importance of risk management',
    relatedLessonId: 'investment-psychology'
  },

  {
    id: 'job-loss-financial-crisis',
    title: 'Sudden Job Loss',
    description: 'You lose your job unexpectedly during economic uncertainty',
    situation: `You've been laid off from your ₹80,000/month job due to company downsizing. You have:
- ₹2 lakh in emergency fund
- ₹5 lakh in mutual funds (currently down 20%)
- ₹30,000 monthly expenses (rent, EMIs, family)
- No immediate job prospects (market is tough)

Your family is panicking and suggesting you:
1. Sell investments to have more cash
2. Take any job available (₹40,000/month)
3. Start a business with your savings

What's your plan?`,
    category: 'budgeting',
    difficulty: 'advanced',
    timeLimit: 120,
    choices: [
      {
        id: 'sell-investments',
        text: 'Sell all investments to have maximum cash available',
        isCorrect: false,
        consequence: 'You lock in losses and miss the recovery. Your financial goals get delayed by years.',
        explanation: 'Selling investments during downturns locks in losses and disrupts long-term goals.',
        points: 5
      },
      {
        id: 'take-any-job',
        text: 'Take the ₹40,000/month job immediately',
        isCorrect: false,
        consequence: 'You solve immediate crisis but significantly reduce your earning potential long-term.',
        explanation: 'While income is important, taking a 50% pay cut might not be the best long-term strategy.',
        points: 15
      },
      {
        id: 'strategic-approach',
        text: 'Use emergency fund strategically while actively job hunting',
        isCorrect: true,
        consequence: 'You find a better job in 4 months, preserve investments, and maintain career trajectory.',
        explanation: 'Perfect use of emergency fund! It buys you time to make better decisions.',
        points: 30
      },
      {
        id: 'reduce-expenses',
        text: 'Cut expenses drastically and use emergency fund to extend runway',
        isCorrect: true,
        consequence: 'You extend your financial runway to 8 months and find a good job without compromising.',
        explanation: 'Smart crisis management! Reducing expenses extends your options and reduces pressure.',
        points: 25
      }
    ],
    learningObjective: 'Learn crisis financial management and the value of emergency funds',
    relatedLessonId: 'emergency-fund-planning'
  },

  {
    id: 'home-loan-decision',
    title: 'The Home Buying Decision',
    description: 'You\'re considering buying your first home',
    situation: `You're 30 years old, earning ₹15 lakh annually. You've found a house worth ₹80 lakh. The bank offers:
- 80% loan (₹64 lakh) at 8.5% for 20 years
- EMI would be ₹55,000/month
- Current rent: ₹25,000/month

Your financial situation:
- Savings: ₹20 lakh
- Monthly savings: ₹40,000
- Current investments: ₹8 lakh in mutual funds

Your family is pressuring you to buy, saying "rent is money down the drain." What do you decide?`,
    category: 'investment',
    difficulty: 'advanced',
    timeLimit: 150,
    choices: [
      {
        id: 'buy-immediately',
        text: 'Buy the house - real estate always appreciates',
        isCorrect: false,
        consequence: 'Your EMI consumes most savings capacity. You can\'t invest in other assets for growth.',
        explanation: 'Real estate doesn\'t always appreciate and reduces liquidity and diversification.',
        points: 10
      },
      {
        id: 'continue-renting',
        text: 'Continue renting and invest the difference in mutual funds',
        isCorrect: true,
        consequence: 'Over 20 years, your investments potentially grow more than real estate appreciation.',
        explanation: 'Rent vs buy depends on many factors. Investing the difference can often yield better returns.',
        points: 25
      },
      {
        id: 'wait-and-save',
        text: 'Wait 2-3 years to save larger down payment',
        isCorrect: true,
        consequence: 'You reduce loan amount and EMI burden while continuing to build wealth.',
        explanation: 'Larger down payment reduces EMI burden and total interest paid over loan tenure.',
        points: 30
      },
      {
        id: 'smaller-house',
        text: 'Look for a smaller/cheaper house to reduce EMI burden',
        isCorrect: true,
        consequence: 'You buy a ₹60 lakh house with manageable EMI and maintain investment capacity.',
        explanation: 'Smart compromise! Balances homeownership goals with financial flexibility.',
        points: 25
      }
    ],
    learningObjective: 'Understand the rent vs buy decision and its impact on overall financial health',
    relatedLessonId: 'real-estate-planning'
  },

  {
    id: 'mlm-scheme-invitation',
    title: 'The MLM "Business Opportunity"',
    description: 'A friend invites you to a "business opportunity" meeting',
    situation: `Your friend Priya invites you to a "business presentation" about a "revolutionary health product company." At the meeting, you learn:

- You need to buy ₹25,000 worth of health products to become a "distributor"
- You earn money by selling products AND recruiting others
- The presenter shows income charts: "Platinum members earn ₹2 lakh/month"
- They emphasize "passive income" and "financial freedom"
- Everyone seems very enthusiastic and successful
- They want you to decide today to get "founder member" benefits

What's your response?`,
    category: 'fraud-detection',
    difficulty: 'intermediate',
    timeLimit: 90,
    choices: [
      {
        id: 'join-immediately',
        text: 'Join immediately - the income potential looks amazing!',
        isCorrect: false,
        consequence: 'You struggle to sell products and recruit. You lose ₹25,000 and strain friendships.',
        explanation: 'MLM schemes benefit only those at the top. Most participants lose money.',
        points: 0
      },
      {
        id: 'ask-for-proof',
        text: 'Ask to see actual income statements and tax returns of successful members',
        isCorrect: true,
        consequence: 'They become evasive and can\'t provide real proof. You realize it\'s not legitimate.',
        explanation: 'Great critical thinking! Real businesses can show actual financial proof.',
        points: 30
      },
      {
        id: 'research-company',
        text: 'Ask for time to research the company and products',
        isCorrect: true,
        consequence: 'You discover complaints online and realize the focus is on recruitment, not products.',
        explanation: 'Smart approach! Research reveals the true nature of the business model.',
        points: 25
      },
      {
        id: 'politely-decline',
        text: 'Politely decline and explain you\'re not interested in MLM',
        isCorrect: true,
        consequence: 'You avoid the scheme and maintain your friendship by being honest.',
        explanation: 'Direct and honest approach. Protecting your finances and relationships.',
        points: 20
      }
    ],
    learningObjective: 'Recognize MLM schemes and understand why they\'re problematic for most participants',
    relatedLessonId: 'fraud-awareness-basics'
  },

  {
    id: 'salary-hike-lifestyle-inflation',
    title: 'The Salary Hike Temptation',
    description: 'You get a significant salary increase',
    situation: `Congratulations! You've received a 40% salary hike - from ₹8 lakh to ₹11.2 lakh annually. Your take-home increases by ₹20,000/month.

You're excited and considering:
- Upgrading to a luxury apartment (+₹15,000 rent)
- Buying a car with EMI (₹25,000/month)
- Upgrading lifestyle (dining, shopping, travel)
- Your current savings rate: ₹15,000/month

Your friends suggest "you deserve to enjoy your success." What do you do with the extra income?`,
    category: 'budgeting',
    difficulty: 'intermediate',
    timeLimit: 75,
    choices: [
      {
        id: 'upgrade-everything',
        text: 'Upgrade lifestyle completely - you\'ve earned it!',
        isCorrect: false,
        consequence: 'Your expenses increase by ₹25,000 but savings don\'t increase. Lifestyle inflation trap!',
        explanation: 'Lifestyle inflation can completely negate the benefits of salary increases.',
        points: 0
      },
      {
        id: 'save-all-extra',
        text: 'Save the entire ₹20,000 extra - no lifestyle changes',
        isCorrect: false,
        consequence: 'You save more but feel deprived. This approach is often unsustainable long-term.',
        explanation: 'While saving is good, some lifestyle improvement can be reasonable and sustainable.',
        points: 15
      },
      {
        id: 'balanced-approach',
        text: 'Save ₹15,000 extra and use ₹5,000 for modest lifestyle upgrade',
        isCorrect: true,
        consequence: 'You triple your savings rate while enjoying some lifestyle improvement. Sustainable approach!',
        explanation: 'Perfect balance! Increasing savings while allowing reasonable lifestyle improvement.',
        points: 30
      },
      {
        id: 'invest-in-skills',
        text: 'Save ₹10,000 extra and invest ₹10,000 in skill development',
        isCorrect: true,
        consequence: 'You increase savings and invest in future earning potential. Great long-term thinking!',
        explanation: 'Excellent strategy! Investing in skills can lead to even higher future income.',
        points: 35
      }
    ],
    learningObjective: 'Understand lifestyle inflation and learn to balance enjoyment with financial growth',
    relatedLessonId: 'budgeting-basics'
  }
];

export interface ScenarioResult {
  scenarioId: string;
  choiceId: string;
  points: number;
  totalPoints: number;
  completedAt: Date;
  timeSpent: number; // in seconds
}

export interface ScenarioProgress {
  completedScenarios: string[];
  totalPoints: number;
  averageScore: number;
  strongAreas: string[];
  improvementAreas: string[];
}

// Utility functions for scenario management
export const getScenariosByCategory = (category: string): Scenario[] => {
  return scenarios.filter(scenario => scenario.category === category);
};

export const getScenariosByDifficulty = (difficulty: string): Scenario[] => {
  return scenarios.filter(scenario => scenario.difficulty === difficulty);
};

export const calculateScenarioScore = (results: ScenarioResult[]): ScenarioProgress => {
  const completedScenarios = results.map(r => r.scenarioId);
  const totalPoints = results.reduce((sum, r) => sum + r.points, 0);
  const maxPossiblePoints = results.reduce((sum, r) => sum + r.totalPoints, 0);
  const averageScore = maxPossiblePoints > 0 ? (totalPoints / maxPossiblePoints) * 100 : 0;

  // Analyze performance by category
  const categoryPerformance: { [key: string]: number[] } = {};
  results.forEach(result => {
    const scenario = scenarios.find(s => s.id === result.scenarioId);
    if (scenario) {
      if (!categoryPerformance[scenario.category]) {
        categoryPerformance[scenario.category] = [];
      }
      categoryPerformance[scenario.category].push((result.points / result.totalPoints) * 100);
    }
  });

  const strongAreas: string[] = [];
  const improvementAreas: string[] = [];

  Object.entries(categoryPerformance).forEach(([category, scores]) => {
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (avgScore >= 75) {
      strongAreas.push(category);
    } else if (avgScore < 50) {
      improvementAreas.push(category);
    }
  });

  return {
    completedScenarios,
    totalPoints,
    averageScore,
    strongAreas,
    improvementAreas
  };
};
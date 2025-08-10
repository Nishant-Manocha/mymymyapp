export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: "fraud" | "financial";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number; // in minutes
  questions: Question[];
}

export const quizzes: Quiz[] = [
  // Existing quizzes with added difficulty and time
  {
    id: "phishing-basics",
    title: "Phishing Email Recognition",
    description: "Learn to identify and avoid phishing attempts",
    category: "fraud",
    difficulty: "beginner",
    estimatedTime: 8,
    questions: [
      {
        id: "q1",
        question: "What is the most common sign of a phishing email?",
        options: [
          "Professional company logo",
          "Urgent language demanding immediate action",
          "Proper grammar and spelling",
          "Personalized greeting with your full name",
        ],
        correctAnswer: 1,
        explanation:
          "Phishing emails often use urgent language to pressure you into acting quickly without thinking. Legitimate companies rarely demand immediate action via email.",
      },
      {
        id: "q2",
        question:
          "You receive an email claiming to be from your bank asking you to verify your account. What should you do?",
        options: [
          "Click the link and enter your information",
          "Reply with your account details",
          "Contact your bank directly using their official phone number",
          "Forward the email to friends for advice",
        ],
        correctAnswer: 2,
        explanation:
          "Always verify suspicious emails by contacting the organization directly through official channels, never through links or contact info in the suspicious email.",
      },
      {
        id: "q3",
        question:
          "Which of these email addresses is most likely to be legitimate?",
        options: [
          "security@amaz0n-support.com",
          "noreply@amazon.com",
          "amazon.security@gmail.com",
          "support@amazon-verification.net",
        ],
        correctAnswer: 1,
        explanation:
          "Legitimate companies use their official domain names. Be wary of domains that use numbers instead of letters, free email services, or slight misspellings.",
      },
      {
        id: "q4",
        question:
          "What should you do if you accidentally clicked a suspicious link?",
        options: [
          "Nothing, it's probably fine",
          "Enter fake information to confuse scammers",
          "Close the browser, run antivirus, and change passwords",
          "Complete the form to see what happens",
        ],
        correctAnswer: 2,
        explanation:
          "If you click a suspicious link, immediately close your browser, run a security scan, and change passwords for any accounts that might be compromised.",
      },
      {
        id: "q5",
        question: "Phishing attacks can come through which channels?",
        options: [
          "Only email",
          "Email and text messages only",
          "Email, text, phone calls, and social media",
          "Only through malicious websites",
        ],
        correctAnswer: 2,
        explanation:
          "Phishing attacks can occur through multiple channels including email, SMS (smishing), phone calls (vishing), and social media platforms.",
      },
    ],
  },
  {
    id: "investment-scams",
    title: "Investment Fraud Detection",
    description: "Recognize and avoid investment scams",
    category: "fraud",
    difficulty: "intermediate",
    estimatedTime: 10,
    questions: [
      {
        id: "q1",
        question: "What is a major red flag in investment opportunities?",
        options: [
          "Detailed risk disclosures",
          "Guaranteed high returns with no risk",
          "Licensed financial advisors",
          "Transparent fee structures",
        ],
        correctAnswer: 1,
        explanation:
          "All legitimate investments carry risk. Any guarantee of high returns with no risk is a classic sign of a scam.",
      },
      {
        id: "q2",
        question: "Before investing, you should always:",
        options: [
          "Act quickly before the opportunity disappears",
          "Research the investment and verify credentials",
          "Invest your life savings for maximum returns",
          "Trust recommendations from strangers online",
        ],
        correctAnswer: 1,
        explanation:
          "Always research investments thoroughly and verify that advisors are properly licensed before investing any money.",
      },
      {
        id: "q3",
        question: "What is a Ponzi scheme?",
        options: [
          "A legitimate investment strategy",
          "A type of government bond",
          "A scam that pays early investors with new investors' money",
          "A high-yield savings account",
        ],
        correctAnswer: 2,
        explanation:
          "A Ponzi scheme uses money from new investors to pay returns to earlier investors, creating the illusion of legitimate returns until it inevitably collapses.",
      },
      {
        id: "q4",
        question:
          "Which investment opportunity should you be most suspicious of?",
        options: [
          "A diversified mutual fund with a 7% annual return",
          "A 'secret' investment promising 50% returns in 30 days",
          "A certificate of deposit at your local bank",
          "An index fund tracking the S&P 500",
        ],
        correctAnswer: 1,
        explanation:
          "Extremely high returns promised in short timeframes, especially 'secret' opportunities, are classic signs of investment fraud.",
      },
      {
        id: "q5",
        question:
          "If an investment opportunity seems too good to be true, you should:",
        options: [
          "Invest immediately before others find out",
          "Invest a small amount to test it",
          "Walk away and report it if necessary",
          "Ask for an even better deal",
        ],
        correctAnswer: 2,
        explanation:
          "If something seems too good to be true, it usually is. It's better to miss a 'great' opportunity than to lose your money to a scam.",
      },
    ],
  },
  {
    id: "budgeting-basics",
    title: "Personal Budgeting Fundamentals",
    description: "Master the basics of personal budgeting",
    category: "financial",
    difficulty: "beginner",
    estimatedTime: 7,
    questions: [
      {
        id: "q1",
        question: "What is the 50/30/20 budgeting rule?",
        options: [
          "50% savings, 30% needs, 20% wants",
          "50% needs, 30% wants, 20% savings",
          "50% wants, 30% savings, 20% needs",
          "50% investments, 30% emergency fund, 20% spending",
        ],
        correctAnswer: 1,
        explanation:
          "The 50/30/20 rule suggests allocating 50% of after-tax income to needs, 30% to wants, and 20% to savings and debt repayment.",
      },
      {
        id: "q2",
        question: "Which expense is considered a 'need' rather than a 'want'?",
        options: [
          "Netflix subscription",
          "Designer clothing",
          "Rent or mortgage payment",
          "Dining out at restaurants",
        ],
        correctAnswer: 2,
        explanation:
          "Housing costs like rent or mortgage payments are essential needs, while entertainment subscriptions and dining out are typically wants.",
      },
      {
        id: "q3",
        question: "How often should you review and adjust your budget?",
        options: [
          "Once a year",
          "Never, once it's set",
          "Monthly",
          "Only when you get a raise",
        ],
        correctAnswer: 2,
        explanation:
          "Budgets should be reviewed monthly to track spending, identify areas for improvement, and adjust for changing circumstances.",
      },
      {
        id: "q4",
        question: "What should you do first when creating a budget?",
        options: [
          "Set spending limits for each category",
          "Track your current income and expenses",
          "Open a new savings account",
          "Cut all unnecessary expenses",
        ],
        correctAnswer: 1,
        explanation:
          "Before creating a budget, you need to understand your current financial situation by tracking all income and expenses.",
      },
      {
        id: "q5",
        question: "What is the primary purpose of an emergency fund?",
        options: [
          "To invest in the stock market",
          "To cover unexpected expenses or income loss",
          "To buy luxury items",
          "To pay for planned vacations",
        ],
        correctAnswer: 1,
        explanation:
          "An emergency fund provides financial security by covering unexpected expenses like medical bills, car repairs, or job loss.",
      },
    ],
  },
  // NEW QUIZZES START HERE
  {
    id: "ponzi-pyramid-schemes",
    title: "Ponzi & Pyramid Schemes Deep Dive",
    description:
      "Understand the mechanics and warning signs of Ponzi and pyramid schemes",
    category: "fraud",
    difficulty: "intermediate",
    estimatedTime: 12,
    questions: [
      {
        id: "q1",
        question:
          "What is the key difference between a Ponzi scheme and a pyramid scheme?",
        options: [
          "Ponzi schemes are legal, pyramid schemes are not",
          "Ponzi schemes focus on fake investments, pyramid schemes focus on recruiting",
          "Pyramid schemes always involve products, Ponzi schemes don't",
          "There is no difference between them",
        ],
        correctAnswer: 1,
        explanation:
          "Ponzi schemes typically involve fake investment opportunities where returns come from new investors' money, while pyramid schemes focus primarily on recruiting new participants who pay to join.",
      },
      {
        id: "q2",
        question:
          "How long do most Ponzi schemes typically last before collapsing?",
        options: [
          "Less than 6 months",
          "1-2 years",
          "5-10 years",
          "They can last indefinitely",
        ],
        correctAnswer: 1,
        explanation:
          "Most Ponzi schemes collapse within 1-2 years because they require an ever-increasing number of new investors to pay earlier investors, which becomes mathematically impossible to sustain.",
      },
      {
        id: "q3",
        question: "What typically triggers the collapse of a Ponzi scheme?",
        options: [
          "Government investigation",
          "Too many investors wanting to withdraw money at once",
          "The schemer decides to stop",
          "Market conditions change",
        ],
        correctAnswer: 1,
        explanation:
          "Ponzi schemes often collapse when too many investors try to withdraw their money simultaneously, revealing that the money isn't actually there because it was used to pay other investors or taken by the schemer.",
      },
      {
        id: "q4",
        question:
          "Which of these is a common characteristic of pyramid schemes?",
        options: [
          "Focus on selling products to the general public",
          "Emphasis on recruiting new members over product sales",
          "Transparent business model",
          "Low-pressure sales tactics",
        ],
        correctAnswer: 1,
        explanation:
          "Pyramid schemes typically emphasize recruiting new members who pay to join rather than selling legitimate products or services to the general public.",
      },
      {
        id: "q5",
        question:
          "If you're approached about a 'ground floor opportunity' with guaranteed returns, you should:",
        options: [
          "Invest immediately to get the best position",
          "Ask for references from other investors",
          "Research the company and be highly skeptical",
          "Invest a small amount to test it",
        ],
        correctAnswer: 2,
        explanation:
          "'Ground floor opportunity' language is a common red flag for Ponzi and pyramid schemes. Always research thoroughly and be extremely skeptical of guaranteed returns.",
      },
    ],
  },
  {
    id: "identity-theft-protection",
    title: "Identity Theft Prevention & Recovery",
    description:
      "Learn how to protect your identity and recover if it's stolen",
    category: "fraud",
    difficulty: "intermediate",
    estimatedTime: 15,
    questions: [
      {
        id: "q1",
        question:
          "What is the most effective way to monitor for identity theft?",
        options: [
          "Check your credit report once a year",
          "Monitor your credit reports from all three bureaus regularly",
          "Only check your bank statements",
          "Wait for your bank to notify you",
        ],
        correctAnswer: 1,
        explanation:
          "Regularly monitoring credit reports from all three major credit bureaus (Experian, Equifax, TransUnion) is the most effective way to catch identity theft early.",
      },
      {
        id: "q2",
        question:
          "If you discover fraudulent accounts on your credit report, what should you do first?",
        options: [
          "Pay the fraudulent debts to fix your credit",
          "Contact the companies directly to dispute",
          "Place a fraud alert with credit bureaus",
          "Hire a credit repair company",
        ],
        correctAnswer: 2,
        explanation:
          "Your first step should be to place a fraud alert with the credit bureaus, which makes it harder for identity thieves to open new accounts in your name.",
      },
      {
        id: "q3",
        question:
          "What information should you NEVER give out over the phone unless you initiated the call?",
        options: [
          "Your name and address",
          "Your Social Security number and account numbers",
          "Your phone number",
          "Your email address",
        ],
        correctAnswer: 1,
        explanation:
          "Never give out sensitive information like Social Security numbers, account numbers, or passwords over the phone unless you initiated the call to a verified number.",
      },
      {
        id: "q4",
        question:
          "How often can you get free credit reports from each major credit bureau?",
        options: [
          "Once per month",
          "Once per year",
          "Once every two years",
          "Only when you're denied credit",
        ],
        correctAnswer: 1,
        explanation:
          "You're entitled to one free credit report from each of the three major credit bureaus annually through annualcreditreport.com.",
      },
      {
        id: "q5",
        question:
          "What should you do with documents containing personal information before throwing them away?",
        options: [
          "Throw them away as-is",
          "Tear them in half",
          "Shred them completely",
          "Burn them",
        ],
        correctAnswer: 2,
        explanation:
          "Always shred documents containing personal information like Social Security numbers, account numbers, or other sensitive data before disposal.",
      },
    ],
  },
  {
    id: "loan-scams-awareness",
    title: "Loan Scams & Predatory Lending",
    description:
      "Identify and avoid fraudulent loan offers and predatory lending practices",
    category: "fraud",
    difficulty: "intermediate",
    estimatedTime: 10,
    questions: [
      {
        id: "q1",
        question: "What is a major red flag for a loan scam?",
        options: [
          "Requiring a credit check",
          "Asking for upfront fees before approving the loan",
          "Providing detailed loan terms",
          "Taking time to process the application",
        ],
        correctAnswer: 1,
        explanation:
          "Legitimate lenders don't require upfront fees before approving a loan. Scammers often ask for processing fees, insurance, or other charges upfront.",
      },
      {
        id: "q2",
        question: "Which loan offer should make you most suspicious?",
        options: [
          "A loan requiring good credit and income verification",
          "A loan with a 15% APR for someone with poor credit",
          "A guaranteed loan approval regardless of credit history",
          "A loan requiring collateral",
        ],
        correctAnswer: 2,
        explanation:
          "No legitimate lender can guarantee loan approval without checking credit history and ability to repay. This is a classic sign of a loan scam.",
      },
      {
        id: "q3",
        question: "What is predatory lending?",
        options: [
          "Any loan with interest rates above 10%",
          "Lending practices that exploit borrowers with unfair terms",
          "Loans only available to people with bad credit",
          "Government-backed loans",
        ],
        correctAnswer: 1,
        explanation:
          "Predatory lending involves unfair, deceptive, or abusive loan terms that exploit borrowers, often targeting vulnerable populations with excessive fees and high interest rates.",
      },
      {
        id: "q4",
        question: "Before accepting any loan, you should always:",
        options: [
          "Accept the first offer you receive",
          "Compare offers from multiple legitimate lenders",
          "Choose the loan with the lowest monthly payment",
          "Go with the lender that approves you fastest",
        ],
        correctAnswer: 1,
        explanation:
          "Always shop around and compare loan offers from multiple legitimate lenders to ensure you're getting fair terms and the best deal for your situation.",
      },
      {
        id: "q5",
        question:
          "If a lender contacts you unsolicited with a loan offer, you should:",
        options: [
          "Accept immediately if the terms sound good",
          "Be very cautious and verify the lender's legitimacy",
          "Provide your personal information to get pre-approved",
          "Ask them to call back later",
        ],
        correctAnswer: 1,
        explanation:
          "Unsolicited loan offers are often scams. Always verify the lender's legitimacy through independent research before providing any personal information.",
      },
    ],
  },
  {
    id: "romance-scams",
    title: "Romance & Dating Scams",
    description:
      "Protect yourself from romance scams on dating sites and social media",
    category: "fraud",
    difficulty: "beginner",
    estimatedTime: 8,
    questions: [
      {
        id: "q1",
        question: "What is a common early warning sign of a romance scammer?",
        options: [
          "They want to meet in person quickly",
          "They profess love very quickly",
          "They ask about your hobbies",
          "They live in your city",
        ],
        correctAnswer: 1,
        explanation:
          "Romance scammers often profess love or deep feelings very quickly, sometimes within days or weeks, to create emotional attachment before asking for money.",
      },
      {
        id: "q2",
        question: "Romance scammers typically avoid:",
        options: [
          "Sending photos",
          "Long conversations",
          "Video calls or phone calls",
          "Talking about the future",
        ],
        correctAnswer: 2,
        explanation:
          "Scammers avoid video calls or phone calls because they're often not who they claim to be and may be using stolen photos or fake identities.",
      },
      {
        id: "q3",
        question:
          "What should you do if someone you met online asks for money?",
        options: [
          "Send a small amount to help",
          "Ask for proof of their emergency",
          "Stop all communication immediately",
          "Offer to meet them instead",
        ],
        correctAnswer: 2,
        explanation:
          "Never send money to someone you've only met online, regardless of their story. This is a major red flag for romance scams.",
      },
      {
        id: "q4",
        question: "Romance scammers often claim to be:",
        options: [
          "Local residents",
          "Unemployed",
          "Military personnel, doctors, or engineers working abroad",
          "Students",
        ],
        correctAnswer: 2,
        explanation:
          "Scammers often pose as professionals like military personnel, doctors, or engineers working abroad to explain why they can't meet in person and may need financial help.",
      },
      {
        id: "q5",
        question: "How can you verify if someone's photos are real?",
        options: [
          "Ask them to send more photos",
          "Use reverse image search on Google",
          "Ask for their social media profiles",
          "Trust that dating sites verify photos",
        ],
        correctAnswer: 1,
        explanation:
          "Use reverse image search tools like Google Images to check if photos are stolen from other sources, which is common in romance scams.",
      },
    ],
  },
  {
    id: "tech-support-scams",
    title: "Tech Support & Computer Scams",
    description:
      "Recognize and avoid fake tech support and computer security scams",
    category: "fraud",
    difficulty: "beginner",
    estimatedTime: 9,
    questions: [
      {
        id: "q1",
        question:
          "What should you do if you receive a pop-up saying your computer is infected?",
        options: [
          "Call the number provided immediately",
          "Click to download the recommended software",
          "Close the pop-up and run your own antivirus scan",
          "Restart your computer immediately",
        ],
        correctAnswer: 2,
        explanation:
          "Pop-ups claiming your computer is infected are usually scams. Close the pop-up and run a scan with your legitimate antivirus software.",
      },
      {
        id: "q2",
        question: "Microsoft, Apple, or other tech companies will:",
        options: [
          "Call you about computer problems",
          "Send pop-up warnings about viruses",
          "Never contact you unsolicited about computer issues",
          "Ask for remote access to fix problems",
        ],
        correctAnswer: 2,
        explanation:
          "Legitimate tech companies like Microsoft and Apple never make unsolicited calls or send pop-ups about computer problems. These are always scams.",
      },
      {
        id: "q3",
        question:
          "If someone claiming to be from tech support asks for remote access to your computer, you should:",
        options: [
          "Allow it if they seem knowledgeable",
          "Ask for their employee ID first",
          "Never allow remote access from unsolicited contacts",
          "Allow it but watch what they do",
        ],
        correctAnswer: 2,
        explanation:
          "Never allow remote access to your computer from unsolicited contacts. Scammers use this to steal personal information or install malware.",
      },
      {
        id: "q4",
        question: "What is a common tactic used in tech support scams?",
        options: [
          "Offering free software updates",
          "Creating urgency by claiming immediate action is needed",
          "Providing detailed technical explanations",
          "Offering to call back later",
        ],
        correctAnswer: 1,
        explanation:
          "Tech support scammers create false urgency, claiming your computer will be damaged or compromised if you don't act immediately.",
      },
      {
        id: "q5",
        question: "How much should you pay for unsolicited tech support?",
        options: [
          "Whatever they quote",
          "A reasonable hourly rate",
          "Nothing - hang up immediately",
          "Only if they fix the problem",
        ],
        correctAnswer: 2,
        explanation:
          "Never pay for unsolicited tech support. These calls are scams designed to steal your money and potentially your personal information.",
      },
    ],
  },
  {
    id: "tax-scams-irs-fraud",
    title: "Tax Scams & IRS Impersonation",
    description:
      "Learn to identify fake IRS communications and tax-related scams",
    category: "fraud",
    difficulty: "intermediate",
    estimatedTime: 11,
    questions: [
      {
        id: "q1",
        question:
          "How does the IRS typically first contact taxpayers about issues?",
        options: ["Phone calls", "Email", "Text messages", "Mail"],
        correctAnswer: 3,
        explanation:
          "The IRS typically initiates contact through regular mail, not phone calls, emails, or text messages. Be suspicious of unsolicited electronic communications claiming to be from the IRS.",
      },
      {
        id: "q2",
        question: "The IRS will NEVER:",
        options: [
          "Send you a bill",
          "Demand immediate payment over the phone",
          "Audit your tax return",
          "Send official notices",
        ],
        correctAnswer: 1,
        explanation:
          "The IRS will never demand immediate payment over the phone, threaten arrest, or require payment by specific methods like gift cards or wire transfers.",
      },
      {
        id: "q3",
        question: "What payment methods will the IRS NEVER request?",
        options: [
          "Check or money order",
          "Credit card through official IRS website",
          "Gift cards or prepaid debit cards",
          "Electronic funds transfer",
        ],
        correctAnswer: 2,
        explanation:
          "The IRS will never ask for payment via gift cards, prepaid debit cards, or wire transfers. These are common tactics used by scammers.",
      },
      {
        id: "q4",
        question:
          "If you receive a suspicious call claiming to be from the IRS, you should:",
        options: [
          "Provide your Social Security number to verify your identity",
          "Hang up and call the IRS directly at their official number",
          "Ask for their badge number",
          "Transfer money immediately to avoid penalties",
        ],
        correctAnswer: 1,
        explanation:
          "Hang up immediately and contact the IRS directly using the official phone number from their website or your tax documents to verify any claimed issues.",
      },
      {
        id: "q5",
        question: "During tax season, you should be especially wary of:",
        options: [
          "Filing your taxes early",
          "Emails offering quick refunds or claiming problems with your return",
          "Using tax preparation software",
          "Keeping tax documents organized",
        ],
        correctAnswer: 1,
        explanation:
          "Tax season brings increased phishing emails and scams claiming to offer quick refunds or alerting you to problems with your return. Always verify through official IRS channels.",
      },
    ],
  },
  {
    id: "advanced-budgeting-techniques",
    title: "Advanced Budgeting Strategies",
    description: "Master sophisticated budgeting methods and techniques",
    category: "financial",
    difficulty: "advanced",
    estimatedTime: 12,
    questions: [
      {
        id: "q1",
        question: "What is zero-based budgeting?",
        options: [
          "A budget where you spend nothing",
          "A budget where every dollar is assigned a purpose",
          "A budget based on last year's spending",
          "A budget with zero savings",
        ],
        correctAnswer: 1,
        explanation:
          "Zero-based budgeting means every dollar of income is assigned a specific purpose (expenses, savings, debt payment) so that income minus expenses equals zero.",
      },
      {
        id: "q2",
        question: "What is the envelope budgeting method?",
        options: [
          "Keeping all money in envelopes",
          "Allocating cash to specific spending categories",
          "Saving money in different bank accounts",
          "Using credit cards for different categories",
        ],
        correctAnswer: 1,
        explanation:
          "The envelope method involves allocating cash to different spending categories (envelopes). When an envelope is empty, you can't spend more in that category.",
      },
      {
        id: "q3",
        question: "What is the pay-yourself-first budgeting approach?",
        options: [
          "Paying all bills before saving",
          "Setting aside savings before paying any expenses",
          "Paying yourself a salary",
          "Spending on wants before needs",
        ],
        correctAnswer: 1,
        explanation:
          "Pay-yourself-first means automatically setting aside money for savings and investments before paying other expenses, treating savings as a non-negotiable expense.",
      },
      {
        id: "q4",
        question: "What is lifestyle inflation?",
        options: [
          "When prices of goods increase",
          "When your spending increases as your income increases",
          "When you move to a more expensive area",
          "When inflation affects your budget",
        ],
        correctAnswer: 1,
        explanation:
          "Lifestyle inflation occurs when your spending increases proportionally (or more) as your income increases, preventing you from building wealth despite earning more.",
      },
      {
        id: "q5",
        question: "What is the 80/20 budgeting rule?",
        options: [
          "80% spending, 20% saving",
          "80% needs, 20% wants",
          "80% income after taxes, 20% for savings and goals",
          "80% fixed expenses, 20% variable",
        ],
        correctAnswer: 2,
        explanation:
          "The 80/20 rule suggests living on 80% of your after-tax income and using 20% for savings, investments, and financial goals. It's simpler than the 50/30/20 rule.",
      },
    ],
  },
  {
    id: "tax-planning-strategies",
    title: "Tax Planning & Optimization",
    description:
      "Learn effective tax planning strategies to minimize your tax burden legally",
    category: "financial",
    difficulty: "advanced",
    estimatedTime: 15,
    questions: [
      {
        id: "q1",
        question:
          "What is the difference between tax avoidance and tax evasion?",
        options: [
          "There is no difference",
          "Tax avoidance is legal, tax evasion is illegal",
          "Tax evasion is legal, tax avoidance is illegal",
          "Both are illegal",
        ],
        correctAnswer: 1,
        explanation:
          "Tax avoidance involves legally minimizing taxes through proper planning and using available deductions and credits. Tax evasion is illegally not paying taxes owed.",
      },
      {
        id: "q2",
        question:
          "What is the benefit of contributing to a traditional 401(k)?",
        options: [
          "Contributions are made with after-tax dollars",
          "Contributions reduce your current taxable income",
          "Withdrawals are always tax-free",
          "There are no contribution limits",
        ],
        correctAnswer: 1,
        explanation:
          "Traditional 401(k) contributions are made with pre-tax dollars, reducing your current taxable income. You'll pay taxes when you withdraw the money in retirement.",
      },
      {
        id: "q3",
        question: "What is tax-loss harvesting?",
        options: [
          "Avoiding all investment losses",
          "Selling losing investments to offset capital gains",
          "Only investing in tax-free accounts",
          "Harvesting crops to reduce taxes",
        ],
        correctAnswer: 1,
        explanation:
          "Tax-loss harvesting involves selling investments at a loss to offset capital gains from other investments, thereby reducing your overall tax liability.",
      },
      {
        id: "q4",
        question:
          "Which retirement account allows tax-free withdrawals in retirement?",
        options: [
          "Traditional IRA",
          "Traditional 401(k)",
          "Roth IRA",
          "SEP-IRA",
        ],
        correctAnswer: 2,
        explanation:
          "Roth IRA contributions are made with after-tax dollars, but qualified withdrawals in retirement are completely tax-free, including any investment growth.",
      },
      {
        id: "q5",
        question: "What is the standard deduction for single filers in 2024?",
        options: ["$12,950", "$13,850", "$14,600", "$15,000"],
        correctAnswer: 1,
        explanation:
          "The standard deduction for single filers in 2024 is $13,850. This amount is adjusted annually for inflation and reduces your taxable income.",
      },
    ],
  },
  {
    id: "investment-fundamentals",
    title: "Investment Basics & Strategies",
    description:
      "Learn fundamental investment concepts and strategies for building wealth",
    category: "financial",
    difficulty: "intermediate",
    estimatedTime: 14,
    questions: [
      {
        id: "q1",
        question: "What is diversification in investing?",
        options: [
          "Investing all money in one stock",
          "Spreading investments across different assets to reduce risk",
          "Only investing in bonds",
          "Timing the market perfectly",
        ],
        correctAnswer: 1,
        explanation:
          "Diversification means spreading your investments across different asset classes, sectors, and geographic regions to reduce the impact of any single investment's poor performance.",
      },
      {
        id: "q2",
        question: "What is compound interest?",
        options: [
          "Interest paid only on the principal",
          "Interest earned on both principal and previously earned interest",
          "A type of bank account",
          "Interest that compounds monthly",
        ],
        correctAnswer: 1,
        explanation:
          "Compound interest is earning interest on both your original investment (principal) and on previously earned interest, creating exponential growth over time.",
      },
      {
        id: "q3",
        question: "What is dollar-cost averaging?",
        options: [
          "Investing a lump sum all at once",
          "Investing the same amount regularly regardless of market conditions",
          "Only investing when markets are down",
          "Averaging the cost of different stocks",
        ],
        correctAnswer: 1,
        explanation:
          "Dollar-cost averaging involves investing a fixed amount regularly (like monthly) regardless of market conditions, which can help reduce the impact of market volatility.",
      },
      {
        id: "q4",
        question:
          "What is the relationship between risk and return in investing?",
        options: [
          "Higher risk always means higher returns",
          "Lower risk always means higher returns",
          "Generally, higher potential returns come with higher risk",
          "Risk and return are unrelated",
        ],
        correctAnswer: 2,
        explanation:
          "Generally, investments with higher potential returns also carry higher risk. This risk-return tradeoff is a fundamental principle of investing.",
      },
      {
        id: "q5",
        question: "What is an index fund?",
        options: [
          "A fund that tries to beat the market",
          "A fund that tracks a specific market index",
          "A fund with high fees",
          "A fund that only invests in one company",
        ],
        correctAnswer: 1,
        explanation:
          "An index fund is designed to track the performance of a specific market index (like the S&P 500) by holding the same stocks in the same proportions as the index.",
      },
    ],
  },
  {
    id: "retirement-planning-basics",
    title: "Retirement Planning Essentials",
    description: "Learn the fundamentals of planning for a secure retirement",
    category: "financial",
    difficulty: "intermediate",
    estimatedTime: 13,
    questions: [
      {
        id: "q1",
        question: "What is the rule of 72?",
        options: [
          "You need 72% of your income in retirement",
          "A way to estimate how long it takes for money to double",
          "You should retire at age 72",
          "You need 72 times your annual expenses saved",
        ],
        correctAnswer: 1,
        explanation:
          "The rule of 72 helps estimate how long it takes for an investment to double. Divide 72 by the annual return rate to get the approximate number of years.",
      },
      {
        id: "q2",
        question:
          "What percentage of pre-retirement income do most experts recommend for retirement?",
        options: ["50-60%", "70-80%", "90-100%", "110-120%"],
        correctAnswer: 1,
        explanation:
          "Most financial experts recommend planning for 70-80% of your pre-retirement income to maintain your standard of living in retirement.",
      },
      {
        id: "q3",
        question: "At what age can you start taking Social Security benefits?",
        options: ["59½", "62", "65", "67"],
        correctAnswer: 1,
        explanation:
          "You can start taking Social Security benefits as early as age 62, but your benefits will be permanently reduced. Full retirement age varies from 65-67 depending on your birth year.",
      },
      {
        id: "q4",
        question:
          "What is the maximum age for contributing to a traditional IRA?",
        options: ["65", "70½", "72", "There is no maximum age"],
        correctAnswer: 3,
        explanation:
          "As of 2020, there is no maximum age for contributing to a traditional IRA, as long as you have earned income. Previously, the limit was 70½.",
      },
      {
        id: "q5",
        question: "What are Required Minimum Distributions (RMDs)?",
        options: [
          "Minimum amounts you must contribute to retirement accounts",
          "Minimum amounts you must withdraw from certain retirement accounts",
          "Minimum Social Security benefits",
          "Minimum pension payments",
        ],
        correctAnswer: 1,
        explanation:
          "RMDs are minimum amounts you must withdraw annually from traditional IRAs and 401(k)s starting at age 73, ensuring the government eventually collects taxes on these accounts.",
      },
    ],
  },
  {
    id: "credit-scores-management",
    title: "Credit Scores & Credit Management",
    description: "Understand how credit scores work and how to improve them",
    category: "financial",
    difficulty: "intermediate",
    estimatedTime: 11,
    questions: [
      {
        id: "q1",
        question: "What is the most important factor in your credit score?",
        options: [
          "Length of credit history",
          "Payment history",
          "Credit utilization",
          "Types of credit",
        ],
        correctAnswer: 1,
        explanation:
          "Payment history accounts for about 35% of your credit score and is the most important factor. Making payments on time consistently is crucial for a good credit score.",
      },
      {
        id: "q2",
        question: "What is credit utilization?",
        options: [
          "How often you use your credit cards",
          "The percentage of available credit you're using",
          "The number of credit cards you have",
          "How long you've had credit",
        ],
        correctAnswer: 1,
        explanation:
          "Credit utilization is the percentage of your available credit that you're currently using. Keeping this below 30% (ideally below 10%) helps maintain a good credit score.",
      },
      {
        id: "q3",
        question: "How often should you check your credit report?",
        options: [
          "Once every five years",
          "Once a year",
          "Once a month",
          "Only when applying for credit",
        ],
        correctAnswer: 1,
        explanation:
          "You should check your credit report at least once a year from each of the three major credit bureaus to monitor for errors and signs of identity theft.",
      },
      {
        id: "q4",
        question:
          "What happens to your credit score when you close a credit card?",
        options: [
          "It always improves",
          "It always gets worse",
          "It may decrease due to reduced available credit",
          "It has no effect",
        ],
        correctAnswer: 2,
        explanation:
          "Closing a credit card can hurt your credit score by reducing your total available credit, which increases your credit utilization ratio if you carry balances on other cards.",
      },
      {
        id: "q5",
        question:
          "What credit score range is generally considered 'excellent'?",
        options: ["650-699", "700-749", "750-799", "800-850"],
        correctAnswer: 3,
        explanation:
          "A credit score of 800-850 is generally considered excellent, while 750-799 is very good. Scores in this range typically qualify for the best interest rates and terms.",
      },
    ],
  },
  {
    id: "insurance-planning",
    title: "Insurance & Risk Management",
    description:
      "Learn about different types of insurance and how to protect your financial future",
    category: "financial",
    difficulty: "intermediate",
    estimatedTime: 10,
    questions: [
      {
        id: "q1",
        question:
          "What is the primary purpose of an emergency fund before considering insurance?",
        options: [
          "To replace all insurance needs",
          "To cover small, unexpected expenses without filing claims",
          "To pay insurance premiums",
          "To invest in the stock market",
        ],
        correctAnswer: 1,
        explanation:
          "An emergency fund helps cover small, unexpected expenses without needing to file insurance claims, which can help keep your premiums lower and provide immediate access to funds.",
      },
      {
        id: "q2",
        question:
          "What type of life insurance is typically the most cost-effective for young families?",
        options: [
          "Whole life insurance",
          "Universal life insurance",
          "Term life insurance",
          "Variable life insurance",
        ],
        correctAnswer: 2,
        explanation:
          "Term life insurance is typically the most cost-effective option for young families because it provides pure insurance coverage without investment components, making it much cheaper.",
      },
      {
        id: "q3",
        question: "What does disability insurance protect against?",
        options: [
          "Property damage",
          "Medical expenses",
          "Loss of income due to inability to work",
          "Legal liability",
        ],
        correctAnswer: 2,
        explanation:
          "Disability insurance protects your income by providing payments if you become unable to work due to illness or injury. It's often overlooked but crucial for financial security.",
      },
      {
        id: "q4",
        question: "What is a deductible in insurance?",
        options: [
          "The monthly payment you make",
          "The amount you pay before insurance coverage begins",
          "The maximum the insurance will pay",
          "The discount you get for good behavior",
        ],
        correctAnswer: 1,
        explanation:
          "A deductible is the amount you must pay out-of-pocket before your insurance coverage kicks in. Higher deductibles typically mean lower premiums.",
      },
      {
        id: "q5",
        question:
          "Why might someone choose a higher deductible on their insurance?",
        options: [
          "To get better coverage",
          "To lower their monthly premiums",
          "To file more claims",
          "To increase their coverage limits",
        ],
        correctAnswer: 1,
        explanation:
          "Choosing a higher deductible typically results in lower monthly premiums because you're taking on more of the initial risk yourself.",
      },
    ],
  },
  {
    id: "cryptocurrency-scams",
    title: "Cryptocurrency & Digital Asset Scams",
    description:
      "Learn to identify and avoid cryptocurrency-related fraud and scams",
    category: "fraud",
    difficulty: "advanced",
    estimatedTime: 12,
    questions: [
      {
        id: "q1",
        question:
          "What is a common characteristic of cryptocurrency Ponzi schemes?",
        options: [
          "Guaranteed high returns with no risk",
          "Transparent blockchain transactions",
          "Government regulation",
          "Low minimum investments",
        ],
        correctAnswer: 0,
        explanation:
          "Cryptocurrency Ponzi schemes often promise guaranteed high returns with little to no risk, which is impossible in legitimate investing, especially with volatile assets like cryptocurrencies.",
      },
      {
        id: "q2",
        question:
          "What should you be wary of in cryptocurrency investment opportunities?",
        options: [
          "Detailed whitepapers",
          "Celebrity endorsements and social media hype",
          "Established exchanges",
          "Transparent development teams",
        ],
        correctAnswer: 1,
        explanation:
          "Be extremely wary of cryptocurrency investments heavily promoted through celebrity endorsements or social media hype, as these are often signs of pump-and-dump schemes or outright scams.",
      },
      {
        id: "q3",
        question: "What is a 'rug pull' in cryptocurrency?",
        options: [
          "A legitimate exit strategy",
          "When developers abandon a project and steal investors' funds",
          "A type of mining operation",
          "A regulatory action",
        ],
        correctAnswer: 1,
        explanation:
          "A 'rug pull' occurs when cryptocurrency developers abandon their project and run away with investors' money, often after building initial hype and trust.",
      },
      {
        id: "q4",
        question: "How should you store significant amounts of cryptocurrency?",
        options: [
          "On a cryptocurrency exchange",
          "In a hot wallet connected to the internet",
          "In a cold wallet offline",
          "In multiple online wallets",
        ],
        correctAnswer: 2,
        explanation:
          "Significant amounts of cryptocurrency should be stored in cold wallets (offline storage) to protect against hacking, exchange failures, and online theft.",
      },
      {
        id: "q5",
        question: "What is a red flag for a cryptocurrency scam?",
        options: [
          "Open-source code",
          "Pressure to recruit others and earn commissions",
          "Listing on major exchanges",
          "Regular development updates",
        ],
        correctAnswer: 1,
        explanation:
          "Pressure to recruit others and earn commissions is a red flag indicating a pyramid scheme structure, which is common in cryptocurrency scams.",
      },
    ],
  },
  {
    id: "elder-fraud-protection",
    title: "Elder Fraud & Senior Scam Protection",
    description:
      "Learn about scams targeting seniors and how to protect elderly family members",
    category: "fraud",
    difficulty: "intermediate",
    estimatedTime: 11,
    questions: [
      {
        id: "q1",
        question: "What is the grandparent scam?",
        options: [
          "Scammers pretending to be grandchildren in emergency situations",
          "Scammers targeting grandparents for investment fraud",
          "Identity theft targeting elderly people",
          "Medicare fraud schemes",
        ],
        correctAnswer: 0,
        explanation:
          "The grandparent scam involves criminals calling elderly people pretending to be their grandchildren in urgent need of money for emergencies like jail, accidents, or travel problems.",
      },
      {
        id: "q2",
        question: "Why are seniors often targeted by scammers?",
        options: [
          "They have less money than younger people",
          "They are more trusting and may have accumulated wealth",
          "They don't use technology",
          "They are always home during the day",
        ],
        correctAnswer: 1,
        explanation:
          "Seniors are often targeted because they may be more trusting, polite, and have accumulated wealth over their lifetime, making them attractive targets for various scams.",
      },
      {
        id: "q3",
        question:
          "What should you do if an elderly family member receives suspicious calls?",
        options: [
          "Tell them to handle it themselves",
          "Help them verify the caller's identity independently",
          "Ignore the calls completely",
          "Change their phone number immediately",
        ],
        correctAnswer: 1,
        explanation:
          "Help elderly family members verify any suspicious calls by contacting the supposed organization or family member directly through known, trusted contact information.",
      },
      {
        id: "q4",
        question: "What is Medicare fraud?",
        options: [
          "When seniors don't pay their Medicare premiums",
          "When healthcare providers bill Medicare for unnecessary services",
          "When seniors use Medicare benefits incorrectly",
          "When Medicare denies legitimate claims",
        ],
        correctAnswer: 1,
        explanation:
          "Medicare fraud occurs when healthcare providers bill Medicare for services that weren't provided, weren't necessary, or were misrepresented to increase reimbursement.",
      },
      {
        id: "q5",
        question: "How can families help protect elderly relatives from scams?",
        options: [
          "Take away all their financial independence",
          "Monitor their accounts and maintain open communication",
          "Handle all their finances without their input",
          "Isolate them from all outside contact",
        ],
        correctAnswer: 1,
        explanation:
          "The best approach is maintaining open communication about potential scams while helping monitor accounts for suspicious activity, balancing protection with independence.",
      },
    ],
  },
  {
    id: "estate-planning-basics",
    title: "Estate Planning Fundamentals",
    description:
      "Learn the basics of estate planning and protecting your legacy",
    category: "financial",
    difficulty: "advanced",
    estimatedTime: 14,
    questions: [
      {
        id: "q1",
        question: "What is the primary purpose of a will?",
        options: [
          "To avoid probate court",
          "To specify how your assets should be distributed after death",
          "To reduce estate taxes",
          "To name a power of attorney",
        ],
        correctAnswer: 1,
        explanation:
          "A will's primary purpose is to specify how you want your assets distributed after your death and to name guardians for minor children if applicable.",
      },
      {
        id: "q2",
        question: "What is the difference between a will and a trust?",
        options: [
          "There is no difference",
          "A will takes effect after death, a trust can take effect while you're alive",
          "A trust is only for wealthy people",
          "A will is more expensive than a trust",
        ],
        correctAnswer: 1,
        explanation:
          "A will only takes effect after death and goes through probate, while a trust can take effect during your lifetime and may help avoid probate court.",
      },
      {
        id: "q3",
        question: "What is a power of attorney?",
        options: [
          "A type of lawyer",
          "A legal document giving someone authority to act on your behalf",
          "A court order",
          "An insurance policy",
        ],
        correctAnswer: 1,
        explanation:
          "A power of attorney is a legal document that gives someone you trust the authority to make decisions on your behalf if you become unable to do so.",
      },
      {
        id: "q4",
        question: "What happens if you die without a will?",
        options: [
          "Your assets go to the government",
          "Your assets are distributed according to state law",
          "Your family decides how to divide everything",
          "Everything goes to your spouse automatically",
        ],
        correctAnswer: 1,
        explanation:
          "If you die without a will (intestate), your assets are distributed according to your state's intestacy laws, which may not align with your wishes.",
      },
      {
        id: "q5",
        question: "What is the federal estate tax exemption for 2024?",
        options: [
          "$5.49 million",
          "$11.7 million",
          "$13.61 million",
          "$15 million",
        ],
        correctAnswer: 2,
        explanation:
          "The federal estate tax exemption for 2024 is $13.61 million per person, meaning estates below this value are not subject to federal estate tax.",
      },
    ],
  },
  {
    id: "small-business-financial-planning",
    title: "Small Business Financial Management",
    description:
      "Learn financial planning essentials for small business owners",
    category: "financial",
    difficulty: "advanced",
    estimatedTime: 13,
    questions: [
      {
        id: "q1",
        question:
          "What is the most important financial statement for a small business?",
        options: [
          "Balance sheet",
          "Cash flow statement",
          "Income statement",
          "Statement of equity",
        ],
        correctAnswer: 1,
        explanation:
          "The cash flow statement is often most critical for small businesses because it shows actual cash coming in and going out, which is essential for day-to-day operations.",
      },
      {
        id: "q2",
        question:
          "How much should a small business keep in emergency reserves?",
        options: [
          "1-2 months of expenses",
          "3-6 months of expenses",
          "6-12 months of expenses",
          "No emergency fund is needed",
        ],
        correctAnswer: 2,
        explanation:
          "Small businesses should typically maintain 6-12 months of operating expenses in emergency reserves due to the unpredictable nature of business income.",
      },
      {
        id: "q3",
        question:
          "What is the purpose of separating business and personal finances?",
        options: [
          "It's not necessary for small businesses",
          "To make tax preparation easier and maintain legal protection",
          "To confuse the IRS",
          "Only large corporations need to do this",
        ],
        correctAnswer: 1,
        explanation:
          "Separating business and personal finances is crucial for tax purposes, legal liability protection, and maintaining the corporate veil if you're incorporated.",
      },
      {
        id: "q4",
        question: "What is accounts receivable?",
        options: [
          "Money the business owes to suppliers",
          "Money customers owe to the business",
          "Cash in the bank",
          "Business equipment",
        ],
        correctAnswer: 1,
        explanation:
          "Accounts receivable represents money that customers owe to your business for goods or services provided but not yet paid for.",
      },
      {
        id: "q5",
        question: "What is a business line of credit?",
        options: [
          "A one-time loan",
          "A flexible borrowing arrangement up to a set limit",
          "A type of business insurance",
          "A government grant program",
        ],
        correctAnswer: 1,
        explanation:
          "A business line of credit provides flexible access to funds up to a predetermined limit, allowing you to borrow only what you need when you need it.",
      },
    ],
  },
];

// Simple storage simulation (in a real app, use AsyncStorage)
let userProgress: {
  [quizId: string]: {
    completed: boolean;
    score: number;
    attempts: number;
    lastAttempt: Date;
  };
} = {};

export const getUserProgress = () => userProgress;

export const saveQuizResult = (quizId: string, score: number) => {
  const existing = userProgress[quizId];
  userProgress[quizId] = {
    completed: true,
    score: Math.max(score, existing?.score || 0), // Keep the best score
    attempts: (existing?.attempts || 0) + 1,
    lastAttempt: new Date(),
  };
};

export const getCompletedQuizzesCount = () => {
  return Object.values(userProgress).filter((p) => p.completed).length;
};

export const getTotalScore = () => {
  return Object.values(userProgress).reduce(
    (total, p) => total + (p.completed ? p.score : 0),
    0
  );
};

export const getQuizzesByCategory = (category: "fraud" | "financial") => {
  return quizzes.filter((quiz) => quiz.category === category);
};

export const getQuizzesByDifficulty = (
  difficulty: "beginner" | "intermediate" | "advanced"
) => {
  return quizzes.filter((quiz) => quiz.difficulty === difficulty);
};

export const getAverageScore = () => {
  const completedQuizzes = Object.values(userProgress).filter(
    (p) => p.completed
  );
  if (completedQuizzes.length === 0) return 0;
  const totalScore = completedQuizzes.reduce((sum, p) => sum + p.score, 0);
  return Math.round((totalScore / (completedQuizzes.length * 5)) * 100);
};

export const getBadges = () => {
  const completed = getCompletedQuizzesCount();
  const avgScore = getAverageScore();
  const badges = [];

  if (completed >= 5)
    badges.push({
      name: "Getting Started",
      description: "Completed 5 quizzes",
    });
  if (completed >= 10)
    badges.push({
      name: "Knowledge Seeker",
      description: "Completed 10 quizzes",
    });
  if (completed >= 20)
    badges.push({ name: "Fraud Fighter", description: "Completed 20 quizzes" });
  if (avgScore >= 80)
    badges.push({ name: "High Achiever", description: "80%+ average score" });
  if (avgScore >= 90)
    badges.push({ name: "Expert", description: "90%+ average score" });

  return badges;
};

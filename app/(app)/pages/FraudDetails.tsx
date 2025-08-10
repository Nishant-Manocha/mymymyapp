import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import {
  BookOpen,
  Search,
  Mail,
  Phone,
  CreditCard,
  User,
  Globe,
  Smartphone,
  X,
  ExternalLink,
  TriangleAlert as AlertTriangle,
  Shield,
  CircleCheck as CheckCircle,
  Info,
  DollarSign,
  Lock,
  Eye,
  Banknote,
  GraduationCap,
  Briefcase,
  LockKeyhole,
  CheckCheck,
  BadgeAlert,
  HeartHandshake,
  Gift,
  FileWarning,
  Home,
  TrendingDown,
  Fingerprint,
  Layers,
  FileText,
} from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import YoutubeIframe from "react-native-youtube-iframe";

const fraudTypes = [
  {
    id: 3,
    title: "Ponzi Scheme",
    icon: Banknote,
    color: "#F59E0B",
    description:
      "A fraudulent investment scheme paying returns using new investors’ money",
    detailedDescription:
      "A Ponzi scheme is a type of investment fraud that promises high returns with little or no risk to investors. Instead of generating profits through legitimate business activities, returns are paid to earlier investors using the capital from new participants. This unsustainable model eventually collapses when recruitment slows or a large number of investors demand returns simultaneously.",
    howItWorks: [
      "Fraudsters create an investment fund with fake claims of high, consistent returns",
      "Early investors are paid using money from new investors, not actual profits",
      "Fake documentation and false audits are used to maintain the illusion of legitimacy",
      "Positive word-of-mouth and peer pressure attract more investors",
      "Eventually collapses when new investments dry up or too many withdrawals occur",
    ],
    commonTargets: [
      "Retirees seeking stable investments",
      "Affinity groups (religious, cultural, community-based)",
      "High-net-worth individuals",
      "Small business owners",
      "People unfamiliar with financial markets",
    ],
    redFlags: [
      "Guaranteed high returns with little or no risk",
      "Overly consistent returns regardless of market conditions",
      "Lack of transparency about investment strategy",
      "Unregistered investment vehicles or unlicensed sellers",
      "Difficulty receiving payout or redeeming investment",
      "Pressure to reinvest rather than withdraw",
      "Recruitment-based incentives",
    ],
    prevention: [
      "Verify investment firms with regulatory bodies like SEBI or SEC",
      "Be skeptical of any investment promising guaranteed returns",
      "Request and review audited financial statements",
      "Avoid investments that are not transparent about how they make money",
      "Don't invest under peer pressure or emotional influence",
      "Consult licensed financial advisors before investing",
      "Check for legal registration and licensing of the scheme and its operators",
    ],
    realExamples: [
      {
        title: "Bernie Madoff Investment Securities",
        description:
          "One of the largest Ponzi schemes in history, defrauding thousands of investors of billions of dollars over decades through false account statements and fabricated trades.",
      },
      {
        title: "BitConnect Collapse",
        description:
          "A cryptocurrency-based Ponzi scheme that promised daily returns of 1%, later revealed to be paying old investors with funds from new ones before abruptly shutting down.",
      },
      {
        title: "MMM Global",
        description:
          "An international Ponzi scheme disguised as a mutual aid fund that operated in multiple countries and defrauded millions before collapsing.",
      },
      {
        title: "Albanian Pyramid Schemes (1996–97)",
        description:
          "Several Ponzi schemes in Albania led to economic collapse and civil unrest after defrauding a significant portion of the population.",
      },
    ],
    statistics: [
      "Ponzi schemes defrauded investors of $3.25 billion in the U.S. in 2023 alone",
      "Most schemes collapse within 3–5 years",
      "Over 50% of Ponzi scheme victims are recruited through social networks",
      "Fewer than 30% of victims recover more than half their losses",
    ],
  },
  {
    id: 2,
    title: "Pyramid Scheme",
    icon: Layers,
    color: "#EC4899",
    description:
      "A business model focused on recruitment rather than product sales",
    detailedDescription:
      "A pyramid scheme is a form of investment fraud where participants earn money primarily by recruiting others rather than selling products or services. Each new recruit must invest or pay a fee, with earnings flowing upward in the structure. These schemes eventually collapse when it becomes impossible to recruit enough new members.",
    howItWorks: [
      "Participants pay to join a program with promises of high returns",
      "Earnings come primarily from recruiting others, not selling real products",
      "Each new recruit must pay an entry fee which is distributed to those above them",
      "The cycle continues as long as new members keep joining",
      "Collapses when recruitment slows or stops",
    ],
    commonTargets: [
      "College students",
      "Stay-at-home individuals",
      "Job seekers looking for passive income",
      "Social media followers",
      "Friends and family of existing members",
    ],
    redFlags: [
      "Compensation primarily based on recruitment",
      "Exaggerated income claims",
      "Mandatory purchase of starter kits or training",
      "Lack of genuine retail product sales",
      "Pressure to join quickly",
      "Focus on building downlines",
    ],
    prevention: [
      "Research whether the business emphasizes recruitment over product sales",
      "Avoid schemes that require upfront payment without clear deliverables",
      "Check for registration with regulatory authorities",
      "Request data on how income is truly earned",
      "Consult consumer protection agencies before joining",
      "Be skeptical of 'get rich quick' claims",
    ],
    realExamples: [
      {
        title: "Fortune Hi-Tech Marketing (FHTM)",
        description:
          "Shut down by the FTC for being a pyramid scheme disguised as an MLM, where most participants earned little or no money.",
      },
      {
        title: "LaLa World",
        description:
          "Promised high crypto earnings for referrals, collapsed after legal action and withdrawal issues.",
      },
      {
        title: "Liberty League International",
        description:
          "Charged thousands for seminars and relied heavily on recruitment incentives, leading to regulatory scrutiny.",
      },
      {
        title: "Women's Gifting Circles",
        description:
          "Framed as a sisterhood support network, but operated as a pyramid scheme targeting women with financial hardship.",
      },
    ],
    statistics: [
      "More than 90% of pyramid scheme participants lose money",
      "Schemes typically collapse within 1–3 years",
      "FTC receives thousands of pyramid scheme complaints annually",
      "Many are disguised as 'multi-level marketing' companies",
    ],
  },
  {
    id: 3,
    title: "Identity Theft",
    icon: Fingerprint,
    color: "#EF4444",
    description:
      "Stealing personal data to commit financial or reputational harm",
    detailedDescription:
      "Identity theft occurs when someone unlawfully obtains and uses another person’s personal information—such as Social Security numbers, credit card details, or banking credentials—for financial gain or impersonation. It can lead to unauthorized transactions, false credit applications, or even criminal records in the victim’s name.",
    howItWorks: [
      "Fraudster obtains personal data via phishing, data breaches, or physical theft",
      "Information is used to open bank accounts, apply for credit, or access services",
      "Victim may not be aware until financial or legal consequences arise",
      "Stolen identities may also be sold on the dark web",
      "Long-term impacts include bad credit and emotional distress",
    ],
    commonTargets: [
      "Elderly individuals",
      "Children and students (clean credit profiles)",
      "Online shoppers",
      "Social media users",
      "Victims of data breaches",
    ],
    redFlags: [
      "Unexplained charges or loans in your name",
      "Bills for services you never used",
      "Denied credit despite good credit history",
      "Unfamiliar accounts on your credit report",
      "Notifications about logins from unknown devices",
    ],
    prevention: [
      "Use strong, unique passwords and enable 2FA",
      "Shred sensitive documents before disposal",
      "Avoid sharing personal information on public platforms",
      "Regularly monitor bank and credit statements",
      "Freeze credit with bureaus if you're not actively applying",
      "Check your credit report annually for suspicious activity",
    ],
    realExamples: [
      {
        title: "Equifax Data Breach (2017)",
        description:
          "Sensitive information of over 147 million Americans was stolen, leading to widespread identity theft cases.",
      },
      {
        title: "Synthetic Identity Fraud",
        description:
          "Fraudsters created fake identities using bits of real data (e.g., SSN + fake name) to apply for loans and rack up debt.",
      },
      {
        title: "Child Identity Theft",
        description:
          "Thieves used children's Social Security numbers to open credit accounts, often undetected for years.",
      },
      {
        title: "Medical Identity Theft",
        description:
          "Personal details were used to get prescription drugs and healthcare services, resulting in corrupted medical records.",
      },
    ],
    statistics: [
      "Over 1.1 million identity theft reports were filed with the FTC in 2022",
      "Children are 51 times more likely to be victims of identity theft than adults",
      "Average time to resolve identity theft cases: 6 months",
      "Cost of identity theft to individuals: $3.3 billion annually",
    ],
  },
  {
    id: 4,
    title: "Credit Card Fraud",
    icon: CreditCard,
    color: "#6366F1",
    description: "Unauthorized use of credit card data to make transactions",
    detailedDescription:
      "Credit card fraud involves the unauthorized use of someone else’s credit card or credit card number to make purchases or withdraw funds. This can happen through skimming, phishing, data breaches, or physical theft. Victims may face financial losses and damage to their credit score.",
    howItWorks: [
      "Card information is stolen using skimmers, hacked databases, or phishing",
      "Fraudster uses the stolen data to make unauthorized purchases or withdraw cash",
      "Sometimes physical cards are stolen or copied",
      "Fraudulent charges appear on the victim's statement",
      "Funds are often hard to recover if not reported quickly",
    ],
    commonTargets: [
      "Online shoppers",
      "ATM users",
      "Travelers using public Wi-Fi",
      "People using cards at gas stations, restaurants, or vending machines",
      "Victims of data breaches",
    ],
    redFlags: [
      "Unrecognized transactions on your statement",
      "Alerts about declined transactions you didn’t make",
      "Duplicate charges",
      "Sudden drop in available credit",
      "Calls from banks about suspicious activity",
    ],
    prevention: [
      "Use cards with chip-and-PIN technology",
      "Enable transaction alerts via SMS or email",
      "Avoid using public Wi-Fi for online purchases",
      "Check statements regularly and report suspicious activity immediately",
      "Use virtual cards or payment apps for added protection",
      "Cover your PIN when entering it in public",
    ],
    realExamples: [
      {
        title: "Skimming Devices at ATMs",
        description:
          "Criminals installed skimmers on ATMs and gas stations to capture card data, later used for cloning and purchases.",
      },
      {
        title: "Retail POS Data Breach (Target 2013)",
        description:
          "Hackers stole credit card details of 40 million customers through malware installed on POS terminals.",
      },
      {
        title: "Fake E-commerce Stores",
        description:
          "Fraudsters set up fake online stores to collect credit card details and never ship products.",
      },
      {
        title: "Subscription Trap",
        description:
          "Users unknowingly signed up for recurring charges after a free trial, with cancellation made intentionally difficult.",
      },
    ],
    statistics: [
      "$28.65 billion lost globally to credit card fraud in 2023",
      "Card-not-present fraud is 81% more common than card-present fraud",
      "USA accounts for over one-third of global card fraud losses",
      "Only 45% of victims detect fraud within the first 24 hours",
    ],
  },
  {
    id: 1,
    title: "Email Phishing",
    icon: Mail,
    color: "#3B82F6",
    description: "Fraudulent emails designed to steal personal information",
    detailedDescription:
      "Email phishing is one of the most common and dangerous forms of cybercrime. Attackers send emails that appear to come from legitimate sources like banks, social media platforms, or government agencies. These emails are carefully crafted to look authentic, often using official logos, colors, and language patterns that mimic real organizations.",
    howItWorks: [
      "Scammers create fake emails that look like they're from trusted sources",
      "They use psychological tricks like urgency, fear, or rewards to motivate action",
      "Victims are directed to fake websites that steal login credentials",
      "Personal information is harvested and used for identity theft or financial fraud",
      "Sometimes malware is installed through malicious attachments or links",
    ],
    commonTargets: [
      "Banking and financial institutions",
      "Social media platforms (Facebook, Instagram, LinkedIn)",
      "E-commerce sites (Amazon, eBay, online stores)",
      "Government agencies (IRS, Social Security, DMV)",
      "Email providers (Gmail, Yahoo, Outlook)",
      "Streaming services (Netflix, Spotify, Disney+)",
    ],
    redFlags: [
      "Generic greetings like 'Dear Customer' instead of your actual name",
      "Urgent language creating false deadlines ('Act within 24 hours')",
      "Suspicious sender addresses with slight misspellings",
      "Links that don't match the claimed destination when hovered over",
      "Unexpected attachments, especially .exe, .zip, or .scr files",
      "Requests for sensitive information like passwords or SSN",
      "Poor grammar, spelling errors, or awkward phrasing",
      "Threats of account closure or legal action",
      "Offers that seem too good to be true",
    ],
    prevention: [
      "Always verify sender through official channels before taking action",
      "Hover over links to check actual destinations before clicking",
      "Type website URLs directly instead of clicking email links",
      "Use multi-factor authentication on all important accounts",
      "Keep email security software updated and active",
      "Be skeptical of urgent requests for personal information",
      "Check for official company signatures and contact information",
      "Report suspicious emails to your email provider and the impersonated organization",
    ],
    realExamples: [
      {
        title: "Fake Bank Security Alert",
        description:
          "Email claiming suspicious activity on your account, asking you to 'verify' by clicking a link that leads to a fake banking website.",
      },
      {
        title: "Social Media Password Reset",
        description:
          "Message claiming someone tried to access your social media account, with a link to 'secure' your account that actually steals your credentials.",
      },
      {
        title: "Tax Refund Scam",
        description:
          "Official-looking email from 'IRS' claiming you're owed a refund, requesting personal information to process the payment.",
      },
      {
        title: "Package Delivery Notification",
        description:
          "Fake shipping notification claiming a package couldn't be delivered, with a malicious link to 'reschedule delivery'.",
      },
    ],
    statistics: [
      "96% of phishing attacks arrive via email",
      "1 in 4,200 emails is a phishing attempt",
      "Phishing attacks increased by 65% in the last year",
      "Average cost of a successful phishing attack: $4.65 million",
    ],
  },
  {
    id: 5,
    title: "Investment Fraud",
    icon: TrendingDown,
    color: "#8B5CF6",
    description:
      "Deceptive practices that lead people to invest in worthless or fake opportunities",
    detailedDescription:
      "Investment fraud involves the use of false or misleading information to convince individuals to invest in schemes that offer little to no return. These scams may include fake stocks, unregistered securities, and non-existent businesses. Victims are often lured in by promises of guaranteed returns and insider access.",
    howItWorks: [
      "Scammers promote fake investment opportunities via phone, email, or social media",
      "They present false credentials and performance data to appear legitimate",
      "Victims are convinced to invest money expecting high returns",
      "Funds are diverted for personal gain or redistributed in pyramid-like fashion",
      "Eventually, the scheme collapses or becomes unreachable",
    ],
    commonTargets: [
      "Retirees with savings",
      "Crypto investors",
      "Entrepreneurs",
      "Professionals seeking side income",
      "Members of online investment forums",
    ],
    redFlags: [
      "Unregistered investment opportunities",
      "Guaranteed or unusually high returns",
      "Pressure to act quickly or secrecy about the offer",
      "Lack of transparency or access to company financials",
      "Complex jargon to confuse and mislead investors",
    ],
    prevention: [
      "Research and verify the company and individuals offering the investment",
      "Check registration with financial regulators like SEBI or SEC",
      "Consult a certified financial advisor before investing",
      "Avoid high-pressure tactics or fear-of-missing-out marketing",
      "Demand documentation and audited performance records",
    ],
    realExamples: [
      {
        title: "BitClub Network",
        description:
          "Claimed to offer crypto mining investments but defrauded investors out of over $700 million.",
      },
      {
        title: "Affinity Investment Fraud",
        description:
          "Scammers targeted members of religious communities, exploiting trust to solicit fake investments.",
      },
      {
        title: "Pump-and-Dump Scams",
        description:
          "Fraudsters hyped up penny stocks to inflate prices, then sold off shares while others lost money.",
      },
      {
        title: "Forex Trading Scams",
        description:
          "Unlicensed brokers promised unrealistic profits in foreign exchange markets with no transparency.",
      },
    ],
    statistics: [
      "The SEC filed 760 enforcement actions related to investment fraud in 2022",
      "Affinity fraud accounts for 25% of investment scams",
      "Average individual loss: over $40,000",
      "Crypto investment scams increased by over 183% in recent years",
    ],
  },
  {
    id: 6,
    title: "Mortgage Fraud",
    icon: Home,
    color: "#0EA5E9",
    description: "Misrepresentation to obtain a mortgage or better loan terms",
    detailedDescription:
      "Mortgage fraud involves intentional misstatements, misrepresentations, or omissions on a mortgage loan application to obtain funding or better terms dishonestly. This may include inflating income, lying about property use, or creating fake documents to qualify for loans.",
    howItWorks: [
      "Applicants or professionals provide false information to secure loan approval",
      "Appraisers inflate property values to match loan needs",
      "Fake employers or income statements are created",
      "Straw buyers are used to conceal the real identity of the borrower",
      "Loans are approved based on fraud and may default later",
    ],
    commonTargets: [
      "Real estate investors",
      "Homebuyers with poor credit",
      "Unsuspecting cosigners",
      "Banks and financial institutions",
      "Underwriters in fast-paced markets",
    ],
    redFlags: [
      "Discrepancies in income or employment records",
      "Pressure to falsify documents",
      "Too-good-to-be-true loan terms",
      "Flipping properties at suspiciously high prices",
      "Loans processed unusually quickly",
    ],
    prevention: [
      "Use licensed mortgage brokers and agents",
      "Verify all documents for authenticity",
      "Report pressure to commit fraud",
      "Lenders should use rigorous background checks",
      "Cross-verify property values with independent appraisals",
    ],
    realExamples: [
      {
        title: "2008 Housing Crisis",
        description:
          "Rampant mortgage fraud through falsified applications and inflated appraisals contributed to the global financial meltdown.",
      },
      {
        title: "Straw Buyer Scams",
        description:
          "Fraudsters used fake buyers to purchase multiple properties, then defaulted, causing massive lender losses.",
      },
      {
        title: "Foreclosure Rescue Scams",
        description:
          "Scammers targeted homeowners in distress, promising help but stealing property titles or equity instead.",
      },
      {
        title: "Employment Falsification",
        description:
          "Applicants claimed fake jobs or income to qualify for loans they couldn’t afford.",
      },
    ],
    statistics: [
      "Mortgage fraud reports rose by 37% in 2022",
      "80% of reported cases involve income or employment misrepresentation",
      "FBI investigates thousands of mortgage fraud cases yearly",
      "Financial institutions lose billions annually due to mortgage fraud",
    ],
  },
  {
    id: 7,
    title: "Tax Scams",
    icon: FileWarning,
    color: "#F43F5E",
    description:
      "Fake claims about tax refunds or liabilities to steal money or info",
    detailedDescription:
      "Tax scams involve fraudsters impersonating tax authorities or offering fake services to steal refunds, obtain personal information, or collect bogus fees. These scams spike during tax season and prey on fear of penalties or desire for large refunds.",
    howItWorks: [
      "Scammers impersonate tax officials via phone, email, or SMS",
      "Victims are threatened with arrest or promised large refunds",
      "They are asked to provide bank details or pay fees upfront",
      "Some scammers file fake tax returns using stolen identities",
      "Money is diverted to the fraudster before the real person files",
    ],
    commonTargets: [
      "Senior citizens",
      "Low-income taxpayers",
      "Immigrants",
      "People who recently filed taxes",
      "Victims of identity theft",
    ],
    redFlags: [
      "Calls or emails claiming to be from tax departments demanding urgent action",
      "Requests for payment via gift cards or cryptocurrency",
      "Unexpected refunds or requests for personal details",
      "Emails with unofficial or spoofed domains",
      "Threats of jail time or deportation",
    ],
    prevention: [
      "Always file taxes through certified professionals or trusted software",
      "Verify tax-related calls via official government numbers",
      "Enable IRS/Income Tax SMS/email notifications",
      "Never share personal tax info over the phone",
      "Report scams to local or national tax authorities",
    ],
    realExamples: [
      {
        title: "IRS Phone Scam (USA)",
        description:
          "Scammers called victims claiming unpaid taxes and threatened arrest unless immediate payment was made via gift cards.",
      },
      {
        title: "PAN Card Phishing (India)",
        description:
          "Fake websites collected sensitive tax information under the guise of PAN verification.",
      },
      {
        title: "Email Refund Scams",
        description:
          "Victims received emails promising refunds in exchange for logging in through a fake tax portal.",
      },
      {
        title: "Fake Tax Filing Services",
        description:
          "Scammers charged fees to file fake returns, then vanished with the money and information.",
      },
    ],
    statistics: [
      "Over 50,000 tax scam reports were filed in India in 2023 alone",
      "US citizens lost over $72 million to IRS impersonation scams since 2013",
      "Most scams occur between February and April (tax season)",
      "Average refund fraud loss: $2,400 per person",
    ],
  },
  {
    id: 8,
    title: "Lottery and Sweepstakes Fraud",
    icon: Gift,
    color: "#EAB308",
    description:
      "Scammers claim you've won a prize and demand fees to release it",
    detailedDescription:
      "Lottery and sweepstakes fraud involves criminals contacting victims to inform them that they've won a prize or lottery—despite not entering—and then demanding fees for taxes, shipping, or processing before the prize can be delivered. Victims never receive any reward, and their money or personal data is stolen.",
    howItWorks: [
      "Victim is contacted via email, phone, or mail claiming they won a prize",
      "They're told they must pay fees or provide personal info to receive it",
      "Fraudsters often impersonate legitimate brands or lotteries",
      "Funds are collected via wire transfers, gift cards, or online wallets",
      "The prize never arrives and the scammer disappears",
    ],
    commonTargets: [
      "Senior citizens",
      "People with low digital literacy",
      "Contest participants",
      "Social media users",
      "Rural populations with limited legal awareness",
    ],
    redFlags: [
      "Being told you won a lottery or prize you didn’t enter",
      "Asked to pay upfront fees to claim a prize",
      "Poor grammar and formatting in messages",
      "Urgent or emotional appeals (‘don’t miss out!’)",
      "Requests for sensitive information (banking or ID)",
    ],
    prevention: [
      "Never pay to claim a prize",
      "Verify all sweepstakes with the official sponsor",
      "Check if the lottery is registered and real",
      "Report suspicious contacts to cybercrime or fraud portals",
      "Do not share personal info over phone or email",
    ],
    realExamples: [
      {
        title: "Mega Millions Scam",
        description:
          "Victims were contacted by scammers impersonating the real lottery, requesting processing fees for a fake jackpot.",
      },
      {
        title: "Facebook Giveaway Scams",
        description:
          "Fake pages announced fake giveaways and collected victims’ personal data and deposits.",
      },
      {
        title: "Publisher's Clearing House Scam",
        description:
          "Scammers claimed the victim won a sweepstake and demanded taxes via wire transfer.",
      },
      {
        title: "WhatsApp Lottery",
        description:
          "Victims received messages saying they won a lottery from 'WhatsApp Inc.', which does not conduct lotteries.",
      },
    ],
    statistics: [
      "Lottery scams defraud Americans of $117 million annually",
      "Elderly victims account for 70% of reported cases",
      "The average loss per victim: $1,500–$3,000",
      "Most common contact method: Phone (67%)",
    ],
  },
  {
    id: 9,
    title: "Charity Scams",
    icon: HeartHandshake,
    color: "#F97316",
    description:
      "Fake charities solicit donations for non-existent or fraudulent causes",
    detailedDescription:
      "Charity scams involve fraudsters creating fake charitable organizations or impersonating real ones to collect donations. These scams often spike after natural disasters, during holidays, or in times of crisis. Donations go into the scammer’s pockets instead of supporting real causes.",
    howItWorks: [
      "Scammer sets up a fake charity or impersonates a real one",
      "Victims are contacted via phone, email, social media, or door-to-door",
      "Donations are requested urgently, often using emotional stories",
      "Payment is asked via non-traceable methods like UPI, crypto, or gift cards",
      "Victims later realize the organization never existed or wasn’t affiliated",
    ],
    commonTargets: [
      "Philanthropic individuals",
      "Social media users during crises",
      "Religious communities",
      "Disaster responders",
      "Elderly donors",
    ],
    redFlags: [
      "High-pressure donation appeals after disasters",
      "Lack of registration details or tax receipts",
      "Vague mission statements or unverified testimonials",
      "Only accepting cash, gift cards, or cryptocurrency",
      "Website or email address similar to real organizations but slightly altered",
    ],
    prevention: [
      "Research charities before donating (use Charity Navigator, Guidestar, etc.)",
      "Donate through official websites only",
      "Check for registration numbers and tax deduction status",
      "Avoid emotional manipulation tactics",
      "Ask how your donation will be used",
    ],
    realExamples: [
      {
        title: "COVID Relief Scams",
        description:
          "Fake NGOs collected funds for oxygen, beds, and food but disappeared after receiving donations.",
      },
      {
        title: "Fake Animal Rescue Funds",
        description:
          "Scammers used pet images to solicit donations on Instagram with no actual animals being helped.",
      },
      {
        title: "Disaster Relief Impersonation",
        description:
          "After a hurricane, scammers mimicked Red Cross campaigns and collected funds via fake websites.",
      },
      {
        title: "War Crisis Donation Fraud",
        description:
          "Fake charities claimed to support refugees during conflicts and lured foreign donors via social media ads.",
      },
    ],
    statistics: [
      "40% of crisis-related fundraising pages are fake or suspicious",
      "Charity fraud spikes by 80% during disasters",
      "Over $93 million lost globally in charity scams in 2022",
      "Most charity scams impersonate real, trusted organizations",
    ],
  },
  {
    id: 10,
    title: "Debt Relief Scams",
    icon: BadgeAlert,
    color: "#14B8A6",
    description: "False promises to eliminate or reduce debt for a fee",
    detailedDescription:
      "Debt relief scams involve fraudulent companies or individuals claiming they can reduce, erase, or consolidate your debt in exchange for upfront fees. These scammers often disappear after collecting payment, leaving victims in worse financial shape than before.",
    howItWorks: [
      "Scammers advertise debt reduction services online or via cold calls",
      "They promise quick, guaranteed relief in exchange for advance payments",
      "Victims pay but receive no actual service or follow-up",
      "Sometimes the company files fake disputes or never contacts creditors",
      "Victims end up with worsening credit scores and more debt",
    ],
    commonTargets: [
      "Students with loan debt",
      "People with high credit card balances",
      "Homeowners with mortgage arrears",
      "Consumers in financial distress",
      "Victims of past scams",
    ],
    redFlags: [
      "Guarantees to erase or cancel debt",
      "Upfront fees or ‘processing charges’",
      "No physical office or verifiable license",
      "Lack of written agreement",
      "High-pressure sales tactics",
    ],
    prevention: [
      "Work only with licensed debt counselors or firms",
      "Never pay upfront for debt relief",
      "Research company reviews and complaints online",
      "Confirm credentials with financial regulatory bodies",
      "Read the fine print before signing any agreement",
    ],
    realExamples: [
      {
        title: "Fake Loan Forgiveness Centers",
        description:
          "Scammers posed as official debt relief companies and tricked borrowers into paying application fees for nonexistent programs.",
      },
      {
        title: "Student Loan Debt Relief Scam",
        description:
          "Companies promised student loan forgiveness under government schemes, collecting high fees without delivering results.",
      },
      {
        title: "Credit Card Consolidation Fraud",
        description:
          "Victims were lured with low-interest consolidation offers, but the scammers simply kept the money.",
      },
      {
        title: "Debt Elimination Services",
        description:
          "Promised to legally erase debts using 'loopholes', but left customers worse off and in legal trouble.",
      },
    ],
    statistics: [
      "Debt relief fraud cost Americans over $150 million in 2023",
      "90% of victims reported no follow-up or refund",
      "The FTC shut down 50+ debt relief scams in the last 2 years",
      "Most scams target people with credit scores under 600",
    ],
  },
  {
    id: 11,
    title: "Fake Check Scams",
    icon: CheckCheck,
    color: "#A855F7",
    description: "Fraud involving counterfeit checks that bounce after cashing",
    detailedDescription:
      "Fake check scams involve fraudsters sending counterfeit checks to victims, usually as part of a job offer, overpayment, or prize. Victims deposit the checks and are asked to send back part of the funds before the check bounces. By the time the fraud is discovered, the victim is left liable for the entire amount.",
    howItWorks: [
      "Victim receives a fake check via mail, courier, or email",
      "They’re told it’s payment for work, a refund, or prize winnings",
      "Scammer instructs victim to deposit the check and send part of the money back",
      "The check clears initially but bounces days later",
      "The bank reverses the amount and the victim loses money",
    ],
    commonTargets: [
      "Online sellers",
      "Freelancers accepting new gigs",
      "Mystery shoppers",
      "Job seekers",
      "Lottery or sweepstakes ‘winners’",
    ],
    redFlags: [
      "Checks from unknown sources",
      "Overpayment with request for refund",
      "Urgency to deposit and resend money quickly",
      "Poorly printed or generic-looking checks",
      "No official company name or contact details",
    ],
    prevention: [
      "Wait for checks to fully clear before withdrawing funds",
      "Verify source with issuing bank",
      "Never send money back from a deposited check",
      "Refuse jobs or offers that require handling funds",
      "Use secure, verified platforms for job or sale transactions",
    ],
    realExamples: [
      {
        title: "Mystery Shopper Scam",
        description:
          "Victims were paid with fake checks to evaluate money transfer services and asked to send back a portion.",
      },
      {
        title: "Craigslist Overpayment",
        description:
          "A buyer sent a larger check 'by mistake' and asked for the balance to be refunded before the check bounced.",
      },
      {
        title: "Refund Scam",
        description:
          "Fake employers sent new hires checks to buy supplies, then demanded leftover money be returned.",
      },
      {
        title: "Romance Scam Check Transfers",
        description:
          "Online scammers convinced victims to cash fraudulent checks as a favor for a ‘lover’ abroad.",
      },
    ],
    statistics: [
      "Fake check scams cost Americans over $28 million annually",
      "Most checks bounce after 5–7 days, too late to recover the money",
      "Victims typically lose between $900 and $2,200",
      "Banks hold the victim responsible for bounced checks",
    ],
  },
  {
    id: 12,
    title: "Online Banking Fraud",
    icon: LockKeyhole,
    color: "#0F766E",
    description: "Cybercriminals gain unauthorized access to your bank account",
    detailedDescription:
      "Online banking fraud involves unauthorized access to a user's digital bank account to steal money, change credentials, or perform illegal transactions. It can occur through malware, phishing, SIM swapping, or poor cybersecurity practices. Victims may not realize the fraud until their accounts are emptied or blocked.",
    howItWorks: [
      "Scammers trick users into giving away banking credentials via phishing or fake websites",
      "They may use malware or keyloggers to record login information",
      "Sometimes access is gained through SIM swapping or account recovery exploitation",
      "Once inside, fraudsters transfer money, change credentials, or add mules",
      "Victim’s account may be locked, or all funds drained before detection",
    ],
    commonTargets: [
      "Online shoppers",
      "People using outdated or unsecured devices",
      "Mobile banking users",
      "Senior citizens unfamiliar with digital threats",
      "Victims of data breaches",
    ],
    redFlags: [
      "Unfamiliar devices or IP addresses logged into your account",
      "Unauthorized money transfers or login alerts",
      "Locked accounts with no known cause",
      "Messages asking for OTPs or passwords",
      "Bank messages with grammatical or layout errors",
    ],
    prevention: [
      "Use strong, unique passwords and change them regularly",
      "Enable multi-factor authentication (MFA)",
      "Avoid accessing banking sites over public Wi-Fi",
      "Never click suspicious links in emails or messages",
      "Use antivirus and keep software updated",
      "Regularly review account statements and alerts",
    ],
    realExamples: [
      {
        title: "SIM Swap Attack",
        description:
          "Fraudsters tricked telecom providers into transferring phone numbers, intercepted OTPs, and emptied bank accounts.",
      },
      {
        title: "Credential Stuffing",
        description:
          "Stolen usernames/passwords from data breaches were reused to access online banking accounts.",
      },
      {
        title: "Phishing Emails from ‘Bank’",
        description:
          "Victims were sent fake emails linking to spoofed banking sites that stole login credentials.",
      },
      {
        title: "Remote Access Trojan (RAT)",
        description:
          "Malware infected devices and logged keystrokes, capturing banking login data.",
      },
    ],
    statistics: [
      "Online banking fraud cost Indian banks ₹253 crore in 2023",
      "Over 60% of users reuse banking passwords across services",
      "Average individual loss: ₹30,000 to ₹1,50,000",
      "Mobile banking fraud rose by 85% in the last 3 years",
    ],
  },
  {
    id: 13,
    title: "Employment Fraud",
    icon: Briefcase,
    color: "#7C3AED",
    description:
      "Fake job offers used to steal money or identity from job seekers",
    detailedDescription:
      "Employment fraud involves scammers offering fake jobs and demanding upfront payments for training, equipment, or placement. These scams exploit desperation and often impersonate well-known companies or HR firms. Victims pay fees or give up sensitive information and never receive real employment.",
    howItWorks: [
      "Fake job listings are posted on social media or job portals",
      "Scammers impersonate HR recruiters and conduct fake interviews",
      "Victims are told they’ve been selected and asked to pay for onboarding",
      "Sometimes personal information is collected for identity theft",
      "After payment, communication ceases and the job doesn’t materialize",
    ],
    commonTargets: [
      "Fresh graduates",
      "Remote job seekers",
      "People in financial distress",
      "Workers migrating to another country",
      "Users of free job search platforms",
    ],
    redFlags: [
      "Unverified job listings with high salaries for basic roles",
      "Requests for upfront payments (registration, security, training)",
      "Generic email addresses (e.g., hr.joboffer@gmail.com)",
      "Unclear job descriptions or fake company websites",
      "Urgency to pay immediately to ‘confirm’ offer",
    ],
    prevention: [
      "Apply only through official websites or verified job portals",
      "Research company background and verify recruiters",
      "Never pay for job placement or training without documentation",
      "Be wary of offers without formal interviews",
      "Report scams to cybercrime cells or job portals",
    ],
    realExamples: [
      {
        title: "Amazon Job Scam",
        description:
          "Victims received fake job offers claiming to be from Amazon, asked to pay fees for equipment and training.",
      },
      {
        title: "Overseas Employment Scam",
        description:
          "Fraudsters promised jobs in Gulf countries, collected large deposits, then disappeared.",
      },
      {
        title: "Work-from-Home Envelope Stuffing",
        description:
          "Scam promised ₹20,000/month for stuffing envelopes at home after a small joining fee.",
      },
      {
        title: "Fake HR Consultancy",
        description:
          "Scammer firms collected resumes and fees under false pretense of hiring for reputed brands.",
      },
    ],
    statistics: [
      "Over 70,000 employment scams were reported in India in 2023",
      "Freshers are 3x more likely to fall for fake job listings",
      "Average loss per victim: ₹5,000–₹25,000",
      "Majority of scams occur on platforms like WhatsApp, Telegram, and Facebook",
    ],
  },
  {
    id: 14,
    title: "Student Loan Scam",
    icon: GraduationCap,
    color: "#3B82F6",
    description:
      "Fraudulent services offering student debt relief for upfront fees",
    detailedDescription:
      "Student loan scams target borrowers by promising to eliminate, reduce, or consolidate student loans in exchange for fees. Scammers may impersonate government programs or official-looking platforms. Victims often pay for services that are free, unnecessary, or entirely fake.",
    howItWorks: [
      "Scammers promote loan forgiveness schemes via SMS, email, or calls",
      "They impersonate legitimate agencies like government departments or banks",
      "Victims are asked to pay fees for loan consolidation or form submission",
      "Sometimes personal and financial info is collected for identity theft",
      "No actual service is delivered, or victim is ghosted after payment",
    ],
    commonTargets: [
      "College students",
      "Graduates with outstanding loans",
      "Families seeking education financing",
      "First-time borrowers",
      "Users of unsecured education portals",
    ],
    redFlags: [
      "Guarantees to erase or reduce loan debt",
      "Requests for advance payments or ‘processing fees’",
      "Use of aggressive or urgent language",
      "Claiming affiliation with government without proof",
      "No customer service or refund policy",
    ],
    prevention: [
      "Never pay upfront for debt relief or forgiveness",
      "Use only official government loan sites or your bank",
      "Research company reviews and credentials",
      "Avoid sharing login credentials or OTPs over phone",
      "Report suspicious offers to your loan provider or regulatory agency",
    ],
    realExamples: [
      {
        title: "Fake Government Forgiveness Scheme",
        description:
          "Victims paid ₹3,000–₹5,000 to a scammer posing as a government rep, but received no loan relief.",
      },
      {
        title: "‘Helpdesk’ Portal Phishing",
        description:
          "Students were directed to a fake portal to apply for loan reduction, losing money and personal data.",
      },
      {
        title: "WhatsApp Loan Waiver Groups",
        description:
          "Groups promised loan waivers for a fee; many were shut down by cybercrime officials.",
      },
      {
        title: "Unauthorized Consolidation Agents",
        description:
          "Fraudsters claimed to negotiate with banks on behalf of students, collecting money and vanishing.",
      },
    ],
    statistics: [
      "Student loan scams affected 45,000+ Indian students in 2023",
      "Average scam amount per victim: ₹2,000–₹15,000",
      "Most scams occur during the March–July admission season",
      "Many frauds use fake seals or mimic official government websites",
    ],
  },
  {
    id: 1,
    title: "Old Tax Regime",
    icon: FileText,
    color: "#F97316",
    description:
      "The traditional tax system allowing multiple deductions and exemptions",
    detailedDescription:
      "The old tax regime is a system where taxpayers can reduce their taxable income through various deductions such as under Sections 80C, 80D, HRA, LTA, and home loan interest. It's useful for individuals who make significant tax-saving investments and expenditures.",
    howItWorks: [
      "Taxpayers calculate gross income",
      "Eligible deductions under various sections (like 80C, 80D, etc.) are subtracted",
      "Tax is calculated on the reduced income using older slab rates",
      "Individuals must declare and submit proof of deductions to employers or while filing ITR",
    ],
    commonTargets: [
      "Salaried individuals with housing loans",
      "Taxpayers investing in PPF, ELSS, or insurance",
      "People with large medical insurance payments",
      "High-income freelancers using deductions",
    ],
    redFlags: [
      "Complex documentation and compliance",
      "May lead to lower savings if not fully utilized",
      "Needs consistent investment habits",
      "Can be less beneficial for low-income earners with fewer deductions",
    ],
    prevention: [
      "Use only legitimate deductions supported by receipts",
      "Track deductible expenses throughout the year",
      "Use a tax consultant or ITR software to avoid errors",
      "Compare regimes annually to optimize tax",
    ],
    realExamples: [
      {
        title: "Home Loan + ELSS Combo",
        description:
          "A salaried user reduced tax by ₹1.5L using 80C and another ₹2L using home loan interest",
      },
      {
        title: "Medical Insurance Usage",
        description:
          "₹75,000 saved using Section 80D for family medical insurance under old regime",
      },
    ],
    statistics: [
      "Approximately 35% of ITR filers still prefer the old regime as of FY 2024–25",
      "Most beneficial for taxpayers with deductions exceeding ₹3L",
      "Majority of users over ₹15L income still use old regime",
    ],
  },
];

// const FraudTypeCard = ({
//   fraud,
//   onPress,
// }: {
//   fraud: any;
//   onPress: (fraud: any) => void;
// }) => {
//   const IconComponent = fraud.icon;

//   return (
//     <TouchableOpacity style={styles.fraudCard} onPress={() => onPress(fraud)}>
//       <View style={[styles.fraudIcon, { backgroundColor: fraud.color + "20" }]}>
//         <IconComponent size={32} color={fraud.color} />
//       </View>
//       <View style={styles.fraudContent}>
//         <Text style={styles.fraudTitle}>{fraud.title}</Text>
//         <Text style={styles.fraudDescription}>{fraud.description}</Text>
//         <View style={styles.fraudMeta}>
//           <Text style={styles.metaText}>
//             {fraud.statistics?.length || 0} Statistics
//           </Text>
//           <Text style={styles.metaText}>
//             {fraud.realExamples?.length || 0} Examples
//           </Text>
//         </View>
//       </View>
//       <ExternalLink size={20} color="#94A3B8" />
//     </TouchableOpacity>
//   );
// };

const FraudDetailModal = ({ fraud }: { fraud: any }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!fraud) return null;

  const IconComponent = fraud.icon;

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "howit", label: "How It Works", icon: Eye },
    { id: "prevention", label: "Prevention", icon: Shield },
    { id: "examples", label: "Examples", icon: AlertTriangle },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <View>
            <YoutubeIframe
              height={250}
              videoId="eDOrVtncRZY"
              play={true}
              style={{ marginBottom: 8, borderRadius: 16, overflow: "hidden" }}
            />
            <Text style={styles.sectionText}>{fraud.detailedDescription}</Text>
            <View style={styles.detailSection}>
              <View style={styles.sectionHeader}>
                <AlertTriangle size={20} color="#EF4444" />
                <Text style={[styles.sectionTitle, { color: "#EF4444" }]}>
                  Red Flags
                </Text>
              </View>
              {fraud.redFlags.map((flag: any, index: any) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.listText}>{flag}</Text>
                </View>
              ))}
            </View>

            {fraud.statistics && (
              <View style={styles.statsSection}>
                <Text style={styles.sectionTitle}>Key Statistics</Text>
                {fraud.statistics.map((stat: any, index: any) => (
                  <View key={index} style={styles.listItem}>
                    <DollarSign
                      size={16}
                      color="#F59E0B"
                      style={{ marginTop: 2, marginRight: 8 }}
                    />
                    <Text style={styles.listText}>{stat}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );

      case "howit":
        return (
          <View>
            <Text style={styles.sectionText}>
              Understanding how these scams operate helps you recognize and
              avoid them:
            </Text>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>How It Works</Text>
              {fraud.howItWorks.map((step: any, index: any) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Common Targets</Text>
              {fraud.commonTargets.map((target: any, index: any) => (
                <View key={index} style={styles.listItem}>
                  <View
                    style={[styles.bullet, { backgroundColor: fraud.color }]}
                  />
                  <Text style={styles.listText}>{target}</Text>
                </View>
              ))}
            </View>
          </View>
        );

      case "prevention":
        return (
          <View>
            <Text style={styles.sectionText}>
              Follow these best practices to protect yourself:
            </Text>

            <View style={styles.detailSection}>
              <View style={styles.sectionHeader}>
                <Shield size={20} color="#10B981" />
                <Text style={[styles.sectionTitle, { color: "#10B981" }]}>
                  Prevention Tips
                </Text>
              </View>
              {fraud.prevention.map((tip: any, index: any) => (
                <View key={index} style={styles.listItem}>
                  <CheckCircle
                    size={16}
                    color="#10B981"
                    style={{ marginTop: 2, marginRight: 8 }}
                  />
                  <Text style={styles.listText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        );

      case "examples":
        return (
          <View>
            <Text style={styles.sectionText}>
              Real-world examples to help you recognize these scams:
            </Text>

            {fraud.realExamples.map((example: any, index: any) => (
              <View key={index} style={styles.exampleCard}>
                <Text style={styles.exampleTitle}>{example.title}</Text>
                <Text style={styles.exampleDescription}>
                  {example.description}
                </Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <View style={styles.modalTitleContainer}>
          <View
            style={[styles.modalIcon, { backgroundColor: fraud.color + "20" }]}
          >
            <IconComponent size={28} color={fraud.color} />
          </View>
          <Text style={styles.modalTitle}>{fraud.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <X size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && {
                    backgroundColor: fraud.color + "20",
                    borderColor: fraud.color,
                  },
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <TabIcon
                  size={16}
                  color={activeTab === tab.id ? fraud.color : "#64748B"}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.id && {
                      color: fraud.color,
                      fontWeight: "600",
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.modalContent}
        showsVerticalScrollIndicator={false}
      >
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

export default function FraudDetails() {
  const { fraud } = useLocalSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFraud, setSelectedFraud] = useState(
    fraudTypes.find((el) => el.title === fraud)
  );
  const [showDetailModal, setShowDetailModal] = useState(true);

  return <FraudDetailModal fraud={selectedFraud} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 24,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 8,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#0F172A",
  },
  statsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 30,
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 20,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#EF4444",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",

    textAlign: "center",
    fontWeight: "500",
  },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '700',
  //   color: '#0F172A',
  //   paddingHorizontal: 24,
  //   marginBottom: 16,
  // },
  fraudList: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  fraudCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  fraudIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  fraudContent: {
    flex: 1,
  },
  fraudTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  fraudDescription: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
    lineHeight: 20,
  },
  fraudMeta: {
    flexDirection: "row",
    gap: 16,
  },
  metaText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  modalTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },
  closeButton: {
    padding: 8,
  },
  tabContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tabScrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  sectionText: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
    marginBottom: 24,
  },
  detailSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginLeft: 8,
    marginBottom: 6,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EF4444",
    marginTop: 8,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: 14,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 1,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
  },
  statsSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statText: {
    fontSize: 14,
    color: "#334155",
    marginLeft: 8,
    flex: 1,
  },
  exampleCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  exampleDescription: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  resourcesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  resourceCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
    lineHeight: 20,
  },
  resourceCategory: {
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "600",
    backgroundColor: "#3B82F620",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});

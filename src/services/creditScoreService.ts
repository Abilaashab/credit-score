// Interface for comprehensive store details used in credit score calculation
// Kept for potential future use or documentation purposes
export interface StoreDetails {
  monthlySales: number;
  profitMargin: number;
  monthlyEMI: number;
  averageBankBalance: number;
  buildingOwnership: 'own' | 'rent';
  collateralProvided: boolean;
  itrFiled: boolean;
  cibilScore?: number;
  defaults: number;
  bankingYears: number;
  returnedCheques: number;
  previousLoans: number;
  loanApplicationsPastYear: number;
  yearsInOperation: number;
  annualRevenue: number;
  employees: number;
  shopSize: number;
  branches: number;
  privateLabelProducts: boolean;
  digitalPayments: number;
  inventoryTurnover: 'weekly' | 'monthly' | 'quarterly' | 'slower';
  seasonalImpact: 'none' | 'low' | 'medium' | 'high';
  footfall: number;
  onlinePresence: 'none' | 'social' | 'website' | 'ecommerce';
  purposeOfLoan: 'growth' | 'stock' | 'refinance';
  distributorPaymentRegularity: 'regular' | 'occasional' | 'irregular';
  industryCategory: 'high' | 'medium' | 'low';
  willingnessToProvideCollateral: boolean;
}

interface CreditScoreInput {
  // Basic Information
  storeName: string;
  yearsInOperation: number;
  shopSize: number;

  // Financial Details
  monthlySales: number;
  profitMargin: number;
  buildingOwnership: 'own' | 'rent';

  // Credit History
  cibilScore?: number;
  bankingYears: number;
  defaults: number;

  // Operational Details
  digitalPayments: number;
  inventoryTurnover: 'weekly' | 'monthly' | 'quarterly' | 'slower';
  onlinePresence: 'none' | 'social' | 'website' | 'ecommerce';
}

interface SubScore {
  score: number;
  explanation: string;
}

interface CreditScoreResult {
  totalScore: number;
  financialScore: SubScore;
  creditHistoryScore: SubScore;
  businessStabilityScore: SubScore;
  operationalScore: SubScore;
  riskSupportScore: SubScore;
}

const calculateFinancialScore = (input: CreditScoreInput): SubScore => {
  let score = 0;
  let explanation = '';

  // Monthly Sales Score (15%)
  if (input.monthlySales >= 100000) {
    score += 15;
    explanation += 'Excellent monthly sales volume. ';
  } else if (input.monthlySales >= 50000) {
    score += 12;
    explanation += 'Good monthly sales volume. ';
  } else if (input.monthlySales >= 25000) {
    score += 8;
    explanation += 'Average monthly sales volume. ';
  } else {
    score += 5;
    explanation += 'Low monthly sales volume. ';
  }

  // Profit Margin Score (15%)
  if (input.profitMargin >= 20) {
    score += 15;
    explanation += 'Excellent profit margin. ';
  } else if (input.profitMargin >= 15) {
    score += 12;
    explanation += 'Good profit margin. ';
  } else if (input.profitMargin >= 10) {
    score += 8;
    explanation += 'Average profit margin. ';
  } else {
    score += 5;
    explanation += 'Low profit margin. ';
  }

  // Building Ownership Score (5%)
  if (input.buildingOwnership === 'own') {
    score += 5;
    explanation += 'Building ownership provides stability. ';
  } else {
    score += 2;
    explanation += 'Rented premises. ';
  }

  return { score, explanation };
};

const calculateCreditHistoryScore = (input: CreditScoreInput): SubScore => {
  let score = 0;
  let explanation = '';

  // CIBIL Score (10%)
  if (input.cibilScore) {
    if (input.cibilScore >= 750) {
      score += 10;
      explanation += 'Excellent CIBIL score. ';
    } else if (input.cibilScore >= 700) {
      score += 8;
      explanation += 'Good CIBIL score. ';
    } else if (input.cibilScore >= 650) {
      score += 5;
      explanation += 'Average CIBIL score. ';
    } else {
      score += 2;
      explanation += 'Low CIBIL score. ';
    }
  }

  // Banking Relationship Score (10%)
  if (input.bankingYears >= 5) {
    score += 10;
    explanation += 'Long-term banking relationship. ';
  } else if (input.bankingYears >= 3) {
    score += 8;
    explanation += 'Good banking relationship. ';
  } else if (input.bankingYears >= 1) {
    score += 5;
    explanation += 'New banking relationship. ';
  } else {
    score += 2;
    explanation += 'Very new banking relationship. ';
  }

  // Defaults Score (5%)
  if (input.defaults === 0) {
    score += 5;
    explanation += 'No defaults. ';
  } else if (input.defaults === 1) {
    score += 3;
    explanation += 'One default. ';
  } else {
    score += 0;
    explanation += 'Multiple defaults. ';
  }

  return { score, explanation };
};

const calculateBusinessStabilityScore = (input: CreditScoreInput): SubScore => {
  let score = 0;
  let explanation = '';

  // Years in Operation Score (10%)
  if (input.yearsInOperation >= 10) {
    score += 10;
    explanation += 'Long-established business. ';
  } else if (input.yearsInOperation >= 5) {
    score += 8;
    explanation += 'Well-established business. ';
  } else if (input.yearsInOperation >= 2) {
    score += 5;
    explanation += 'Growing business. ';
  } else {
    score += 2;
    explanation += 'New business. ';
  }

  // Shop Size Score (10%)
  if (input.shopSize >= 1000) {
    score += 10;
    explanation += 'Large shop size. ';
  } else if (input.shopSize >= 500) {
    score += 8;
    explanation += 'Medium shop size. ';
  } else if (input.shopSize >= 200) {
    score += 5;
    explanation += 'Small shop size. ';
  } else {
    score += 2;
    explanation += 'Very small shop size. ';
  }

  return { score, explanation };
};

const calculateOperationalScore = (input: CreditScoreInput): SubScore => {
  let score = 0;
  let explanation = '';

  // Digital Payments Score (5%)
  if (input.digitalPayments >= 80) {
    score += 5;
    explanation += 'High digital payment adoption. ';
  } else if (input.digitalPayments >= 50) {
    score += 4;
    explanation += 'Good digital payment adoption. ';
  } else if (input.digitalPayments >= 20) {
    score += 2;
    explanation += 'Low digital payment adoption. ';
  } else {
    score += 1;
    explanation += 'Very low digital payment adoption. ';
  }

  // Inventory Turnover Score (5%)
  switch (input.inventoryTurnover) {
    case 'weekly':
      score += 5;
      explanation += 'Excellent inventory turnover. ';
      break;
    case 'monthly':
      score += 4;
      explanation += 'Good inventory turnover. ';
      break;
    case 'quarterly':
      score += 2;
      explanation += 'Average inventory turnover. ';
      break;
    default:
      score += 1;
      explanation += 'Slow inventory turnover. ';
  }

  return { score, explanation };
};

const calculateRiskSupportScore = (input: CreditScoreInput): SubScore => {
  let score = 0;
  let explanation = '';

  // Online Presence Score (5%)
  switch (input.onlinePresence) {
    case 'ecommerce':
      score += 5;
      explanation += 'Strong online presence with e-commerce. ';
      break;
    case 'website':
      score += 4;
      explanation += 'Good online presence with website. ';
      break;
    case 'social':
      score += 2;
      explanation += 'Basic online presence with social media. ';
      break;
    default:
      score += 1;
      explanation += 'Limited online presence. ';
  }

  // Additional Risk Factors (5%)
  const riskFactors = [];
  if (input.yearsInOperation >= 5) riskFactors.push('Established business');
  if (input.buildingOwnership === 'own') riskFactors.push('Property ownership');
  if (input.cibilScore && input.cibilScore >= 700) riskFactors.push('Good credit history');
  if (input.digitalPayments >= 50) riskFactors.push('Digital adoption');

  score += Math.min(5, riskFactors.length);
  explanation += `Risk factors: ${riskFactors.join(', ')}. `;

  return { score, explanation };
};

export const mapStoreDetailsToScoreInput = (storeDetails: StoreDetails): CreditScoreInput => {
  return {
    storeName: '', // This would need to be passed separately
    yearsInOperation: storeDetails.yearsInOperation,
    shopSize: storeDetails.shopSize,
    monthlySales: storeDetails.monthlySales,
    profitMargin: storeDetails.profitMargin,
    buildingOwnership: storeDetails.buildingOwnership,
    cibilScore: storeDetails.cibilScore,
    bankingYears: storeDetails.bankingYears,
    defaults: storeDetails.defaults,
    digitalPayments: storeDetails.digitalPayments,
    inventoryTurnover: storeDetails.inventoryTurnover,
    onlinePresence: storeDetails.onlinePresence
  };
};

export const calculateCreditScore = (input: CreditScoreInput): CreditScoreResult => {
  // Financial Score (35%)
  const financialScore = calculateFinancialScore(input);

  // Credit History Score (25%)
  const creditHistoryScore = calculateCreditHistoryScore(input);

  // Business Stability Score (20%)
  const businessStabilityScore = calculateBusinessStabilityScore(input);

  // Operational Score (10%)
  const operationalScore = calculateOperationalScore(input);

  // Risk & Support Score (10%)
  const riskSupportScore = calculateRiskSupportScore(input);

  // Calculate total score
  const totalScore = Math.round(
    financialScore.score * 0.35 +
    creditHistoryScore.score * 0.25 +
    businessStabilityScore.score * 0.20 +
    operationalScore.score * 0.10 +
    riskSupportScore.score * 0.10
  );

  return {
    totalScore,
    financialScore,
    creditHistoryScore,
    businessStabilityScore,
    operationalScore,
    riskSupportScore,
  };
}; 
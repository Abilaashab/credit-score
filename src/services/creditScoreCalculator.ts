/*
  Credit Score Calculator — Pure Functions
  Implements the complete scoring specification for
  Financial, Credit History, Business Stability, Operational, Risk & Support.
*/

// ----------- Types -----------
export interface FinancialInputs {
  monthlySales: number;
  profitMargin: number;
  monthlyEMI: number;
  averageBankBalance: number;
  buildingOwnership: 'own' | 'rent';
  itrFiled: boolean;
}

export interface CreditHistoryInputs {
  cibilScore?: number;
  pastLoanDefaults: number;
  bankingRelationship: number;
  returnedCheques: number;
  fullyRepaidLoans: number;
  loanApplications: number;
}

export interface BusinessStabilityInputs {
  yearsInOperation: number;
  annualRevenue: number;
  numberOfEmployees: number;
  shopSize: number;
  numberOfBranches: number;
  sellsPrivateLabel: boolean;
}

export interface OperationalInputs {
  digitalPaymentsAdoption: number;
  inventoryTurnover: 'weekly' | 'monthly' | 'quarterly' | 'slower';
  seasonalImpact: 'none' | 'low' | 'medium' | 'high';
  averageMonthlyFootfall: number;
  shopTimings: number;
  onlinePresence: { socialMedia: boolean; website: boolean; ecommerce: boolean };
}

export interface RiskSupportInputs {
  industryType: 'grocery' | 'pharmacy' | 'electronics' | 'clothing' | 'restaurant' | 'other';
  purposeOfLoan: 'growth' | 'stock' | 'refinance';
  distributorPaymentRegularity: boolean; // true = regular
  collateralProvided: boolean;
  collateralValue?: number;
  loanAmountRequested: number;
}

export interface AllInputs {
  financial: FinancialInputs;
  creditHistory: CreditHistoryInputs;
  businessStability: BusinessStabilityInputs;
  operational: OperationalInputs;
  riskSupport: RiskSupportInputs;
}

export interface CategoryScores {
  financial: number;
  creditHistory: number;
  businessStability: number;
  operational: number;
  riskSupport: number;
}

// ----------- Helpers -----------
const clamp = (val: number, min = 0, max = 100): number => {
  if (Number.isNaN(val)) return 0;
  return Math.min(Math.max(Math.round(val), min), max);
};

// ----------- Individual Category Calculations -----------
const financialScore = (f: FinancialInputs): number => {
  const debtRatio = f.monthlySales === 0 ? 100 : (f.monthlyEMI / f.monthlySales) * 100;
  let score = 50;
  score += debtRatio <= 30 ? 20 : debtRatio <= 50 ? 10 : 0;
  score += Math.min(f.profitMargin * 2, 20);
  score += Math.min(f.averageBankBalance / 10_000, 10);
  score += f.buildingOwnership === 'own' ? 10 : 0;
  score += f.itrFiled ? 10 : 0;
  return clamp(score);
};

const creditHistoryScore = (c: CreditHistoryInputs): number => {
  let score = c.cibilScore ? (c.cibilScore - 300) / 5.5 : 50;
  score -= Math.min(c.pastLoanDefaults * 10, 50);
  score -= Math.min(c.returnedCheques * 5, 20);
  score -= Math.min(c.loanApplications * 5, 25);
  score += Math.min(c.bankingRelationship * 2, 20);
  score += Math.min(c.fullyRepaidLoans * 5, 15);
  return clamp(score);
};

const businessStabilityScore = (b: BusinessStabilityInputs): number => {
  let score = 50;
  score += Math.min(b.yearsInOperation * 2, 20);
  score += Math.min(b.annualRevenue / 1_000_000, 20);
  score += Math.min(b.numberOfEmployees / 5, 10);
  score += Math.min(b.shopSize / 100, 10);
  score += Math.min(b.numberOfBranches * 2, 10);
  score += b.sellsPrivateLabel ? 5 : 0;
  return clamp(score);
};

const operationalScore = (o: OperationalInputs): number => {
  // Provide safe defaults in case some fields are undefined (e.g., when the user hasn't filled the page yet)
  const digitalPayments = o.digitalPaymentsAdoption ?? 0;
  const inventory = o.inventoryTurnover ?? 'monthly';
  const seasonal = o.seasonalImpact ?? 'none';
  const footfall = o.averageMonthlyFootfall ?? 0;
  const timings = o.shopTimings ?? 0;
  const online = o.onlinePresence ?? { socialMedia: false, website: false, ecommerce: false };

  let score = 50;
  score += Math.min(digitalPayments, 20);

  score +=
    inventory === 'weekly'
      ? 20
      : inventory === 'monthly'
      ? 10
      : inventory === 'quarterly'
      ? -10
      : -20;

  score +=
    seasonal === 'none'
      ? 10
      : seasonal === 'low'
      ? 5
      : seasonal === 'medium'
      ? -5
      : -10;

  score += footfall >= 3000 ? 10 : footfall >= 1000 ? 5 : 0;

  const onlineBonus =
    (online.socialMedia ? 5 : 0) +
    (online.website ? 5 : 0) +
    (online.ecommerce ? 10 : 0);
  score += Math.min(onlineBonus, 15);

  score += timings >= 12 ? 10 : timings >= 10 ? 5 : 0;

  return clamp(score);
};

const riskSupportScore = (r: RiskSupportInputs): number => {
  let score = 50;
  score += r.distributorPaymentRegularity ? 10 : -10;

  score +=
    r.industryType === 'grocery' || r.industryType === 'pharmacy'
      ? 10
      : r.industryType === 'clothing' || r.industryType === 'restaurant'
      ? -10
      : 0;

  score += r.purposeOfLoan === 'growth' ? 5 : r.purposeOfLoan === 'refinance' ? -5 : 0;

  if (r.collateralProvided && r.collateralValue && r.loanAmountRequested > 0) {
    const ratio = r.collateralValue / r.loanAmountRequested;
    score += ratio >= 2 ? 15 : ratio >= 1.5 ? 10 : ratio >= 1 ? 5 : 0;
  } else if (!r.collateralProvided) {
    score -= 10;
  }

  return clamp(score);
};

// ----------- Aggregators -----------
export const calculateCategoryScores = (inputs: AllInputs): CategoryScores => ({
  financial: financialScore(inputs.financial),
  creditHistory: creditHistoryScore(inputs.creditHistory),
  businessStability: businessStabilityScore(inputs.businessStability),
  operational: operationalScore(inputs.operational),
  riskSupport: riskSupportScore(inputs.riskSupport),
});

export const calculateOverallScore = (scores: CategoryScores) => {
  const total =
    scores.financial * 0.35 +
    scores.creditHistory * 0.25 +
    scores.businessStability * 0.2 +
    scores.operational * 0.1 +
    scores.riskSupport * 0.1;

  let rating: 'Good' | 'Average' | 'Bad' | 'Poor';
  if (total >= 85) rating = 'Good';
  else if (total >= 70) rating = 'Average';
  else if (total >= 55) rating = 'Bad';
  else rating = 'Poor';

  return { total: Math.round(total), rating } as const;
}; 
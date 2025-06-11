Below is a “deep-dive” into the two steps that happen inside `CreditReport.tsx` when you press “View Report”:

1. `calculateCategoryScores(allInputs)` – gives one score (0-100) for every
   form-page / category.
2. `calculateOverallScore(subScores)` – folds those five numbers into a single
   overall score (0-100) and converts it into a rating badge (Good / Average /
   Bad / Poor).

Everything lives in `src/services/creditScoreCalculator.ts`, which is a set of
pure functions – no React, no stores, just maths.

----------------------------------------------------------------
1.  Category (page-level) scores
----------------------------------------------------------------
Each function starts with a **baseline of 50 points**, adds bonuses and
subtracts penalties, then calls the helper `clamp()` so that the result is
always between 0 and 100.

A. Financial – filled on the “Store Details” page  
```75:84:src/services/creditScoreCalculator.ts
const financialScore = (f: FinancialInputs): number => {
  const debtRatio = f.monthlySales === 0 ? 100 : (f.monthlyEMI / f.monthlySales) * 100;
  let score = 50;                                      // baseline
  score += debtRatio <= 30 ? 20 : debtRatio <= 50 ? 10 : 0;          // low debt
  score += Math.min(f.profitMargin * 2, 20);                          // margin
  score += Math.min(f.averageBankBalance / 10_000, 10);              // liquidity
  score += f.buildingOwnership === 'own' ? 10 : 0;                   // owns shop
  score += f.itrFiled ? 10 : 0;                                       // tax filed
  return clamp(score);
};
```
•  Maximum bonus path ⇒ 50 + 20 + 20 + 10 + 10 + 10 = 120 → clamped to 100.  
•  Biggest impact driver is the EMI-to-sales **debt ratio** (up to 20 pts).

B. Credit History – “Credit History” page  
```86:95:src/services/creditScoreCalculator.ts
let score = c.cibilScore ? (c.cibilScore - 300) / 5.5 : 50;   // maps 300-900 to 0-109
score -= Math.min(c.pastLoanDefaults * 10, 50);               // defaults hurt
score -= Math.min(c.returnedCheques * 5, 20);                 // bounced chqs
score -= Math.min(c.loanApplications * 5, 25);                // enquiries
score += Math.min(c.bankingRelationship * 2, 20);             // years with bank
score += Math.min(c.fullyRepaidLoans * 5, 15);                // closed loans
```
•  A high CIBIL starts you high; defaults can wipe up to 50 pts.

C. Business Stability – “Business Stability” page  
```97:104:src/services/creditScoreCalculator.ts
score += Math.min(b.yearsInOperation * 2, 20);          // longevity
score += Math.min(b.annualRevenue / 1_000_000, 20);     // revenue (₹ L)
score += Math.min(b.numberOfEmployees / 5, 10);         // staff size
score += Math.min(b.shopSize / 100, 10);                // sqft
score += Math.min(b.numberOfBranches * 2, 10);          // branches
score += b.sellsPrivateLabel ? 5 : 0;                   // private label line
```

D. Operational Efficiency – “Operational” page  
```106:133:src/services/creditScoreCalculator.ts
score += Math.min(digitalPayments, 20);                 // % digital txns
score += inventory === 'weekly' ? 20 : ...              // stock turnover
score += seasonal === 'none' ? 10 : ...                 // seasonality risk
score += footfall >= 3000 ? 10 : footfall >= 1000 ? 5 : 0;
score += Math.min(onlineBonus, 15);                     // social / site / e-com
score += timings >= 12 ? 10 : timings >= 10 ? 5 : 0;    // shop hours
```
Weekly inventory turns plus high digital payments alone can already add 40 pts.

E. Risk & Support – “Risk & Support Factors” page  
```135:155:src/services/creditScoreCalculator.ts
score += r.distributorPaymentRegularity ? 10 : -10;     // pay suppliers?
score += industryType === 'grocery' ...                 // recession-proof lines
score += purposeOfLoan === 'growth' ? 5 : ...           // use of funds
if (r.collateralProvided) {
  ratio = collateralValue / loanAmount;
  score += ratio >= 2 ? 15 : ratio >= 1.5 ? 10 : ratio >= 1 ? 5 : 0;
} else {
  score -= 10;                                          // unsecured penalty
}
```

----------------------------------------------------------------
2.  Overall score & rating
----------------------------------------------------------------
```163:178:src/services/creditScoreCalculator.ts
const total =
  scores.financial * 0.35 +            // 35 %
  scores.creditHistory * 0.25 +        // 25 %
  scores.businessStability * 0.20 +    // 20 %
  scores.operational * 0.10 +          // 10 %
  scores.riskSupport * 0.10;           // 10 %
```
•  Weighted average is rounded (`Math.round`) → integer 0-100.  
•  Rating buckets  
  – ≥ 85 → Good  
  – ≥ 70 → Average  
  – ≥ 55 → Bad  
  – else → Poor

----------------------------------------------------------------
3.  End-to-end data flow
----------------------------------------------------------------
1. Each form page writes its answers into a Zustand store.  
2. `CreditReport` pulls them into `allInputs`.  
3. `calculateCategoryScores(allInputs)` returns an object like  
   `{ financial: 78, creditHistory: 66, ... }`.  
4. These numbers are rendered in the “Score Breakdown” mini-cards and also fed
   into `calculateOverallScore(...)`, whose result drives the large circular
   meter and the coloured rating `Chip`.

That’s the full scoring pipeline – baseline of 50, rule-based adjustments,
clamp to 0-100 per category, then a weighted composite for the overall score.
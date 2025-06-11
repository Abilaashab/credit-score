import React, { useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { InfoOutlined as InfoIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { financialStore } from './StoreDetails';
import { creditHistoryStore } from './CreditHistory';
import { businessStabilityStore } from './BusinessStability';
import { operationalStore } from './OperationalEfficiency';
import { riskSupportStore } from './RiskAndSupportFactors';

import {
  calculateCategoryScores,
  calculateOverallScore,
  AllInputs,
} from '../services/creditScoreCalculator';

const ratingChipStyles: Record<string, React.CSSProperties> = {
  Good: {
    background: 'linear-gradient(45deg, #9B8EBF, #4CAF50)',
    color: '#FFFFFF',
  },
  Average: {
    background: 'linear-gradient(45deg, #9B8EBF, #FFEB3B)',
    color: '#FFFFFF',
  },
  Bad: {
    background: 'linear-gradient(45deg, #9B8EBF, #FF9800)',
    color: '#FFFFFF',
  },
  Poor: {
    background: 'linear-gradient(45deg, #9B8EBF, #F44336)',
    color: '#FFFFFF',
  },
};

const CreditReport = () => {
  const navigate = useNavigate();

  // refs for accordion sections
  const sectionRefs = {
    Financial: useRef<HTMLDivElement | null>(null),
    'Credit History': useRef<HTMLDivElement | null>(null),
    'Business Stability': useRef<HTMLDivElement | null>(null),
    Operational: useRef<HTMLDivElement | null>(null),
    'Risk & Support': useRef<HTMLDivElement | null>(null),
  } as const;

  const labelKeyMap: Record<string, keyof typeof sectionRefs> = {
    '💰 Financial Score': 'Financial',
    '🧾 Credit History': 'Credit History',
    '🏬 Business Stability': 'Business Stability',
    '⚙️ Operational Score': 'Operational',
    '🧯 Risk & Support Score': 'Risk & Support',
  } as const;

  const scrollToSection = (label: string) => {
    const key = labelKeyMap[label];
    if (key && sectionRefs[key]?.current) {
      sectionRefs[key]!.current!.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetAllFormData = () => {
    financialStore.setFinancialDetails({} as any);
    creditHistoryStore.setCreditHistoryDetails({} as any);
    businessStabilityStore.setBusinessStabilityDetails({} as any);
    operationalStore.setOperationalEfficiencyDetails({} as any);
    riskSupportStore.setRiskAndSupportFactorsDetails({} as any);
  };

  const handleReset = () => {
    resetAllFormData();
    navigate('/store-details');
  };

  // Gather inputs from stores (already persisted through navigation)
  const allInputs: AllInputs = {
    financial: financialStore.getFinancialDetails(),
    creditHistory: creditHistoryStore.getCreditHistoryDetails(),
    businessStability: businessStabilityStore.getBusinessStabilityDetails(),
    operational: operationalStore.getOperationalEfficiencyDetails(),
    riskSupport: riskSupportStore.getRiskAndSupportFactorsDetails(),
  } as AllInputs;

  const subScores = calculateCategoryScores(allInputs);
  const { total: creditScore, rating } = calculateOverallScore(subScores);

  const recommendations = [
    {
      category: 'Financial Score',
      items: [
        "Keep your EMI within 30% of your monthly sales to maintain a healthy debt-to-income ratio.",
        "Increase your profit margin by optimizing inventory costs or revising product pricing.",
        "Maintain a higher average bank balance to show strong cash reserves.",
        "File your ITR regularly to demonstrate financial transparency and compliance.",
        "Invest in owning your shop premises or building to increase long-term financial stability.",
        "Provide high-value collateral to boost lender confidence and reduce perceived risk."
      ],
    },
    {
      category: 'Credit History',
      items: [
        "Avoid loan defaults and cheque returns to protect your repayment credibility.",
        "Limit the number of loan applications in a year to avoid appearing financially stressed.",
        "Build a long-standing relationship with your bank—loyalty signals financial trust.",
        "Repay past loans fully and on time to create a strong credit history.",
        "Maintain a clean banking record by avoiding bounced payments and overdrawn accounts."
      ],
    },
    {
      category: 'Business Stability',
      items: [
        "Operate your business for more years—longevity reflects reliability.",
        "Increase your annual revenue through higher sales volume or premium products.",
        "Hire additional employees to indicate business growth and scale.",
        "Expand your shop size or improve layout to serve more customers.",
        "Open more branches if feasible to showcase expansion potential.",
        "Introduce private-label products to improve margins and business uniqueness."
      ],
    },
    {
      category: 'Operational Score',
      items: [
        "Accept digital payments (UPI, QR, cards) to improve transaction visibility and modernize operations.",
        "Improve your inventory turnover by restocking frequently and minimizing dead stock.",
        "Reduce seasonal dependency by diversifying your product offerings.",
        "Increase customer footfall with promotions, loyalty programs, or local advertising.",
        "Build an online presence via a Google Business profile, social media, or a basic website.",
        "Extend shop working hours (e.g., 10+ hours/day) to improve service availability."
      ],
    },
    {
      category: 'Risk & Support',
      items: [
        "Pay your suppliers/distributors on time to maintain a trustworthy financial network.",
        "Operate in a stable industry such as kirana or pharmacy to reduce perceived sector risk.",
        "Clearly specify that the loan is for business growth rather than debt refinancing.",
        "Show willingness to provide valuable collateral—this lowers the lender's risk.",
        "Avoid industries with high volatility unless you have a clear advantage or mitigation plan."
      ],
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Credit Score Report
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button variant="outlined" onClick={() => navigate('/risk-and-support-factors')}>Back</Button>
          <Button variant="contained" color="secondary" onClick={handleReset}>Reset</Button>
        </Box>

        <Grid container spacing={4}>
          {/* Summary Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center', position: 'relative', py: 6 }}>
                <Box sx={{ width: 150, height: 150, mx: 'auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CircularProgress variant="determinate" value={100} size={150} thickness={4} sx={{ color: 'grey.200', position: 'absolute', top: 0, left: 0 }} />
                  <CircularProgress variant="determinate" value={creditScore} size={150} thickness={4} sx={{ color: 'primary.main', position: 'absolute', top: 0, left: 0 }} />
                  <Typography variant="h2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {creditScore}/100
                  </Typography>
                </Box>
                <Chip label={rating} sx={ratingChipStyles[rating]} />
                <Typography
                  variant="body2"
                  sx={{ mt: 2, bgcolor: 'background.paper', p: 1, borderRadius: 1 }}
                >
                  {rating === 'Good'
                    ? 'You have a good credit profile with strong business stability.'
                    : rating === 'Average'
                    ? 'Your credit profile is average — targeted improvements can lift it further.'
                    : rating === 'Bad'
                    ? 'Your credit profile is below desired levels; improvements needed.'
                    : 'Your credit profile is weak; immediate action is advised.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Score Breakdown */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {([
                ['💰 Financial', subScores.financial],
                ['🧾 Credit History', subScores.creditHistory],
                ['🏬 Business Stability', subScores.businessStability],
                ['⚙️ Operational', subScores.operational],
                ['🧯 Risk & Support', subScores.riskSupport],
              ] as [string, number][]).map(([label, score]) => (
                <Grid item xs={12} sm={6} md={4} key={label}>
                  <Card sx={{ '&:hover': { boxShadow: 6 }, bgcolor: 'background.paper', cursor: 'pointer' }} onClick={() => scrollToSection(label)}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <CircularProgress
                        variant="determinate"
                        value={score}
                        size={90}
                        thickness={5}
                        sx={{ color: 'primary.main' }}
                      />
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        {label}
                      </Typography>
                      <Typography variant="subtitle1">{score}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Recommendations */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recommendations for Improvement
                </Typography>
                {recommendations.map((category) => (
                  <Accordion key={category.category} ref={sectionRefs[category.category as keyof typeof sectionRefs]}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600 }}>{category.category}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {category.items.map((item, index) => (
                          <ListItem key={index} alignItems="flex-start">
                            <ListItemIcon>
                              <InfoIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={<Typography variant="body1" fontWeight={500}>{item}</Typography>}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreditReport; 
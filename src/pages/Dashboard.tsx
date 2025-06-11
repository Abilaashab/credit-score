import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h1" align="center" gutterBottom>
          Welcome to Credit Score Analyzer
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Get your store's credit score and comprehensive analysis in minutes
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <StorefrontIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Calculate Credit Score
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Enter your store information to get your credit score
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/store-details')}
                  fullWidth
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <AssessmentIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Credit Report
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  View detailed analysis and recommendations for your store
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/credit-report')}
                  fullWidth
                >
                  View Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 
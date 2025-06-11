import React from 'react';
import { Box, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      localStorage.removeItem('financialDetails');
      localStorage.removeItem('creditHistoryDetails');
      localStorage.removeItem('businessStabilityDetails');
      localStorage.removeItem('operationalEfficiencyDetails');
      localStorage.removeItem('riskAndSupportFactorsDetails');
    } catch (err) {
      console.error('Failed to clear stored data', err);
    }
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <AccountBalanceIcon
        sx={{
          fontSize: 40,
          color: theme.palette.primary.main,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: theme.palette.primary.main,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        CreditScore
      </Typography>
    </Box>
  );
};

export default Logo; 
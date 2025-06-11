import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, Container } from '@mui/material';
import theme from './theme';
import Logo from './components/Logo';

// Import pages (we'll create these next)
import Dashboard from './pages/Dashboard';
import StoreDetails from './pages/StoreDetails';
import CreditHistory from './pages/CreditHistory';
import CreditReport from './pages/CreditReport';
import FinancialScore from './pages/FinancialScore';
import BusinessStability from './pages/BusinessStability';
import OperationalEfficiency from './pages/OperationalEfficiency';
import RiskAndSupportFactors from './pages/RiskAndSupportFactors';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
              <Logo />
            </Toolbar>
          </AppBar>
          <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/store-details" element={<StoreDetails />} />
              <Route path="/credit-history" element={<CreditHistory />} />
              <Route path="/credit-report" element={<CreditReport />} />
              <Route path="/financial-score" element={<FinancialScore />} />
              <Route path="/business-stability" element={<BusinessStability />} />
              <Route path="/operational-efficiency" element={<OperationalEfficiency />} />
              <Route path="/risk-and-support-factors" element={<RiskAndSupportFactors />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 
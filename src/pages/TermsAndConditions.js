import React from 'react';
import { Container, Typography, Paper, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <Box className="auth-container">
      <IconButton 
        className="back-home-button"
        onClick={() => navigate('/register')}
        aria-label="back to registration"
      >
        <ArrowBackIcon />
      </IconButton>
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      <div className="circle-3"></div>
      <div className="circle-4"></div>
      <Container maxWidth="md" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#2e7d32' }}>
            SlimStudie Terms and Conditions
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ color: '#1b5e20' }}>
              Effective Date: 21 May 2025
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#1b5e20', mb: 2 }}>
              Last Updated: 21 May 2025
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to SlimStudie. By using our platform, you agree to the following Terms. If you disagree, please do not use the service.
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20' }}>
              1. Data Collection and GDPR Compliance
            </Typography>
            <Typography paragraph>
              We collect only essential data: your name, email, password, and institution. This is used solely to provide our educational services, in line with GDPR (Article 5). We do not use your data for advertising, profiling, or resale.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20' }}>
              2. Purpose and Data Minimization
            </Typography>
            <Typography paragraph>
              We only use your data for account setup, access to materials, progress tracking, and teacher-student interaction. Optional features (e.g., AI tools) may request extra data—but only with your consent.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20' }}>
              3. Data Retention
            </Typography>
            <Typography paragraph>
              Inactive accounts are deleted after two years. You’ll be notified before deletion and can export your data. You can also delete your account at any time via settings.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20' }}>
              4. Content and Conduct
            </Typography>
            <Typography paragraph>
              Teachers can make their materials public or private. Content must follow community standards—no hate speech, discrimination, or profanity.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20' }}>
              5. Data accuracy
            </Typography>
            <Typography paragraph>
              The materials appearing on this application could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our application are accurate, complete or current.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20' }}>
              6. Teacher Verification
            </Typography>
            <Typography paragraph>
              Teachers must register with their official school email and are expected to follow their institution’s ethical standards.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20' }}>
              7. Community and Donations
            </Typography>
            <Typography paragraph>
              SlimStudie is non-commercial and community-driven. Voluntary donations help cover hosting and development but do not affect access to any features.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20' }}>
              8. Your Rights
            </Typography>
            <Typography paragraph>
              You can access, correct, delete, or export your data at any time. You may also object to processing or contact your local data authority. Email us at please.do.not.contact.us@slimstudie.nl with questions.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20' }}>
              9. Modifications of Terms and Conditions
            </Typography>
            <Typography paragraph>
              We may revise these terms of service for our application at any time without notice. By using this application, you are agreeing to be bound by the then current version of these terms of service.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsAndConditions; 
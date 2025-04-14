import React, { useState } from 'react';
import { Typography, Box, Pagination } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ExamPracticeCard from '../components/ExamPracticeCard';
import { useExamPractice } from '../context/ExamPracticeContext';

function Home() {
  const { examPractices } = useExamPractice();
  const [currentPage, setCurrentPage] = useState(1);
  const practicesPerPage = 10; // 2 practices per row × 5 rows

  // Calculate pagination
  const indexOfLastPractice = currentPage * practicesPerPage;
  const indexOfFirstPractice = indexOfLastPractice - practicesPerPage;
  const currentPractices = examPractices.slice(indexOfFirstPractice, indexOfLastPractice);
  const totalPages = Math.ceil(examPractices.length / practicesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content" style={{ paddingBottom: '100px' }}>
          <Box sx={{ mb: 7 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Exam Practices
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
              Browse freely through the available practice exams
            </Typography>
          </Box>

          {examPractices.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No exam practices available. Create one to get started!
            </Typography>
          ) : (
            <>
              <Box sx={{ 
                mb: 4,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px 32px',
                justifyContent: 'space-between',
                '& > *': {
                  flex: '0 1 calc(50% - 16px)',
                  minWidth: '300px',
                }
              }}>
                {currentPractices.map((practice) => (
                  <ExamPracticeCard key={practice.id} examPractice={practice} />
                ))}
              </Box>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: '#4caf50',
                        '&.Mui-selected': {
                          backgroundColor: '#4caf50',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#388e3c',
                          },
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home; 
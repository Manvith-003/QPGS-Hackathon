import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddQuestion from './AddQuestions';
import FilteredQuestions from './FilteredQuestions';
import ViewQuestions from './ViewQuestions';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GenerateQuestion from './GenerateQuestion';
import ViewQuestionPaper from './ViewQuestionpaper';

function Dashboard() {
  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f4f6f8">
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          bgcolor: 'primary.main', // Material UI primary color
          color: '#ffffff',
          padding: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Admin Dashboard
        </Typography>

        {/* Navigation Buttons at the Top */}
        <List>
          {/* Filter Questions Button */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/filter-questions">
              <ListItemIcon>
                <FilterListIcon sx={{ color: '#ffffff' }} />
              </ListItemIcon>
              <ListItemText primary="Filter Questions" />
            </ListItemButton>
          </ListItem>

          {/* Add Question Button */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/add-question">
              <ListItemIcon>
                <QuestionAnswerIcon sx={{ color: '#ffffff' }} />
              </ListItemIcon>
              <ListItemText primary="Add Question" />
            </ListItemButton>
          </ListItem>

          {/* View Questions Button */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/view-questions">
              <ListItemIcon>
                <VisibilityIcon sx={{ color: '#ffffff' }} />
              </ListItemIcon>
              <ListItemText primary="View Questions" />
            </ListItemButton>
          </ListItem>
        

          <ListItem disablePadding>
  <ListItemButton component={Link} to="/generate-question">
    <ListItemIcon>
      <VisibilityIcon sx={{ color: '#ffffff' }} />
    </ListItemIcon>
    <ListItemText primary="Generate Question Paper" />
  </ListItemButton>
</ListItem>

<ListItem disablePadding>
  <ListItemButton component={Link} to="/view-question-paper">
    <ListItemIcon>
      <VisibilityIcon sx={{ color: '#ffffff' }} />
    </ListItemIcon>
    <ListItemText primary="View Question Paper" />
  </ListItemButton>
</ListItem>


        </List>
      </Box>

      {/* Content Area */}
      <Box flex={1} padding={4}>
        <Routes>
          {/* Add Question Route */}
          <Route path="/add-question" element={<AddQuestion />} />
          {/* Filter Questions Route */}
          <Route path="/filter-questions" element={<FilteredQuestions />} />
          {/* View Questions Route */}
          <Route path="/view-questions" element={<ViewQuestions />} />
          {/* Home Route */}
          <Route path="/generate-question" element={<GenerateQuestion />} />
          <Route path="/view-question-paper" element={<ViewQuestionPaper />} />
          <Route
            path="/"
            element={
              <Box textAlign="center">
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  Welcome to Admin Dashboard
                </Typography>
                <Typography variant="body1">
                  Select an option from the sidebar to get started.
                </Typography>
              </Box>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;

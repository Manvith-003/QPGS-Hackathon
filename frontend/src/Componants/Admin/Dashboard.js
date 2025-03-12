import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterListIcon from "@mui/icons-material/FilterList";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const dashboardItems = [
    { text: "Add Question", icon: <QuestionAnswerIcon />, path: "/add-question" },
    { text: "View Questions", icon: <VisibilityIcon />, path: "/view-questions" },
    { text: "Filter Questions", icon: <FilterListIcon />, path: "/filter-questions" },
    { text: "Generate Question Paper", icon: <AssignmentIcon />, path: "/generate-question" },
    { text: "View Question Paper", icon: <VisibilityIcon />, path: "/view-question-paper" },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", color: "#1976d2" }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {dashboardItems.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
              }}
              onClick={() => navigate(item.path)}
            >
              <Box sx={{ fontSize: 40, color: "#1976d2" }}>{item.icon}</Box>
              <Typography variant="h6" sx={{ marginTop: 1, fontWeight: "bold" }}>{item.text}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  CssBaseline,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuIcon from "@mui/icons-material/Menu";

function Layout() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f4f6f8">
      <CssBaseline />

      {/* Sidebar Navigation Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, bgcolor: "#1976d2", color: "#ffffff", height: "100vh", display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ textAlign: "center", padding: 2, borderBottom: "1px solid white" }}>
            QPGS Management
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/filter-questions"); setDrawerOpen(false); }}>
                <FilterListIcon sx={{ color: "#ffffff", marginRight: 1 }} />
                <ListItemText primary="Filter Questions" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/add-question"); setDrawerOpen(false); }}>
                <QuestionAnswerIcon sx={{ color: "#ffffff", marginRight: 1 }} />
                <ListItemText primary="Add Question" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/view-questions"); setDrawerOpen(false); }}>
                <VisibilityIcon sx={{ color: "#ffffff", marginRight: 1 }} />
                <ListItemText primary="View Questions" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/generate-question"); setDrawerOpen(false); }}>
                <AssignmentIcon sx={{ color: "#ffffff", marginRight: 1 }} />
                <ListItemText primary="Generate Question Paper" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate("/view-question-paper"); setDrawerOpen(false); }}>
                <VisibilityIcon sx={{ color: "#ffffff", marginRight: 1 }} />
                <ListItemText primary="View Question Paper" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* Top Navigation Bar */}
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" fontWeight="bold">
              Admin Dashboard
            </Typography>

            <Box display="flex" alignItems="center">
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                {user ? `Hello, ${user.name}` : "Welcome"}
              </Typography>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon />
              </IconButton>
            </Box>

            {/* Profile Dropdown Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
              <MenuItem disabled>{user ? user.name : "User"}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box flex={1} padding={4}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;

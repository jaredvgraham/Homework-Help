"use client";
import { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import Sidebar from "@/components/assignment-workspace/Sidebar";
import AssignmentDetails from "@/components/assignment-workspace/AssignmentDetails";
import Questions from "@/components/assignment-workspace/Questions";
import Preview from "@/components/assignment-workspace/Preview";
import axios from "axios";

const drawerWidth = 240;

const CreateAssignment = () => {
  const [selectedSection, setSelectedSection] = useState("details");
  const [assignmentData, setAssignmentData] = useState<any>({
    details: {},
    questions: [],
  });

  const updateAssignmentData = (section: string, data: any) => {
    setAssignmentData((prev: any) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleSaveAssignment = async () => {
    console.log("Saving assignment:", assignmentData);

    try {
      const response = await axios.post(
        "/api/teacher/assignments",
        assignmentData
      );
      if (response.status === 200) {
        alert("Assignment saved successfully!");
        // Optionally, navigate to another page or clear the form
      } else {
        alert("Failed to save assignment.");
      }
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("An error occurred while saving the assignment.");
    }
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "details":
        return (
          <AssignmentDetails
            data={assignmentData.details}
            updateData={(data: any) => updateAssignmentData("details", data)}
          />
        );
      case "questions":
        return (
          <Questions
            data={assignmentData.questions}
            updateData={(data: any) => updateAssignmentData("questions", data)}
          />
        );
      case "preview":
        return <Preview data={assignmentData} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Create Assignment
          </Typography>
          <Button
            color="inherit"
            sx={{ marginLeft: "auto" }}
            onClick={handleSaveAssignment}
          >
            Save Assignment
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Sidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default CreateAssignment;

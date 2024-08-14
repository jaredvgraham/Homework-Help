import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Description, HelpOutline, Visibility } from "@mui/icons-material";

interface SidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
  handleSaveAssignment: () => void;
}

const Sidebar = ({
  selectedSection,
  setSelectedSection,
  handleSaveAssignment,
}: SidebarProps) => {
  const sections = [
    { text: "Assignment Details", icon: <Description />, value: "details" },
    { text: "Questions", icon: <HelpOutline />, value: "questions" },
    { text: "Preview", icon: <Visibility />, value: "preview" },
  ];

  return (
    <List>
      {sections.map((section) => (
        <ListItemButton
          key={section.value}
          selected={selectedSection === section.value}
          onClick={() => setSelectedSection(section.value)}
        >
          <ListItemIcon>{section.icon}</ListItemIcon>
          <ListItemText primary={section.text} />
        </ListItemButton>
      ))}
      <ListItemButton
        onClick={handleSaveAssignment}
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          textAlign: "center",

          borderRadius: 2,
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          mt: 2, // Adds margin at the top
        }}
      >
        <ListItemText primary="Save Assignment" />
      </ListItemButton>
    </List>
  );
};

export default Sidebar;

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Description, HelpOutline, Visibility } from "@mui/icons-material";

interface SidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

const Sidebar = ({ selectedSection, setSelectedSection }: SidebarProps) => {
  const sections = [
    { text: "Assignment Details", icon: <Description />, value: "details" },
    { text: "Questions", icon: <HelpOutline />, value: "questions" },
    { text: "Preview", icon: <Visibility />, value: "preview" },
  ];

  return (
    <List>
      {sections.map((section) => (
        <ListItem
          button
          key={section.value}
          selected={selectedSection === section.value}
          onClick={() => setSelectedSection(section.value)}
        >
          <ListItemIcon>{section.icon}</ListItemIcon>
          <ListItemText primary={section.text} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;

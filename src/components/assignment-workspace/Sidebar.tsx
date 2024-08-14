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
    <ul className="space-y-2">
      {sections.map((section) => (
        <li
          key={section.value}
          className={`flex items-center px-4 py-2 cursor-pointer rounded-lg ${
            selectedSection === section.value
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedSection(section.value)}
        >
          <span className="mr-2">{section.icon}</span>
          <span>{section.text}</span>
        </li>
      ))}
      <li
        className="flex items-center justify-center px-4 py-2 mt-4 cursor-pointer rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        onClick={handleSaveAssignment}
      >
        Save Assignment
      </li>
    </ul>
  );
};

export default Sidebar;

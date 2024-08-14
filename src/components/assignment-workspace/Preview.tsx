import {
  Box,
  Typography,
  List,
  ListItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { Question } from "./QuestionItem";

interface PreviewProps {
  data: {
    details: any;
    questions: Question[];
  };
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  const { details, questions } = data;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {details.title || "Untitled Assignment"}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {details.description || "No description provided."}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Due Date:{" "}
        {details.dueDate
          ? new Date(details.dueDate).toLocaleDateString()
          : "N/A"}
      </Typography>

      <List>
        {questions.map((question, index) => (
          <ListItem key={question.id} alignItems="flex-start">
            <Box component="div">
              <Box>
                <Typography component="span" variant="body1">
                  {`Q${index + 1}: ${
                    question.questionText || "No question text."
                  }`}
                </Typography>
              </Box>
              <Box component="div">
                {question.type === "multiple_choice" ? (
                  <RadioGroup>
                    {question.options?.map((option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option.id}
                        control={<Radio />}
                        label={option.text || "No option text."}
                      />
                    ))}
                  </RadioGroup>
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Your answer here..."
                  />
                )}
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Preview;

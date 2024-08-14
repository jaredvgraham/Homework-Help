// components/QuestionItem.tsx
import { useState } from "react";
import {
  TextField,
  IconButton,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

import { v4 as uuidv4 } from "uuid";

export type QuestionType = "multiple_choice" | "short_answer";

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options?: Option[]; // For multiple-choice
  correctChoice?: string; // For multiple-choice
  answerText?: string; // For short-answer
}

interface QuestionItemProps {
  question: Question;
  updateQuestion: (updatedQuestion: Question) => void;
  removeQuestion: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  updateQuestion,
  removeQuestion,
}) => {
  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestion({ ...question, questionText: e.target.value });
  };

  const handleQuestionTypeChange = (e: any) => {
    updateQuestion({ ...question, type: e.target.value });
  };

  const handleAddOption = () => {
    const newOption: Option = { id: uuidv4(), text: "" };
    const updatedOptions = question.options
      ? [...question.options, newOption]
      : [newOption];
    updateQuestion({ ...question, options: updatedOptions });
  };

  const handleOptionTextChange = (id: string, text: string) => {
    const updatedOptions = question.options?.map((opt) =>
      opt.id === id ? { ...opt, text } : opt
    );
    updateQuestion({ ...question, options: updatedOptions });
  };

  const handleRemoveOption = (id: string) => {
    const updatedOptions = question.options?.filter((opt) => opt.id !== id);
    updateQuestion({ ...question, options: updatedOptions });
  };

  const handleCorrectOptionChange = (id: string) => {
    updateQuestion({ ...question, correctChoice: id });
  };

  const handleAnswerTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestion({ ...question, answerText: e.target.value });
  };

  return (
    <Box border={1} borderRadius={2} borderColor="grey.300" p={2} mb={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControl variant="outlined" sx={{ minWidth: 800 }}>
          <InputLabel>Question Type</InputLabel>
          <Select
            value={question.type}
            onChange={handleQuestionTypeChange}
            label="Question Type"
          >
            <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
            <MenuItem value="short_answer">Short Answer</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={removeQuestion}>
          <Delete />
        </IconButton>
      </Box>

      <TextField
        label="Question Text"
        variant="outlined"
        fullWidth
        margin="normal"
        value={question.questionText}
        onChange={handleQuestionTextChange}
      />

      {question.type === "multiple_choice" && (
        <>
          {question.options?.map((option) => (
            <Box key={option.id} display="flex" alignItems="center" mb={1}>
              <TextField
                variant="outlined"
                label="Option Text"
                value={option.text}
                onChange={(e) =>
                  handleOptionTextChange(option.id, e.target.value)
                }
                fullWidth
              />
              <IconButton onClick={() => handleRemoveOption(option.id)}>
                <Delete />
              </IconButton>
              <FormControl>
                <Select
                  value={question.correctChoice === option.id ? option.id : ""}
                  onChange={() => handleCorrectOptionChange(option.id)}
                  displayEmpty
                  inputProps={{ "aria-label": "Select as correct" }}
                >
                  <MenuItem value="">
                    <em>Mark as Correct</em>
                  </MenuItem>
                  <MenuItem value={option.id}>Correct</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddOption}
          >
            Add Option
          </Button>
        </>
      )}

      {question.type === "short_answer" && (
        <TextField
          label="Answer Text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={question.answerText}
          onChange={handleAnswerTextChange}
        />
      )}
    </Box>
  );
};

export default QuestionItem;

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
    <div className="border border-gray-300 rounded p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 mr-4">
          <label className="block text-sm font-medium text-gray-700">
            Question Type
          </label>
          <select
            value={question.type}
            onChange={handleQuestionTypeChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="multiple_choice">Multiple Choice</option>
            <option value="short_answer">Short Answer</option>
          </select>
        </div>
        <button
          onClick={removeQuestion}
          className="text-red-500 hover:text-red-700"
        >
          &#10005;
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Question Text
        </label>
        <input
          type="text"
          value={question.questionText}
          onChange={handleQuestionTextChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {question.type === "multiple_choice" && (
        <>
          {question.options?.map((option) => (
            <div key={option.id} className="flex items-center mb-2">
              <input
                type="text"
                value={option.text}
                onChange={(e) =>
                  handleOptionTextChange(option.id, e.target.value)
                }
                className="flex-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-2"
                placeholder="Option Text"
              />
              <button
                onClick={() => handleRemoveOption(option.id)}
                className="text-red-500 hover:text-red-700"
              >
                &#10005;
              </button>
              <select
                value={question.correctChoice === option.id ? option.id : ""}
                onChange={() => handleCorrectOptionChange(option.id)}
                className="ml-2 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Mark as Correct</option>
                <option value={option.id}>Correct</option>
              </select>
            </div>
          ))}
          <button
            onClick={handleAddOption}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Add Option
          </button>
        </>
      )}

      {question.type === "short_answer" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Answer Text
          </label>
          <input
            type="text"
            value={question.answerText}
            onChange={handleAnswerTextChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Your answer here..."
          />
        </div>
      )}
    </div>
  );
};

export default QuestionItem;

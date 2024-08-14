// components/Questions.tsx
import { useState } from "react";
import { Button, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import QuestionItem from "./QuestionItem";
import { Question } from "./QuestionItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

interface QuestionsProps {
  data: Question[];
  updateData: (data: Question[]) => void;
}

const Questions: React.FC<QuestionsProps> = ({ data, updateData }) => {
  const [questions, setQuestions] = useState<Question[]>(data);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: uuidv4(),
      type: "multiple_choice",
      questionText: "",
      options: [],
      correctChoice: "",
    };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    updateData(updatedQuestions); // Immediate update
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
    updateData(updatedQuestions); // Immediate update
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    updateData(updatedQuestions); // Immediate update
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedQuestions = Array.from(questions);
    const [removed] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, removed);

    setQuestions(reorderedQuestions);
  };

  const handleSave = () => {
    updateData(questions);
    alert("Questions saved!");
  };

  return (
    <div className="p-4">
      <button
        onClick={addQuestion}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded shadow mb-4"
      >
        <span className="mr-2">Add Question</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable
                  key={question.id}
                  draggableId={question.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4 p-4 bg-gray-100 rounded shadow"
                    >
                      <QuestionItem
                        question={question}
                        updateQuestion={(updatedQuestion) =>
                          updateQuestion(index, updatedQuestion)
                        }
                        removeQuestion={() => removeQuestion(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow"
      >
        Save Questions
      </button>
    </div>
  );
};

export default Questions;

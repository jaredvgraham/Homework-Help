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
      correctOptionId: "",
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
    <Box>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={addQuestion}
        sx={{ mb: 2 }}
      >
        Add Question
      </Button>

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

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 2 }}
      >
        Save Questions
      </Button>
    </Box>
  );
};

export default Questions;

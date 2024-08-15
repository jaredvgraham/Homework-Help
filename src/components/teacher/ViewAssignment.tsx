"use client";
import { Assignment } from "@/types";
import React from "react";

type Props = {
  assignment: Assignment | null;
};

const ViewAssignment = ({ assignment }: Props) => {
  return (
    <div>
      {assignment ? (
        <div>
          <h1>{assignment.title}</h1>
          <p>Teacher: {assignment.teacher}</p>
          {assignment.questions.map((question, index) => (
            <div key={index}>
              <p>Question: {question.question}</p>
              {question.options.map((option, idx) => (
                <p key={idx}>{option.text}</p>
              ))}
              <p>Answer: {question.answer}</p>
            </div>
          ))}
          <p>YouTube Links: {assignment.youtubeLinks?.join(", ")}</p>
        </div>
      ) : (
        <p>No assignment found.</p>
      )}
    </div>
  );
};

export default ViewAssignment;

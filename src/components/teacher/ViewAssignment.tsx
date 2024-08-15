"use client";
import { Assignment } from "@/types";
import React from "react";

type Props = {
  assignment: Assignment | null;
};

const ViewAssignment = ({ assignment }: Props) => {
  return (
    <div className="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
      {assignment ? (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
            {assignment.title}
          </h1>
          <p className="text-gray-600 text-lg mb-8 text-center">
            Instructions: {assignment.description}
          </p>

          <div className="space-y-8">
            {assignment.questions.map((question, index) => (
              <div
                key={assignment._id}
                className="p-6 bg-gray-100 rounded-lg shadow-sm"
              >
                <p className="text-lg font-medium text-gray-800 mb-4">
                  {index + 1}. {question.question}
                </p>
                <div className="space-y-3">
                  {question.options.map((option, idx) => (
                    <label
                      key={option.id}
                      className="block p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option.text}
                        className="mr-2"
                      />
                      {option.text}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {assignment.youtubeLinks && assignment.youtubeLinks.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Additional Resources
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {assignment.youtubeLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600">No assignment found.</p>
      )}
    </div>
  );
};

export default ViewAssignment;

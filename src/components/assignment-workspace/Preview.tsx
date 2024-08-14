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
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">
        {details.title || "Untitled Assignment"}
      </h1>
      <p className="text-lg mb-2">
        {details.description || "No description provided."}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Due Date:{" "}
        {details.dueDate
          ? new Date(details.dueDate).toLocaleDateString()
          : "N/A"}
      </p>

      <ul className="space-y-4">
        {questions.map((question, index) => (
          <li key={question.id} className="flex flex-col">
            <span className="text-base font-medium">
              {`Q${index + 1}: ${question.questionText || "No question text."}`}
            </span>
            <div className="mt-2">
              {question.type === "multiple_choice" ? (
                <div className="flex flex-col space-y-2">
                  {question.options?.map((option) => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.id}
                        className="mr-2"
                      />
                      <span>{option.text || "No option text."}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Your answer here..."
                  className="border border-gray-300 rounded p-2 w-full"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Preview;

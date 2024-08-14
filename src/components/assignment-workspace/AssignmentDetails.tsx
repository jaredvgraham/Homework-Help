import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";

interface AssignmentDetailsProps {
  data: any;
  updateData: (data: any) => void;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  class: yup.string().required("Class is required"),
  dueDate: yup.date().required("Due date is required"),
});

const AssignmentDetails: React.FC<AssignmentDetailsProps> = ({
  data,
  updateData,
}) => {
  const [classes, setClasses] = useState<any[]>([]);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...data,
      class: data.class || "", // Ensure `class` has a default value
    },
    resolver: yupResolver(schema),
  });

  const selectedClass = watch("class");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("/api/teacher/classes"); // Adjust the endpoint as needed
        setClasses(res.data); // Assuming the backend returns an array of classes
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const onSubmit = (formData: any) => {
    updateData(formData);
    alert("Assignment details saved!");
  };

  useEffect(() => {
    console.log("Selected class:", selectedClass);
  }, [selectedClass]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-4 bg-white shadow-md rounded"
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-gray-700">Assignment Title</label>
            <input
              {...field}
              type="text"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter assignment title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.title.message)}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block text-gray-700">
              Assignment Description
            </label>
            <textarea
              {...field}
              rows={4}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter assignment description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.description.message)}
              </p>
            )}
          </div>
        )}
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save Details
      </button>
    </form>
  );
};

export default AssignmentDetails;

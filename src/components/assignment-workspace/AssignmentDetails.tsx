import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 600 }}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Assignment Title"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title ? String(errors.title.message) : ""}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Assignment Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            error={!!errors.description}
            helperText={
              errors.description ? String(errors.description.message) : ""
            }
          />
        )}
      />

      <Controller
        name="class"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal">
            <InputLabel>Class</InputLabel>
            <Select
              {...field}
              label="Class"
              error={!!errors.class}
              value={selectedClass || ""}
              onChange={(e) => {
                setValue("class", e.target.value);
              }}
              sx={{ color: "black", backgroundColor: "white" }}
            >
              {classes.length > 0 ? (
                classes.map((cls: any) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No classes available</MenuItem>
              )}
            </Select>
            {errors.class && (
              <p style={{ color: "red" }}>{String(errors.class.message)}</p>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="dueDate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Due Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            error={!!errors.dueDate}
            helperText={errors.dueDate ? String(errors.dueDate.message) : ""}
          />
        )}
      />

      <Button variant="contained" color="primary" type="submit">
        Save Details
      </Button>
    </Box>
  );
};

export default AssignmentDetails;

import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface AssignmentDetailsProps {
  data: any;
  updateData: (data: any) => void;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup.date().required("Due date is required"),
});

const AssignmentDetails: React.FC<AssignmentDetailsProps> = ({
  data,
  updateData,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: any) => {
    updateData(formData);
    alert("Assignment details saved!");
  };

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

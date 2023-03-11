import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { addAuthorMutation, getAuthorsQuery } from "../../../queries/queries";

const initialFormData = {
  name: "",
  age: 0,
};

const validationSchema = yup.object({
  name: yup.string("Enter the author name").required("Author name is required"),
  age: yup.number("Enter the age").min(10).required("Age is required"),
});

const AddAuthor = () => {
  const [addAuthorData] = useMutation(addAuthorMutation, {
    onCompleted: () => {
       // Refetch the data after the mutation is completed
    }
  })

  const handleFormSubmit = (values) => {
    addAuthorData({
      variables: {
        name: values.name,
        age: parseInt(values.age),
      },
      refetchQueries: [{ query: getAuthorsQuery }],
    })
  };

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    isSubmitting,
    isValid,
    dirty,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialFormData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
      resetForm();
    },
    validateOnChange: true,
  });

  return (
    <Container maxWidth="sm" sx={{ marginTop: "30px" }}>
      <Paper elevation={10} sx={{ paddingX: "30px", paddingY: "30px" }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ marginBottom: "10px" }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "10px" }}>
            <TextField
              fullWidth
              id="age"
              name="age"
              label="age"
              placeholder="Enter the age"
              value={values.age}
              onChange={handleChange}
              error={touched.age && Boolean(errors.age)}
              helperText={touched.age && errors.age}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "10px" }}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Add Author
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
};

export default AddAuthor;

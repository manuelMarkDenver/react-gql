import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
} from "../../../queries/queries";
import * as yup from "yup";

import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
} from "@mui/material";

const initialFormData = {
  name: "",
  genre: "",
  authorId: "",
};

const validationSchema = yup.object({
  name: yup.string("Enter the book name").required("Book name is required"),
  genre: yup
    .string("Enter the genre")
    .min(8, "Genre should be of minimum 8 characters length")
    .required("Genre is required"),
  authorId: yup
    .string("Please select the author")
    .required("Author is required"),
});

const AddBook = () => {
  const { loading, error, data, refetch } = useQuery(getAuthorsQuery);
  const [addBookData] = useMutation(addBookMutation, {
    onCompleted: () => {
      refetch(); // Refetch the data after the mutation is completed
    },
  });
  const [authors, setAuthors] = useState([]);

  const handleFormSubmit = (values) => {
    addBookData({
      variables: {
        name: values.name,
        genre: values.genre,
        authorId: values.authorId,
      },
      // refetchQueries: [{ query: getBooksQuery }, { query: getBookQuery  }],
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  useEffect(() => {
    if (data) {
      setAuthors(data?.authors);
    }
  }, [data]);

  const {
    errors,
    touched,
    values,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    handleChange,
    handleSubmit,
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: "20px" }}>
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
              id="genre"
              name="genre"
              label="genre"
              value={values.genre}
              onChange={handleChange}
              error={touched.genre && Boolean(errors.genre)}
              helperText={touched.genre && errors.genre}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "10px" }}>
            <InputLabel id="demo-simple-select-label">Author</InputLabel>
            <Select
              labelId="demo-simple-NativeSelect-label"
              id="authorId"
              name="authorId"
              placeholder="Select Author"
              label="author"
              value={values.authorId}
              onChange={handleChange}
            >
              {authors &&
                authors?.map((author) => {
                  return (
                    <MenuItem key={author.id} value={author.id}>
                      {author.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "10px" }}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Add Book
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBook;

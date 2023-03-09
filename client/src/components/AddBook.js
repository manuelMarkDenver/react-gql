import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  NativeSelect,
} from "@mui/material";

const getAuthorsQuery = gql`
  query getAuthors {
    authors {
      id
      name
    }
  }
`;

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

const handleFormSubmit = (values) => {
console.log("🚀 ~ file: AddBook.js:43 ~ handleFormSubmit ~ values:", values)
};

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [authors, setAuthors] = useState([]);
  
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
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialFormData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
    validateOnChange: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
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
          // onChange={(_e, value) => {
          //   setSelectedOptions(setFieldValue("authorId", value));
          // }}
          onChange={handleChange}
        >
          {authors && authors?.map((author) => {
            return <MenuItem key={author.id} value={author.id}>
              {author.name}
            </MenuItem>;
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: "10px" }}>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Add Book
        </Button>
      </FormControl>
    </form>
  );
};

export default AddBook;

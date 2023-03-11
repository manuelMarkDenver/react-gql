import { Grid } from "@mui/material";
import AddBook from "../book-add/AddBook";
import BooksList from "./BooksList";

const BooksListContainer = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <BooksList />
          <AddBook />
        </Grid>
      </Grid>
    </>
  );
};

export default BooksListContainer;

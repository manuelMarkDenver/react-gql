import { Container, Divider, Typography } from "@mui/material";
import AddBook from "./features/books/book-add/AddBook";
import AuthorsListContainer from "./features/author/authors-list/AuthorsListContainer";
import BooksListContainer from "./features/books/books-list/BooksListContainer";

function App() {
  return (
    <main>
      <Container>
        <Typography variant="h3" component="h1" sx={{ textAlign: "center", marginBottom: "30px" }}>
          React-GraphQL BookList
        </Typography>
        <BooksListContainer />
        <br/>
        <AuthorsListContainer />
      </Container>
    </main>
  );
}

export default App;

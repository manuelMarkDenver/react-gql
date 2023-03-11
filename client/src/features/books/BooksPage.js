import { Container } from "@mui/material";
import BooksListContainer from "./books-list/BooksListContainer";

const BooksPage = () => {
  return (
    <Container>
      <Typography
        sx={{ mb: 2 }}
        variant="h3"
        component="h3"
        color="text.primary"
      >
        Books
      </Typography>
      <BooksListContainer />
    </Container>
  );
};

export default BooksPage;

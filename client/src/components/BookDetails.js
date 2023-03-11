
import { Box, Container, List, Typography } from "@mui/material";

const BookDetails = (props) => {
  const { book, authorBooksList } = props;
  console.log("🚀 ~ file: BookDetails.js:8 ~ BookDetails ~ fetchedAuthorBook:", authorBooksList)

  return (
    <Container>
      {book && authorBooksList ? (
        <>
          <Typography variant="h2">{book?.name}</Typography>
          <Typography variant="caption">{book?.genre}</Typography>
          <br />
          <Typography variant="caption">{book?.author?.name}</Typography>
          <Typography variant="h6">All books by this author</Typography>
          <List>
            {authorBooksList.map((book) => {
              return (
                <Box key={book.id}>
                  <Typography variant="h6">{book.name}</Typography>
                </Box>
              );
            })}
          </List>
        </>
      ) : (
        <Typography>No book selected...</Typography>
      )}
    </Container>
  );
};

export default BookDetails;

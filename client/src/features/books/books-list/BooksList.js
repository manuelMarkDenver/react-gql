import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery, getBookQuery } from "../../../queries/queries";
import BookDetails from "../book-details/BookDetails";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Stack } from "@mui/system";

const BooksList = () => {
  const { data: fetchedBooks } = useQuery(getBooksQuery);

  
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [fetchedAuthorBook, setFetchedAuthorBook] = useState(null);
  const [open, setOpen] = useState(false);
  
  const { data: book, refetch } = useQuery(getBookQuery, {
    variables: { id: selectedBookId },
    onCompleted: () => {
      refetch();
    },
  });
  
  const handleClickOpen = (bookId) => {
    console.log("🚀 ~ file: BooksList.js:43 ~ handleClickOpen ~ bookId:", bookId)
    setSelectedBookId(bookId)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (book) {
      setFetchedAuthorBook(book?.book?.author?.books);
    }
  }, [fetchedAuthorBook, book]);

  useEffect(() => {
    if (fetchedBooks) {
      setBooks(fetchedBooks.books);
    }
  }, [fetchedBooks]);

  useEffect(() => {
    if (selectedBookId) {
      const fetchedBook = books.find((book) => book.id === selectedBookId);
      setSelectedBook(fetchedBook);
    }
  }, [selectedBook, selectedBookId]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;

  const authorInitials = (name) => {
    const initials = name.match(/\b\w/g) || [];
    return (
      ((initials.shift() || "") + (initials.pop() || "")).toUpperCase() || ""
    );
  };

  return (
    <>
      <Grid container spacing={3}>
        {books?.map((book) => {
          return (
            <Grid item xs={12} md={4} key={book.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {authorInitials(book.author.name)}
                    </Avatar>
                  }
                  title={book.name}
                  subheader={
                    <Stack>
                      <Typography
                        variant="caption"
                        component="h6"
                        sx={{ color: "gray", fontStyle: "italic" }}
                      >
                        {book.genre}
                      </Typography>
                    </Stack>
                  }
                />
                <CardMedia
                  component="img"
                  height="300"
                  image={process.env.PUBLIC_URL + "/images/book-default.png"}
                  alt={book.name}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </Typography>
                  <Divider sx={{ marginY: "20px" }} />
                  <Typography
                    variant="body2"
                    component="h6"
                    color="text.secondary"
                    sx={{
                      fontStyle: "italic",
                    }}
                  >
                    By {book.author.name}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </Box>
                  <Button
                    onClick={() => handleClickOpen(book.id)}
                    variant="contained"
                    sx={{
                      borderColor: "gray",
                    }}
                  >
                    DETAILS
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <BookDetails
        book={selectedBook}
        bookId={selectedBookId}
        authorBooksList={fetchedAuthorBook}
        setOpen={setOpen}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default BooksList;

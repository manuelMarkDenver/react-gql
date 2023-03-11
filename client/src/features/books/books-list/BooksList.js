import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery, getBookQuery } from "../../../queries/queries";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import BookDetails from "../book-details/BookDetails";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [fetchedAuthorBook, setFetchedAuthorBook] = useState(null);
  
  const { data: fetchedBooks } = useQuery(getBooksQuery);

  const { data: book, refetch } = useQuery(getBookQuery, {
    variables: {id: selectedBookId},
    onCompleted: () => {
      refetch();
    }
  });

  useEffect(()=>{
    if (book) {
      setFetchedAuthorBook(book?.book?.author?.books)
    }
  }, [fetchedAuthorBook, book])
  
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

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          color: "black",
        }}
      >
        {books?.map((book) => {
          return (
            <ListItem
              key={book.id}
              onClick={() => setSelectedBookId(book.id)}
              alignItems="flex-start"
              sx={{
                color: "black",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              <ListItemText
                primary={book.name}
                secondary={
                  <Typography
                    sx={{
                      display: "inline",
                      color: "gray",
                      fontStyle: "italic",
                    }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.genre}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>

      <BookDetails book={selectedBook} bookId={selectedBookId} authorBooksList={fetchedAuthorBook} />
    </>
  );
};

export default BooksList;
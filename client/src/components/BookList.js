import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery, getBookQuery } from "../queries/queries";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import BookDetails from "./BookDetails";

const BookList = () => {
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
  console.log("🚀 ~ file: BookDetails.js:19 ~ BookDetails ~ fetchedBook:", fetchedAuthorBook)
  
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

export default BookList;

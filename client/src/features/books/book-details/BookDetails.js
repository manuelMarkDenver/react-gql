import React from "react";
import {
  Box,
  Dialog,
  List,
  Typography,
  Slide,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookDetails = (props) => {
  const { book, authorBooksList, open, handleClose } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle variant="h2">{book?.name}</DialogTitle>
      <DialogContent>
        <Typography variant="caption">{book?.genre}</Typography>
        <br />
        <Typography variant="caption">{book?.author?.name}</Typography>
        <Typography variant="h6">All books by this author</Typography>
        <List>
          {authorBooksList && authorBooksList.map((book) => {
            return (
              <Box key={book.id}>
                <Typography variant="h6">{book.name}</Typography>
              </Box>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetails;

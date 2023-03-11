import { Grid } from "@mui/material";
import AddAuthor from "../author-add/AddAuthor";
import AuthorsList from "./AuthorsList";

const AuthorsListContainer = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <AuthorsList />
          <AddAuthor />
        </Grid>
      </Grid>
    </>
  );
};

export default AuthorsListContainer;

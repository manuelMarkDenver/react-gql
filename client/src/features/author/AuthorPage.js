import { Container } from "@mui/material";
import AuthorsListContainer from "./authors-list/AuthorsListContainer";

const AuthorPage = () => {
  return (
    <Container>
      <Typography
        sx={{ mb: 2 }}
        variant="h3"
        component="h3"
        color="text.primary"
      >
        Authors
      </Typography>

      <AuthorsListContainer />
    </Container>
  );
};

export default AuthorPage;

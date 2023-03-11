import { gql } from "@apollo/client";

const getAuthorsQuery = gql`
  query getAuthors {
    authors {
      id
      name
    }
  }
`;

const getBooksQuery = gql`
  query GetBooks {
    books {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query GetBook($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };

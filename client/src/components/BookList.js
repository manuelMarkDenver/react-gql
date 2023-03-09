import { useQuery, gql } from "@apollo/client";

const getBooks = gql`
  query GetBooks {
    books {
      id
      name
      genre
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <ul>
      {data.books &&
        data?.books?.map((book) => {
          return (
            <li key={book.id}>
              <p>{book.name}</p>
              <p>{book.genre}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default BookList;

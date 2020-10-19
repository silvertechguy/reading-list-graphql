import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const [addBook, { data: addBookData }] = useMutation(addBookMutation, {
    refetchQueries: [{ query: getBooksQuery }],
  });
  const {
    loading: authorsLoading,
    error: authorsError,
    data: authorsData,
  } = useQuery(getAuthorsQuery);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    addBook({ variables: { name, genre, authorId } });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {authorsLoading ? (
            <option disabled>Loading authors</option>
          ) : (
            authorsData.authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            })
          )}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;

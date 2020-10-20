import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import BookDetails from "./BookDetails";
import { getBooksQuery } from "../queries/queries";

const BookList = () => {
  const [selected, setSelected] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);
  return (
    <div>
      <ul id="book-list">
        {loading ? (
          <div>Loading books...</div>
        ) : (
          data.books.map((book) => (
            <li
              key={book.id}
              onClick={() => {
                if (selected === book.id) {
                  return setSelected(null);
                }
                setSelected(book.id);
              }}
            >
              {book.name}
            </li>
          ))
        )}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;

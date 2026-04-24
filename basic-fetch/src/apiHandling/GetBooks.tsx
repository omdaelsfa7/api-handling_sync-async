import { useEffect, useState } from "react";

interface Book {
  id: number;
  name: string;
  type: string;
  available: string;
}
function GetBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://simple-books-api.click/books")
      .then((res) => res.json())
      .then((data) => {
        console.log("Books arrived:", data);
        setBooks(data); // 'data' is the array of books
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error caught:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px", color: "white", border: "2px solid red" }}>
      <h3>Library Books:</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {/* 3. Use .map() to display each book in the array */}
          {books.map((book) => (
            <li key={book.id}>
              {book.name} - <em>{book.type}</em> {book.available ? "✅" : "❌"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetBooks;

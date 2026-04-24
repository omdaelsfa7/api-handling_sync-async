import { useEffect, useState } from "react";

interface Book {
  id: number;
  name: string;
  author: string;
  type: string;
  price: number;
  available: boolean;
}

function GetBookById() {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. Tracks the text in the input bar
  const [searchId, setSearchId] = useState<string>("1");
  // 2. Tracks the ID we actually want to fetch
  const [idToFetch, setIdToFetch] = useState<string>("1");

  useEffect(() => {
    if (!idToFetch) return;
    setLoading(true);
    fetch(`https://simple-books-api.click/books/${idToFetch}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setBook(null);
        setLoading(false);
      });
  }, [idToFetch]);

  const handleSearch = () => {
    setIdToFetch(searchId);
  };

  return (
    <div style={{ padding: "20px", color: "white", fontFamily: "sans-serif" }}>
      {/* --- SEARCH BAR --- */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Book ID (1-6)"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "8px 15px", marginLeft: "10px", cursor: "pointer" }}
        >
          Search Book
        </button>
      </div>

      {/* --- RESULT DISPLAY --- */}
      <div
        style={{
          border: "2px solid #007bff",
          padding: "15px",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        {loading ? (
          <p>Searching...</p>
        ) : book ? (
          <div>
            <h2 style={{ margin: "0" }}>{book.name}</h2>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Price:</strong> ${book.price}
            </p>
            <p>
              <strong>Status:</strong> {book.available ? "✅" : "❌"}
            </p>
          </div>
        ) : (
          <p>No book found with ID {idToFetch}</p>
        )}
      </div>
    </div>
  );
}

export default GetBookById;

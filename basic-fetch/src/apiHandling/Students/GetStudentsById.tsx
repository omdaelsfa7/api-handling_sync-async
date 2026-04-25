import { useState } from "react";

interface Student {
  id: string;
  studentName: string;
  age: number;
  Major: string;
}

function GetStudentsById() {
  const [id, setId] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!id) return;

    fetch(`https://69ec549397482ad5c528479d.mockapi.io/uni/Students/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Student not found");
        return res.json();
      })
      .then((data) => {
        setStudent(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setStudent(null);
        setError("No student found with that ID.");
      });
  };

  return (
    <div className="container" style={{ textAlign: "center", padding: "20px" }}>
      <h2>Find Student by ID</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Student ID..."
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{ marginLeft: "10px", padding: "8px 16px", cursor: "pointer" }}
        >
          Search
        </button>
      </div>

      <div className="data-grid">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {student && (
          <div className="card">
            <h3>{student.studentName}</h3>
            <p>
              <strong>Age:</strong> {student.age}
            </p>
            <p>
              <strong>Major:</strong> {student.Major}
            </p>
            <div className="card-id">ID: {student.id}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetStudentsById;

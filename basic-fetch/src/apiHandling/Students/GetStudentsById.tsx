import { useState } from "react";
import type { Student } from "../type";

function GetStudentsById() {
  const [id, setId] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!id) return;

    fetch(`https://69ec549397482ad5c528479d.mockapi.io/uni/Students/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Student not found");
        else {
          return res.json();
        }
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
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Find Student by ID</h2>

      <div
        className="card form-container"
        style={{ marginBottom: "30px", display: "flex", gap: "10px" }}
      >
        <input
          type="text"
          className="form-input"
          placeholder="Enter Student ID (e.g. 1)"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="nav-btn active" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="display-area">
        {error && (
          <p
            className="status-message"
            style={{ color: "var(--danger)", textAlign: "center" }}
          >
            {error}
          </p>
        )}

        {student && (
          <div className="card" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h3>{student.studentName}</h3>
            <p>
              <strong>Age:</strong> {student.age}
            </p>
            <p>
              <strong>Major:</strong> {student.Major}
            </p>

            {/* Nested Course Display */}
            <div className="course-list">
              <strong>Enrolled Courses:</strong>
              {student.EnrolledCourses && student.EnrolledCourses.length > 0 ? (
                <ul>
                  {student.EnrolledCourses.map((course) => (
                    <li key={course.id}>
                      {course.courseName} <small>({course.instructor})</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    marginTop: "5px",
                  }}
                >
                  No courses enrolled.
                </p>
              )}
            </div>

            <div className="card-id">ID: {student.id}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetStudentsById;

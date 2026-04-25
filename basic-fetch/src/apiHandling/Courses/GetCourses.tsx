import { useEffect, useState } from "react";
import axios from "axios";
import type { Course } from "../type";

function GetCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://69ec549397482ad5c528479d.mockapi.io/uni/Courses")
      .then((res) => setCourses(res.data))
      .catch(() => setError("Failed to load courses"));
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        Course Directory
      </h2>

      {error && <p className="status-message">{error}</p>}

      <div className="data-grid">
        {courses.map((c) => (
          <div key={c.id} className="card">
            <h3>{c.courseName}</h3>

            <p>
              <strong>Instructor:</strong> {c.instructor}
            </p>

            <p>
              <strong>Max Students:</strong> {c.maxStudents}
            </p>

            <div className="card-id">ID: {c.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetCourses;

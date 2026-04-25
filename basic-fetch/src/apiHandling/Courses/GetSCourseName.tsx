import { useEffect, useState } from "react";
import axios from "axios";
import type { Course } from "../type";

function GetCoursesByName() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://69ec549397482ad5c528479d.mockapi.io/uni/Courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  // filter locally (UI search)
  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Search Courses</h2>

      {/* Search input */}
      <div style={{ marginBottom: "20px " }} className="card form-container">
        <input
          type="text"
          className="form-input"
          placeholder="Search by course name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Results */}
      <div className="data-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((c) => (
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
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default GetCoursesByName;

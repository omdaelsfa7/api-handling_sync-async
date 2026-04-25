import { useState, useEffect } from "react";
import type { Student } from "../type";
function GetStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch("https://69ec549397482ad5c528479d.mockapi.io/uni/Students")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        Student Directory
      </h2>
      <div className="data-grid">
        {students.map((s) => (
          <div key={s.id} className="card">
            <h3>{s.studentName}</h3>
            <p>
              <strong>Age:</strong> {s.age}
            </p>
            <p>
              <strong>Major:</strong> {s.Major}
            </p>

            {/* New Nested Courses Section */}
            <div className="course-list">
              <strong>Enrolled Courses:</strong>
              {s.EnrolledCourses && s.EnrolledCourses.length > 0 ? (
                <ul>
                  {s.EnrolledCourses.map((course) => (
                    <li key={course.id}>
                      {course.courseName} <small>({course.instructor})</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  No courses enrolled yet.
                </p>
              )}
            </div>

            <div className="card-id">ID: {s.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetStudents;

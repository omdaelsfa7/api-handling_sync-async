import { useState } from "react";
import type { Course } from "../type";

function AddCourse() {
  const [course, setCourse] = useState<Omit<Course, "id">>({
    courseName: "",
    instructor: "",
    maxStudents: 0,
  });

  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("https://69ec549397482ad5c528479d.mockapi.io/uni/Courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setMessage("Course created successfully!");
        setCourse({
          courseName: "",
          instructor: "",
          maxStudents: 0,
        });
      })
      .catch(() => setMessage("Failed to create course."));
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Add New Course</h2>

      {message && <p className="status-message">{message}</p>}

      <form onSubmit={handleSubmit} className="card form-container">
        {/* Course Name */}
        <div className="input-group">
          <label className="form-label">Course Name:</label>
          <input
            type="text"
            className="form-input"
            placeholder="Course Name"
            value={course.courseName}
            onChange={(e) =>
              setCourse({ ...course, courseName: e.target.value })
            }
            required
          />
        </div>

        {/* Instructor */}
        <div className="input-group">
          <label className="form-label">Instructor:</label>
          <input
            type="text"
            className="form-input"
            placeholder="Instructor"
            value={course.instructor}
            onChange={(e) =>
              setCourse({ ...course, instructor: e.target.value })
            }
            required
          />
        </div>

        {/* Max Students */}
        <div className="input-group">
          <label className="form-label">Max Students:</label>
          <input
            type="number"
            className="form-input"
            placeholder="Max Students"
            value={course.maxStudents || ""}
            onChange={(e) =>
              setCourse({
                ...course,
                maxStudents: parseInt(e.target.value) || 0,
              })
            }
            required
          />
        </div>

        <button type="submit" className="nav-btn active submit-btn">
          Create Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;

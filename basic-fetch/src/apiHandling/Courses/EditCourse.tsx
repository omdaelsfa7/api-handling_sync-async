import { useState } from "react";
import type { Course } from "../type";

function EditCourse() {
  const [id, setId] = useState("");
  const [course, setCourse] = useState<Course | null>(null);
  const [message, setMessage] = useState("");

  const loadCourse = () => {
    fetch(`https://69ec549397482ad5c528479d.mockapi.io/uni/Courses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setCourse(data);
        setMessage("");
      })
      .catch(() => {
        setCourse(null);
        setMessage("Course not found.");
      });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    fetch(
      `https://69ec549397482ad5c528479d.mockapi.io/uni/Courses/${course.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      },
    )
      .then((res) => res.json())
      .then(() => setMessage("Updated successfully!"))
      .catch(() => setMessage("Update failed."));
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Edit Course</h2>

      {/* Search Bar */}
      <div className="search-group">
        <input
          type="text"
          placeholder="Search ID to edit..."
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="form-input search-input"
        />
        <button className="nav-btn active" onClick={loadCourse}>
          Load
        </button>
      </div>

      {message && <p className="status-message">{message}</p>}

      {/* Edit Form */}
      {course && (
        <form onSubmit={handleUpdate} className="card form-container">
          <div className="input-group">
            <label className="form-label">Course Name:</label>
            <input
              type="text"
              className="form-input"
              value={course.courseName}
              onChange={(e) =>
                setCourse({ ...course, courseName: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <label className="form-label">Instructor:</label>
            <input
              type="text"
              className="form-input"
              value={course.instructor}
              onChange={(e) =>
                setCourse({ ...course, instructor: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <label className="form-label">Max Students:</label>
            <input
              type="number"
              className="form-input"
              value={course.maxStudents}
              onChange={(e) =>
                setCourse({
                  ...course,
                  maxStudents: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          <button type="submit" className="nav-btn active submit-btn">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

export default EditCourse;

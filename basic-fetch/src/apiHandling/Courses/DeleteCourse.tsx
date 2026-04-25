import { useState } from "react";

function DeleteCourse() {
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`https://69ec549397482ad5c528479d.mockapi.io/uni/Courses/${courseId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setMessage("Course deleted successfully!");
        setCourseId("");
      })
      .catch(() => setMessage("Failed to delete course."));
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Delete Course</h2>

      {message && <p className="status-message">{message}</p>}

      <form onSubmit={handleDelete} className="card form-container">
        <div className="input-group">
          <label className="form-label">Course ID:</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="nav-btn active submit-btn" style={{ backgroundColor: "#ef4444" }}>
          Delete Course
        </button>
      </form>
    </div>
  );
}

export default DeleteCourse;
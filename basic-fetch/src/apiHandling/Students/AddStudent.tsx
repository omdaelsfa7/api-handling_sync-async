import { useState } from "react";
import type { Student } from "../type";

function AddStudents() {
  const [student, setStudent] = useState<Omit<Student, "id">>({
    studentName: "",
    age: 0,
    Major: "",
    EnrolledCourses: [],
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("https://69ec549397482ad5c528479d.mockapi.io/uni/Students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setMessage("Student created successfully!");
        setStudent({ studentName: "", age: 0, Major: "", EnrolledCourses: [] });
      })
      .catch(() => setMessage("Failed to create student."));
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Add New Student</h2>

      {message && <p className="status-message">{message}</p>}

      <form onSubmit={handleSubmit} className="card form-container">
        <div className="input-group">
          <label htmlFor="newName" className="form-label">
            Name:
          </label>
          <input
            id="newName"
            type="text"
            className="form-input"
            placeholder="Full Name"
            value={student.studentName}
            onChange={(e) =>
              setStudent({ ...student, studentName: e.target.value })
            }
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="newAge" className="form-label">
            Age:
          </label>
          <input
            id="newAge"
            type="number"
            className="form-input"
            placeholder="Age"
            value={student.age || ""}
            onChange={(e) =>
              setStudent({ ...student, age: parseInt(e.target.value) || 0 })
            }
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="newMajor" className="form-label">
            Major:
          </label>
          <input
            id="newMajor"
            type="text"
            className="form-input"
            placeholder="Major"
            value={student.Major}
            onChange={(e) => setStudent({ ...student, Major: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="nav-btn active submit-btn">
          Create Student
        </button>
      </form>
    </div>
  );
}

export default AddStudents;

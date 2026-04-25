import { useState } from "react";
import type { Student } from "./type";

function EditStudent() {
  const [id, setId] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [message, setMessage] = useState("");

  const loadStudent = () => {
    fetch(`https://69ec549397482ad5c528479d.mockapi.io/uni/Students/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setStudent(data);
        setMessage("");
      })
      .catch(() => {
        setStudent(null);
        setMessage("Student not found.");
      });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    fetch(
      `https://69ec549397482ad5c528479d.mockapi.io/uni/Students/${student.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      },
    )
      .then((res) => res.json())
      .then(() => setMessage("Updated successfully!"))
      .catch(() => setMessage("Update failed."));
  };


  
  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Edit Student</h2>

      <div className="search-group">
        <input
          type="text"
          placeholder="Search ID to edit..."
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="form-input search-input"
        />
        <button className="nav-btn active" onClick={loadStudent}>
          Load
        </button>
      </div>

      {message && <p className="status-message">{message}</p>}

      {student && (
        <form onSubmit={handleUpdate} className="card form-container">
          <div className="input-group">
            <label htmlFor="studentName" className="form-label">
              Name:
            </label>
            <input
              id="studentName"
              type="text"
              className="form-input"
              placeholder="Student Full Name"
              value={student.studentName}
              onChange={(e) =>
                setStudent({ ...student, studentName: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              id="age"
              type="number"
              className="form-input"
              placeholder="Student Age"
              value={student.age}
              onChange={(e) =>
                setStudent({ ...student, age: parseInt(e.target.value) || 0 })
              }
            />
          </div>

          <div className="input-group">
            <label htmlFor="major" className="form-label">
              Major:
            </label>
            <input
              id="major"
              type="text"
              className="form-input"
              placeholder="Degree Program"
              value={student.Major}
              onChange={(e) =>
                setStudent({ ...student, Major: e.target.value })
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

export default EditStudent;

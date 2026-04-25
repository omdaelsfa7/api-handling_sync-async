import { useState } from "react";

function DeleteStudent() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    fetch(`https://69ec549397482ad5c528479d.mockapi.io/uni/Students/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setMessage(`Student with ID ${id} deleted successfully.`);
        setId("");
      })
      .catch(() => setMessage("Failed to delete student. Check the ID."));
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Remove Student</h2>
      
      {message && <p className="status-message">{message}</p>}

      <form onSubmit={handleDelete} className="card form-container">
        <div className="input-group">
          <label htmlFor="deleteId" className="form-label">
            Student ID to Delete:
          </label>
          <input
            id="deleteId"
            type="text"
            className="form-input"
            placeholder="Enter ID..."
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="nav-btn active" 
          style={{ width: "100%", backgroundColor: "#e53e3e", borderColor: "#e53e3e" }}
        >
          Delete Permanently
        </button>
      </form>
    </div>
  );
}

export default DeleteStudent;
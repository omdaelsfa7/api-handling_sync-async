import { useState, useEffect } from "react";

interface Student {
  id: string;
  studentName: string;
  age: number;
  Major: string;
}

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
            <div className="card-id">ID: {s.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetStudents;

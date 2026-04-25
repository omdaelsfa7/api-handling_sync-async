import GetStudents from "./apiHandling/Students/GetStudents";
import GetStudentsById from "./apiHandling/Students/GetStudentsById";
import EditStudent from "./apiHandling/Students/EditStudent";
import AddStudent from "./apiHandling/Students/AddStudent";
import DeleteStudent from "./apiHandling/Students/DeleteStudents";

function App() {
  return (
    <div className="container">
      <header style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1>University Management System</h1>
      </header>

      <section className="section-wrapper">
        <div className="section-divider">
          <span className="section-label">Database</span>
          <div className="section-line"></div>
        </div>
        <GetStudents />
      </section>

      <section className="section-wrapper">
        <div className="section-divider">
          <span className="section-label">Search</span>
          <div className="section-line"></div>
        </div>
        <GetStudentsById />
      </section>

      <section className="section-wrapper">
        <div className="section-divider">
          <span className="section-label">Registration</span>
          <div className="section-line"></div>
        </div>
        <AddStudent />
      </section>

      <section className="section-wrapper">
        <div className="section-divider">
          <span className="section-label">Modification</span>
          <div className="section-line"></div>
        </div>
        <EditStudent />
      </section>

      <section className="section-wrapper">
        <div className="section-divider">
          <span className="section-label" style={{ backgroundColor: "#ef4444" }}>Danger Zone</span>
          <div className="section-line"></div>
        </div>
        <DeleteStudent />
      </section>
    </div>
  );
}

export default App;
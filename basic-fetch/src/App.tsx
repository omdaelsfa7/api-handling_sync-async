import { useState } from "react";

import GetStudents from "./apiHandling/Students/GetStudents";
import GetStudentsById from "./apiHandling/Students/GetStudentsById";
import EditStudent from "./apiHandling/Students/EditStudent";
import AddStudent from "./apiHandling/Students/AddStudent";
import DeleteStudent from "./apiHandling/Students/DeleteStudents";

import AddCourse from "./apiHandling/Courses/AddCourse";
import DeleteCourse from "./apiHandling/Courses/DeleteCourse";
import EditCourse from "./apiHandling/Courses/EditCourse";
import GetCourses from "./apiHandling/Courses/GetCourses";
import GetCoursesByName from "./apiHandling/Courses/GetSCourseName";

function App() {
  const [tab, setTab] = useState<"students" | "courses">("students");

  return (
    <div className="container">
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>University Management System</h1>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            onClick={() => setTab("students")}
            className={tab === "students" ? "nav-btn active" : "nav-btn"}
          >
            Students
          </button>

          <button
            onClick={() => setTab("courses")}
            className={tab === "courses" ? "nav-btn active" : "nav-btn"}
          >
            Courses
          </button>
        </div>
      </header>

      {/* ================= STUDENTS ================= */}
      {tab === "students" && (
        <>
          <section className="section-wrapper">
            <GetStudents />
          </section>

          <section className="section-wrapper">
            <GetStudentsById />
          </section>

          <section className="section-wrapper">
            <AddStudent />
          </section>

          <section className="section-wrapper">
            <EditStudent />
          </section>

          <section className="section-wrapper">
            <DeleteStudent />
          </section>
        </>
      )}

      {/* ================= COURSES ================= */}
      {tab === "courses" && (
        <>
          <section className="section-wrapper">
            <GetCourses />
          </section>

          <section className="section-wrapper">
            <GetCoursesByName />
          </section>

          <section className="section-wrapper">
            <AddCourse />
          </section>

          <section className="section-wrapper">
            <EditCourse />
          </section>

          <section className="section-wrapper">
            <DeleteCourse />
          </section>
        </>
      )}
    </div>
  );
}

export default App;

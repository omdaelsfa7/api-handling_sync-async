import { useEffect, useState } from "react";

function GetStatus() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://simple-books-api.click/status")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data arrived:", data.status);
        setStatus(data.status);
      })

      .catch((err) => {
        console.log("Error caught:", err);
        setStatus("Error");
      });
  }, []);

  return (
    <div style={{ padding: "20px", color: "white", border: "2px solid red" }}>
      {/* 4. Display the status on the screen */}
      <h3>API Status: {status ?? "Loading..."}</h3>
    </div>
  );
}

export default GetStatus;

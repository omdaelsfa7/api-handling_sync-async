"use client";

import { useState } from "react";

type TimelineEvent = {
  time: string;
  elapsed_seconds: number;
  message: string;
};

type DemoResponse = {
  mode: string;
  explanation: string;
  total_time_seconds: number;
  timeline: TimelineEvent[];
};

const API_BASE_URL = "http://localhost:8000";

export default function Home() {
  const [result, setResult] = useState<DemoResponse | null>(null);
  const [loading, setLoading] = useState<"sync" | "async" | null>(null);
  const [error, setError] = useState("");

  async function callDemo(type: "sync" | "async") {
    try {
      setError("");
      setResult(null);
      setLoading(type);

      const endpoint = type === "sync" ? "/sync-demo" : "/async-demo";

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to call the API");
      }

      const data: DemoResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Restaurant Sync vs Async Demo</h1>

        <p style={styles.paragraph}>
          This example shows two users ordering food. In the sync endpoint,
          User 2 waits until User 1 finishes everything. In the async endpoint,
          users can order and leave while delivery continues without blocking
          the next user.
        </p>

        <div style={styles.buttons}>
          <button
            style={{ ...styles.button, background: "#7c2d12" }}
            onClick={() => callDemo("sync")}
            disabled={loading !== null}
          >
            {loading === "sync" ? "Running Sync..." : "Call Sync Endpoint"}
          </button>

          <button
            style={{ ...styles.button, background: "#166534" }}
            onClick={() => callDemo("async")}
            disabled={loading !== null}
          >
            {loading === "async" ? "Running Async..." : "Call Async Endpoint"}
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <section style={styles.resultBox}>
            <h2 style={styles.subtitle}>
              Mode: {result.mode.toUpperCase()}
            </h2>

            <p style={styles.paragraph}>{result.explanation}</p>

            <p style={styles.time}>
              Total time: {result.total_time_seconds} seconds
            </p>

            <div style={styles.timeline}>
              {result.timeline.map((event, index) => (
                <div key={index} style={styles.event}>
                  <strong>
                    +{event.elapsed_seconds}s | {event.time}
                  </strong>
                  <p>{event.message}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    width: "100%",
    maxWidth: "850px",
    background: "white",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
  },
  title: {
    margin: 0,
    fontSize: "34px",
  },
  subtitle: {
    marginTop: 0,
  },
  paragraph: {
    fontSize: "17px",
    lineHeight: 1.6,
  },
  buttons: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    marginTop: "24px",
  },
  button: {
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "16px",
    fontWeight: 700,
  },
  error: {
    color: "#b91c1c",
    fontWeight: 700,
  },
  resultBox: {
    marginTop: "28px",
    padding: "22px",
    background: "#fffbeb",
    borderRadius: "14px",
    border: "1px solid #fed7aa",
  },
  time: {
    fontWeight: 700,
    fontSize: "18px",
  },
  timeline: {
    display: "grid",
    gap: "12px",
    marginTop: "18px",
  },
  event: {
    padding: "14px",
    borderRadius: "12px",
    background: "white",
    border: "1px solid #fde68a",
  },
};

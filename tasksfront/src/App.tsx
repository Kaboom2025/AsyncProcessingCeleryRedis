// App.tsx

import React, { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num1: parseFloat(num1),
          num2: parseFloat(num2),
        }),
      });
      const data = await response.json();
      setTaskId(data.task_id);
      setStatus("Pending");
      setResult(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkStatus = async () => {
    if (!taskId) return;
    try {
      const response = await fetch(`http://127.0.0.1:5000/status/${taskId}`);
      const data = await response.json();
      setStatus(data.status);
      if (data.status === "SUCCESS") {
        setResult(data.result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getResult = async () => {
    if (!taskId) return;
    try {
      const response = await fetch(`http://127.0.0.1:5000/result/${taskId}`);
      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
        setStatus("SUCCESS");
      } else {
        setStatus(data.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Add Two Numbers (Async)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter first number"
          required
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter second number"
          required
        />
        <button type="submit">Add</button>
      </form>
      {taskId && (
        <div>
          <p>Task ID: {taskId}</p>
          <button onClick={checkStatus}>Check Status</button>
          <button onClick={getResult}>Get Result</button>
          {status && <p>Status: {status}</p>}
          {result !== null && <p>Result: {result}</p>}
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";

function Home() {
  // Example announcements
  const announcements = [
    { id: 1, title: "Water Supply Update", content: "Water will be off on Monday from 9am to 5pm." },
    { id: 2, title: "Community Meeting", content: "Meeting at Kebele hall on Friday at 3pm." },
  ];

  // Resident statistics
  const stats = {
    male: 120,
    female: 130,
    children: 50,
    teenagers: 40,
    adults: 130,
    aged: 30,
    total: 250,
  };

  // Comment form state
  const [comment, setComment] = useState("");
  const [submittedComments, setSubmittedComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    setSubmittedComments([...submittedComments, comment]);
    setComment("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ደፈርጌ ኪቢቃሎ ቀበሌ</h1>

      {/* Announcements Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Announcements</h2>
        {announcements.map((a) => (
          <div key={a.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{a.title}</h3>
            <p style={styles.cardContent}>{a.content}</p>
          </div>
        ))}
      </section>

      {/* Residents Statistics */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Resident Statistics</h2>
        <div style={styles.statsContainer}>
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} style={styles.statCard}>
              <h3 style={styles.statNumber}>{value}</h3>
              <p style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* General Office Comment Form */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>General Office Feedback</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            placeholder="Write your comment here..."
            style={styles.textarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" style={styles.button}>Submit</button>
        </form>
        <div style={styles.commentList}>
          {submittedComments.map((c, idx) => (
            <p key={idx} style={styles.comment}>💬 {c}</p>
          ))}
        </div>
      </section>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "50px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "2.2rem",
    marginBottom: "40px",
    color: "#007bff",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    borderBottom: "2px solid #007bff",
    display: "inline-block",
    paddingBottom: "5px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#333",
  },
  cardContent: {
    fontSize: "1rem",
    color: "#555",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "15px",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  statNumber: {
    fontSize: "1.5rem",
    color: "#007bff",
    marginBottom: "5px",
  },
  statLabel: {
    fontSize: "1rem",
    color: "#555",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    alignSelf: "flex-start",
  },
  commentList: {
    marginTop: "10px",
  },
  comment: {
    backgroundColor: "#f0f2f5",
    padding: "6px 10px",
    borderRadius: "6px",
    marginTop: "4px",
    fontSize: "0.9rem",
  },
};

export default Home;

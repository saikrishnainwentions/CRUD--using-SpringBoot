import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/users");
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`http://localhost:8080/api/users/${form.id}`, form);
    } else {
      await axios.post("http://localhost:8080/api/users", form);
    }
    setForm({ id: "", name: "", email: "" });
    fetchUsers();
  };

  const handleEdit = (user) => setForm(user);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User CRUD App</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={{...styles.btn, backgroundColor: "#4caf50"}}>{form.id ? "Update" : "Add"}</button>
      </form>

      <h2 style={{color: "white"}}>Users</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button style={{...styles.btn, backgroundColor: "#ff9800"}} onClick={() => handleEdit(u)}>Edit</button>
                <button style={{...styles.btn, backgroundColor: "#f44336"}} onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
  },
  title: { fontSize: "2.5rem", marginBottom: "20px" },
  form: { display: "flex", gap: "10px", marginBottom: "30px" },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    outline: "none"
  },
  btn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    marginLeft: "5px"
  },
  table: {
    borderCollapse: "collapse",
    width: "80%",
    maxWidth: "800px",
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  tableRow: { textAlign: "center" }
};

export default App;

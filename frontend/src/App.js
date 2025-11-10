import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [trips, setTrips] = useState([]);
  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    destinations: "",
    notes: "",
    userId: "demo-user"
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Fetch all trips for a user on load
    axios.get("http://localhost:5000/api/trips/demo-user")
      .then(res => setTrips(res.data))
      .catch(err => setErrorMsg("Failed to fetch trips"));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await axios.post("http://localhost:5000/api/trips", {
        ...form,
        destinations: form.destinations 
          ? form.destinations.split(",").map(d => d.trim()).filter(d => d !== "")
          : []
      });
      // Refresh trip list
      const res = await axios.get("http://localhost:5000/api/trips/demo-user");
      setTrips(res.data);
      setForm({
        title: "",
        startDate: "",
        endDate: "",
        destinations: "",
        notes: "",
        userId: "demo-user"
      });
    } catch (err) {
      setErrorMsg("Failed to create trip. Check backend & MongoDB.");
      console.error(err);
    }
  };

  return (
    <div style={{ margin: 40, fontFamily: 'Arial,sans-serif' }}>
      <h2>Smart Trip Planner</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input name='title' placeholder='Trip Title' value={form.title} onChange={handleChange} required />
        <input name='startDate' type='date' value={form.startDate} onChange={handleChange} />
        <input name='endDate' type='date' value={form.endDate} onChange={handleChange} />
        <input name='destinations' placeholder='Destinations (comma separated)' value={form.destinations} onChange={handleChange} />
        <textarea name='notes' placeholder='Notes' value={form.notes} onChange={handleChange}></textarea>
        <button type='submit'>Create Trip</button>
      </form>

      { errorMsg && <div style={{color:'red'}}>{errorMsg}</div> }

      <h3>Your Trips</h3>
      <ul>
        {trips.map(trip => (
          <li key={trip._id}>
            <strong>{trip.title}</strong>: {trip.startDate?.slice(0,10)} to {trip.endDate?.slice(0,10)}<br/>
            <em>Destinations:</em> {trip.destinations?.join(", ") || "None"}<br/>
            <em>Notes:</em> {trip.notes || "None"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

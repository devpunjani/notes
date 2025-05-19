import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = () => {
    navigate('/add');
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      alert('Note deleted successfully');
      fetchNotes();

    } catch (err) {
      alert('Error deleting note: ' + err.message);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="main-title">Notes</h1>
        <button className="add-btn" onClick={handleAddNote}>Add Note</button>
      </header>

      {loading && <p>Loading notes...</p>}
      {error && <p className="error">{error}</p>}

      <div className="notes-grid">
        {notes.length === 0 && !loading && <p>No notes found.</p>}
        {notes.map((note) => (
          <div key={note._id} className="note-card">
            <h2 className="note-title">{note.title}</h2>
            <p className="note-date">{note.date}</p>
            <p className="note-description">{note.description}</p>
            <div className="note-actions">
              <button className="edit-btn" onClick={() => handleEdit(note._id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
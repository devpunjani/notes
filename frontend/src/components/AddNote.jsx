import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddNote.css';

const AddNote = ({ onSave }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    if (!title.trim() || !description.trim()) {
      alert('Please fill in both Title and Description.');
      return;
    }

    const newNote = {
      title,
      description,
      date: new Date().toLocaleDateString(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      const data = await response.json();

      if (!response.ok) {
        
        throw new Error(data.message || 'Failed to add note');
      }

      setSuccess('Note added successfully!');
      setTitle('');
      setDescription('');

      if (onSave) onSave(data.note);

      navigate('/');

    } catch (err) {
      console.error('Error adding note:', err);
      setError(err.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-note-container">
      <h2 className="form-title">Add New Note</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="form-group">
        <label htmlFor="title" className="label">Title</label>
        <input
          id="title"
          className="input"
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="label">Description</label>
        <textarea
          id="description"
          className="textarea"
          placeholder="Enter note description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AddNote;
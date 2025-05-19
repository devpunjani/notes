import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddNote.css';

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:5000/api/notes/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch note');
        }

        setTitle(data.title);
        setDescription(data.description);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !description.trim()) {
      alert('Please fill in both Title and Description.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update note');
      }

      setSuccess('Note updated successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="add-note-container">
      <h2 className="form-title">Edit Note</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleUpdate}>
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
          <button type="submit" className="save-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
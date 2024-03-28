import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommunityForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/community', formData);
      alert('Community created successfully!');
      setFormData({ name: '', tagline: '', description: '' });
    } catch (error) {
      console.error('Error creating community:', error);
      alert('Failed to create community. Check console for details.');
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="btn btn-secondary" onClick={() => navigate('/adminPage')}>Back</button>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="tagline" className="form-label">Tagline</label>
        <input type="text" className="form-control" id="tagline" name="tagline" value={formData.tagline} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required rows="3"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Create Community</button>
    </form>
  );
};

export default CommunityForm;

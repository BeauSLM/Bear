import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateThread = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    section_id: '',
    title: '',
    content: '',
    user_id: user ? user.id : null,
  });

  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:3001/community_section');
        setSections(response.data);
      } catch (error) {
        console.error('Failed to fetch sections', error);
      }
    };

    fetchSections();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      alert('You must be logged in to create a thread.');
      return;
    }
    try {
      const completeFormData = { ...formData, user_id: user.id };
      await axios.post('http://localhost:3001/thread', completeFormData);
      alert('Thread created successfully!');
      setFormData({ section_id: '', title: '', content: '', user_id: user.id });
    } catch (error) {
      console.error('Error creating thread:', error);
      alert('Failed to create thread. Check console for details.');
    }
    navigate('/');
  };

  if (!user) {
    return <div>Please log in to create a thread.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className="btn btn-secondary" onClick={() => navigate('/adminPage')}>Back</button>
      <div className="mb-3">
        <label htmlFor="section_id" className="form-label">Section</label>
        <select
          className="form-select"
          id="section_id"
          name="section_id"
          value={formData.section_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a section</option>
          {sections.map((section) => (
            <option key={section.section_id} value={section.section_id}>
              {section.section_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea className="form-control" id="content" name="content" value={formData.content} onChange={handleChange} required rows="3"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Create Thread</button>
    </form>
  );
};

export default CreateThread;

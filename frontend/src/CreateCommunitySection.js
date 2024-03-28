import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCommunitySection = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    community_id: '',
    section_name: '',
    description: '',
  });

  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/community');
        setCommunities(response.data);
      } catch (error) {
        console.error('Failed to fetch communities', error);
      }
    };

    fetchCommunities();
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
    try {
      await axios.post('http://localhost:3001/community_section', formData);
      alert('Community section created successfully!');
      setFormData({ community_id: '', section_name: '', description: '' });
    } catch (error) {
      console.error('Error creating community section:', error);
      alert('Failed to create community section. Check console for details.');
    }
    navigate('/');
  };

  return (

    <form onSubmit={handleSubmit}>
      <button className="btn btn-secondary" onClick={() => navigate('/adminPage')}>Back</button>
      <div className="mb-3">
        <label htmlFor="community_id" className="form-label">Community</label>
        <select
          className="form-select"
          id="community_id"
          name="community_id"
          value={formData.community_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a community</option>
          {communities.map((community) => (
            <option key={community.id} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="section_name" className="form-label">Section Name</label>
        <input type="text" className="form-control" id="section_name" name="section_name" value={formData.section_name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required rows="3"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Create Community Section</button>
    </form>
  );
};

export default CreateCommunitySection;

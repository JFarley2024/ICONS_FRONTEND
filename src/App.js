import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';


const App = () => {
  const [startDate, setStartDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [conservator, setConservator] = useState('');
  const [treatment, setTreatment] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [objectDescription, setObjectDescription] = useState('');
  const [hazards, setHazards] = useState('');
  const [conditionRating, setConditionRating] = useState('');
  const [conditionDescription, setConditionDescription] = useState('');
  const [conservationRequired, setConservationRequired] = useState('');

  const conservators = ["John Doe", "Jane Smith", "Bob Johnson"];
  const conservationTreatments = ["Cleaning", "Restoration", "Preservation"];
  const objectDescriptions = ["Painting", "Sculpture", "Textile", "Ceramic", "Metal", "Wood"];
  const hazardsList = [
    { value: "none", label: "None" },
    { value: "fragile", label: "Fragile" },
    { value: "heavy", label: "Heavy" },
    { value: "sharp", label: "Sharp" },
    { value: "toxic", label: "Toxic" },
  ]; 

  
  const handleDimensionChange = (value, setter) => {
    // Only allow numbers and decimal points
    const numericValue = value.replace(/[^\d.]/g, '');
    
    // Prevent multiple decimal points
    if ((numericValue.match(/\./g) || []).length <= 1) {
      setter(numericValue);
    }
  }; 
  
  const conditionDescriptions = ["Stable", "Minor wear", "Major damage", "Actively deteriorating"];

  // Mock data for progress bars
  const progressData = {
    "Assessment Conservation": { started: 30, inProgress: 50, completed: 20 },
    "Pre-Digitization Conservation": { started: 20, inProgress: 30, completed: 50 },
    "Post Digitization Conservation": { started: 60, inProgress: 30, completed: 10 },
  };

  const ProgressBar = ({ data }) => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    return (
      <div className="progress-bar">
        {Object.entries(data).map(([status, percentage]) => (
          <div
            key={status}
            className={`progress-segment ${status.toLowerCase().replace(' ', '-')}`}
            style={{ width: `${(percentage / total) * 100}%` }}
            title={`${status}: ${percentage}%`}
          />
        ))}
      </div>
    );
  };

  const totalCompletion = Object.values(progressData).reduce((sum, stage) => 
    sum + stage.completed, 0) / Object.keys(progressData).length;

  return (
    <div className="app-container">
      {/* Stages of Conservation */}
      <div className="sidebar">
        <div className="sidebar-content">
          <h2 className="sidebar-title">Stages of Digitisation</h2>
          <ul className="sidebar-list">
            <li className="sidebar-item">Object Details</li>
            <li className="sidebar-item">
              Assessment Conservation
              <ProgressBar data={progressData["Assessment Conservation"]} />
            </li>
            <li className="sidebar-item">
              Pre-Digitization Conservation
              <ProgressBar data={progressData["Pre-Digitization Conservation"]} />
            </li>
            <li className="sidebar-item">
              Post Digitization Conservation
              <ProgressBar data={progressData["Post Digitization Conservation"]} />
            </li>
          </ul>
          <div className="completion-bar-container">
            <div className="completion-bar" style={{ width: `${totalCompletion}%` }} />
            <span className="completion-text">{`${totalCompletion.toFixed(1)}% Complete`}</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-content">
            <div className="navbar-left">
              <button className="navbar-button">Home</button>
              <button className="navbar-button">Collections</button>
            </div>
            <div className="navbar-right">
              <input type="text" placeholder="Search..." className="navbar-search" />
              <button className="navbar-button">Search</button>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="form-container">
          <form className="conservation-form">
            <h2 className="form-title">Conservation Form</h2>
            
            <div className="form-field">
              <label htmlFor="objectName">Name of Object</label>
              <input
                id="objectName"
                type="text"
                placeholder="Enter object name"
                className="form-input"
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="conservator">Name of Conservator</label>
              <select
                id="conservator"
                value={conservator}
                onChange={(e) => setConservator(e.target.value)}
                className="form-select"
              >
                <option value="">Select a conservator</option>
                {conservators.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-field">
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="completionDate">Completion Date</label>
              <input
                id="completionDate"
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="form-field">
              <label>Dimensions (cm)</label>
              <div className="dimensions-container">
                <div className="dimension-input-wrapper">
                  <input
                    type="text"
                    placeholder="Length"
                    value={length}
                    onChange={(e) => handleDimensionChange(e.target.value, setLength)}
                    className="form-input dimension-input"
                    inputMode="decimal"
                    aria-label="Length in centimeters"
                  />
                  <span className="dimension-unit">cm</span>
                </div>
                <div className="dimension-input-wrapper">
                  <input
                    type="text"
                    placeholder="Width"
                    value={width}
                    onChange={(e) => handleDimensionChange(e.target.value, setWidth)}
                    className="form-input dimension-input"
                    inputMode="decimal"
                    aria-label="Width in centimeters"
                  />
                  <span className="dimension-unit">cm</span>
                </div>
                <div className="dimension-input-wrapper">
                  <input
                    type="text"
                    placeholder="Depth"
                    value={depth}
                    onChange={(e) => handleDimensionChange(e.target.value, setDepth)}
                    className="form-input dimension-input"
                    inputMode="decimal"
                    aria-label="Depth in centimeters"
                  />
                  <span className="dimension-unit">cm</span>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="objectDescription">Object Description</label>
              <select
                id="objectDescription"
                value={objectDescription}
                onChange={(e) => setObjectDescription(e.target.value)}
                className="form-select"
              >
                <option value="">Select a description</option>
                {objectDescriptions.map((desc, index) => (
                  <option key={index} value={desc}>{desc}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="hazards">Hazards</label>
              <Select
                id="hazards"
                isMulti
                value={hazards}
                onChange={(options) => setHazards(options)}
                options={hazardsList}
                className="form-select"
                classNamePrefix="select"
              />
            </div>

            <div className="form-field">
              <label htmlFor="conditionRating">Condition Rating</label>
              <select
                id="conditionRating"
                value={conditionRating}
                onChange={(e) => setConditionRating(e.target.value)}
                className="form-select"
              >
                <option value="">Select a rating</option>
                <option value="1">1 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Poor</option>
                <option value="4">4 - Unacceptable</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="conditionDescription">Condition Description</label>
              <select
                id="conditionDescription"
                value={conditionDescription}
                onChange={(e) => setConditionDescription(e.target.value)}
                className="form-select"
              >
                <option value="">Select a description</option>
                {conditionDescriptions.map((desc, index) => (
                  <option key={index} value={desc}>{desc}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="conservationRequired">Conservation for digitisation required</label>
              <select
                id="conservationRequired"
                value={conservationRequired}
                onChange={(e) => setConservationRequired(e.target.value)}
                className="form-select"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            
            <div className="form-field">
              <label htmlFor="treatment">Conservation Treatment</label>
              <select
                id="treatment"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="form-select"
              >
                <option value="">Select a treatment</option>
                {conservationTreatments.map((t, index) => (
                  <option key={index} value={t}>{t}</option>
                ))}
              </select>
            </div>
            
            <div className="form-actions">
              <button className="submit-button" type="button">
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};


export default App;
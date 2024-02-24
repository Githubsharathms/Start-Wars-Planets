import React from 'react';
import '../Assets/CSS/ResidentsModal.css';

const ResidentsModal = ({ residents, loading, onClose }) => {
  return (
    <div className="residents-modal-overlay">
      <div className="residents-modal">
        <button className="residents-modal-close" onClick={onClose}>×</button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="residents-container">
            {residents.length === 0 ? (
              <p>No data</p>
            ) : (
              residents.map((resident, index) => (
                <div key={index} className="resident-card">
                  <div className="resident-details">
                    <p><strong>Name:</strong> {resident.name}</p>
                    <p><strong>Height:</strong> {resident.height}</p>
                    <p><strong>Mass:</strong> {resident.mass}</p>
                    <p><strong>Gender:</strong> {resident.gender}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResidentsModal;

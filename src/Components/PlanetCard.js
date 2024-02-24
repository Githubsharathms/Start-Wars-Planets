import React, { useState, useEffect } from 'react';
import { fetchResidentDetails, fetchPlanets } from '../Components/api/SwapiService';
import ResidentsModal from './ResidentsModal';
import '../Assets/CSS/PlanetCard.css';

const PlanetCard = ({ planet }) => {
  const [showResidentsModal, setShowResidentsModal] = useState(false);
  const [residents, setResidents] = useState([]);
  const [loadingResidents, setLoadingResidents] = useState(false);
  const [additionalPlanetDetails, setAdditionalPlanetDetails] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (showResidentsModal && residents.length === 0) {
      setLoadingResidents(true);
      Promise.all(planet.residents.map(url => fetchResidentDetails(url)))
        .then(data => {
          setResidents(data);
          setLoadingResidents(false);
        })
        .catch(error => {
          console.error("Couldn't fetch residents:", error);
          setLoadingResidents(false);
        });
    }
  }, [planet.residents, showResidentsModal]);

  const handleLoadMoreClick = async () => {
    if (!isExpanded) {
      try {
        const data = await fetchPlanets();
        const additionalDetails = data.results.find(p => p.name === planet.name);
        setAdditionalPlanetDetails(additionalDetails);
        setIsExpanded(true);
      } catch (error) {
        console.error("Could not fetch additional planet details: ", error);
      }
    }
  };

  const toggleDetails = async () => {
    if (!isExpanded) {
      try {
        setLoadingResidents(true);
        const data = await fetchPlanets();
        const additionalDetails = data.results.find(p => p.name === planet.name);
        setAdditionalPlanetDetails(additionalDetails);
        setIsExpanded(true);
        setLoadingResidents(false);
      } catch (error) {
        console.error("Could not fetch additional planet details: ", error);
        setLoadingResidents(false);
      }
    } else {
      setIsExpanded(false);
      setAdditionalPlanetDetails(null);
    }
  };
  return (
    <div className="planet-card">
      <h3>{planet.name}</h3>
      <p>Climate: {planet.climate}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Population: {planet.population}</p>

      <button className={`load-more-btn ${isExpanded ? 'close-btn' : ''}`} onClick={toggleDetails}>
        {isExpanded ? 'Close' : 'Load More'}
      </button>


      {isExpanded && additionalPlanetDetails && (
        <div className="additional-details">
          <p>Diameter: {additionalPlanetDetails.diameter}</p>
          <p>Gravity: {additionalPlanetDetails.gravity}</p>
          <p>Surface Water: {additionalPlanetDetails.surface_water}</p>
          <p>Rotation Period: {additionalPlanetDetails.rotation_period}</p>
          <p>Orbital Period: {additionalPlanetDetails.orbital_period}</p>
        </div>
      )}
      <button className="show-residents-btn" onClick={() => setShowResidentsModal(true)}>
        Show Residents
      </button>

      {showResidentsModal && (
        <ResidentsModal
          residents={residents}
          loading={loadingResidents}
          onClose={() => setShowResidentsModal(false)}
        />
      )}
    </div>
  );
};

export default PlanetCard;

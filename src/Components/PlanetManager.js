import React, { useState } from 'react';
import PlanetsList from './PlanetsList';
import Modal from './ModalComponents';

const PlanetManager = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handlePlanetSelect = (planet) => {
    setSelectedPlanet(planet);
  };

  return (
    <div>
      <PlanetsList onSelectPlanet={handlePlanetSelect} />
      {selectedPlanet && (
        <Modal selectedPlanet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
      )}
    </div>
  );
};

export default PlanetManager;

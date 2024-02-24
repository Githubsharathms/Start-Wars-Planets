import React, { useState, useEffect } from 'react';
import PlanetCard from '../Components/PlanetCard';
import Pagination from './Pagination';
import LoadingAnimation from './LoadingAnimation';
import { fetchPlanets } from '../Components/api/SwapiService';

const PlanetsList = () => {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const loadingStarted = Date.now();

      try {
        const response = await fetchPlanets(currentPage, itemsPerPage);
        console.log(response);

        if (response.results) {
          setPlanets(response.results);

          const totalItems = Number.isInteger(response.count) ? response.count : 100;
          let calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);

          calculatedTotalPages = Math.min(calculatedTotalPages, 6);

          setTotalPages(calculatedTotalPages);
        } else {
          setPlanets([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error('Failed to fetch planets:', error);
        setPlanets([]);
        setTotalPages(0);
      } finally {
        const loadingEnded = Date.now();
        const loadingTime = loadingEnded - loadingStarted;

        if (loadingTime < 500) {
          setTimeout(() => {
            setIsLoading(false); // Stop loading
          }, 5000 - loadingTime);
        } else {
          setIsLoading(false); // Stop loading
        }
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="planets-list">
          {planets.map((planet) => (
            <PlanetCard key={planet.name} planet={planet} />
          ))}
        </div>
      )}
      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default PlanetsList;

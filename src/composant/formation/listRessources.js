import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './listeressource.css';

const RessourceList = () => {
  const [Ressources, setRessources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchRessources = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Ressource/lister');
        setRessources(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des Ressources :', error);
      }
    };

    fetchRessources();
  }, []);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchQuery(searchTerm);

    try {
      if (searchTerm) {
        const response = await axios.get(`http://localhost:3000/Ressource/rechercherByTitre?titre=${searchTerm}`);
        setSearchResults(response.data.Ressources || []); // Correction ici
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des ressources :', error);
    }
  };
  
  const displayRessources = searchResults.length > 0 ? searchResults : Ressources;

  return (
    <div className="searchh-conttainer">
      <div className="searchh-box">
        <input 
          type="text" 
          placeholder="Rechercher par titre..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <FaSearch className="searchh-icon" />
      </div>
      <div className="row">
        {displayRessources.map((Ressource, index) => {
          const baseFilePath = 'http://localhost:3000/uploads/';
          const filePath = baseFilePath + Ressource.contenu;

          return (
            <div key={Ressource.id_r} className="cours-cardddd">
              <div className="cardddd" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', borderRadius: '10px', backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff' }}>
                <img 
                  src='https://www.diemar-jung-zapfe.de/wp-content/uploads/2020/11/17170_Blog_DJZ_600x460px_digital_Marketing_ok.jpg' 
                  alt="Image par défaut" 
                  className="cardddd-image"
                  style={{ width: '180px', height: '170px', borderRadius: '10px 10px 0 0' }}
                />
                <div className="cardddd-content">
                  <h2 className="cours-title" >{Ressource.titre}</h2>
                  <p className="cours-description">Description : {Ressource.description}</p>  

                  {Ressource.contenu && (
                    <div>
                      <Document file={filePath}>
                        <Page pageNumber={1} />
                      </Document> 
                    </div>
                  )}

                  <Link to={`/Ressource/getRessourceGById/${Ressource.id_r}`} className="cours-file-link" >Voir les détails</Link>
                </div>
              </div>
            </div> 
          );
        })}
      </div>
    </div> 
  );
};

export default RessourceList;

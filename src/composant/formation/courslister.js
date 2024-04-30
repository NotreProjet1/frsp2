import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import '../formation/courslister.css'; 
import { FaSearch } from 'react-icons/fa'; // Importation de l'icône de recherche depuis react-icons

const CoursGList = () => {
  const [Courss, setCourss] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false); // State to manage whether no results were found

  useEffect(() => {
    const fetchCourss = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/coursgratuis/lister`);
        setCourss(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des Courss :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourss();
  }, []);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchQuery(searchTerm);

    try {
      if (searchTerm) {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/coursgratuis/rechercherByTitre?titre=${searchTerm}`);
        console.log('Réponse de la recherche :', response.data); 
        setSearchResults(response.data.liste || []);

        // Set the state based on whether results are found or not
        setNoResults(response.data.liste.length === 0);
      } else {
        setSearchResults([]);
        setNoResults(false); // Reset the state when the search is empty
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
    } finally {
      setLoading(false);
    }
  };

  const displayCourss = searchResults.length > 0 ? searchResults : Courss;
  // Styles for the search box
  const searchBoxStyles = {
    position: 'relative',
    width: '150px',
    marginTop: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '1px solid #007bff',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyles = {
    flex: '1',
    padding: '8px',
    border: 'none',
    outline: 'none',
    width: '100%',
  };

  const iconStyles = {
    marginRight: '8px',
    color: '#007bff',
    cursor: 'pointer',
  };
  return (
    <div className='cours-list'>
      <h1 className="Ccustom-title"  > Notre Cours Gratuits </h1>
      <div className="search-container">
      <div className="search-box">
        <input 
        className='recherche'
        style={{color:"black"}}
          type="text" 
          placeholder="Rechercher par titre..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <FaSearch className="search-icon" /> {/* Icône de recherche */}
      </div>
<span className="search-icon">
  <i className="fa fa-search"></i>
</span>
      {loading && <div>Loading...</div>}
      <ul>
        {displayCourss.map((Cours) => {
          const baseFilePath = 'http://localhost:3000/uploads/';
          const filePath = baseFilePath + Cours.contenu;

          if (searchQuery && !Cours.titre.toLowerCase().includes(searchQuery)) {
            return null;
          }

          return (
            <li key={Cours.id_cg} className="cours-card">
              <h2 className="cours-tittle">{Cours.titre}</h2>
              <p className="cours-description">Description : {Cours.description}</p>
              {Cours.contenu && (
                <div>
                  <Document file={filePath}>
                    <Page pageNumber={1} />
                  </Document>
                  <a href={filePath} download={Cours.contenu.split('').pop()} className="cours-file-link" target="_blank">
                    Télécharger le fichier
                  </a>
                </div>
              )}
              <Link to={`/coursgratuis/getCoursById/${Cours.id_cg}`} className="cours-details-link">Voir les détails</Link>
            </li> 
          );
        })}
      </ul>
      {/* Display the GIF image only when no result is found */}
      {noResults && !loading && (
        <div>
          <img src='https://media.tenor.com/VZ3hn4SEFRwAAAAi/mochi-cat-chibi-cat.gif' alt="No Results" />
        </div>
      )}
    </div> </div>
  );
};

export default CoursGList; 
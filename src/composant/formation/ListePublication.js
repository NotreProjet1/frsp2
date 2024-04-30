import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PublicationsList = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get('http://localhost:3000/publication/lister');
        setPublications(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications :', error);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div>
      <h1>Liste des publications payantes :</h1>
      <ul>
        {publications.map((publication) => {
          return (
            <li key={publication.id_public}>
              <h2>{publication.titre}</h2>
              <p>Description : {publication.description}</p>
              <p>Contenu : {publication.contenu}</p>
           
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PublicationsList;

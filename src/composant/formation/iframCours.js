import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/SingleCours.css'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Style } from '@mui/icons-material';


const SingleCours = () => {
  const { id } = useParams();
  const [cours, setCours] = useState(null);

  useEffect(() => {
    const fetchCoursG = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/coursgratuis/getCoursGById/${id}`);
        setCours(response.data.cours);
      } catch (error) {
        console.error('Erreur lors de la récupération de la Cours :', error);
      }
    };

    fetchCoursG();
  }, [id]);

  if (!cours) {
    return <div>Loading...</div>;
  }

  // Définition de la source du fichier à afficher dans l'iframe
  const fileSource = cours.contenu ? `http://localhost:3000/uploads/${cours.contenu}` : '';

  return (
    <div className="formationn-details">
    
      <h1>Cours de  {cours.titre}</h1>
   
      <p>Description : {cours.description}</p>

      {cours.contenu && (
        <div className="formationn-content">
          <h3> Cours :</h3>
          <a href={fileSource} download={cours.contenu.split('').pop()} target="_blank" rel="noopener noreferrer">
            
          </a>
          <iframe title="Contenu de la formation" className='iframeee' src={fileSource}></iframe>
          <a href={fileSource} download={cours.contenu.split('').pop()} target="_blank" rel="noopener noreferrer">
            <button className="downloadd-button">
              Télécharger le fichier <FontAwesomeIcon icon={faDownload} />
            </button>
          </a>
        </div>
      )}
  
    </div>
  );
};

export default SingleCours;
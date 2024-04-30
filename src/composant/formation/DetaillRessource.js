import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/detailleresource.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';



const SingleRessource = () => {
  const { id } = useParams();
  const [Ressource, setRessource] = useState(null);

  useEffect(() => {
    const fetchRessource= async () => {  
      try {
        const response = await axios.get(`http://localhost:3000/Ressource/getRessourceGById/${id}`);
        setRessource(response.data.Ressource);
      } catch (error) {
        console.error('Erreur lors de la récupération de la Ressource :', error);
      }
    };

    fetchRessource();
  }, [id]);

  if (!Ressource) {
    return <div>Loading...</div>;
  }

  // Définition de la source du fichier à afficher dans l'iframe
  const fileSource = Ressource.contenu ? `http://localhost:3000/uploads/${Ressource.contenu}` : '';
  

  return (
    <div className="Ressource-details">
      <h1>Ressource  de {Ressource.titre}</h1>
   
      <p>Description : {Ressource.description}</p>

      {Ressource.contenu && (
        <div className="Ressource-content">
          <h3 className='hh3'>Contenu de la Ressource :</h3>
       
          <iframe className='iframeeee' title="Contenu de la formation" src={fileSource}></iframe>
          <a href={fileSource} download={Ressource.contenu.split('').pop()} target="_blank" rel="noopener noreferrer">
            
            <button className="Ressource-download-button">
              Télécharger le fichier <FontAwesomeIcon icon={faDownload} />
            </button>
          </a>
        </div>
      )}

  
    </div>
  );
};

export default SingleRessource;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'; 
import { MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBCardTitle, MDBBtn, MDBInputGroup, MDBIcon } from 'mdb-react-ui-kit';

const ListPublicationAdmin = () => {
  const [publications, setPublications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [acceptedPublications, setAcceptedPublications] = useState(new Set());
  const [rejectedPublications, setRejectedPublications] = useState(new Set());

  useEffect(() => {
    const fetchPublications = async () => {
      try { 
        const response = await axios.get(`http://localhost:3000/publication/lister`);
        setPublications(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications :', error);
      }
    };

    fetchPublications();
  }, []);

  useEffect(() => {
    const accepted = JSON.parse(localStorage.getItem('acceptedPublications')) || [];
    const rejected = JSON.parse(localStorage.getItem('rejectedPublications')) || [];
    setAcceptedPublications(new Set(accepted));
    setRejectedPublications(new Set(rejected));
  }, []);

  const handleSearchChange = async (value) => {
    setSearchQuery(value);
    // Effectuer une recherche à chaque changement de la valeur de recherche
    try {
      const response = await axios.get(`http://localhost:3000/publication/searchByTitre?titre=${value}`);
      setPublications(response.data.publications || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des publications :', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:3000/publication/accepter/${id}`);
      const updatedPublications = publications.filter(publication =>
        publication.id_public !== id
      );
      setPublications(updatedPublications);
      setAcceptedPublications(new Set([...acceptedPublications, id]));
      localStorage.setItem('acceptedPublications', JSON.stringify([...acceptedPublications, id]));
      toast.success('Publication acceptée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'acceptation de la publication :', error);
    }
  };
  const handleSearch = async () => {
    // Implement your search logic here
  };
  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:3000/publication/refuser/${id}`);
      const updatedPublications = publications.filter(publication =>
        publication.id_public !== id
      );
      setPublications(updatedPublications);
      setRejectedPublications(new Set([...rejectedPublications, id]));
      localStorage.setItem('rejectedPublications', JSON.stringify([...rejectedPublications, id]));
      toast.success('Publication refusée avec succès.');
    } catch (error) {
      console.error('Erreur lors du refus de la publication :', error);
    }
  };
  
  const displayPublications = searchQuery === '' ? publications.filter(publication => {
    return !acceptedPublications.has(publication.id_public) && !rejectedPublications.has(publication.id_public);
  }) : publications || [];

  return (
    <div className="publications-list-admin" style={{ backgroundColor: '#eee', marginTop:'20px' }}>
      <ToastContainer />

      <h1 className="text-center" style={{ color: '#5e4803', fontFamily: 'Pacifico, Cursive', fontSize: '40px' }}>Gestion des Publications</h1>


     <div className="d-flex justify-content-center">
  <MDBInputGroup className="w-50">
    <input
      type="text"
      className="form-control h-100"
      placeholder="Rechercher par titre..."
      value={searchQuery}
      onChange={(e) => handleSearchChange(e.target.value)}
    />
    <MDBBtn
      color='primary'
      disabled={searchQuery === ''}
      onClick={handleSearch}
      className="align-items-center h-100"
    >
      <MDBIcon icon='search' size="sm"  className="mr-1 text-white" />
      <span className="align-middle">Search</span>
    </MDBBtn>
  </MDBInputGroup>
</div>


<div className="cards-container row row-cols-1 row-cols-md-4 g-4 mt-4" > {/* Ajoutez la classe mt-4 pour ajouter de la marge en haut */}
        {displayPublications.map((publication) => (
          <div className="col mb-4" key={publication.id_public}> 
            <MDBCard className="h-100" border='primary'style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }} >
              <MDBCardHeader>{publication.titre}</MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle className="text-success">Description :</MDBCardTitle>
                <MDBCardText>{publication.description}</MDBCardText>
                <div className="button-container">
                  <MDBBtn onClick={() => handleAccept(publication.id_public)} className="mr-2" color="success" rounded >Accepter</MDBBtn>
                  <MDBBtn onClick={() => handleReject(publication.id_public)} color="danger" rounded>Refuser</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPublicationAdmin;

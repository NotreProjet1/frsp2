import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow,MDBIcon , MDBCard, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

const FormationsList = () => {
  const [formations, setFormations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/FormationP/lister`);
        setFormations(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des formations :', error);
      }
    };

    fetchFormations();
  }, []);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchQuery(searchTerm);
  
    try {
      const response = await axios.get(`http://localhost:3000/formationP/searchByDomaine?domaine=${searchTerm}`);
      console.log('Réponse de la recherche :', response.data); 
      const filteredFormations = response.data.formations.filter(formation => {
        const lowerCaseDomaine = formation.domaine.toLowerCase();
        return lowerCaseDomaine.includes(searchTerm);
      });
      setFormations(filteredFormations);
    } catch (error) {
      console.error('Erreur lors de la récupération des formations :', error);
    }
  };

  const displayFormations = searchQuery === '' ? formations : formations.filter(formation => formation.domaine.toLowerCase().includes(searchQuery));

  return (
    <div className="formations-container" style={{backgroundColor:'#efefef'}}>  
      <h1 className="formations-title">Liste des formations payantes :</h1>

      <input
        type="text"
        placeholder="Rechercher par domaine..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <MDBContainer>
        <MDBRow className="justify-content-center">
          {displayFormations.map(formation => (
            <MDBCol md="9" lg="7" xl="5" className="mt-5" key={formation.id_fp}>
              <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
                <MDBCardBody className="p-4 text-black">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="small mb-0"><MDBIcon far icon="clock me-2" />3 hrs</p>
                    <p className="fw-bold mb-0">Prix:{formation.prix}  $</p>
                  </div>
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        style={{ width: '70px' }}
                        className="img-fluid rounded-circle border border-dark border-3"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwpHfSxec2smXlG2M_JnHab_T8LHAMYGF0VJ0YRro0DFxnbJ39UHdZLFhXYn4H1yzLD7k&usqp=CAU"
                        alt="Instructeur"
                        fluid
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <div className="d-flex flex-row align-items-center mb-2">
                        <p className="mb-0 me-2">
                          <Link to={`/ProfilePage/${formation.instructeur_id}`}>
                            Voir profil
                          </Link>
                        </p>
                        <p className="mb-0">{`${formation.instructeur_prenom} ${formation.instructeur_nom}`}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <MDBTypography tag="h6">{formation.titre}</MDBTypography>
                  <MDBTypography tag="h6">{formation.description}</MDBTypography>
                  <MDBBtn color="success" rounded block size="lg">
                    <Link to={`/formationP/getFormationById/${formation.id_fp}`} className="details-button">Voir les détails</Link>
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default FormationsList;

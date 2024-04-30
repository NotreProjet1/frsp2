import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { FaStar } from 'react-icons/fa'; // Importez l'icône FaStar depuis react-icons/fa
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartbeat } from '@fortawesome/free-solid-svg-icons';

const ProfileCard = ({ instructeur, handleLikeClick, handleLoveClick, likedVideos, lovedVideos }) => {
  return (
    <MDBCol md="9" lg="7" xl="5" className="mt-5">
      <MDBCard style={{ borderRadius: '15px' }}>
        <MDBCardBody className="p-4">
          <div className="d-flex text-black">
            <div className="flex-shrink-0">
              <MDBCardImage
                style={{ width: '180px', borderRadius: '10px' }}
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                alt='Generic placeholder image'
                fluid
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className="card-title">{instructeur.prenom} {instructeur.nom}</h5>
              <p className="card-text">{instructeur.specialite}</p>
              <div className="d-flex flex-column">
                <p>Formations: {instructeur.count_formations}</p>
                <div className="d-flex">
                  <FaStar style={{ color: 'yellow' }} />
                  <FaStar style={{ color: 'yellow' }} />
                  <FaStar style={{ color: 'yellow' }} />
                </div>
              </div>
              <div className="d-flex flex-column">
                <p>Cours gratuits: {instructeur.count_cours_gratuits}</p>
                <div className="d-flex">
                  <FaStar style={{ color: 'yellow' }} />
                  <FaStar style={{ color: 'yellow' }} />
                  <FaStar style={{ color: 'yellow' }} />
                </div>
              </div>
              <div className="d-flex pt-1">
                <MDBBtn outline className="me-1 flex-grow-1" >
                  <FontAwesomeIcon icon={faHeart} className="me-1" /> 
                  Like
                </MDBBtn>
                <MDBBtn className="flex-grow-1" >
                  <FontAwesomeIcon icon={faHeartbeat} className="me-1" />
                  J'adore
                </MDBBtn>
              </div>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};
const ProfilePage = () => {
  const [instructeur, setInstructeur] = useState(null);
  const { instructeur_id } = useParams();

  useEffect(() => {
    console.log('ID récupéré dans la page de profil:', instructeur_id);

    const fetchInstructeur = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/instructeur/getInstructeurById/${instructeur_id}`);
        const data = response.data;
        console.log('Données de l\'instructeur:', data);
    
        if (data.success) {
          const instructeurData = data.Instructeur; // Utilisez la bonne clé pour accéder aux données de l'instructeur
          console.log('Données extraites de l\'instructeur:', instructeurData);
    
          const statsResponse = await axios.get(`http://localhost:3000/instructeur/instructeur/${instructeur_id}/stats`);
          const statsData = statsResponse.data;
          const instructeurWithStats = {
            ...instructeurData,
            count_formations: statsData.formationsCount,
            count_cours_gratuits: statsData.coursGratuitsCount
          };
          setInstructeur(instructeurWithStats);
        } else {
          console.error('Response data is not as expected:', data);
        }
      } catch (error) {
        console.error('Error fetching instructeur:', error);
      }
    };
    

    fetchInstructeur();
  }, [instructeur_id]);

  return ( 
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer>
        {instructeur && <ProfileCard instructeur={instructeur} style={{ marginTop: '20px', marginLeft: '100px' }} />}
      </MDBContainer>
    </div>
  );
  
}

export default ProfilePage;

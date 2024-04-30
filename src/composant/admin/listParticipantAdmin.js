import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBRow, MDBCol, MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBTypography, MDBIcon, MDBBtn, MDBModal, MDBModalBody } from 'mdb-react-ui-kit';
import { FaStar } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import de FontAwesomeIcon
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'; // Import des icônes faTrashAlt et faEdit
const ProfileCard = ({ participant, onModifierClick, onSupprimerClick }) => {
  const handleModifier = () => {
    onModifierClick(participant);
  };

  const handleSupprimer = () => {
    onSupprimerClick(participant);
  };

  return (
    <MDBCol md="5" className="mt-5">
      <MDBCard style={{ borderRadius: '15px', marginBottom: '150px', marginLeft: '30px' }}>
        <MDBCardBody className="p-4">
          <div className="d-flex text-black">
            <div className="flex-shrink-0">
              <MDBCardImage
                style={{ width: '180px', borderRadius: '10px' }}
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                fluid
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className="card-title">{participant.prenom} {participant.nom}</h5>
              <p className="card-text">{participant.poste}</p>
           
            
              <div className="d-flex pt-1" style={{ borderRadius: '15px' }}>
                <MDBBtn outline className="me-1 flex-grow-1" onClick={handleModifier}>
                  <FontAwesomeIcon icon={faEdit} className="me-1" /> Modifier
                </MDBBtn>
                <MDBBtn className="flex-grow-1" onClick={handleSupprimer}>
                  <FontAwesomeIcon icon={faTrashAlt} className="me-1" /> Supprimer
                </MDBBtn>
              </div>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

const ListeParticipantsAdmin = () => {
  const [participants, setParticipants] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [participantToDelete, setParticipantToDelete] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/participant/`);
        const data = response.data;
        if (data.success) {
          setParticipants(data.liste);
        } else {
          console.error('Response data is not as expected:', data);
        }
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleModifierClick = (participant) => {
    setSelectedParticipant(participant);
    setShowModal(true);
  };

  const handleSupprimerClick = (participant) => {
    setParticipantToDelete(participant);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (participantToDelete) {
      console.log('Participant supprimé:', participantToDelete);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const modifiedData = Object.fromEntries(formData.entries());
    console.log('Participant modifié:', modifiedData);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

// Dans la partie du composant où vous utilisez la variable participants.length
const startIndex = (page - 1) * 2;
const endIndex = startIndex + 2;

return (
  <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#9de2ff' }}>
    <MDBContainer>
      <MDBRow>
        {participants && participants.slice(startIndex, endIndex).map((participant, index) => (
          <ProfileCard key={index} participant={participant} onModifierClick={handleModifierClick} onSupprimerClick={handleSupprimerClick} />
        ))}
      </MDBRow>
      <div className="d-flex justify-content-center mt-3" style={{ borderRadius: '15px', marginBottom: '210px' }}>
        <MDBBtn onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Précédent</MDBBtn>
        <MDBBtn onClick={() => handlePageChange(page + 1)} disabled={!participants || endIndex >= participants.length}>Suivant</MDBBtn>
      </div>
    </MDBContainer>


      <MDBModal show={showModal} onHide={() => setShowModal(false)}>
        <MDBModalBody>
          <h3>Modifier les informations du participant</h3>
          <form onSubmit={handleSaveChanges}>
            {/* Champs pour modifier les informations du participant */}
          </form>
          <div>
            <button onClick={handleCancel}>Annuler</button>
          </div>
        </MDBModalBody>
      </MDBModal>

      <MDBModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <MDBModalBody>
          <h3>Confirmation de la suppression</h3>
          <p>Voulez-vous vraiment supprimer ce participant ?</p>
          <div>
            <button onClick={handleConfirmDelete}>Confirmer</button>
            <button onClick={handleCancelDelete}>Annuler</button>
          </div>
        </MDBModalBody>
      </MDBModal>
    </div>
  );
}

export default ListeParticipantsAdmin;

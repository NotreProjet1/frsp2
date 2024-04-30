import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { Input } from '@mui/material';

const ListeFormationInstructeur = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search); 
  const instructeurId = params.get('userId');
  const tokenParam = params.get('token');

  const [token, setToken] = useState('');
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [formationToDelete, setFormationToDelete] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        if (instructeurId) {
          const response = await axios.get(`http://localhost:3000/formationP/formations/${instructeurId}`, {
            headers: {
              authorization: token ? ` ${token}` : undefined,
            },
          });
          setFormations(response.data.formations);
        }
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };
  
    fetchFormations();
  }, [instructeurId, token]);

  const handleSupprimer = async (id_fp) => {
    try {
      await axios.delete(`http://localhost:3000/formationP/supprimer/${id_fp}`, {
        headers: {
          authorization: ` ${token}`,
        },
      });
      toast.success('Formation supprimée avec succès.');
      const updatedFormations = formations.filter(form => form.id_fp !== id_fp);
      setFormations(updatedFormations);
      setModalConfirm(false); // Fermer le modal de confirmation après la suppression
    } catch (error) {
      console.error('Error deleting formation:', error);
      toast.error('Erreur lors de la suppression de la formation.');
    }
  };

  const handleModifier = (formation) => {
    setSelectedFormation(formation); // Mettre à jour selectedFormation avec la formation à modifier
    setShowModal(true); // Afficher le modal de modification
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFormation(null); // Réinitialiser la formation sélectionnée
  };

  const handleConfirmDelete = (formation) => {
    setModalConfirm(true);
    setFormationToDelete(formation);
  };

  const handleCancelDelete = () => {
    setModalConfirm(false);
    setFormationToDelete(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFormation((prevFormation) => ({
      ...prevFormation,
      plant: file,
    }));
  };

  const handleSubmitModifier = async (modifiedFormation) => {
    try {
      const formData = new FormData();
      formData.append('titre', modifiedFormation.titre); 
      formData.append('description', modifiedFormation.description); 
      formData.append('plant', modifiedFormation.plant); 
      formData.append('prix', modifiedFormation.prix); 
      formData.append('certeficat', modifiedFormation.certeficat); 
      formData.append('domaine', modifiedFormation.domaine); 
      formData.append('niveaux', modifiedFormation.niveaux); 
      // Ajoutez les autres champs de formation à formData comme vous le faites déjà
      const response = await axios.put(`http://localhost:3000/formationP/modifier/${modifiedFormation.id_fp}`, formData, {
        headers: {
          authorization: ` ${token}`,
          'Content-Type': 'multipart/form-data', // Assurez-vous d'ajouter le Content-Type approprié
        },
      });
      toast.success('Formation modifiée avec succès.');
      const updatedFormations = formations.map(form => (form.id_fp === modifiedFormation.id_fp ? modifiedFormation : form));
      setFormations(updatedFormations);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating formation:', error);
      toast.error('Erreur lors de la modification de la formation.');
    }
  };

  return (
    <div style={containerStyle}>
      {formations.map(formation => (
        <div className="card" key={formation.id_fp} style={cardStyle}>
          <h2>{formation.titre}</h2>
          <p className="domaine-niveau">Domaine : {formation.domaine} | Niveau : {formation.niveaux}</p>
          <p className="description">Description : {formation.description}</p>
          <p className="prix">Prix : {formation.prix}</p>
          <div className="button-container">
            <Link to={`/formationP/getFormationById/${formation.id_fp}`} className="details-button" style={detailsButtonStyle}>Voir les détails</Link>
            <button className="supp" onClick={() => handleConfirmDelete(formation)} style={suppButtonStyle}>Supprimer</button>
            <button className="modif" onClick={() => handleModifier(formation)} style={modifButtonStyle}>Modifier</button>
          </div>
        </div>
      ))}

      {showModal && selectedFormation && (
        <MDBModal
          animationDirection='right'
          open={showModal}
          tabIndex='-1'
          onClose={handleCloseModal}
        >
          <MDBModalDialog position='top-right' side>
            <MDBModalContent>
              <MDBModalHeader className='bg-info text-white'>
                <MDBModalTitle>Modifier la formation</MDBModalTitle>
                <MDBBtn
                  color='none'
                  className='btn-close btn-close-white'
                  onClick={handleCloseModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitModifier(selectedFormation);
                }}>
                  <div>
                    <label htmlFor="titre">Titre:</label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      value={selectedFormation.titre}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, titre: e.target.value })}
                      style={inputStyle}
                    />
                    <label htmlFor="description">Description:</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={selectedFormation.description}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, description: e.target.value })}
                      style={inputStyle}
                    />
                    <label htmlFor="plant">Plant:</label>
                    <Input
                      type="file"
                      id="plantFileInput"
                      name="plantFile"
                      accept=".pdf"
                      onChange={handleFileChange}
                      required
                      className="file-input"
                      style={inputStyle}
                    />
                    <label htmlFor="prix">Prix:</label>
                    <input
                      type="text"
                      id="prix"
                      name="prix"
                      value={selectedFormation.prix}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, prix: e.target.value })}
                      style={inputStyle}
                    />
                    <label htmlFor="certeficat">Certificat:</label>
                    <input
                      type="text"
                      id="certeficat"
                      name="certeficat"
                      value={selectedFormation.certeficat}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, certeficat: e.target.value })}
                      style={inputStyle}
                    />
                    <label htmlFor="domaine">Domaine:</label>
                    <input
                      type="text"
                      id="domaine"
                      name="domaine"
                      value={selectedFormation.domaine}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, domaine: e.target.value })}
                      style={inputStyle}
                    />
                    <label htmlFor="niveaux">Niveaux:</label>
                    <input
                      type="text"
                      id="niveaux"
                      name="niveaux"
                      value={selectedFormation.niveaux}
                      onChange={(e) => setSelectedFormation({ ...selectedFormation, niveaux: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <button type="submit" style={buttonStyle}>Enregistrer</button>
                </form>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}

      <MDBModal
        animationDirection='right'
        open={modalConfirm}
        tabIndex='-1'
        onClose={() => setModalConfirm(false)}
      >
        <MDBModalDialog position='top-right' side>
          <MDBModalContent>
            <MDBModalHeader className='bg-info text-white'>
              <MDBModalTitle>Supprimer cette formation</MDBModalTitle>
              <MDBBtn
                color='none'
                className='btn-close btn-close-white'
                onClick={handleCancelDelete}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>Êtes-vous sûr de vouloir supprimer cette formation ?</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='info' onClick={() => handleSupprimer(formationToDelete.id_fp)}>Confirmer</MDBBtn>
              <MDBBtn outline color='info' onClick={handleCancelDelete}>Annuler</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <ToastContainer />
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '20px',
};

const cardStyle = {
  width: '300px',
  backgroundColor: '#9de2ff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};
const buttonGroupStyle = {
  display: 'flex',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px 0',
};

const detailsButtonStyle = {
  backgroundColor: '#4caf50',
  color: 'white',
  textDecoration: 'none',
};

const suppButtonStyle = {
  backgroundColor: '#ff1744',
  color: 'white',
};

const modifButtonStyle = {
  backgroundColor: '#2196f3',
  color: 'white',
};

export default ListeFormationInstructeur;

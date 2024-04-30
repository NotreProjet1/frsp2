import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { Input } from '@mui/material';
const ListeRessourceInstructeur = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search); 
  const instructeurId = params.get('userId');
  const tokenParam = params.get('token');

  const [token, setToken] = useState('');
  const [Ressource, setRessource] = useState([]);
  const [selectedRessource, setSelectedRessource] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [RessourceToDelete, setRessourceToDelete] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    const fetchRessource = async () => {
      try {
        if (instructeurId) {
          const response = await axios.get(`http://localhost:3000/Ressource/getRessourceByInstructorId/${instructeurId}`, {
            headers: {
              authorization: token ? ` ${token}` : undefined,
            },
          });
          setRessource(response.data.Ressource);
        }
      } catch (error) {
        console.error('Error fetching Ressource:', error);
      }
    };
  
    fetchRessource();
  }, [instructeurId, token]);

  const handleSupprimer = async (id_r) => {
    try {
      await axios.delete(`http://localhost:3000/Ressource/supprimer/${id_r}`, {
        headers: {
          authorization: ` ${token}`,
        },
      });
      toast.success('Ressource supprimée avec succès.');
      const updatedRessource = Ressource.filter(form => form.id_r !== id_r);
      setRessource(updatedRessource);
      setModalConfirm(false); // Fermer le modal de confirmation après la suppression
    } catch (error) {
      console.error('Error deleting Ressource:', error);
      toast.error('Erreur lors de la suppression de la Ressource.');
    }
  };

  const handleModifier = (Ressource) => {
    setSelectedRessource(Ressource); // Mettre à jour selectedRessource avec la Ressource à modifier
    setShowModal(true); // Afficher le modal de modification
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRessource(null); // Réinitialiser la Ressource sélectionnée
  };

  const handleConfirmDelete = (Ressource) => {
    setModalConfirm(true);
    setRessourceToDelete(Ressource);
  };

  const handleCancelDelete = () => {
    setModalConfirm(false);
    setRessourceToDelete(null);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedRessource((prevRessource) => ({
      ...prevRessource,
      contenu: file,
    }));
  };
  const handleSubmitModifier = async (modifiedRessource) => {
    try {
      const formData = new FormData();
      formData.append('titre', modifiedRessource.titre); 
      formData.append('description', modifiedRessource.description); 
      formData.append('contenu', modifiedRessource.contenu); 
   
      // Ajoutez les autres champs de Ressource à formData comme vous le faites déjà
      const response = await axios.put(`http://localhost:3000/Ressource/modifier/${modifiedRessource.id_r}`, formData, {
        headers: {
          authorization: ` ${token}`,
          'Content-Type': 'multipart/form-data', // Assurez-vous d'ajouter le Content-Type approprié
        },
      });
      toast.success('Ressource modifiée avec succès.');
      const updatedRessource = Ressource.map(form => (form.id_r === modifiedRessource.id_r ? modifiedRessource : form));
      setRessource(updatedRessource);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating Ressource:', error);
      toast.error('Erreur lors de la modification de la Ressource.');
    }
  };

  return (
    <div>
 {Ressource && Ressource.length > 0 ? (
  Ressource.map(Ressource => (
    <div className="card1" key={Ressource.id_r}>
      <h2>{Ressource.titre}</h2>
      <p className="description">Description : {Ressource.description}</p>
      <div className="button-container">
        <Link to={`/RessourceP/getRessourceById/${Ressource.id_r}`} className="details-button">Voir les détails</Link>
        <button className="supp" onClick={() => handleConfirmDelete(Ressource)}>Supprimer</button>
        <button className="modif" onClick={() => handleModifier(Ressource)}>Modifier</button>
      </div>
    </div>
  ))
) : (
  <div>Aucun Ressource trouvé.</div>
)}

      {showModal && selectedRessource && ( // Vérifier que selectedRessource est défini avant d'afficher le modal
        <MDBModal
          animationDirection='right'
          open={showModal}
          tabIndex='-1'
          onClose={handleCloseModal}
        >
          <MDBModalDialog position='top-right' side>
            <MDBModalContent>
              <MDBModalHeader className='bg-info text-white'>
                <MDBModalTitle>Modifier la Ressource</MDBModalTitle>
                <MDBBtn
                  color='none'
                  className='btn-close btn-close-white'
                  onClick={handleCloseModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitModifier(selectedRessource);
                }}>
                  {/* Form fields for modifying the selected Ressource */}
                  {/* Exemple de champ de formulaire pour modifier le titre */}
                  <div>
                    <label htmlFor="titre">Titre:</label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      value={selectedRessource.titre}
                      onChange={(e) => setSelectedRessource({ ...selectedRessource, titre: e.target.value })}
                    />
                     <label htmlFor="description">description:</label>
                     <input
                      type="text"
                      id="description"
                      name="description"
                      value={selectedRessource.description}
                      onChange={(e) => setSelectedRessource({ ...selectedRessource, description: e.target.value })}
                    />
<label htmlFor="contenu">contenu:</label>
<Input
  type="file"
  id="contenuFileInput"
  name="contenuFile"
  accept=".pdf"
  onChange={handleFileChange}
  required
  className="file-input"
  style={{ marginTop: "20px" }}
/>

                        

                 
 

                  </div>
                  <button type="submit">Enregistrer</button>
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
              <MDBModalTitle>Supprimer cette Ressource</MDBModalTitle>
              <MDBBtn
                color='none'
                className='btn-close btn-close-white'
                onClick={handleCancelDelete}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>Êtes-vous sûr de vouloir supprimer cette Ressource ?</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='info' onClick={() => handleSupprimer(RessourceToDelete.id_r)}>Confirmer</MDBBtn>
              <MDBBtn outline color='info' onClick={handleCancelDelete}>Annuler</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <ToastContainer />
    </div>
  );
}

export default ListeRessourceInstructeur;



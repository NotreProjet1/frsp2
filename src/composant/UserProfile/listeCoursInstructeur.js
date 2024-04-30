import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { Input } from '@mui/material';
const ListecoursInstructeur = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search); 
  const instructeurId = params.get('userId');
  const tokenParam = params.get('token');

  const [token, setToken] = useState('');
  const [cours, setcours] = useState([]);
  const [selectedcours, setSelectedcours] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [coursToDelete, setcoursToDelete] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    const fetchcours = async () => {
      try {
        if (instructeurId) {
          const response = await axios.get(`http://localhost:3000/coursgratuis/getcoursByInstructorId/${instructeurId}`, {
            headers: {
              authorization: token ? ` ${token}` : undefined,
            },
          });
          setcours(response.data.cours);
        }
      } catch (error) {
        console.error('Error fetching cours:', error);
      }
    };
  
    fetchcours();
  }, [instructeurId, token]);

  const handleSupprimer = async (id_cg) => {
    try {
      await axios.delete(`http://localhost:3000/coursgratuis/supprimer/${id_cg}`, {
        headers: {
          authorization: ` ${token}`,
        },
      });
      toast.success('cours supprimée avec succès.');
      const updatedcours = cours.filter(form => form.id_cg !== id_cg);
      setcours(updatedcours);
      setModalConfirm(false); // Fermer le modal de confirmation après la suppression
    } catch (error) {
      console.error('Error deleting cours:', error);
      toast.error('Erreur lors de la suppression de la cours.');
    }
  };

  const handleModifier = (cours) => {
    setSelectedcours(cours); // Mettre à jour selectedcours avec la cours à modifier
    setShowModal(true); // Afficher le modal de modification
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedcours(null); // Réinitialiser la cours sélectionnée
  };

  const handleConfirmDelete = (cours) => {
    setModalConfirm(true);
    setcoursToDelete(cours);
  };

  const handleCancelDelete = () => {
    setModalConfirm(false);
    setcoursToDelete(null);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedcours((prevcours) => ({
      ...prevcours,
      contenu: file,
    }));
  };
  const handleSubmitModifier = async (modifiedcours) => {
    try {
      const formData = new FormData();
      formData.append('titre', modifiedcours.titre); 
      formData.append('description', modifiedcours.description); 
      formData.append('contenu', modifiedcours.contenu); 
   
      // Ajoutez les autres champs de cours à formData comme vous le faites déjà
      const response = await axios.put(`http://localhost:3000/coursgratuis/modifier/${modifiedcours.id_cg}`, formData, {
        headers: {
          authorization: ` ${token}`,
          'Content-Type': 'multipart/form-data', // Assurez-vous d'ajouter le Content-Type approprié
        },
      });
      toast.success('cours modifiée avec succès.');
      const updatedcours = cours.map(form => (form.id_cg === modifiedcours.id_cg ? modifiedcours : form));
      setcours(updatedcours);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating cours:', error);
      toast.error('Erreur lors de la modification de la cours.');
    }
  };

  return (
    <div>
 {cours && cours.length > 0 ? (
  cours.map(cours => (
    <div className="card1" key={cours.id_cg}>
      <h2>{cours.titre}</h2>
      <p className="description">Description : {cours.description}</p>
      <div className="button-container">
        <Link to={`/coursP/getcoursById/${cours.id_cg}`} className="details-button">Voir les détails</Link>
        <button className="supp" onClick={() => handleConfirmDelete(cours)}>Supprimer</button>
        <button className="modif" onClick={() => handleModifier(cours)}>Modifier</button>
      </div>
    </div>
  ))
) : (
  <div>Aucun cours trouvé.</div>
)}

      {showModal && selectedcours && ( // Vérifier que selectedcours est défini avant d'afficher le modal
        <MDBModal
          animationDirection='right'
          open={showModal}
          tabIndex='-1'
          onClose={handleCloseModal}
        >
          <MDBModalDialog position='top-right' side>
            <MDBModalContent>
              <MDBModalHeader className='bg-info text-white'>
                <MDBModalTitle>Modifier la cours</MDBModalTitle>
                <MDBBtn
                  color='none'
                  className='btn-close btn-close-white'
                  onClick={handleCloseModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitModifier(selectedcours);
                }}>
                  {/* Form fields for modifying the selected cours */}
                  {/* Exemple de champ de formulaire pour modifier le titre */}
                  <div>
                    <label htmlFor="titre">Titre:</label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      value={selectedcours.titre}
                      onChange={(e) => setSelectedcours({ ...selectedcours, titre: e.target.value })}
                    />
                     <label htmlFor="description">description:</label>
                     <input
                      type="text"
                      id="description"
                      name="description"
                      value={selectedcours.description}
                      onChange={(e) => setSelectedcours({ ...selectedcours, description: e.target.value })}
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
              <MDBModalTitle>Supprimer cette cours</MDBModalTitle>
              <MDBBtn
                color='none'
                className='btn-close btn-close-white'
                onClick={handleCancelDelete}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>Êtes-vous sûr de vouloir supprimer cette cours ?</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='info' onClick={() => handleSupprimer(coursToDelete.id_cg)}>Confirmer</MDBBtn>
              <MDBBtn outline color='info' onClick={handleCancelDelete}>Annuler</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <ToastContainer />
    </div>
  );
}

export default ListecoursInstructeur;



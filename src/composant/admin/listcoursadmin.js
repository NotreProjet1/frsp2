import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBInputGroup, MDBIcon } from 'mdb-react-ui-kit';

const CoursListAdmin = () => {
  const [cours, setCours] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Nombre d'éléments à afficher par page

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/coursgratuis/lister`);
        setCours(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours :', error);
      }
    };

    fetchCours();
  }, []);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchQuery(searchTerm);

    try {
      const response = await axios.get(`http://localhost:3000/coursgratuis/rechercherByTitre?titre=${searchTerm}`);
      setCours(response.data.liste || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:3000/coursgratuis/accepter/${id}`);
      setCours(prevCours => prevCours.map(c => c.id_cg === id ? { ...c, accepted: true } : c));
      localStorage.setItem('acceptedCours', JSON.stringify([...getAcceptedCours(), id]));
      toast.success('Cours accepté avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'acceptation du cours :', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:3000/coursgratuis/refuser/${id}`);
      setCours(prevCours => prevCours.map(c => c.id_cg === id ? { ...c, rejected: true } : c));
      localStorage.setItem('rejectedCours', JSON.stringify([...getRejectedCours(), id]));
      toast.success('Cours refusé avec succès.');
    } catch (error) {
      console.error('Erreur lors du refus du cours :', error);
    }
  };

  const getAcceptedCours = () => {
    return JSON.parse(localStorage.getItem('acceptedCours') || '[]');
  };

  const getRejectedCours = () => {
    return JSON.parse(localStorage.getItem('rejectedCours') || '[]');
  };

  // Filtrer les cours en fonction de leur état (non acceptés et non refusés)
  const filteredCours = cours.filter(c =>
    !getAcceptedCours().includes(c.id_cg) && !getRejectedCours().includes(c.id_cg)
  );

  // Pagination - Calcul de l'index de début et de fin pour l'affichage des éléments actuels
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCours.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCours.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="cours-list-admin">
      <style>
        {`
          .cours-list-admin {
            border: 2px solid #ccc;
            padding: 10px;
            width: 1050px;
            margin: 0 auto;
            margin-top: 20px;
          }
          .cours-list-admin img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }
        `}
      </style>

      <ToastContainer />

      <h1 style={{ textAlign: 'center', color: '#007bff', fontFamily: 'Pacifico, Cursive', fontSize: '40px' }}>
        Gestion des Cours
      </h1>

      <div className="d-flex justify-content-center mb-3">
        <MDBInputGroup className="w-50">
          <input
            type="text"
            className="form-control h-100"
            placeholder="Rechercher par titre..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <MDBBtn
            color='primary'
            disabled={searchQuery === ''}
            className="align-items-center h-100"
          >
            <MDBIcon icon='search' size="sm" className="mr-1 text-white" />
            <span className="align-middle">Rechercher</span>
          </MDBBtn>
        </MDBInputGroup>
      </div>

      <MDBTable align='middle' style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
        <MDBTableHead>
          <tr>
            <th>Avatar</th>
            <th>Instructeur</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentItems.map((cours) => (
            <tr key={cours.id_cg}>
              <td>
                <img
                  src={cours.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwpHfSxec2smXlG2M_JnHab_T8LHAMYGF0VJ0YRro0DFxnbJ39UHdZLFhXYn4H1yzLD7k&usqp=CAU'}
                  alt='Avatar'
                />
              </td>
              <td>{`${cours.instructeur_prenom} ${cours.instructeur_nom}`}</td>
              <td>{cours.titre}</td>
              <td>{cours.description}</td>
              <td>
                <MDBBtn color='success' rounded size='sm' onClick={() => handleAccept(cours.id_cg)}>
                  Accepter
                </MDBBtn>
                <MDBBtn color='danger' rounded size='sm' onClick={() => handleReject(cours.id_cg)}>
                  Refuser
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Pagination */}
      <nav aria-label='Page navigation example'>
        <ul className='pagination justify-content-center'>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className='page-link' onClick={() => handlePrevPage()}>&laquo;</button>
          </li>
          {[...Array(totalPages).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
              <button className='page-link' onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className='page-link' onClick={() => handleNextPage()}>&raquo;</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CoursListAdmin;

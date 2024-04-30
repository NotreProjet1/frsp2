import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';

const ListecourAdmin = () => {
  const [cours, setCours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3; // Adjust the number of cards per page as needed

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/coursgratuis/lister`);
        setCours(response.data.liste);
      } catch (error) {
        console.error('Error fetching cours:', error);
      }
    };

    fetchCours();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCours = cours.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/coursgratuis/supprimer/${id}`);
      setCours(cours.filter((c) => c.id_cg !== id));
      console.log('cours supprimé avec succès.');
    } catch (error) {
      console.error('Error deleting cours:', error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex flex-wrap justify-content-center">
        {currentCours && currentCours.length > 0 ? (
          currentCours.map((c) => (
            <div key={c.id_cg} className="mx-2 my-3">
              <MDBCard style={{ maxWidth: '22rem' }}>
                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                  <MDBCardImage src='https://images.pexels.com/photos/7657407/pexels-photo-7657407.jpeg?auto=compress&cs=tinysrgb&w=600' fluid alt='...' />
                  <a href={`#/coursP/getcoursById/${c.id_cg}`}>
                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                  </a>
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle>{c.titre}</MDBCardTitle>
                  <MDBCardText>{c.description}</MDBCardText>
                  <Link to={`/modifier-cours/${c.id_cg}`} className="btn btn-primary">
                    Modifier
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(c.id_cg)}>
                    Supprimer
                  </button>
                </MDBCardBody>
              </MDBCard>
            </div>
          ))
        ) : (
          <div>Aucun cours trouvé.</div>
        )}
      </div>
      <nav aria-label="Page navigation example" className="mt-3">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(cours.length / cardsPerPage) }, (_, i) => (
            <li key={i+1} className={`page-item ${currentPage === i+1 ? 'active' : ''}`}>
              <button onClick={() => paginate(i+1)} className="page-link">{i+1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ListecourAdmin;

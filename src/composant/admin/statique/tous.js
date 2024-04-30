import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import StatiqueAdmin from '../statique/statique';
import TotalChart from '../statique/etudier';
import InstructorChart from '../statique/instructeurStatique';

const Tous = () => {
    return (
        <div style={{ padding: '30px' }}>
          {/* Titre et logo */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            {/* Vous pouvez ajouter votre logo ici */}
            <h1 style={{ display: 'inline', color: '#000' }}>Statistiques de EduPionner</h1>
          </div>
    
          {/* Grille de cartes */}
          <MDBRow className='row-cols-1 row-cols-md-2 g-4'>
            <MDBCol>
              <MDBCard style={{ background: '#222', color: '#fff', maxHeight: '300px' }}>
                <MDBCardBody>
                  <MDBCardTitle className="text-center" style={{ color: '#fff', fontSize: '1.2rem' }}>Statistiques des Utilisateurs</MDBCardTitle>
                  <StatiqueAdmin />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard style={{ background: '#222', color: '#fff', maxHeight: '300px' }}>
                <MDBCardBody>
                  <MDBCardTitle className="text-center" style={{ color: '#fff', fontSize: '1.2rem' }}>Nombres totaux de cours, formations et ressources</MDBCardTitle>
                  <TotalChart />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard style={{ background: '#222', color: '#fff', maxHeight: '300px' }}>
                <MDBCardBody>
                  <MDBCardTitle className="text-center" style={{ color: '#fff', fontSize: '1.2rem' }}>Augmentation des instructeurs et des participants par semaine</MDBCardTitle>
                  <InstructorChart />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      );
    };
    
export default Tous;

import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';

const App = () => {
  return (
    <MDBCard>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle> title de cours </MDBCardTitle>
        <MDBCardText>
          description de cours 
        </MDBCardText>
        <MDBBtn href='#'>modifier</MDBBtn>
        <MDBBtn href='#'>suprimer</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}

export default App;

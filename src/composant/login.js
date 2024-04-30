import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faGoogle,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { nav } from '../composant/nav';


import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css';
const Login = ({ setLoggedIn }) => {
  const history = useHistory();
  const [role, setRole] = useState('participant'); // Rôle par défaut : participant


  const [formData, setFormData] = useState({
    email: '',
    mots_de_passe: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleParticipantSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/participant/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          mots_de_passe: formData.mots_de_passe,
        }),
      });

      const responseData = await response.json();

      console.log('Request data:', { email: formData.email, mots_de_passe: formData.mots_de_passe });
      console.log('Response:', responseData);

      if (response.status === 200) {
        console.log('Login successful:', responseData);
        localStorage.setItem('isLoggedIn', 'true');
        setLoggedIn(true);
        setRole('participant');
        localStorage.setItem('role', 'participant');
        console.log('role', role);
        localStorage.setItem('participantData', JSON.stringify(responseData.user));



        // Afficher une notification de succès
        toast.success('Login successful', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        history.push({
          pathname: '/UserProfileParticipant',
          state: { participantData: responseData.user }
        });
        // Gérer la suite après la connexion réussie
      } else {
        console.error('Login failed:', response.statusText);

        // Afficher une notification d'échec
        toast.error('Login failed', {
          position: 'top-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Gérer l'échec de la connexion
      }
    } catch (error) {
      console.error('Error during login:', error);

      // Gérer les erreurs ici
    }
  };


  const handleInstructeurSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/instructeur/login', {
        email: formData.email,
        mots_de_passe: formData.mots_de_passe,
      });

      const responseData = response.data;

      if (response.status === 200) {
        console.log('Login successful:', responseData);
        localStorage.setItem('isLoggedIn', 'true');
        setLoggedIn(true);
        localStorage.setItem('role', 'instructeur'); // Stockez le rôle dans le local storage
        console.log('role', role);
        
        localStorage.setItem('token', JSON.stringify(responseData.token));

        localStorage.setItem('instructeurData', JSON.stringify(responseData.user));


 // Après une connexion réussie
 localStorage.setItem('token', responseData.token); // Stocker le token dans le localStorage

        // Afficher une notification de succès
        toast.success('Login successful', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        history.push({
          pathname: '/UserProfile',
          state: { instructeurData: responseData.user, role: 'instructeur' }
        });
        // Gérer la suite après la connexion réussie
      } else {
        console.error('Login failed:', response.statusText);
  
        toast.error('Login failed', {
          position: 'top-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed', {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  return (
    <div>
      <div className="bg-image"></div>


      <MDBCard className="cardd mx-auto  shadow-5-strong" style={{ backgroundPosition: "center", marginTop: "-200px", width: "40%", background: "hsla(0, 0%, 100%, 0.3)", backdropFilter: "blur(30px)" }}
      >
        <MDBCardBody>
          <form onSubmit={role === 'participant' ? handleParticipantSubmit : handleInstructeurSubmit}>
            {/* Boutons de sélection de rôle */}
            <div className='text-center mb-3' >
              <MDBBtn
                color='primary'
                onClick={() => setRole('participant')}
                className={`role-button ${role === 'participant' ? 'active' : ''}`}
                style={{ marginRight: "50px", backgroundColor: role === 'participant' ? '#007bff' : '#ffffff', color: role === 'participant' ? '#ffffff' : '#007bff' }}
              >
                Participant
              </MDBBtn>
              <MDBBtn
                color='primary'
                onClick={() => setRole('instructeur')}
                className={`role-button ${role === 'instructeur' ? 'active' : ''}`}
                style={{ backgroundColor: role === 'instructeur' ? '#e01010' : '#ffffff', color: role === 'instructeur' ? '#ffffff' : '#007bff' }}
              >
                Instructeur
              </MDBBtn>
            </div>

            {/* Formulaire de connexion */}
            <div className="mb-3">
              <label htmlFor="form2Example1" className="form-label">Email address</label>
              <MDBInput
                name='email'
                className='form-control'
                size='sm'
                type='email'
                id='form2Example1'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="form2Example2" className="form-label">Password</label>
              <MDBInput
                name='mots_de_passe'
                className='form-control'
                size='sm'
                type='password'
                id='form2Example2'
                value={formData.mots_de_passe}
                onChange={handleChange}
              />
            </div>

            <MDBBtn type='submit' className={`mb-3 ${role === 'participant' ? 'participant-button' : 'instructeur-button'}`} style={{ backgroundColor: role === 'instructeur' ? '#e01010' : '#ffffff', color: role === 'instructeur' ? '#ffffff' : '#007bff' }} block>
              Sign in
            </MDBBtn>

            <div className='text-center'>
            <p>
                Oublier mots passe? {role === 'participant' ? (
                  <Link to='/ResetPasswordPage'>ResetPasswordPage</Link>
                ) : (
                  <Link to='/ResetPasswordPageI'>ResetPasswordPage</Link>
                )}
              </p>
              <p>
                Not a member? {role === 'participant' ? (
                  <Link to='/ParticipantRegister'>Register as a Participant</Link>
                ) : (
                  <Link to='/Register'>Register as an Instructeur</Link>
                )}
              </p>

              <p>Login as: {role === 'participant' ? 'Participant' : 'Instructeur'}</p>
              <p>or sign up with:</p>

              <MDBBtn floating color='secondary' className='mx-1'>
                <FontAwesomeIcon icon={faFacebookF} />
              </MDBBtn>

              <MDBBtn floating color='secondary' className='mx-1'>
                <FontAwesomeIcon icon={faGoogle} />
              </MDBBtn>

              <MDBBtn floating color='secondary' className='mx-1'>
                <FontAwesomeIcon icon={faTwitter} />
              </MDBBtn>

              <MDBBtn floating color='secondary' className='mx-1'>
                <FontAwesomeIcon icon={faGithub} />
              </MDBBtn>
            </div>
          </form>
          <ToastContainer />
        </MDBCardBody>
      </MDBCard>
    </div>
    // </div>
  );
};

export default Login;
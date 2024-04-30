import React, { useEffect, useState } from 'react'
import '../composant/nav.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Card, Avatar, Typography, Modal, Button } from '@mui/material';

const Navbar = ({ reloadnavbar, isLoggedIn, setLoggedIn, role }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cartquantity, setcartquantity] = useState(0)
    const [tokenDefined, setTokenDefined] = useState(false); // State to track whether token is defined
    const [instructeurData, setInstructeurData] = useState(null); // State for instructeurData
    const [searchResults, setSearchResults] = useState([]);
    const history = useHistory(); 
    const instructeurDataa = JSON.parse(localStorage.getItem('instructeurData'));
    const participantData = JSON.parse(localStorage.getItem('participantData'));

    const handleLogout = () => {
        // Supprimer le jeton d'authentification du localStorage ou d'un autre emplacement de stockage
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
        localStorage.removeItem('participantData');
        localStorage.removeItem('instructeurData');
        setLoggedIn(false);

        history.push('/login');
    };

    const getcarttotalitems = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (cart) {
            let total = 0
            cart.forEach(item => {
                total += item.quantity
            })
            setcartquantity(total)
        }
        else {
            setcartquantity(0)
        }
    }

    useEffect(() => {
        getcarttotalitems()



    }, [reloadnavbar])

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/formationP/searchFormationsByDomaine?titre=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Erreur lors de la recherche de formations par titre:', error);
        }
    };




    const [shows3, setshows3] = useState(false)
    return (
        <nav>
            <div className='s1'>
                <img src='/images/logo.png' alt='logo' className='logo' />


                <div className='searchbar'>
        <input 
          type="text" 
          placeholder="Rechercher..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
      {/* Afficher les résultats de la recherche */}
      {/* <div className="search-results">
                <h2>Résultats de la recherche :</h2>
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>
                            <h3>{result.titre}</h3>
                            <p>{result.description}</p>
                        </li>
                    ))}
                </ul>
            </div> */}
               {isLoggedIn && (
                    <div className='right'>
                        <Dropdown>
                            <Dropdown.Toggle variant='' id='dropdown-basic' style={{ borderRadius: "50%", overflow: "hidden" }}>
                                {role === 'instructeur' && instructeurDataa && instructeurDataa.Avatar ? (
                                    <Avatar src={`http://localhost:3000/uploads/${instructeurDataa.Avatar}`} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                ) : role === 'participant' && participantData && participantData.Avatar ? (
                                    <Avatar src={`http://localhost:3000/uploads/${participantData.Avatar}`} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                )}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {role === 'instructeur' && <Dropdown.Item as={Link} to={{ pathname: `/UserProfile`, state: { instructeurData: JSON.parse(localStorage.getItem('instructeurData')) } }}>
                                    Profil
                                </Dropdown.Item>}
                                {role === 'participant' && <Dropdown.Item as={Link} to={{ pathname: `/UserProfileParticipant`, state: { participantData: JSON.parse(localStorage.getItem('participantData')) } }}>
                                    Profil
                                </Dropdown.Item>}
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
            </div>
            <div className='s2'>
                <Link to='/'>
                    <a>Home</a>
                </Link>
                <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                        Consulter
                    </Dropdown.Toggle>

                    <Dropdown.Menu>      
                    
                    <Dropdown.Item href="/Tous"> Tous</Dropdown.Item>  
                    <Dropdown.Item href="/InstructorChart"> InstructorChart</Dropdown.Item>  
                    <Dropdown.Item href="/statiqueAdmin"> statiqueAdmin</Dropdown.Item>  
                    <Dropdown.Item href="/tableau"> tableau</Dropdown.Item>  
                    <Dropdown.Item href="/ListeFormationAdmin"> ListeFormationAdmin</Dropdown.Item>  
                    <Dropdown.Item href="/ListeRessourceAdmin"> ListeRessourceAdmin</Dropdown.Item>  
                    <Dropdown.Item href="/ListecourAdmin"> ListecourAdmin</Dropdown.Item>     
                    <Dropdown.Item href="/ProfilParticipant"> ProfilParticipant</Dropdown.Item>    
                    <Dropdown.Item href="/YourComponent"> YourComponent</Dropdown.Item>    
                    <Dropdown.Item href="/ListeParticipantsAdmin"> ListeParticipantsAdmin</Dropdown.Item>   
                    <Dropdown.Item href="/ListeInstructeursAdmin"> ListeInstructeursAdmin</Dropdown.Item>   
                    <Dropdown.Item href="/ProfilePage"> ProfilePage</Dropdown.Item>   
                    <Dropdown.Item href="/DashboardPage"> DashboardPage</Dropdown.Item>   
                    <Dropdown.Item href="/DashboardContent"> DashboardContent</Dropdown.Item> 
                    <Dropdown.Item href="/Sidebar"> Sidebar</Dropdown.Item> 
        
                    <Dropdown.Item href="/ListerAdmin"> ListerAdmin</Dropdown.Item>      
                    <Dropdown.Item href="/ListPublicationAdmin"> ListPublicationAdmin</Dropdown.Item>  
                    <Dropdown.Item href="/RessourceListAdmin"> RessourceListAdmin</Dropdown.Item> 
                    <Dropdown.Item href="/CoursListAdmin"> CoursAdmin</Dropdown.Item>
                    <Dropdown.Item href="/FormationAdmin"> FormationAdmin</Dropdown.Item>
                    <Dropdown.Item href="/loginAdmin"> loginAdmin</Dropdown.Item>
                    <Dropdown.Item href="/PublicationsList"> PublicationsList</Dropdown.Item> 
                  
                   
                    <Dropdown.Item href="/ECommerce"> ECommerce</Dropdown.Item>
                    <Dropdown.Item href="/ListeInstructeur"> ListeInstructeur</Dropdown.Item>
                   
                        <Dropdown.Item href="/CoursGList"> CoursGList</Dropdown.Item>
                        <Dropdown.Item href="/FormationsList">FormationsList </Dropdown.Item>
                        <Dropdown.Item href="/RessourceList"> RessourceList</Dropdown.Item>
                      
                    </Dropdown.Menu>
                </Dropdown>
                <Link to='/aboutnous'>
                    <a>About Us</a>
                </Link>
                <Link to='/contact'>
                    <a>Contact Us</a>
                </Link>
                <Link to='/login'>
    {isLoggedIn ? null : <a>Ce connecter</a>}
</Link>

                {/* <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                        Profil
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/UserProfile">Profil Instructeur</Dropdown.Item>
                        <Dropdown.Item href="/UserProfileParticipant">Profil Participant</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown> */}
            </div>

            {
                shows3 ?
                    <div className='s3'>
                        <div className='s31'>
                            <img src='../../public/images/logo.png' alt='logo' className='logo' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => setshows3(!shows3)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <div className='searchbar'>
                            <input typ="text" placeholder="Search for products and categries" className='search' />

                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>

                            </button>
                        </div>

                        <ul className='s32'>
                            <li>
                                <Link to='/HomeFinal'
                                    className='stylenone'
                                >
                                    Home
                                </Link>
                            </li>
                            {/* 
                            <li><Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    Categories
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Fresh Vegetables</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Fresh Fruits</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">House Cleaning</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></li> */}

                            <li> <Link to='/Contact' className='stylenone'>
                                <a>About Us</a>
                            </Link></li>

                            <li> <Link to='/contact' className='stylenone'>
                                <a>Contact Us</a>
                            </Link></li>

                            <li>
                                <div className='cart'>

                                    <span className='qty'>{cartquantity}</span>
                                    <Link to='/cart'
                                        className='stylenone'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                    </Link>

                                </div>
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/login">Login</Dropdown.Item>
                                        <Dropdown.Item href="/signup">Signup</Dropdown.Item>
                                        <Dropdown.Item href="/user/accountsettings">Profile</Dropdown.Item>
                                        <Dropdown.Item href="#">Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>

                            <li>
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        More
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/FAQ">FAQ</Dropdown.Item>
                                        <Dropdown.Item href="/privacypolicy">Privacy Policy</Dropdown.Item>
                                        <Dropdown.Item href="/termsandconditions">
                                            Terms & Conditions
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                    :
                    <div className='s3'>
                        <div className='s31'>
                            <img src='../../public/images/logo.png' alt='logo' className='logo' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                                onClick={() => setshows3(!shows3)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                        </div>
                    </div>
            }
        </nav>
    )
}

export default Navbar;

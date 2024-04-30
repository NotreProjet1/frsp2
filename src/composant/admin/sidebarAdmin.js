import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Divider, TextField, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'; // Icône pour réduire/développer le sidebar
import DashboardIcon from "@material-ui/icons/Dashboard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  sidebar: {
    backgroundColor: "#333", // Fond gris foncé pour le mode nuit
    width: "250px",
    height: "100%",
    borderRight: "1px solid #e0e0e0",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundImage: "url('https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-lumineux-leger-ville-route.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", // Image de fond
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "width 0.3s ease",
    overflowX: "hidden",
    filter: "brightness(70%)", // Filtrer la luminosité de l'image à 50%
  },
  collapsedSidebar: {
    width: "70px",
  }, 
  list: {
    paddingTop: "10px"
  },
  list: {
    paddingTop: "10px"
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#444", // Légèrement plus foncé pour l'effet au survol
    }
  },
  searchA: {
    margin: "20px 10px",
    marginTop: "-40px",
    borderBottom: "1px  red", // Ligne de bordure rouge par défaut
    backgroundColor: "transparent", // Arrière-plan transparent
  },
  icon: {
    color: "#fff", // Couleur de l'icône par défaut (blanc)
    transition: "color 0.3s ease", // Transition pour l'animation de la couleur de l'icône
  },
  logo: {
    display: "block",
    margin: "20px auto",
    width: "150px",
    height: "auto",
  },
  whiteText: {
    color: "#fff", // Couleur du texte blanc
  },
}));

const Sidebar = ({ onSidebarItemClick }) => {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userProfileSelected, setUserProfileSelected] = useState(false);
  const [demandeSelected, setDemandeSelected] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSelectChange = (option) => {
    setUserProfileSelected(option === "userProfil" ? !userProfileSelected : false);
    setDemandeSelected(option === "demander" ? !demandeSelected : false);
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  return (
    <div className="imagge"> 
    <div className={`${classes.sidebar} ${!sidebarOpen && classes.collapsedSidebar}`}>
      <IconButton onClick={toggleSidebar}>
        <MenuIcon className={`${classes.icon} ${classes.whiteText}`} />
      </IconButton>
      {sidebarOpen && (
        <>
          <img className={classes.logo} src='/images/logo.png' alt="Logo" />
          <TextField
            className={classes.searchA}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
            onClick={handleSearchClick}
          />
        </>
      )}
      <List className={classes.list}>
      <ListItem button  className={classes.listItem} onClick={() => onSidebarItemClick("tableau")}>
          <ListItemText primary="tableau"  className={classes.whiteText} /> 
        </ListItem>
        
        <ListItem button  className={classes.listItem} onClick={() => onSidebarItemClick("ListeInstructeursAdmin")}>
          <ListItemText primary="ListeInstructeursAdmin" className={classes.whiteText} /> 
        </ListItem>
        <Divider />
        <ListItem button className={classes.listItem} onClick={() => onSidebarItemClick("loginAdmin")}>
          <ListItemText primary="loginAdmin" className={classes.whiteText} /> 
        </ListItem>
        {userProfileSelected && sidebarOpen && (
          <>
            <ListItem button className={classes.listItem}>
              <a href="/ListeParticipantsAdmin">
                <ListItemText primary="ProfilParticipant" />
              </a>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <a href="/instructeur">
                <ListItemText primary="Instructeur" />
              </a>
            </ListItem>
          </>
        )}
        <ListItem button className={classes.listItem} onClick={() => handleSelectChange("demander")}>
          <AddIcon className={`${classes.icon} ${classes.whiteText}`} />
          {sidebarOpen && <ListItemText primary="Demander" className={classes.whiteText} />}
        </ListItem>
        {demandeSelected && sidebarOpen && (
          <>
            <ListItem button className={classes.listItem} onClick={() => handleSelectChange("ListeParticipantsAdmin")}>
              <a href="/ListeParticipantsAdmin">
                <ListItemText primary="ListeParticipantsAdmin " className={classes.whiteText} />
              </a>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <a href="/cours">
                <ListItemText primary="Cours" />
              </a>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <a href="/ressource">
                <ListItemText primary="Ressource" />
              </a>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <a href="/publication">
                <ListItemText primary="Publication" />
              </a>
            </ListItem>
          </>
        )}
        <Divider />
        <ListItem button className={classes.listItem}>
          <SupervisorAccountIcon className={`${classes.icon} ${classes.whiteText}`} />
          {sidebarOpen && <ListItemText primary="SuperAdmin" className={classes.whiteText} />}
        </ListItem>
        <ListItem button className={classes.listItem}>
          <FormatListBulletedIcon className={`${classes.icon} ${classes.whiteText}`} />
          {sidebarOpen && <ListItemText primary="Table Liste" className={classes.whiteText} />}
        </ListItem>
      </List>
    </div>
    </div>
  );
};

export default Sidebar;

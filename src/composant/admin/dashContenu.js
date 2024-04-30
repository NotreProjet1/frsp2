import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import FormationAdmin from "./formationAdmin";
import LoginAdmin from "./login";
import NotificationAdmin from "./NotificationAdmin";
import ListeInstructeursAdmin from "./Profilinstructeur/ListProfilInstrcuteur";
import ListeParticipantsAdmin from "./listParticipantAdmin";
import Tableau from "./tableauInstrcut";


const DashboardContent = ({ selectedContent , demandeSelected }) => {
  return (
    <Grid container spacing={3}>
      {selectedContent === "tableau" && (
        <Grid item xs={12}>
          <Tableau />
        </Grid>
      )} 
         {selectedContent === "loginAdmin" && (
        <Grid item xs={12}>
          <LoginAdmin />
        </Grid>
      )}
         {selectedContent === "ListeInstructeursAdmin" && (
        <Grid item xs={12}>
          <ListeInstructeursAdmin />
        </Grid>
      )}
         {selectedContent === "ProfilParticipant" && (
        <Grid item xs={12}>
          <ListeParticipantsAdmin />
        </Grid>
      )}
      {demandeSelected === "ListeParticipantsAdmin" && (
        <Grid item xs={12}>
          <ListeParticipantsAdmin />
        </Grid>
      )}
      {/* Ajoutez ici d'autres conditions pour chaque contenu */}
    </Grid>
  );
};

export default DashboardContent;

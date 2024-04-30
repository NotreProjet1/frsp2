import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Sidebar from "../admin/sidebarAdmin";
import DashboardContent from "../admin/dashContenu";

const Dashboard = () => {
  // État pour suivre le contenu sélectionné dans la barre latérale
  const [selectedContent, setSelectedContent] = useState("dashboard");

  // Fonction pour mettre à jour le contenu sélectionné lors du clic sur un lien dans la barre latérale
  const handleSidebarItemClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        {/* Barre latérale */}
        <Sidebar onSidebarItemClick={handleSidebarItemClick} />
      </Grid>
      <Grid item xs={8}>
        {/* Contenu principal */}
        <DashboardContent selectedContent={selectedContent} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

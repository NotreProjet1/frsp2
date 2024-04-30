import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Importer les composants nécessaires depuis recharts
import { Card } from 'antd'; // Importer le composant Card depuis 'antd'

const { Meta } = Card;

const InstructorChart = () => {
  const [instructorData, setInstructorData] = useState([]); // État pour stocker les données des instructeurs
  const [participantData, setParticipantData] = useState([]); // État pour stocker les données des participants

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données des instructeurs depuis l'API
        const instructorResponse = await axios.get('http://localhost:3000/Admin/instructor-count-by-week');
        // Récupérer les données des participants depuis l'API
        const participantResponse = await axios.get('http://localhost:3000/Admin/participant-count-by-week');
        // Mettre à jour l'état des données des instructeurs avec les données récupérées
        setInstructorData(instructorResponse.data.data);
        // Mettre à jour l'état des données des participants avec les données récupérées
        setParticipantData(participantResponse.data.data);
      } catch (error) {
        // Gérer les erreurs de récupération des données
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    // Appeler la fonction fetchData lors du premier rendu
    fetchData();
  }, []);

  return (
    <div style={{ background: '#111', padding: '30px' }}>
      {/* Carte contenant le graphique */}
      <Card
        title={<span style={{ color: '#fff', fontWeight: 'bold' }}>Augmentation des instructeurs et des participants par semaine</span>} // Titre de la carte
        bordered={false} // Désactiver les bordures de la carte
        style={{ width: 800, background: '#222', color: '#fff' }} // Style de la carte
      >
        {/* Graphique de ligne */}
        <LineChart width={800} height={400} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          {/* Grille cartésienne */}
          <CartesianGrid strokeDasharray="3 3" stroke="#333" /> {/* Ajouter une grille cartésienne */}
          {/* Axe X */}
          <XAxis dataKey="week" type="number" label={{ value: 'Semaine', position: 'insideBottomRight', offset: -10, fill: '#fff' }} /> {/* Ajouter un axe X */}
          {/* Axe Y */}
          <YAxis label={{ value: 'Nombre de comptes', angle: -90, position: 'insideLeft', fill: '#fff' }} /> {/* Ajouter un axe Y */}
          {/* Infobulle */}
          <Tooltip
            wrapperStyle={{ background: '#555', color: '#fff' }} // Style de l'infobulle
            contentStyle={{ background: '#555', border: 'none', borderRadius: '5px', padding: '5px' }} // Style du contenu de l'infobulle
            labelStyle={{ color: '#fff' }} // Style de l'étiquette de l'infobulle
            formatter={(value, name, props) => { // Formatter le contenu de l'infobulle
              return [
                <span style={{ color: '#00FFFF', fontWeight: 'bold' }}>Participants: {value}</span>, // Afficher le nombre de participants
                <span style={{ color: '#FF4500', fontWeight: 'bold' }}>Instructeurs: {value}</span>, // Afficher le nombre d'instructeurs
              ];
            }}
          />
          {/* Légende */}
          <Legend wrapperStyle={{ color: '#fff' }} /> {/* Style de la légende */}
          {/* Ligne pour les instructeurs */}
          <Line type="monotone" data={instructorData} dataKey="count" stroke="#00FFFF" name={<span style={{ color: '#00FFFF' }}>Instructeurs</span>} /> {/* Ajouter une ligne pour les instructeurs */}
          {/* Ligne pour les participants */}
          <Line type="monotone" data={participantData} dataKey="count" stroke="#FF4500" name={<span style={{ color: '#FF4500' }}>Participants</span>} /> {/* Ajouter une ligne pour les participants */}
        </LineChart>
      </Card>
    </div>
  );
};

export default InstructorChart;

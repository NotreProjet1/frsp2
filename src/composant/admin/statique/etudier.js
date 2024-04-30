import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent } from '@material-ui/core';

const TotalChart = () => {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Admin/getTotalP');
        setCounts(response.data.counts);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  // Couleurs vives pour les sections du PieChart
  const COLORS = ['#00FFFF', '#FF4500', '#FFA500']; // Ajout d'une nouvelle couleur pour les ressources

  return (
    <Card style={{ width: '800px', background: '#222', color: '#fff' }}>
      <CardContent>
        <h1>Nombres totaux de cours, formations et ressources</h1>
        <PieChart width={600} height={400}>
          <Pie
            data={counts}
            cx={300}
            cy={200}
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
          >
            {counts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default TotalChart;

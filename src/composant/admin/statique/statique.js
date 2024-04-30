import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Card, Row, Col } from 'antd';

const COLORS = ['#00FFFF', '#FF6347', '#FFD700']; // Couleurs vives assorties pour les cellules

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text x={x} y={y} fill="black" fontSize={10} textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const StatiqueAdmin = () => {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Admin/totals');
        setCounts(response.data.counts);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center', background: '#111', padding: '30px' }}>
      <h1 style={{ color: '#fff' }}>Statistiques des Utilisateurs</h1>
      <Card style={{ width: 500, margin: '0 auto', background: '#222', color: '#fff' }}>
        <Row gutter={[16, 16]}>
          {counts.map((entry, index) => (
            <Col key={index} span={8}>
              <h3 style={{ color: COLORS[index % COLORS.length] }}>{entry.name}</h3>
              <h2 style={{ color: COLORS[index % COLORS.length] }}>{entry.value}</h2>
            </Col>
          ))}
        </Row>
        <PieChart width={400} height={400}>
          <Pie
            data={counts}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {counts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </Card>
    </div>
  );
};

export default StatiqueAdmin;

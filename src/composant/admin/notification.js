import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  notification: {
    position: 'fixed',
    top: 10,
    right: 10,
    zIndex: 9999, // Pour s'assurer que le message de notification est au-dessus de tout le reste
  },
});

const YourComponent = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [error, setError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get('http://localhost:3000/coursgratuis/notificationLastCours');
        const data = response.data;
        if (data.success) {
          setNotificationMessage(data.message);
          setNotificationOpen(true);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching notification:', error);
        setError('Erreur lors de la récupération des notifications.');
      }
    };

    fetchNotification();
  }, []);

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <div className={classes.notification}>
      <Snackbar open={notificationOpen} autoHideDuration={3600000} onClose={handleCloseNotification}>
        <MuiAlert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
          {notificationMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default YourComponent;

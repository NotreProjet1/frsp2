import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  notification: {
    position: 'fixed',
    top: 10,
    right: 10,
  },
});

const NotificationAdmin = ({ open, handleClose, notificationMessage }) => {
  const classes = useStyles();

  return (
    <div className={classes.notification}>
      <Snackbar open={open} autoHideDuration={3600000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {notificationMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default NotificationAdmin;

import React, { Fragment } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export const CustomSnack = ({ snackBar = {}, handleSnackClose = () => '', props }) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: snackBar.vertical,
          horizontal: snackBar.horizontal
        }}
        key={`${snackBar.vertical},${snackBar.horizontal}`}
        open={snackBar.open}
        autoHideDuration={snackBar.duration}
        onClose={handleSnackClose}>
        <Alert severity={snackBar.state || 'error'}>{snackBar.message}</Alert>
      </Snackbar>
    </Fragment>
  );
};


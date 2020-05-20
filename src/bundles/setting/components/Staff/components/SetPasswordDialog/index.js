import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SetPasswordDialogStyles } from './index.style'
import FormBuilder from 'bundles/patient/components/custom/formBuilder';

export const SetPasswordDialog = ({ open, handleSubmit, handleClose }) => {
  const classes = SetPasswordDialogStyles()
  const [formState, setFormState] = useState({})
  const onSave = () => {
    if (!formState.password) return;
    handleSubmit(formState.password);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.MainContainer}
        aria-labelledby="form-dialog-title">
        <DialogContent className={classes.ContentContainer}>
          <FormBuilder
            formInput={{
              type: 'text',
              label: 'Password',
              key: 'password',
              labelDirection: 'column',
            }}
            formState={formState}
            setFormState={setFormState}
          />
        </DialogContent>
        <DialogActions className={classes.DialogAction}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

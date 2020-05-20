import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { SetPasswordDialogStyles } from './index.style'
import FormBuilder from 'bundles/patient/components/custom/formBuilder';

export const SetPasswordDialog = ({ open, handleSubmit, handleClose }) => {
  const classes = SetPasswordDialogStyles()
  const [formState, setFormState] = useState({})
  const onSave = () => {
    if (!formState.password) return;
    handleSubmit(formState.password);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        classes={{
          paper: classes.dialog,
          root: classes.dialogRoot,
          container: classes.dialogContainer
        }}
        maxWidth={'sm'}
        aria-labelledby="form-dialog-title">
        <DialogContent>
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
        <DialogActions>
          <Button
            // fullWidth={true}
            variant="contained"
            onClick={handleClose}
            classes={{
              root: classes.secondaryButton,
              focusVisible: classes.secondaryButton
            }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onSave}
            classes={{ root: classes.primaryButton }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

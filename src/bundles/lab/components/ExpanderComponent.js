import React, { useState } from 'react';
import classnames from 'classnames';
import FormBuilder from 'bundles/patient/components/custom/formBuilder';
import { Button, Grid } from '@material-ui/core';

const RenderCollapsibleComponent = ({ row, classes, saveNote, saveResult }) => {
  const [formState, setFormState] = useState({
    [`${row.id}-nodeId`]: row.nodeId,
    [`${row.id}-specimen`]: row.specimenType,
    [`${row.id}-notes`]: row.specimenNote,
    [`${row.id}-id`]: row.id,
    row: row
  });

  const parseForm = value => {
    setFormState({ ...formState, ...value });
  };

  const addSpecimenNote = f => {
    saveNote(formState);
  };

  const saveData = () => {
    saveResult(formState);
  };

  return (
    <Grid container>
      <form className={classes.form}>
        <Grid spacing={1} direction="row" container>
          <Grid item xs={4}>
            <FormBuilder
              formInput={{
                type: 'select',
                label: 'Specimen',
                key: `${row.id}-specimen`,
                labelDirection: 'column',
                fields: ['Nasal swab']
              }}
              setFormState={parseForm}
              formState={formState}
            />
          </Grid>
          <Grid item xs={row.specimenType ? 5 : 8}>
            <FormBuilder
              formInput={{
                type: 'text',
                labelDirection: 'column',
                key: `${row.id}-notes`,
                placeholder: row.specimenNotes
                  ? row.specimenNotes
                  : 'Enter notes here...',
                label: 'Notes'
              }}
              setFormState={parseForm}
              formState={formState}
            />
          </Grid>
          {row.specimenType ? (
            <Grid item xs={3}>
              <FormBuilder
                formInput={{
                  type: 'select',
                  label: 'Result',
                  key: `${row.id}-result`,
                  labelDirection: 'column',
                  fields: ['POSITIVE', 'NEGATIVE']
                }}
                setFormState={parseForm}
                formState={formState}
              />
            </Grid>
          ) : null}
        </Grid>
        <Grid container justify="flex-end">
          <Button size="large" className={classes.formButton}>
            Cancel
          </Button>
          <Button
            size="large"
            onClick={() =>
              row.specimenType
                ? saveData(formState)
                : addSpecimenNote(formState)
            }
            className={classnames(classes.formButton, classes.formButtonTS)}>
            {row.specimenType ? 'Submit Test' : 'Recieved Sample'}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default RenderCollapsibleComponent;

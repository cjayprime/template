import React from 'react';
import {
  FormControl,
  Input,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Arrow from '@material-ui/icons/ChevronRight';
import { connect } from 'react-redux';
import { useStyles } from 'bundles/patient/components/custom/filter/index.style';
import { searchText } from 'bundles/patient/actions';

const showEnter = classes => (
  <IconButton className={classes.roundedButton}>
    <Arrow className={classes.roundedIcon} />
  </IconButton>
);

const showClose = () => (
  <IconButton>
    <CloseIcon />
  </IconButton>
);

const Search = ({ setSearch }) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth style={{marginBottom: 20}}>
      <Input
        className={classes.input}
        onChange={e => setSearch(e.target.value)}
        classes={{
          underline: classes.underline
        }}
        placeholder={'Search Patient by Epid number, Name, Email or Phone Number'}
        disableUnderline={false}
        startAdornment={
          <InputAdornment className={classes.iconMargin} position="start">
            <SearchIcon className={classes.searchIcon} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment className={classes.endIcon} position="end">
            <IconButton>
              <CloseIcon className={classes.searchIcon} />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

const mapDispatchToProps = dispatch => ({
  setSearch: value => dispatch(searchText(value))
});

export default connect(null, mapDispatchToProps)(Search);

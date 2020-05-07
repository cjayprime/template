import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  filterSelected: {
      borderColor: 'rgb(189, 184, 217)',
      border: '1px solid',
      color: '#fff'
  },
  filterNonSelected: {
    color: '#fff'
  },
  navBarDefault: {

  },
  filterContainer: {
     width: '50%',
  },
  searchContainerDiv : {
    width: '20%',
  }
}));


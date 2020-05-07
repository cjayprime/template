import { makeStyles } from '@material-ui/core/styles';

const SHADOW_BACKDROP = '#282A3D';
export const DataContainerStyles = makeStyles(theme => ({
  BaseContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    justifyContent: 'center',
    alignItems: 'center',
    height: '130px',
    width: '90%',
    paddingTop: '5%',
    marginRight: `${theme.spacing(1.5)}px`,
    backgroundColor: '#3A3C4F',
    boxShadow: `5px 5px 10px 10px ${SHADOW_BACKDROP}`
  }
}));

export const DataContainerWithMetadataStyles = makeStyles(theme => ({
  OverviewInfoContainer: {
    color: 'white'
  },
  OverviewFlexContainer: {
    flexFlow: 'row'
  },
  SummaryBoxTitle: {
    width: '150px',
    fontWeight: '500',
    fontSize: '13.5px'
  },
  SummaryBoxCaption: {
    width: '150px',
    fontSize: '11.5px'
  },
  SummaryHeaderContainer: {
    position: 'absolute',
    left: '20px'
  },
  EntryContainer: {
    fontSize: '12px',
    width: '200px !important',
    marginTop: '4px'
  },
  EntryKey: {},
  EntryValue: {
    fontWeight: 'bold',
    position: 'relative',
    right: '20px'
  },
  EntryHolder: {
    position: 'absolute',
    bottom: '10px',
    left: '20px',
    justifyContent: 'space-evenly'
  }
}));

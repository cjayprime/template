import { makeStyles } from '@material-ui/core/styles';

const SHADOW_BACKDROP = '#282A3D';
export const DataContainerStyles = makeStyles(theme => ({
  BaseContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '100%',
    padding: 10,
    backgroundColor: '#3A3C4F',
    boxShadow: `5px 5px 10px 10px ${SHADOW_BACKDROP}`
  }
}));

export const DataContainerWithMetadataStyles = makeStyles(theme => ({
  OverviewInfoContainer: {
    color: 'white',
    height: '100%'
  },
  OverviewFlexContainer: {
    flexFlow: 'row'
  },
  SummaryBoxTitle: {
    // width: '150px',
    fontWeight: '500',
    // fontSize: '13.5px'
  },
  SummaryBoxCaption: {
    // width: '150px',
    // fontSize: '11.5px'
  },
  SummaryHeaderContainer: {
    // padding: 10,
    // paddingBottom: 0,
    // position: 'absolute',
    // left: '20px'
  },
  EntryContainer: {
    fontSize: '12px',
    marginTop: '4px'
  },
  EntryKey: {},
  EntryValue: {
    fontWeight: 'bold'
  },
  EntryHolder: {
    // position: 'absolute',
    // bottom: '10px',
    // left: '20px',
    justifyContent: 'space-evenly'
  }
}));

import { makeStyles } from '@material-ui/core/styles';

const SHADOW_BACKDROP = '#282A3D';
export const DataContainerStyles = makeStyles(theme => ({
  BaseContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    padding: 10,
    backgroundColor: '#fff',
    boxShadow: `0px 4px 8px 0px #CACACA`
  }
}));

export const DataContainerWithMetadataStyles = makeStyles(theme => ({
  OverviewInfoContainer: {
    height: '100%'
  },
  OverviewFlexContainer: {
    flexFlow: 'row'
  },
  SummaryBoxTitle: {
    fontWeight: '500'
  },
  SummaryBoxCaption: {},
  SummaryHeaderContainer: {},
  EntryContainer: {
    fontSize: '12px',
    marginTop: '4px'
  },
  EntryKey: {},
  EntryValue: {
    fontWeight: 'bold'
  },
  EntryHolder: {
    justifyContent: 'space-evenly'
  }
}));

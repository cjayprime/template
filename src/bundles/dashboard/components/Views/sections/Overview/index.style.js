import { makeStyles } from '@material-ui/core/styles';
const SHADOW_BACKDROP = '#282A3D';

export const OverviewPageStyles = makeStyles(theme => ({
  BaseContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
    marginRight: `${theme.spacing(1.5)}px`,
    backgroundColor: '#fff',
    boxShadow: `0px 4px 8px 0px #cacaca`
  },
  dataCardRow: {},
  dataCard: {
    padding: 20
  },
  PageItem: {
    marginBottom: '1%'
  },
  SectionTwo: {},
  LargeSummaryHolder: {},
  LargeEntryHolder: {},
  EpidInfoContainer: {
    marginTop: '2%'
  },
  EpidInfoLegend: {
    height: '100%',
    position: 'relative'
  },
  TableContainer: {
    height: '100%',
    paddingTop: '0'
  },
  Table: {
    backgroundColor: '#fff'
  },
  TableCell: {
    fontSize: '11.5px',
    color: '#685E5E'
  },
  BaseSection: {
    height: '100%'
  },
  ConfirmedCasesSection: {
    marginBottom: '2%'
  },
  DailyAdmissionsSection: {},
  AdmissionLegend: {
    position: 'relative',
    width: '10%',
    right: '20%'
  }
}));

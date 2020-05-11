import { makeStyles } from '@material-ui/core/styles';
const SHADOW_BACKDROP = '#282A3D';

export const OverviewPageStyles = makeStyles(theme => ({
  BaseContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
    backgroundColor: '#3A3C4F',
    boxShadow: `5px 5px 10px 10px ${SHADOW_BACKDROP}`
  },
  dataCardRow: {
    height: 160
  },
  dataCard: {
    padding: 20
  },
  PageItem: {
    marginBottom: '1%'
  },
  SectionTwo: {
    height: '45vh'
  },
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
    backgroundColor: '#3A3C4F'
  },
  TableCell: {
    fontSize: '11.5px',
    color: 'white'
  },
  BaseSection: {
    height: '100%'
  },
  ConfirmedCasesSection: {
    height: '22vh',
    marginBottom: '2%'
  },
  DailyAdmissionsSection: {
    height: '26vh'
  },
  AdmissionLegend: {
    position: 'relative',
    width: '10%',
    right: '20%'
  }
}));

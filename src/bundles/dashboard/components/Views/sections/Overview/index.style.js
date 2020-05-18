import { makeStyles } from '@material-ui/core/styles';
const SHADOW_BACKDROP = '#282A3D';

export const OverviewPageStyles = makeStyles(theme => ({
  BaseContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
    backgroundColor: '#fff',
    boxShadow: `5px 5px 10px 10px ${SHADOW_BACKDROP}`
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
    marginBottom: '2%'
  },
  DailyAdmissionsSection: {},
  AdmissionLegend: {
    position: 'relative',
    width: '10%',
    right: '20%'
  }
}));

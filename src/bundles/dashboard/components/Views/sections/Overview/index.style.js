import { makeStyles } from '@material-ui/core/styles';
const SHADOW_BACKDROP = '#282A3D';

export const OverviewPageStyles = makeStyles(theme => ({
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
  },
  PageItem: {
    marginBottom: '3%'
  },
  SectionTwo: {
    height: '40vh'
  },
  LargeSummaryHolder: {
    left: '35px !important'
  },
  LargeEntryHolder: {
    left: '35px !important'
  },
  EpidInfoContainer: {
    height: '60%',
    marginTop: '2%'
  },
  EpidInfoLegend: {
    height: '100%',
    width: '94%',
    position: 'relative',
    left: '4.5%'
  },
  TableContainer: {
    height: '97%',
    paddingTop: '0',
    marginRight: '8%'
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

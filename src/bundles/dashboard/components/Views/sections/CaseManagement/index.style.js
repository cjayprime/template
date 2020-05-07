import { makeStyles } from '@material-ui/styles';

export const CaseManagementStyles = makeStyles(theme => ({
  CaseContainer: {},
  PageItem: {
    marginBottom: '3%',
  },
  SectionOne: {},
  SectionOneItem: {},
  SectionOneTextContainer: {
    marginBottom: '2%'
  },
  SectionOneText: {
    fontSize: '12px',
    color: 'white'
  },
  SectionOneChartContainer: {
    height: '30vh'
  },
  SectionOneChart: {
    height: 'inherit !important'
  },
  ChartFooterLegend: {
    float: 'right',
    width: '200px',
    position: 'absolute',
    right: 0
  },
  SectionTwo: {
    height: '180px',
    width: '68vw'
  },
  SectionTwoItem: {
    height: '180px',
    marginRight: `${theme.spacing(2.2)}px`
  },
  SectionTwoNode: {
    height: '180px',
    paddingTop: '5%',
    paddingLeft: '14px'
  },
  SectionTwoLegendHolder: {
    minWidth: '120px'
  },
  SectionThree: {
    width: '68vw'
  },
  SectionThreeItem: {
    marginRight: `${theme.spacing(2.2)}px`
  },

  SectionFour: {
    height: '30vh',
    width: '67vw'
  },

  ChartContainer: {
    marginRight: '2%'
  },
  SectionFourChart: {
    height: '30vh'
  }
}));

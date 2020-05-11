import { makeStyles } from '@material-ui/styles';

export const CaseManagementStyles = makeStyles(theme => ({
  CaseContainer: {},
  PageItem: {
    marginBottom: '2%'
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
    height: '180px'
  },
  SectionTwoItem: {
    height: '100%'
  },
  SectionTwoNode: {
    height: '180px',
    paddingTop: '5%',
    paddingLeft: '14px'
  },
  SectionTwoLegendHolder: {
    minWidth: '120px'
  },
  SectionThree: {},
  SectionThreeItem: {},

  SectionFour: {
    height: '30vh'
  },

  ChartContainer: {
    marginRight: '2%'
  },
  SectionFourChart: {
    height: '30vh'
  }
}));

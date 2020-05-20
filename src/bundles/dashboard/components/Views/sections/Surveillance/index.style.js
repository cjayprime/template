import { makeStyles } from '@material-ui/styles';

export const SurveillanceSectionStyles = makeStyles(theme => ({
  SurveillanceContainer: {
    height: '100%'
  },
  PageItem: {
    marginBottom: '2%'
  },
  SummaryContent: {
    // height: '5vh',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  SummaryTab: {},
  SummaryTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: '30px',
    marginRight: '2px'
  },
  SummaryText: {
    color: '#231E1E',
    fontSize: '15px',
    fontWeight: 'bold'
  },
  TvContainer: {
    borderRadius: '50px',
    // height: '30px',
    border: '.5px solid #EFA14B',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 7.5,
    paddingBottom: 7.5
  },
  TvContainerText: {
    fontSize: '15px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#EFA14B'
  },
  GapContainer: {},
  FilterContainer: {
    position: 'relative',
    top: '7px'
  },
  FilterWithRadius: {
    borderRadius: '5px'
  },
  initialSection: {
    height: '200px'
  },
  BaseSectionHolder: {},
  EpidSectionHolder: {},
  EpidContainer: {},
  SectionTwo: {
    marginTop: '1%',
    height: '250px'
  },
  SectionTwoItem: {},
  SectionTwoNode: {
    height: '250px',
    paddingTop: '5%',
    paddingLeft: '14px'
  },
  SectionTwoLegendHolder: {
    minWidth: '120px'
  },
  SectionThree: {
    height: '35vh'
  },
  SectionThreeNode: {
    height: '35vh'
  }
}));

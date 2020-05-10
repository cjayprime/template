import { makeStyles } from '@material-ui/styles';

export const SurveillanceSectionStyles = makeStyles(theme => ({
  SurveillanceContainer: {
    height: '100%'
  },
  PageItem: {
    marginBottom: '2%'
  },
  SummaryContent: {
    height: '5vh',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  SummaryTab: {},
  SummaryTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
    marginRight: '2px'
  },
  SummaryText: {
    fontSize: '12px',
    fontWeight: 'bold'
  },
  TvContainer: {
    borderRadius: '12px',
    height: '30px',
    border: '.5px solid #8E8CA790',
    justifyContent: 'center',
    alignItems: 'center'
  },
  TvContainerText: {
    fontSize: '10.5px',
    fontWeight: 'bold'
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
  BaseSectionHolder: {
    // height: '100%'
  },
  EpidSectionHolder: {
    // width: '95%'
  },
  EpidContainer: {
    // width: '90%',
    // marginLeft: '10px'
  },
  SectionTwo: {
    marginTop: '1%',
    height: '250px'
  },
  SectionTwoItem: {
    // height: '100%',
    // marginRight: `${theme.spacing(2.2)}px`
  },
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

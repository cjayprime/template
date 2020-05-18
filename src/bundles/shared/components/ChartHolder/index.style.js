import { makeStyles } from '@material-ui/styles';

const SHADOW_BACKDROP = '#282A3D';
export const ChartHolderStyles = makeStyles(theme => ({
  BaseContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    height: '100%',
    width: '100%',
    padding: '3%',
    // marginRight: `${theme.spacing(1.5)}px`,
    backgroundColor: '#3A3C4F',
    boxShadow: `0px 4px 8px 0px #CACACA`,
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  HeaderSection: {
    height: '20%',
    color: 'white'
  },
  HeaderText: {
    fontSize: '13.5px',
    fontWeight: 'bold'
  },
  HeaderLegendContainer: {
    top: '4.5px',
    position: 'relative'
  },
  FooterLegendContainer: {},
  LegendContainer: {
    width: '100%',
    justifyContent: 'center'
  },
  LegendHolder: {
    marginLeft: '-4px',
    width: '100%'
  },
  LegendIconContainer: {},
  LegendTextContainer: {},
  LegendText: {
    fontSize: '9.5px'
  },
  ChartSection: {
    height: '60%'
  },
  FooterSection: {
    height: '25%',
    position: 'absolute',
    bottom: '3px',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingBottom: '2px'
  },
  FooterTextContainer: { textAlign: 'center', paddingRight: '15px' },
  FooterText: {
    fontSize: '9.5px',
    color: 'white',
    textAlign: 'center',
    paddingRight: '15px'
  }
}));

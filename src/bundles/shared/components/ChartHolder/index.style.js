import { makeStyles } from '@material-ui/styles';

const SHADOW_BACKDROP = '#282A3D';
export const ChartHolderStyles = makeStyles(theme => ({
  BaseContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    height: '130px',
    width: '100%',
    padding: '3%',
    marginRight: `${theme.spacing(1.5)}px`,
    backgroundColor: '#3A3C4F',
    boxShadow: `5px 5px 10px 10px ${SHADOW_BACKDROP}`,
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  HeaderSection: {
    height: '20%',
    color: 'white'
  },
  HeaderText: {
    fontSize: '13.5px',
    fontWeight: 'bold',
  },
  HeaderLegendContainer: {},
  FooterLegendContainer: {},
  LegendContainer: {
    width: '100%'
  },
  LegendHolder: {
    marginLeft: '-4px'
  },
  LegendIconContainer: {},
  LegendTextContainer: {},
  LegendText: {
    fontSize: '10.5px',
    minWidth: '50px'
  },
  ChartSection: {
    height: '60%'
  },
  FooterSection: {
    height: '25%'
  },
  FooterTextContainer: {},
  FooterText: { fontWeight: '11px' }
}));

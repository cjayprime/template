import { makeStyles } from '@material-ui/core/styles';

const SHADOW_BACKDROP = '#282A3D';
export const SummaryBoxStyles = makeStyles(theme => ({
  GridContainer: {
    borderRadius: `${theme.spacing(0.7)}px`,
    justifyContent: 'center',
    alignItems: 'center',
    height: '130px',
    width: '90%',
    marginRight: `${theme.spacing(1.5)}px`,
    backgroundColor: '#fff',
    boxShadow: `0px 4px 8px 0px #cacaca`
  },
  ContainerItem: {
    fontWeight: '800'
  },
  Header: props => ({
    fontSize: `${theme.spacing(1.5)}px`,
    color:'#231E1E'
    // color: props.colors.header
  }),
  Caption: props => ({
    fontSize: `${theme.spacing(8)}px`,
    color: '#231E1E'
    // color: props.colors.caption
  })
}));

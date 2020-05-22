import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import { saveCurrentId, logout } from 'bundles/setting/actions';
import * as searchFilter from 'bundles/setting/selectors';
import navItems from 'layout-components/Sidebar/navItems';
import withSingleStaff from 'bundles/setting/hoc/withSingleStaff';
import { withRouter } from 'react-router-dom';



const AuthorizedAdvanced = ({load}) => {
    const [component, setComponent] = useState(null)

}

class Authorized extends Component {
  state = {
    component: null
  };
 
  parseRoute = () => {
    const {
      location: { pathname }
    } = this.props;

    const access = this.props.user?.userAccessLevelsByUserId?.nodes;
    let roles = [];
    if (access?.length) {
      const routes = navItems[0].content;
      roles = routes.filter(item => {
        
        if(this.props?.user?.role == 'Admin') return true

        return (
          access[0]?.[item.key] && item.key.includes(pathname.replace('/', '').toLowerCase())
        );
      });
    } else{

      const userInStore = JSON.parse(localStorage.getItem('Users::Current'))
      if(userInStore &&  userInStore.id) 
        this.props.saveId(userInStore.id)
      else {
        this.props.logOutUser(true)
      }
    }

    console.log(access)
    // TODO: dirty hack that needs to be changed, just here for temp
    if (pathname.replace('/', '') === 'CreateTriage' && access?.length && access[0]?.createTriage) {
      roles.push({
        key: "createTriage",
        to: "/CreateTriage"
      });
    }

    return roles;
  }; 


  componentWillMount() { 
    
    this.props.load().then(component => {
      const routes =  this.parseRoute();
      if(routes.length > 0) {
        this.setState(() => ({
          component: component.default ? component.default : component
        }));
      } else {

      }

    });
  }
  render() {
    return this.props.children(this.state.component);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user?.id !== this.props.id) {
      this.props.load().then(component => {
        const routes =  this.parseRoute();
        console.log(routes)
        if(routes.length > 0) {
          this.setState(() => ({
            component: component.default ? component.default : component
          }));
        } else {
  
        }
  
      });
      return true
    }
  }
}

Authorized.propTypes = {
  load: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: searchFilter.getUser(state)
});


const mapDispatchToProps = dispatch => ({
  saveId: value => dispatch(saveCurrentId(value)),
  logOutUser: value => dispatch(logout(value))
});

export default withRouter(compose(connect(mapStateToProps, mapDispatchToProps), withSingleStaff, withRouter)(Authorized))


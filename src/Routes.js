import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { withRouter } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';
import MuiTheme from './theme';
import { LeftSidebar, PresentationLayout } from './layout-blueprints';
import logo from 'images/lagos.png';
import PrivateRoute from 'bundles/routeGuard';
import Authorized from 'bundles/routeGuard/authorized';
const NOT_AUTHORIZED = 'Not Authorized to view page, Please contact Administrator'
const PatientPanel = (props) => (
  <Authorized load={() => import('bundles/patient/components/Panel')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
); 
// const CreatePatient = (props) => (
//   <Authorized load={() => import('bundles/patient/components/CreatePatient')}>
//     {Component =>
//       Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
//     }
//   </Authorized>
// );  

const CreatePatient = lazy(() => import('bundles/patient/components/CreatePatient'));

const CreateTriage = (props) => (
  <Authorized load={() => import('bundles/caseTriage/CreateTriage')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);  

const Queue =  (props) => (
  <Authorized load={() => import('bundles/queue/components/View')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);  

const Location =  (props) => (
  <Authorized load={() => import('bundles/location/components/View')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);  

const CreateLocation = (props) => (
  <Authorized load={() => import('bundles/location/components/Create')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);  

const Staff =  (props) => (
  <Authorized load={() => import('bundles/setting/components/Staff')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);  

const Kpi =  (props) => (
  <Authorized load={() => import('bundles/kpi/components/View')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);

const BedManagement =  (props) => (
  <Authorized load={() => import('bundles/bedmanagement/components/View')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);

const Appointment = (props) => (
  <Authorized load={() => import('bundles/appointment/components/View')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);

const Lab = (props) => (
  <Authorized load={() => import('bundles/lab/components/View')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);

const Dashboard = (props) => (
  <Authorized load={() => import('bundles/dashboard')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);

const CreateAppointment = (props) => (
  <Authorized load={() => import('bundles/appointment/components/create')}>
    {Component =>
      Component === null ? <p style={{color: '#fff'}}>{NOT_AUTHORIZED}</p> : <Component {...props} />
    }
  </Authorized>
);

const LoginPage = lazy(() => import('bundles/login'));

const Routes = ({ history }) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  const SuspenseLoading = () => {
    return (
      <Fragment>
        <div
          className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3"
          style={{ backgroundColor: '#2D2E42' }}>
          <div className="d-flex align-items-center flex-column px-4">
            <img src={logo} width={50} height={50} />
          </div>
          <div className="text-muted font-size-xl text-center pt-3">
            Please wait while we load your data
            <span
              style={{ color: '#fff' }}
              className="font-size-lg d-block text-dark">
              This live preview instance can be slower than a real production
              build!
            </span>
          </div>
        </div>
      </Fragment>
    );
  };
  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          <Switch>
            {<Redirect exact from="/" to="/Login" />}

            <Route path={['/Login']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/Login" component={LoginPage} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                '/Dashboard',
                '/Patient',
                '/CreatePatient',
                '/CreateTriage',
                '/Queue',
                '/Location',
                '/CreateLocation',
                '/Staff',
                '/Kpi',
                '/BedManagement',
                '/Appointment',
                '/Dashboard',
                '/Lab',
                '/CreateAppointment'
              ]}>
              <LeftSidebar history={history}>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <PrivateRoute path="/Dashboard" component={Dashboard} />
                    <PrivateRoute path="/Patient" component={PatientPanel} />
                    <PrivateRoute
                      path="/CreatePatient"
                      component={CreatePatient}
                    />
                    <PrivateRoute
                      path="/CreateTriage"
                      component={CreateTriage}
                    />
                    <PrivateRoute path="/Queue" component={Queue} />
                    <PrivateRoute path="/Location" component={Location} />
                    <PrivateRoute
                      path="/CreateLocation"
                      component={CreateLocation}
                    />
                    <PrivateRoute path="/Kpi" component={Kpi} />
                    <PrivateRoute
                      path="/BedManagement"
                      component={BedManagement}
                    />
                    <PrivateRoute path="/Staff" component={Staff} />
                    <PrivateRoute path="/Appointment" component={Appointment} />
                    <PrivateRoute
                      path="/CreateAppointment"
                      component={CreateAppointment}
                    />
                    <PrivateRoute path="/Lab" component={Lab} />
                  </motion.div>
                </Switch>
                {/* </CollapsedSidebar> */}
              </LeftSidebar>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default withRouter(Routes);

import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { withRouter } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';
import MuiTheme from './theme';
import { LeftSidebar, PresentationLayout } from './layout-blueprints';
import logo from 'images/lagos.png';

const PatientPanel = lazy(() => import('./bundles/patient/components/Panel'));
const CreatePatient = lazy(() =>
  import('./bundles/patient/components/CreatePatient')
);
const CreateTriage = lazy(() => import('./bundles/caseTriage/CreateTriage'));
const Queue = lazy(() => import('./bundles/queue/components/View'));
const Location = lazy(() => import('./bundles/location/components/View'));
const CreateLocation = lazy(() =>
  import('./bundles/location/components/Create')
);
const Staff = lazy(() => import('./bundles/setting/components/Staff'));
const Kpi = lazy(() => import('./bundles/kpi/components/View'));
const BedManagement = lazy(() =>
  import('./bundles/bedmanagement/components/View')
);
const Appointment = lazy(() => import('./bundles/appointment/components/View'));
const Lab = lazy(() => import('./bundles/lab/components/View'));
const LoginPage = lazy(() => import('./bundles/login'));
const Dashboard = lazy(() => import('./bundles/dashboard'));

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
            <Redirect exact from="/" to="/Dashboard" />

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
                '/Lab'
              ]}>
              <LeftSidebar history={history}>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/Dashboard" component={Dashboard} />
                    <Route path="/Patient" component={PatientPanel} />
                    <Route path="/CreatePatient" component={CreatePatient} />
                    <Route path="/CreateTriage" component={CreateTriage} />
                    <Route path="/Queue" component={Queue} />
                    <Route path="/Location" component={Location} />
                    <Route path="/CreateLocation" component={CreateLocation} />
                    <Route path="/Kpi" component={Kpi} />
                    <Route path="/BedManagement" component={BedManagement} />
                    <Route path="/Staff" component={Staff} />
                    <Route path="/Appointment" component={Appointment} />
                    <Route path="/Lab" component={Lab} />
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

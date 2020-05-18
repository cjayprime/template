import React, { useState } from 'react';
import { matchPath } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { List, Typography } from '@material-ui/core';

import useRouter from 'utils/useRouter';
import SidebarMenuListItem from './SidebarMenuListItem';
import { useStyles } from './index.style';

const SidebarMenuList = props => {
  const { pages, ...rest } = props;
  const [navbarHover, setNavbarHover] = useState({});
  const [activeNavbar, setActiveNavbar] = useState();
  const classes = useStyles();

  return (
    <List
      className={clsx('p-0')}
      style={{
        padding: 10
      }}
      onFocus={() => console.log('')}>
      {pages.reduce(
        (items, page, index) =>
          reduceChildRoutes({
            items,
            page,
            index,
            navbarHover,
            setNavbarHover,
            setActiveNavbar,
            activeNavbar,
            classes,
            ...rest
          }),
        []
      )}
    </List>
  );
};

SidebarMenuList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.array
};

const reduceChildRoutes = props => {
  const {
    router,
    items,
    page,
    depth,
    index,
    navbarHover,
    setNavbarHover,
    setActiveNavbar,
    activeNavbar,
    classes
  } = props;

  if (page.content) {
    const open = matchPath(router.location.pathname, {
      path: page.to,
      exact: false
    });

    items.push(
      <SidebarMenuListItem
        style={{
          padding: 10,
          cursor: 'pointer'
        }}
        depth={depth}
        onMouseEnter={() => setNavbarHover({ [`navbar-${index}`]: true })}
        onClick={() => setActiveNavbar(`navbar-${index}`)}
        onMouseLeave={() => setNavbarHover({ [`navbar-${index}`]: false })}
        className={
          navbarHover[`navbar-${index}`]
            ? classes.navBarHover
            : activeNavbar == `navbar-${index}`
            ? classes.navBarClicked
            : classes.navBarDefault
        }
        icon={page.icon}
        key={page.label}
        label={page.badge}
        open={Boolean(open)}
        textColor={( activeNavbar == `navbar-${index}`) ? '#fff' : '#A9A6A6'}
        title={page.label}>
        <div className="sidebar-menu-children py-2">
          <SidebarMenuList
            depth={depth + 1}
            pages={page.content}
            textColor={( activeNavbar == `navbar-${index}`) ? '#fff' : '#A9A6A6'}
            router={router}
          />
        </div>
      </SidebarMenuListItem>
    );
  } else {
    items.push(
      <SidebarMenuListItem
        style={{
          padding: 17,
          cursor: 'pointer'
        }}
        onMouseEnter={() => setNavbarHover({ [`navbar-${index}`]: true })}
        onClick={() => setActiveNavbar(`navbar-${index}`)}
        onMouseLeave={() => setNavbarHover({ [`navbar-${index}`]: false })}
        className={
          navbarHover[`navbar-${index}`]
            ? classes.navBarHover
            : activeNavbar == `navbar-${index}`
            ? classes.navBarClicked
            : classes.navBarDefault
        }
        depth={depth}
        href={page.to}
        icon={page.icon}
        key={page.label}
        label={page.badge}
        title={page.label}
        textColor={ ( activeNavbar == `navbar-${index}`) ? '#fff' : '#A9A6A6' }
      />
    );
  }

  return items;
};

const SidebarMenu = props => {
  const { title, pages, className, component: Component, ...rest } = props;

  const router = useRouter();

  return (
    <Component
      {...rest}
      className={clsx(className, 'app-bar-custom-background ')}>
      {title && (
        <Typography className="app-sidebar-heading">{title}</Typography>
      )}
      <SidebarMenuList depth={0} pages={pages} router={router} />
    </Component>
  );
};

SidebarMenu.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  pages: PropTypes.array.isRequired,
  title: PropTypes.string
};

SidebarMenu.defaultProps = {
  component: 'nav'
};

export default SidebarMenu;

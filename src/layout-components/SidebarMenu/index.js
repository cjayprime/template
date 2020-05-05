import React from 'react';
import { matchPath } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { List, Typography } from '@material-ui/core';

import useRouter from 'utils/useRouter';
import SidebarMenuListItem from './SidebarMenuListItem';

const SidebarMenuList = props => {
  const { pages, ...rest } = props;

  return (
    <List className={clsx('p-0')} style={{
      padding: 10,
    }} 
    onFocus={() => console.log('')}
    
    >
      {pages.reduce(
        (items, page) => reduceChildRoutes({ items, page, ...rest }),
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
  const { router, items, page, depth } = props;

  if (page.content) {
    const open = matchPath(router.location.pathname, {
      path: page.to,
      exact: false
    });

    items.push(
      <SidebarMenuListItem
      style={{
        padding: 10,
      }}
        depth={depth}
        icon={page.icon}
        key={page.label}
        label={page.badge}
        open={Boolean(open)}
        title={page.label}>
        <div className="sidebar-menu-children py-2">
          <SidebarMenuList
            depth={depth + 1}
            pages={page.content}
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
        }}
        depth={depth}
        href={page.to}
        icon={page.icon}
        key={page.label}
        label={page.badge}
        title={page.label}
      />
    );
  }

  return items;
};

const SidebarMenu = props => {
  const { title, pages, className, component: Component, ...rest } = props;

  const router = useRouter();

  return (
    <Component {...rest} className={ clsx(className, 'app-bar-custom-background ')} >
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

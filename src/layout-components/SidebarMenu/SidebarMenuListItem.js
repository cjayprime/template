import React, { useState, forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { useSubscription } from '@apollo/react-hooks';
import { Subscription } from 'react-apollo';

import { QUEUE_SUBSCRIPTION } from 'graphql/Subscription/queueSubscription';
//import withQueueSubscription from 'bundles/subscription/hoc/withQueueSubscription';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';

import { ListItem, Button, Collapse } from '@material-ui/core';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const SubRender = () => {
  return (
    <Subscription subscription={QUEUE_SUBSCRIPTION}> 
    {
      ({data}) => {
        console.log(data)
        return <p> hello  </p> 
      }
    }
    </Subscription>
  )
}

const CustomRouterLink = forwardRef(function CustomLink(props, ref) {
  return (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <RouterLink {...props} />
    </div>
  );
});

const SidebarMenuListItem = props => {
  const {
    title,
    href,
    depth,
    children,
    icon: Icon,
    textColor,
    className,
    open: openProp,
    label: Label,
    ...rest
  } = props;

  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen(open => !open);
  };

  let paddingLeft = 14;
  let paddingLeftParent = 20;

  if (depth > 0) {
    paddingLeft = 32 + 20 * depth;
    paddingLeftParent = 32 + 20 * depth;
  }

  const style = {
    paddingLeft
  };

  const parentStyle = {
    paddingLeft: paddingLeftParent
  };

  if (children) {
    return (
      <ListItem
        {...rest}
        className={clsx('app-sidebar-item', className)}
        disableGutters>
        <Button
          color="primary"
          disableRipple
          className={clsx('app-sidebar-button', { active: open })}
          onClick={handleToggle}
          style={parentStyle}>
          {Icon}
          <span style={{ color: textColor }}>{title}</span>
          {open ? (
            <ExpandLessIcon className="sidebar-expand-icon" color="inherit" />
          ) : (
            <ExpandLessIcon
              className="sidebar-expand-icon sidebar-expand-icon-rotate"
              color="inherit"
            />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  } else {
    return (
      <ListItem
        {...rest}
        className={clsx('app-sidebar-item', className)}
        disableGutters>
      <Badge color="primary" badgeContent={0}>
        <Button
          activeClassName="active-item"
          disableRipple
          disableElevation
          variant="text"
          className={clsx('app-sidebar-button-wrapper', `depth-${depth}`)}
          component={CustomRouterLink}
          exact
          style={style}
          to={href}>
          {Icon}
          <span style={{ color: textColor }}>{title}</span>
          {Label && (
            <span className="menu-item-label">
              <Label />
            </span>
          )}
        </Button>
        </Badge>

      </ListItem>
    );
  }
};

SidebarMenuListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.any,
  label: PropTypes.any,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

SidebarMenuListItem.defaultProps = {
  depth: 0,
  open: false
};

export default SidebarMenuListItem;

//export default compose(withPatient)(SidebarMenuListItem);

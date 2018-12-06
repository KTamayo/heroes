import React from 'react';

import { request_reset } from '../../store/actions/index';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import SearchBox from '../SearchBox/SearchBox';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  homeLink:{
    textDecoration: 'none', 
    color:'white',
  }, 
});

const SearchAppBar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h5" color="inherit">
            <Link to='/' className={classes.homeLink} onClick={() => props.request_reset()}>
              HeroSearch
            </Link>    
          </Typography>
          <SearchBox />          
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  request_reset,
}

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(SearchAppBar)
);
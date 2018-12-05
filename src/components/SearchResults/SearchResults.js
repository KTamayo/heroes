import React, { Fragment } from 'react';

import { select_hero } from '../../store/actions/index';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import '../../App.css';
import logo from '../../logo.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,    
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  tile: {
    border: '5px solid black',
  },
});

const TitlebarGridList = (props) => {
  const { classes } = props;
  const data = props.queryData;

  return (
    <div className={classes.root}>
      <GridList cellHeight={320}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Found these heroes!:</ListSubheader>
        </GridListTile>
        {Object.keys(data).map((key) => (
          <GridListTile
            key={key}
            rows={1}
            cols={0.3}
            onClick={() => props.select_hero(data[key])}
          >
            <Link to='/hero_detail'>
            <img
              style={{ cursor: 'pointer' }}
              src={`${data[key].thumbnail.path}/portrait_incredible.${data[key].thumbnail.extension}`}
              alt={data[key].name}
            />
            </Link>
            <GridListTileBar
              title={data[key].name}
              subtitle={<span></span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

const SearchResults = (props) => {
  let output = null;
  if (props.requestPending) {
    output = (
      <Fragment>
        <img 
          src={logo}
          alt='Loading...'
          className='App-logo'          
        />
      </Fragment>      
    )
  }
  if (props.requestSuccess) {    
    if (Object.keys(props.queryData).length === 0) {
      output = (
        <Fragment>          
          <h1>No search results matching {props.searchString}</h1>
        </Fragment>
      )
    } else {
      output = TitlebarGridList(props);
    }    
  }
  if (!props.requestPending && !props.requestSuccess) {
    output = (
      <Fragment>        
        <h1>Try searching for your favorite Marvel Heroes!</h1><br></br>
        <p>e.g. 'iron' or 'silver' or 'dead' or 'spider'</p>
      </Fragment>      
    )
  }
  if (props.requestFailure) {
    output = (
        <h1>Data request failed, try again later!</h1>
    )
  }
  return (
    <div>      
      {output}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    requestPending: state.heroes.requestPending,
    requestSuccess: state.heroes.requestSuccess,
    requestFailure: state.heroes.requestFailure,
    queryData: state.heroes.queryData,
    searchString: state.heroes.queryString,    
  };
}

const mapDispatchToProps = {
  select_hero,
}

export default withStyles(styles)(
  connect(
    mapStateToProps, 
    mapDispatchToProps,
  )(SearchResults));

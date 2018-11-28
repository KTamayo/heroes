import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from 'react-redux';

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
  gridList: {
    width: '70%',
    height: '50%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  greetingContainer: {
    display: 'flex',
  },
  greeting: {
    alignContent: 'center',
    justifyContent: 'center',
  }
});

const TitlebarGridList = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList cellHeight={600} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Found these heroes!:</ListSubheader>
        </GridListTile>
        {Object.keys((props.heroData)).map((key) => (
          <GridListTile key={key}>
            <img
              src={`${props.heroData[key].thumbnail.path}/portrait_incredible.${props.heroData[key].thumbnail.extension}`}
              alt={props.heroData[key].name} />
            <GridListTileBar
              title={props.heroData[key].name}
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
          alt='logo'
          className='App-logo'          
        />
      </Fragment>      
    )
  }
  if (props.requestSuccess) {
    // console.log(Object.keys(props.heroData).length)
    if (Object.keys(props.heroData).length === 0) {
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
    heroData: state.heroes.heroData,
    searchString: state.heroes.queryString,
  };
}
export default withStyles(styles)(connect(mapStateToProps)(SearchResults));

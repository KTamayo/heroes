import React, { Fragment } from 'react';

import { select_hero } from '../../store/actions/index';

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
  gridList: {
    width: '90%',
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


const _handleImageClick = (key, props) => {
  props.select_hero(props.queryData[key]);  
};

const TitlebarGridList = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList cellHeight={600} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Found these heroes!:</ListSubheader>
        </GridListTile>
        {Object.keys((props.queryData)).map((key) => (          
          <GridListTile key={key} onClick={() => _handleImageClick(key, props)}>
            <img              
              src={`${props.queryData[key].thumbnail.path}/portrait_incredible.${props.queryData[key].thumbnail.extension}`}
              alt={props.queryData[key].name} 
            />
            <GridListTileBar
              title={props.queryData[key].name}
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

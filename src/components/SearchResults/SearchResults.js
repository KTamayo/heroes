import React from 'react';

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
    // justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '97%',
    height: '50%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const TitlebarGridList = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Selected Heroes</ListSubheader>
        </GridListTile>
        {Object.keys((props.heroData)).map((key) => (
          <GridListTile key={key}>
            <img
              src={`${props.heroData[key].thumbnail.path}/portrait_uncanny.${props.heroData[key].thumbnail.extension}`}
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
  if (props.requestPending){
    output = (
      <img src={logo} alt='logo' className='App-logo' />
    )
  }
  if (props.requestSuccess) {
    // output = Object.keys((props.heroData)).map((key) => {
    //   return <li key={key}>{props.heroData[key].name}</li>
    // });
    output = TitlebarGridList(props);
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
    heroData: state.heroes.heroData,
  };
}
export default withStyles(styles)(connect(mapStateToProps)(SearchResults));

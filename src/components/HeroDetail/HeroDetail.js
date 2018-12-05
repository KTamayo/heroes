import React, { Fragment } from 'react';

import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper/';
import Typography from '@material-ui/core/Typography/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  rootPaper: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    // ...theme.mixins.gutters(),
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
  }
});
const HeroDetail = (props) => {  
  const { classes } = props;
  const data = props.heroData;
  const comics = data.comics.items;
  const series = data.series.items;
  const stories = data.stories.items;
  const events = data.events.items;
  const thumbnail = data.thumbnail.path;
  const portrait = 'portrait_fantastic';
  const extension = data.thumbnail.extension;
  return (
    <Fragment>
      <Avatar
        src={`${thumbnail}/${portrait}.${extension}`}
        className={classes.bigAvatar}
      />

      <h3>{data.name}</h3>

      {/* <Paper className={classes.rootPaper}>
        <Typography >
          {data.name}
        </Typography>
      </Paper> */}

      {/* <Paper className={classes.rootPaper}>
        <Typography >
          {data.description}
        </Typography>
      </Paper> */}

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Comics</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
          {Object.keys(comics).map((key) => (
            <Paper key={comics[key].name} className={classes.rootPaper}>
              <Typography>
                <ListItem>{comics[key].name}</ListItem>
              </Typography>
            </Paper>
          ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Series</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
          {Object.keys(series).map((key) => (
            <Paper key={series[key].name} className={classes.rootPaper}>
              <Typography>
                <ListItem>{series[key].name}</ListItem>
              </Typography>
            </Paper>
          ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Stories</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
          {Object.keys(stories).map((key) => (
            <Paper key={stories[key].name} className={classes.rootPaper}>
              <Typography>
                <ListItem>{stories[key].name}</ListItem>
              </Typography>
            </Paper>
          ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Events</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
          {Object.keys(events).map((key) => (
            <Paper key={events[key].name} className={classes.rootPaper}>
              <Typography>
                <ListItem>{events[key].name}</ListItem>
              </Typography>
            </Paper>
          ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    heroData: state.heroes.heroData,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(HeroDetail));
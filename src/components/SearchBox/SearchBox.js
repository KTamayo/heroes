import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import {
  save_query_data,
  save_query_string,
  request_pending,
  request_success,
  request_failure,
  request_reset,
} from '../../store/actions/index';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class SearchBox extends Component {

  apiKey = process.env.REACT_APP_MARVEL_API_KEY;
  baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
  url = '';

  _handleInput = (event) => {
    this.setState({
      inputString: event.target.value,
    })
  }

  handleQuery = async (e) => {
    if (e.key === 'Enter') {
      this.props.request_reset()
      this.props.request_pending();      
      this.url = `${this.baseURL}?nameStartsWith=${this.state.inputString.trim()}&apikey=${this.apiKey}`;
      await this._hitAPI();
      // console.log('data', this.props.heroData)
    }
  }

  _hitAPI = async () => {
    await fetch(this.url)
      .then((response) => {
        if (!response.ok){
          this.props.request_failure()
          console.log(response.statusText);
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((responseData) => {
        this.props.request_success();
        this.props.save_query_data(responseData.data.results);
        this.props.save_query_string(this.state.inputString);
      })
      .catch(error => console.log(error));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Toolbar position='static'>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={this._handleInput}
              onKeyPress={this.handleQuery}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    heroData: state.heroes.heroData,
  };
};

const mapDispatchToProps = {
  save_query_data,
  save_query_string,
  request_pending,
  request_success,
  request_failure,
  request_reset,
};

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox));

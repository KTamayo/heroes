import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import configureStore from '../../store/configureStore';
import {
  save_query_data,
  save_query_string,
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
  constructor() {
    super();
    this.state = {
      apiData: null,
      inputString: '',
      isLoading: false,
    }
    
    this.apiKey = process.env.MARVEL_API_KEY;
    this.baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
    this.url = '';    
  }

  _handleInput = (event) => {
    this.setState({
      inputString: event.target.value,
    })    
  }
  
  handleQuery = async (e) => {    
    if (e.key === 'Enter') {
      console.log('Enter was hit!');
      console.log('inputString',this.state.inputString);
      this.url = `${this.baseURL}?nameStartsWith=${this.state.inputString}&apikey=${this.apiKey}`;
      await this._hitAPI();
      this.props.save_query_data(this.state.apiData);
      this.props.save_query_string(this.state.inputString);
      console.log('urlString', this.url);
      console.log('apiData', this.state.apiData);
      console.log('state data', configureStore.getState());
    }    
  }

  _hitAPI = async () => {
    this.setState({ isLoading: true })
    await fetch(this.url)
      .then(response => response.json())
      .then(data => this.setState({ apiData: data, isLoading: false, }))
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
    queryString: state.inputString,
    heroData: state.apiData,
  };
};

const mapDispatchToProps = { 
  save_query_data, 
  save_query_string,
};

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox));
import React from 'react';
import './index.css';
import NavBar from './components/NavBar';
import Container from '@material-ui/core/Container';
import Sidebar from './components/Sidebar';
import Meals from './components/Meals';
import { withStyles } from '@material-ui/core/styles';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import clsx from 'clsx';

const Styles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  content: {
      [theme.breakpoints.up('sm')]: {
        marginTop: '100px',
      },
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
  },
  contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
  },
  '@global': {
    '.notification-container-mobile-bottom': {
        bottom: '105px',
    }
},
});


class HigherOrderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      showSidebar: false,
      searchResult: '',
      areas: [],
      categories: [],
      tags: [],
      test: null,
    };
  }

  doSearch = (value) => {
    this.setState({
      searchResult: value,
    });
  }

  getMealsInfo = (areas, categories, tags) => {
    this.setState({
      areas: areas,
      categories: categories,
      tags: tags,
    });
  }

  changeSidebarVisibility = () => {
    if(this.state.showSidebar === false){
    this.setState({
      showSidebar: true,
    });
    }
    else {
      this.setState({
      showSidebar: false,
    });
    }
  }

  updateAreas = (area) => {
    let arr = this.state.areas;
    arr = arr.filter((item) => {
      return item !== area
    });
    if (arr[0] == null) arr[0] = ""
    this.setState({
      areas: arr
    });
  }

  updateCategories = (category) => {
    let arr = this.state.categories;
    arr = arr.filter((item) => {
      return item !== category
    });
    if (arr[0] == null) arr[0] = ""
    this.setState({
      categories: arr
    }, () => {

    });
  }

  updateTags = (tag) => {
    let arr = this.state.tags;
    arr = arr.filter((item) => {
      return item !== tag
    });
    if (arr[0] == null) arr[0] = ""
    this.setState({
      tags: arr
    }, () => {

    });
  }

  render() {
    const { classes } = this.props;

  return (
    <div className={classes.root}>
      <ReactNotification />
      <Sidebar visible={this.state.showSidebar} areas={this.state.areas} tags={this.state.tags} categories={this.state.categories} updateAreas={this.updateAreas} updateCategories={this.updateCategories} updateTags={this.updateTags}/>
      <Container maxWidth="lg">
        <NavBar search={this.doSearch} buttonOnclick={this.changeSidebarVisibility} updateMealsState={this.updateMealsState}/>
        <Meals callback={this.getMealsInfo} searchResult={this.state.searchResult} hideFavIcons={this.state.showSidebar} className={clsx(classes.content,{[classes.contentShift]: this.state.showSidebar,})} areas={this.state.areas} tags={this.state.tags} categories={this.state.categories}/>
      </Container>
    </div>
  );
}
}

export default withStyles(Styles)(HigherOrderComponent);

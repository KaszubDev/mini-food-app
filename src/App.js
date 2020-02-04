import React from 'react';
import './index.css';
import NavBar from './components/NavBar';
import Container from '@material-ui/core/Container';
import Sidebar from './components/Sidebar';
import Meals from './components/Meals';
import { withStyles } from '@material-ui/core/styles';
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
});


class HigherOrderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      showSidebar: false,
    };
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
  render() {
    const { classes } = this.props;
  return (
    <div className={classes.root}>
      <Sidebar visible={this.state.showSidebar}/>
      <Container maxWidth="lg">
        <NavBar buttonOnclick={this.changeSidebarVisibility}/>
        <Meals hideFavIcons={this.state.showSidebar} className={clsx(classes.content,{[classes.contentShift]: this.state.showSidebar,})}/>
      </Container>
    </div>
  );
}
}

export default withStyles(Styles)(HigherOrderComponent);

import React from 'react';
import NavBar from './components/NavBar';
import Container from '@material-ui/core/Container';
import Sidebar from './components/Sidebar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class App extends React.Component {
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
  return (
    <div>
      <Sidebar visible={this.state.showSidebar}/>
      <Container maxWidth="lg">
        <NavBar buttonOnclick={this.changeSidebarVisibility}/>
        <Grid style={{marginTop: '100px',}} container spacing={3}>
          <Grid item sm={4}>
            <Paper>123</Paper>
          </Grid>
          <Grid item sm={4}>
            <Paper>123</Paper>
          </Grid>
          <Grid item sm={4}>
            <Paper>123</Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
}

export default App;

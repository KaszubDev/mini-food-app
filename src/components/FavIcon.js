import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Styles = theme => ({
    red: {
        color: 'red !important',
        transition: 'all 0.25s ease-in-out',
    },
    favIcon: {
        color: '#fff',
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
            color: 'red',
        }
    }
  });

class FavIcon extends Component {
    constructor(props) {
        super();
        this.state = {
            active: props.active,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
    const { classes } = this.props;

    return(

        <span className={this.state.active ? classes.red : classes.favIcon} onClick={ () => this.setState({ active: true })}>
            <FavoriteIcon/>
        </span>
    )
    }
}

export default withStyles(Styles)(FavIcon);
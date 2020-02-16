import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidebarElement from './SidebarElement';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

    const Styles = makeStyles(theme => ({
        root: {
            backgroundColor: '#B7B7B7',
            width: '0',
            top: 0,
            visibility: 'hidden',
            float: 'left',
            position: 'fixed',
            minHeight: '100vh',
            [theme.breakpoints.up('sm')]: {
                top: 'unset',
                position: 'relative',
            },
            color: 'white',
            transition: 'width .3s',
        },
        opened: {
            width: '100%',
            visibility: 'visible',
            [theme.breakpoints.up('sm')]: {
                width: '30%',
            },
        },
        container: {
            top: '10%',
            position: 'fixed',
            [theme.breakpoints.up('sm')]: {
                maxWidth: '23%',
            },
        },
    }));
const Sidebar = (props) => {
    const classes = Styles();
    let modifier = null;
    // console.log(props.areas);
    if(props.visible === true){
        modifier = classes.opened;
    }
    else {
        modifier = null;
    }
    return (
        <div className={[classes.root, modifier].join(' ')}>
            <Container className={classes.container} maxWidth="sm">
                <Typography align='center' color='textPrimary' variant='h2'>Filters</Typography>
                <SidebarElement title="Category" areas={props.areas}/>
                <SidebarElement title="Area" />
                <SidebarElement title="Tags" />
            </Container>
        </div>
    )
}

export default Sidebar;
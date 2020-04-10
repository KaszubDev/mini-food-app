import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidebarElement from './SidebarElement';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Scrollbar from "react-scrollbars-custom";

    const Styles = makeStyles(theme => ({
        root: {
            backgroundColor: '#B7B7B7',
            width: '100%',
            top: 0,
            visibility: 'hidden',
            display: 'none',
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
            display: 'block',
            visibility: 'visible',
            [theme.breakpoints.up('sm')]: {
                width: '30%',
            },
        },
        container: {
            top: '12%',
            position: 'fixed',
            [theme.breakpoints.up('sm')]: {
                maxWidth: '23%',
            },
        },
    }));
const Sidebar = (props) => {
    const classes = Styles();
    let modifier = null;

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
                    <Scrollbar style={{ width: "100%", height: "80vh" }}>
                        <SidebarElement title="Category" items={props.categories}/>
                        <SidebarElement title="Area" items={props.areas}/>
                        <SidebarElement title="Tags" items={props.tags}/>
                    </Scrollbar>
                </Container>
        </div>
    )
}

export default Sidebar;
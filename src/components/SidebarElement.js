import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';

const Styles = makeStyles(theme => ({
    root: {
        margin: '5% 0',
        [theme.breakpoints.up('sm')]: {
            margin: '12% 0',
        },
    },
    container: {
        minHeight: '7rem',
        minWidth: '30%',
        border: '1px solid #595959',
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.up('sm')]: {
            minHeight: '8rem',
        },
    },
    item: {
        padding: '16px',
        backgroundColor: '#fff',
        borderRadius: '30%',
    },
}));
const SidebarElement = (props) => {
    const classes = Styles();
    console.log(props.areas);
    return (
        <div className={classes.root}>
            <Typography color='textSecondary' variant='h4'>{props.title}</Typography>
            <Container className={classes.container}>
                <Chip label="Deletable"/>
            </Container>
        </div>
    )
}

export default SidebarElement;
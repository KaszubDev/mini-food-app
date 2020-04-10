import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SidebarChip from './SidebarChip';

const Styles = makeStyles(theme => ({
    root: {
        margin: '5% 0',
        width: '98%',
        [theme.breakpoints.up('sm')]: {
            margin: '12% 0',
        },
    },
    container: {
        minHeight: '7rem',
        minWidth: '30%',
        border: '1px solid #595959',
        paddingTop: '10px',
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
    console.log(props.items);
    return props.items ? (
        <div className={classes.root}>
            <Typography color='textSecondary' variant='h4'>{props.title}</Typography>
            <Container className={classes.container}>
                {props.items.map((item,index) =>
                    <SidebarChip key={index} name={item}/>
                )}
            </Container>
        </div>
    ) : null
}

export default SidebarElement;
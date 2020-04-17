import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const Styles = makeStyles(theme => ({
    root: {
        display: 'inline-block',
        marginRight: '10px',
        marginBottom: '10px',
    },
}));

const SidebarChip = (props) => {
    const classes = Styles();

    const updateItems = () => {
        props.updateData(props.name);
    }

    if (props.name !== ""){
        return (
            <div className={classes.root}>
                <Chip label={props.name} onDelete={updateItems}/>
            </div>
        )
    }
    else return true;
}

export default SidebarChip;
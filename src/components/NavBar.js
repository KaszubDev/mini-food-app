import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, InputBase } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const Styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.25),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white,0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInput: {
        padding: theme.spacing(1,1,1,7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            }
        }
    },
    inputRoot: {
        color: 'inherit',
    },
    }));

const NavBar = () => {
    const classes = Styles();
    return (
        <div className={classes.root}>
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton edge="start" color="inherit">
                        <MenuIcon/>
                    </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    Sample-App
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                <InputBase placeholder="Szukaj..."
                classes={{
                    input:classes.inputInput,
                    root: classes.inputRoot,
                }}
                inputProps={{'aria-label': 'search'}}
                />
                </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
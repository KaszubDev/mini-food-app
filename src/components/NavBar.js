import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, InputBase, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const Styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    bar: {
        backgroundColor: '#FFFF8D',
        color: '#000',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: '1px solid #595959',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white,0.25),
        },
        marginLeft: 0,
        minHeight: '35px',
        minWidth: "70%",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(20),
            width: 'auto',
        },
    },
    btn: {
        marginLeft: theme.spacing(2),
        minWidth: '12%',
        borderRadius: theme.shape.borderRadius,
        border: '1px solid #595959',
        minHeight: '35px',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white,0.25),
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(8),
        },
    },
    favoriteIcon: {
        position: "absolute",
        right: "20%",
        [theme.breakpoints.up('sm')]: {
            right: '15px',
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
        width: "100%",
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            }
        }
    },
    inputRoot: {
        width: "100%",
        color: 'inherit',
    },
    btnText: {
        display: 'none',
        margin: 0,
        paddingRight: '20px',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    }));

const NavBar = (props) => {
    const onclick = () => {
        props.buttonOnclick();
    };
    const classes = Styles();
        return (
            <div className={classes.root}>
                <AppBar className={classes.bar} position='fixed'>
                    <Toolbar>
                        <IconButton className={classes.menuIcon} edge="start" color="inherit" onClick={onclick}>
                            <MenuIcon/>
                        </IconButton>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                    <InputBase placeholder="SEARCH"
                    classes={{
                        input:classes.inputInput,
                        root: classes.inputRoot,
                    }}
                    inputProps={{'aria-label': 'search'}}
                    />
                    </div>
                    <Button className={classes.btn}>
                        <p className={classes.btnText}>FAVOURITES</p>
                        <FavoriteBorderIcon className={classes.favoriteIcon}/>
                    </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    };

export default NavBar;
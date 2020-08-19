import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, InputBase, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { store } from 'react-notifications-component';

const Styles = theme => ({
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
        minWidth: "60%",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(20),
            width: 'auto',
        },
    },
    btn: {
        marginLeft: theme.spacing(2),
        minWidth: '50px',
        borderRadius: theme.shape.borderRadius,
        border: '1px solid #595959',
        minHeight: '35px',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white,0.25),
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(8),
            minWidth: '300px',
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
        position: "relative",
        margin: 0,
        paddingRight: '20px',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    favorites: {
        position: "relative",
    },
    favoritesContainer: {
        transition: "all .5s",
        overflow: "hidden",
        position: "absolute",
        fontFamily: "Roboto",
        right: 0,
        height: 0,
        backgroundColor: "#fff",
        marginTop: '10px',
        width: '350px',
        [theme.breakpoints.up('sm')]: {
            marginTop: 0,
        }
    },
    expandedFavorites: {
        backgroundColor: "#fff",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.up('sm')]: {
            borderBottom: "none",
        },
        '&:hover': {
            backgroundColor: "#fff",
        }
    },
    expandedFavoritesContainer: {
        height: "200px",
        overflow: 'auto',
        border: '1px solid #595959',
        borderTop: 'none',
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        width: '350px',
    },
    favoritesList: {
        listStyle: 'none',
        padding: '0',
    },
    '@global': {
        '.favoritesRow': {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            paddingBottom: '10px',
            cursor: 'pointer',
            transition: 'all .2s ease-in-out',
            paddingTop: '10px',
            borderBottom: '1px solid #ccc',
            "&:hover": {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
            "&:first-child": {
                paddingTop: '0',
            },
            "&:last-child": {
                border: 'none',
            }
        }
    },
    favoritesImage: {
        width: '50px',
        marginRight: '10px',
        marginLeft: '10px',
    },
    favoritesDeleteBtn: {
        position: 'absolute',
        right: '10px',
        fill: '#ccc',
        '&:hover': {
            fill: '#000',
        }
    },
    emptyFavoritesText: {
        textAlign: 'center',
    },
    resetBtn: {
        margin: '0 auto',
        display: 'block',
        textTransform: 'none',
        marginBottom: '20px',
        marginTop: '20px',
    }
    });


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef();
        this.showFavorites = this.showFavorites.bind(this);
        this.resetFavorites = this.resetFavorites.bind(this);
        this.timeout = 0;
        this.state = {
            favoritesWidth: null,
            active: false,
            favorites: [],
            onclick: () => {
                props.buttonOnclick();
            },
            search: (val) => {
                props.search(val);
            },
        };
    }

    componentDidMount() {
        const favoritesWidth = this.componentRef.current.clientWidth;
        const isMobileDevice = () => {
            return ( ( window.innerWidth <= 576 ) );
        };

        if ( !isMobileDevice() ) {
            this.setState({
                favoritesWidth: favoritesWidth,
            });
            console.log(this.state.favoritesWidth);
        }
    }

    showFavorites() {
    if ( localStorage.getItem('favorites') ) {
        this.setState({
            favorites: JSON.parse(localStorage.getItem('favorites')),
        })
    }
    if (this.state.active == false) {
        this.setState({
            active: true,
        });
    }
    else {
        this.setState({
            active: false,
        });
    }
    }

    searchFavorite(name) {
        this.state.search(name);
    }

    deleteFavorite(item) {
        const arr = this.state.favorites.filter(e => e.idMeal !== item);
        let notification = {
            title: "Favorite removed!",
            message: "Item was removed from the favorites",
            type: "warning",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        };
        this.setState({
            favorites: arr
        }, () => {
            localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
            store.addNotification({
                ...notification,
                container: 'bottom-right'
            });
        });
    }

    resetFavorites() {
        let notification = {
            title: "Favorites cleared!",
            message: "Your favorites has been cleared.",
            type: "danger",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        };
        this.setState({
            favorites: []
        }, () => {
            localStorage.removeItem('favorites');
            store.addNotification({
                ...notification,
                container: 'bottom-right'
            });
            window.location.reload(false);
        })
    }

    render() {
    const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.bar} position='fixed'>
                    <Toolbar style={{justifyContent: 'space-between'}}>
                        <IconButton className={classes.menuIcon} edge="start" color="inherit" onClick={this.state.onclick}>
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
                    onChange={value => this.state.search(value.target.value)}
                    />
                    </div>
                    <div className={classes.favorites}>
                        <Button className={clsx(classes.btn, {[classes.expandedFavorites] : this.state.active,})} ref={this.componentRef} onClick={this.showFavorites}>
                            <p className={classes.btnText}>FAVOURITES</p>
                            <FavoriteBorderIcon/>
                        </Button>
                        <div style={{width: `${this.state.favoritesWidth}px`}} className={clsx(classes.favoritesContainer, {[classes.expandedFavoritesContainer] : this.state.active,})}>
                            <ul className={classes.favoritesList}>
                            {this.state.favorites ? this.state.favorites.map(favorite => {
                                return (
                                <li className="favoritesRow" onClick={() => this.searchFavorite(favorite.strMeal)}><CardMedia className={classes.favoritesImage} component="img" title={favorite.strMeal} src={favorite.strMealThumb}/><Typography variant='body1'>{favorite.strMeal}</Typography>
                                    <DeleteOutlineIcon className={classes.favoritesDeleteBtn} onClick={(e) => { e.stopPropagation(); this.deleteFavorite(favorite.idMeal); }} ></DeleteOutlineIcon>
                                </li>
                                );
                            }) : null}
                            { ( this.state.favorites.length == 0 ) ? (
                                <p className={classes.emptyFavoritesText}>Your favourites meals will be listed here.</p>
                            ) : <Button className={classes.resetBtn} variant="contained" color="secondary" onClick={this.resetFavorites}>Clear my favorites</Button> }
                            </ul>
                        </div>
                    </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    };
}
export default withStyles(Styles)(NavBar);
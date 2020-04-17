import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';
require('typeface-montserrat');

const API = 'https://www.themealdb.com/api/json/v1/1/search.php';

const Styles = theme => ({
    scroll: {
        marginTop: '100px',
        overflow: 'hidden !important',
        paddingBottom: '50px',
    },
    favoriteIcon: {
        cursor: 'pointer',
        marginLeft: '90%',
        transform: 'translate(0,-150%)',
        color: 'white',
        transition: '.2s ease-in-out',
        '&:hover': {
            color: 'red',
        },
    },
    hideFavIcons: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});


class Meals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            searchResult: '',
            areas: [],
            tags: [],
            categories: [],
            isEmpty: false
        };
    }

    componentDidMount() {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Soup')
        .then(results => {
            return results.json();
        }).then(data => {
            let items = data.meals.map((item => {
                return item;
            }));
            this.setState({
                items: items,
            });
            let Areas = this.state.items.map(item => {
                return item.strArea;
            });
            Areas = Areas.filter(Boolean);
            this.setState({
                areas: [...new Set(Areas)],
            });
            let Categories = this.state.items.map(item => {
                return item.strCategory;
            });
            Categories = Categories.filter(Boolean);
            this.setState({
                categories: [...new Set(Categories)],
            });
            let Tags = this.state.items.map(item => {
                if (item.strTags != null) {
                    return item.strTags;
                }
            });
            Tags = Tags.filter(Boolean);
            Tags = Tags.map(tag => {
                return tag.split(',');
            });
            Tags = [].concat.apply([], Tags);

            this.setState({
                tags: [...new Set(Tags)],
            });
            this.props.callback(this.state.areas,this.state.categories,this.state.tags);
            });
    }

    componentDidUpdate() {
        if (this.state.searchResult !== this.props.searchResult){
            this.timeout = setTimeout(() => {
                if (this.props.searchResult === "") {
                    this.setState({
                        searchResult: this.props.searchResult,
                        areas: [],
                        categories: [],
                        tags: [],
                        items: [],
                        isEmpty: false
                    }, () => {
                        this.props.callback(this.state.areas,this.state.categories,this.state.tags);
                    });
                    return true;
                };
                this.setState({
                    searchResult: this.props.searchResult,
                    areas: [],
                    categories: [],
                    tags: [],
                    items: [],
                    isEmpty: false
                }, () => {
                    this.props.callback(this.state.areas,this.state.categories,this.state.tags);
                    fetch(`${API}?s=${this.state.searchResult}`)
                .then(results => {
                    return results.json();
                }).then(data => {
                    let items = data.meals.map((item => {
                        return item;
                    }));
                    this.setState({items: items});
                    let Areas = this.state.items.map(item => {
                        return item.strArea;
                    });
                    Areas = Areas.filter(Boolean);
                    this.setState({
                        areas: [...new Set(Areas)],
                    });
                    let Categories = this.state.items.map(item => {
                        return item.strCategory;
                    });
                    Categories = Categories.filter(Boolean);
                    this.setState({
                        categories: [...new Set(Categories)],
                    });
                    let Tags = this.state.items.map(item => {
                        if (item.strTags != null) {
                            return item.strTags;
                        }
                    });
                    Tags = Tags.filter(Boolean);
                    Tags = Tags.map(tag => {
                        return tag.split(',');
                    });
                    Tags = [].concat.apply([], Tags);
                    this.setState({
                        tags: [...new Set(Tags)],
                    });
                    this.props.callback(this.state.areas,this.state.categories,this.state.tags);
                })
                .catch(err => {
                    console.log(err);
                });
                });
                this.timer = setTimeout(() => {
                    if (this.state.items.length === 0) {
                        this.setState({
                            isEmpty: true
                        })
                    }
                }, 1500);
                }
              , 1000);
        }
        if ((this.props.areas.length !== 0) && (this.state.areas !== this.props.areas)) {
            this.setState({
                areas: this.props.areas
            });
        }
        if ((this.props.tags.length !== 0) && (this.state.tags !== this.props.tags)) {
            this.setState({
                tags: this.props.tags
            });
        }
        if ((this.props.categories.length !== 0) && (this.state.categories !== this.props.categories)) {
            this.setState({
                categories: this.props.categories
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <InfiniteScroll
            dataLength={this.state.items.length} //This is important field to render the next data
            hasMore={false}
            loader={<h4>Loading...</h4>}
            className={classes.scroll}
            >
            <Grid container spacing={3} justify="center">
                {this.state.items.map(pic => {
                    if (pic.strTags) {
                        var itemTags = pic.strTags.split(',');
                        var containTags = itemTags.every(tag => this.state.tags.includes(tag));
                    }
                    if ( (this.state.areas.includes(pic.strArea) ) && (containTags === true) && (this.state.categories.includes(pic.strCategory)) ) {
                    return (
                    <Grid key={pic.idMeal} item sm={4}>
                        <Paper style={{boxShadow: 'none', border: '1px solid #ccc'}}>
                            <Card style={{boxShadow: 'none'}}>
                                <CardMedia component="img" title={pic.strMeal} src={pic.strMealThumb}/>
                                <FavoriteIcon className={clsx(classes.favoriteIcon, {[classes.hideFavIcons] : this.props.hideFavIcons,})}/>
                                <CardContent style={{padding: '0 16px 16px', textAlign: 'center'}}>
                                    <Typography style={{padding: '10px'}} color='textPrimary' variant='overline'>{pic.strMeal}</Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                    )};
                })}
            </Grid>
            {this.state.items.length === 0 && this.state.searchResult === "" &&
                <h2 style={{fontFamily: 'Montserrat', textAlign: 'center'}}>
                    Type something above to see results.
                </h2>
            }
            {
            this.state.items.length === 0 && this.state.searchResult.length !== 0 && this.state.isEmpty === false &&
                <h2 style={{fontFamily: 'Montserrat', textAlign: 'center'}}>Loading...</h2>
            }
            {
            this.state.items.length === 0 && this.state.isEmpty === true &&
                <h2 style={{fontFamily: 'Montserrat', textAlign: 'center'}}>Oops, it looks like we don't have such a dish. Please try entering a different phrase :)</h2>
            }
            </InfiniteScroll>
            </div>
        );
    }
}

export default withStyles(Styles)(Meals);
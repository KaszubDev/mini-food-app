import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import FavIcon from './FavIcon';
import DetailedInformation from './DetailedInformation';
import { store } from 'react-notifications-component';
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
    },
    meal: {
        boxShadow: 'none',
        border: '1px solid #ccc',
        cursor: 'pointer',
        position: 'relative',
    },
    favItem: {
        color: 'red !important',
    },
    '@global': {
        '.favoriteBtn': {
            position: 'absolute',
            bottom: '70px',
            right: '10px',
        }
    },
    mealsMessage: {
        fontFamily: 'Montserrat',
        textAlign: 'center',
        marginTop:'60px',
        fontSize: '14px',
        lineHeight: '30px',
        [theme.breakpoints.up('md')]: {
            fontSize: '24px',
            lineHeight: 'auto',
            marginTop: '70px',
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
            isEmpty: false,
            favorites: [],
            render: true,
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
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

            document.addEventListener('mousedown', this.handleClickOutside, false);
        this.setState({
            favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem("favorites")) : [],
        })
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate() {
        if (this.state.searchResult !== this.props.searchResult) {
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
                this.setState({
                    favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem("favorites")) : [],
                })
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

    hasClass(element, className) {
        var regex = new RegExp('\\b' + className + '\\b');
        do {
          if (regex.exec(element.className)) {
            return true;
          }
          element = element.parentNode;
        } while (element);
        return false;
    }


    handleClickOutside(event) {
        let elements = document.querySelectorAll(".DetailedInfo");

        if ( !this.hasClass(event.target, "DetailedInfo") ) {
            for (let i=0 ; i < elements.length; i++) {
                elements[i].style.display = "none";
            }

            const meals = document.querySelectorAll(".meal-item").forEach(el => {
                el.style.opacity = "1";
            });
        }

    }

    showDetailedInfo = (event,el,id) => {
        if ( !this.hasClass(event.target, "favoriteBtn") ) {
            const elements = document.querySelectorAll(`.meal-item:not(.number-${id})`).forEach(el => {
                el.style.opacity = "0.5";
            });
            const isMobileDevice = () => {
                let check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
            };

            document.getElementById(id).style.display = "block";

        }
    }

    addFavorite = (item) => {
        let notification = {
            title: "Success!",
            message: "Item was added to the favorites",
            type: "success",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        };
        let favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem("favorites")) : [];
        if ( favorites.some(el => el.idMeal === item.idMeal) == false ) {
            favorites.push(item);
            this.setState({
                favorites: favorites,
            }, () => {
                localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
                store.addNotification({
                    ...notification,
                    container: 'bottom-right'
                });
            });
        }
        else {
            alert("This meal is already on your favorites list");
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
            <Grid container spacing={8} justify="center" style={{position: 'relative'}}>
                {this.state.items.map(pic => {
                    if (pic.strTags) {
                        var itemTags = pic.strTags.split(',');
                        var containTags = itemTags.every(tag => this.state.tags.includes(tag));
                    }
                    if ( (this.state.areas.includes(pic.strArea) ) && (containTags === true) && (this.state.categories.includes(pic.strCategory)) ) {
                    return (
                    <React.Fragment key={pic.idMeal}>
                    <Grid item sm={6} md={4} className={"meal-item number-" + pic.idMeal}>
                        <Paper onClick={ (event) => this.showDetailedInfo(event,this,pic.idMeal) } className={classes.meal}>
                            <Card style={{boxShadow: 'none'}}>
                                <CardMedia component="img" title={pic.strMeal} src={pic.strMealThumb}/>
                                <span className="favoriteBtn" onClick={ () => this.addFavorite(pic) }>
                                    <FavIcon active={this.state.favorites.some(item => item.idMeal === pic.idMeal)} />
                                </span>
                                <CardContent style={{padding: '16px', textAlign: 'center'}}>
                                    <Typography style={{padding: '10px'}} color='textPrimary' variant='overline'>{pic.strMeal}</Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                        <Grid item className="DetailedInfo" id={pic.idMeal} style={{display: 'none'}}>
                            <DetailedInformation setRef={this.setRef} item={pic}/>
                        </Grid>
                    </React.Fragment>
                    )};
                })}
            </Grid>
            {this.state.items.length === 0 && this.state.searchResult === "" &&
                <h2 className={classes.mealsMessage}>
                    Type something above to see results.
                </h2>
            }
            {
            this.state.items.length === 0 && this.state.searchResult.length !== 0 && this.state.isEmpty === false &&
                <h2 className={classes.mealsMessage}>Loading...</h2>
            }
            {
            this.state.items.length === 0 && this.state.isEmpty === true &&
                <h2 className={classes.mealsMessage}>Oops, it looks like we don't have such a dish. Please try entering a different phrase :)</h2>
            }
            </InfiniteScroll>
            </div>
        );
    }
}

export default withStyles(Styles)(Meals);
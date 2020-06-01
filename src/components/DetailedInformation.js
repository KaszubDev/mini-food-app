import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';

const Styles = makeStyles(theme => ({
    '@global': {
        '.detailed-information-container': {
            backgroundColor: 'pink',
            margin: '30px 0',
            borderRadius: '4px',
            border: '1px solid #ccc',
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
            },
            left: 0,
        }
    },
    playerWrapper: {
        height: '300px',
        [theme.breakpoints.up('sm')]: {
            width: '30%',
        },
    },
    description: {
        flex: 1,
        padding: '0 60px 0 30px',
    },
}));

const DetailedInformation = (props) => {
    const classes = Styles();
    let ingredients = [];
    let measures = [];
    let completeIngredients = [];
    for (let i=1; i<=20; i++) {
        ingredients.push(eval((`props.item.strIngredient${i}`)));
        measures.push(eval((`props.item.strMeasure${i}`)));
    }
    for (let i=0; i<20; i++) {
        if (ingredients[i] !== "") {
            completeIngredients.push(ingredients[i] + ' - ' + measures[i]);
        }
    }

    return (
        <div id={props.id} className='detailed-information-container' ref={props.setRef} style={{display: 'none'}}>
            <div className={classes.playerWrapper}>
                <ReactPlayer
                    url={props.item.strYoutube}
                    width="100%"
                    height="100%"
                    light
                    controls
                />
            </div>
            <div className={classes.description}>
                <Typography color='textPrimary' variant='h5' style={{margin:"20px 0"}}>Instruction</Typography>
                <Typography variant='body2' paragraph>{props.item.strInstructions}</Typography>
                <Typography variant='h5' color='textPrimary'>Ingredients + Measure</Typography>
                {completeIngredients.map((value) => {
                    if (value !== '') {
                        return <li>{value}</li>
                    }
                })
                }
            </div>
        </div>
    )
}

export default DetailedInformation;
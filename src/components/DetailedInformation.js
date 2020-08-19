import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';

const Styles = makeStyles(theme => ({
    '@global': {
        '.detailed-information-container': {
            backgroundColor: 'transparent',
            margin: '30px 0',
            borderRadius: '4px',
            border: '1px solid #ccc',
            display: 'block',
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
    instruction: {
        fontSize: '12px',
        lineHeight: '1.3em',
    },
    ingredientsList: {
        margin: 0,
        listStyle: 'none',
        padding: 0,
        paddingBottom: '15px',
    },
    ingredientsListItem: {
        textTransform: 'uppercase',
        fontSize: '12px',
        padding: '1px 0',
        color: 'rgba(0, 0, 0, 0.87)',
        fontWeight: '400',
        lineHeight: '1.3em',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    }
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
        <div className='detailed-information-container' ref={props.setRef}>
            <div className={classes.playerWrapper}>
                <ReactPlayer style={{marginTop: "15px"}}
                    url={props.item.strYoutube}
                    width="100%"
                    height="100%"
                    light
                    controls
                />
            </div>
            <div className={classes.description}>
                <Typography color='textPrimary' variant='h5' style={{margin:"10px 0"}}>Instruction</Typography>
                <Typography className={classes.instruction} color='textPrimary' variant='body2'>{props.item.strInstructions}</Typography>
                <Typography variant='h5' color='textPrimary' style={{margin: "10px 0"}}>Ingredients + Measure</Typography>
                <ul className={classes.ingredientsList}>
                    {completeIngredients.map((value, index) => {
                        if (value !== '') {
                            return <li key={index} className={classes.ingredientsListItem}>{value}</li>
                        }
                    })
                    }
                </ul>
            </div>
        </div>
    )
}

export default DetailedInformation;
import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
    root: {
        width: "50%",
        marginLeft: "25%",
        marginRight: "25%",
        marginTop: "20%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    dotstyle1: {
        height: 15,
        width: 15,
        marginRight: 10,
        animation: `$move1 3s infinite`
    },
    dotstyle2: {
        height: 15,
        width: 15,
        marginRight: 10,
        animation: `$move2 3s infinite`
    },
    dotstyle3: {
        height: 15,
        width: 15,
        marginRight: 10,
        animation: `$move3 3s infinite`
    },
    divstyle: {
        display: "flex",
    },
    '@keyframes move1': {
        "0%": {
            transform: "translateX(25px)"
        },
        "50%": {
            transform: "translateX(50px)"
        },
        "100%": {
            transform: "translateX(0px)"
        }
    },
    '@keyframes move2': {
        "0%": {
            transform: "translateX(25px)"
        },
        "50%": {
            transform: "translateX(-25px)"
        },
        "100%": {
            transform: "translateX(0px)"
        }
    },
    '@keyframes move3': {
        "0%": {
            transform: "translateX(-50px)"
        },
        "50%": {
            transform: "translateX(-25px)"
        },
        "100%": {
            transform: "translateX(0px)"
        }
    },
    textstyle: {
        fontFamily: 'Roboto',
        color: 'white'
    }
}));

export const Loader = () => {

    const classes = styles();

    return (
        <div className={classes.root}>
            <Typography variant="h2" className={classes.textstyle}>Loading</Typography>
            <div className={classes.divstyle}>
            <Typography className={classes.dotstyle1} style={{backgroundColor: "#E58C8A",borderRadius: "100%"}}></Typography>
            <Typography className={classes.dotstyle2} style={{backgroundColor: "#E58C8A",borderRadius: "100%"}}></Typography>
            <Typography className={classes.dotstyle3} style={{backgroundColor: "#E58C8A",borderRadius: "100%"}}></Typography>
            </div>
        </div>
    )
}

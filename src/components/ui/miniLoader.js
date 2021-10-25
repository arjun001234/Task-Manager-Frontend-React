import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
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
    divstyle2: {
        display: "flex",
        height: '300px',
        width: '100%',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
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
    }
}));


const MiniLoader = ({InComponent}) => {
    const classes = styles();

    return (
            <div className={!InComponent ? classes.divstyle : classes.divstyle2}>
            <Typography className={classes.dotstyle1} style={{backgroundColor: "#E58C8A",borderRadius: "100%"}}></Typography>
            <Typography className={classes.dotstyle2} style={{backgroundColor: "#E58C8A",borderRadius: "100%"}}></Typography>
            <Typography className={classes.dotstyle3} style={{backgroundColor: "#E58C8A",borderRadius: "100%"}}></Typography>
            </div>
    )
}

export default MiniLoader;

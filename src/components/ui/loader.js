import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import MiniLoader from './miniLoader';

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
    textstyle: {
        fontFamily: 'Roboto',
        color: 'white'
    }
}));

const Loader = () => {

    const classes = styles();

    return (
        <div className={classes.root}>
            <Typography variant="h2" className={classes.textstyle}>Loading</Typography>
            <MiniLoader />
        </div>
    )
}

export default Loader;

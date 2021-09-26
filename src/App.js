import React from 'react';
import {Switch , Route ,Redirect} from 'react-router-dom';
import {Box} from '@mui/material';
import {makeStyles} from '@mui/styles';
import Main from './main';
import Charecter from './Charecter';

const useStyles = makeStyles({
    outer: {
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        background: '#000',
        color: '#FFF',
    },
})

function App() {

    const styles = useStyles();

    return (
        <Box className={styles.outer}>
            <Switch>
                <Route exact path="/">
                    <Redirect exact from="/" to="/main" />
                </Route>
                <Route path="/main">
                    <Main />
                </Route>
                <Route path="/charecter/:name">
                    <Charecter />
                </Route>
            </Switch>
        </Box>
    )
}

export default App

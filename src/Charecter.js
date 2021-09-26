import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Box } from '@mui/system'
import {makeStyles} from '@mui/styles'
import getSearchedPeopleAPI from './api/getSearchedPeople'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import getFilmlistAPI from './api/getFilmList'
import getVehiclelistAPI from './api/getVehicleList'
import getStarshiplistAPI from './api/getStarship'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

const useStyles = makeStyles({
    inner: {
        width: '100%',
        height: '100%',
        padding: '5%',
        background: '#262626',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    headSection: {
        width: '100%',
        height: '20%',
        minHeight: '200px',

        position: 'relative',

        '@media (max-width:500px)': {
            marginTop: '2rem',
        },
    },
    closeIcon: {
        position: 'absolute',
        top: 0,
        left: '100%',

        transform: 'scale(2)',
        color: '#808080',

        '@media (max-width:500px)': {
            transform: 'scale(1)',
            top: '-10%',
            left: '95%',
        },
    },
    basicInfo: {
        maxWidth: '500px',
        color: '#808080',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    homeWorld: {
        maxWidth: '500px',
        height: '100px',
        padding: '10px',
        margin: '1rem 0',
        borderRadius: '5px',
        backgroundColor: '#0093E9',
        backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',

        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        width: '100%',
    },
    films: {
        width: '100%',
        maxWidth: '1100px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    caption: {
        color: '#b3b3b3',
        margin: '1rem 0 0 0'
    },
    filmBox: {
        margin: '1rem 0',
        backgroundImage: 'linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)',
        
        width: '500px',
        height: '100px',
        borderRadius: '5px',
        padding: '10px',
    },
    vehicleBox: {
        margin: '1rem 0',
        backgroundImage: 'linear-gradient(to right, #FF512F 0%, #F09819  51%, #FF512F  100%)',
        
        width: '500px',
        height: '100px',
        borderRadius: '5px',
        padding: '10px',
    },
    starshipBox: {
        margin: '1rem 0',
        backgroundImage: 'linear-gradient(to right, #fc00ff  51%, #00dbde 100%)',
        
        width: '500px',
        height: '100px',
        borderRadius: '5px',
        padding: '10px',
    },
    title: {
        margin: '.5rem 0',
    },
    subBox: {
        width: '100%',

        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '1rem 0',

        fontSize: '14px',
        letterSpacing: '.5px',
    },
    notFound: {
        margin: '2rem 0',
    }
})

function Charecter() {

    const {name} = useParams();
    const history = useHistory();

    const [data,setData] = React.useState([]);
    const [isData,setIsData] = React.useState(false);
    const [home,setHome] = React.useState('default');
    const [films,setFilms] = React.useState([]);
    const [vehicles,setVehicles] = React.useState([]);
    const [starships,setStarships] = React.useState([]);

    React.useEffect(()=>{
        (async()=>{
            let apiData = await getSearchedPeopleAPI(name);
            setData(apiData.results);
            if(apiData.count>0){
                setIsData(true);
            }
            else if(apiData.count === 0){
                setIsData(true);
            }
        })()

    },[name])

    React.useEffect(()=>{
        if(isData){
            (async()=>{
                return axios.get(data[0].homeworld)
                .then((result)=>{
                    setHome(result.data.name);
                })
                .catch((error)=>{
                    console.log(error);
                    return error;
                })
            })()
        }
    },[data,isData])

    React.useEffect(()=>{
        if(isData){
            (async()=>{
                let arr = data[0].films;
                let movieList = [];
                for(let i=0;i<arr.length;i++){
                    let result = await getFilmlistAPI(arr[i]);
                    movieList.push(result);
                }
                setFilms(movieList);
            })()
        }
    },[data,isData])

    React.useEffect(()=>{
        if(isData){
            (async()=>{
                let arr = data[0].vehicles;
                let List = [];
                for(let i=0;i<arr.length;i++){
                    let result = await getVehiclelistAPI(arr[i]);
                    List.push(result);
                }
                setVehicles(List);
            })()
        }
    },[data,isData])

    React.useEffect(()=>{
        if(isData){
            (async()=>{
                let arr = data[0].starships;
                let List = [];
                for(let i=0;i<arr.length;i++){
                    let result = await getStarshiplistAPI(arr[i]);
                    List.push(result);
                }
                setStarships(List);
            })()
        }
    },[data,isData])

    const styles = useStyles();

    const redirectBack = () => {
        history.push('/main')
    }

    return (
        <Box className={styles.inner}>
            {
                data.map(item=>(
                    <Box className={styles.infoContainer} key={item.name}>
                        <Box className={styles.headSection}>
                            <HighlightOffRoundedIcon className={styles.closeIcon} onClick={redirectBack}/>
                            <Typography variant="h3">{item.name}</Typography>
                            <Box className={styles.basicInfo}>
                                <Typography variant="subtitle2">Gender : {item.gender}</Typography>
                                <Typography variant="subtitle2">Birth Year : {item.birth_year}</Typography>
                                <Typography variant="subtitle2">Height : {item.height}</Typography>
                                <Typography variant="subtitle2">Mass : {item.mass}</Typography>
                            </Box>
                            <Box className={styles.homeWorld}>
                                <Typography variant="h5">Home World : {home}</Typography>
                            </Box>
                        </Box>
                        <Box className={styles.body}>
                            <Typography variant="h3" className={styles.caption}>Films</Typography>
                            <Box className={styles.films}>
                                {
                                    films.length > 0
                                    ? films.map(film => (
                                        <Box className={styles.filmBox} key={film.title}>
                                            <Typography variant="h5" className={styles.title}>{film.title}</Typography>
                                            <Box className={styles.subBox}>
                                                <Typography variant="subtitle" className={styles.title}>Directed by {film.director}</Typography>
                                                <Typography variant="subtitle" className={styles.title}>Released in {film.release_date}</Typography>
                                            </Box>
                                        </Box>
                                    ))
                                    : <Typography variant="subtitle" className={styles.notFound}>No data found</Typography>
                                }
                            </Box>
                            <Typography variant="h3" className={styles.caption}>Vehicles</Typography>
                            <Box className={styles.films}>
                                {
                                    vehicles.length> 0
                                    ? vehicles.map(vehicle => (
                                        <Box className={styles.vehicleBox} key={vehicle.name}>
                                            <Typography variant="h5" className={styles.title}>{vehicle.name}</Typography>
                                            <Box className={styles.subBox}>
                                                <Typography variant="subtitle" className={styles.title}>Model {vehicle.model}</Typography>
                                                <Typography variant="subtitle" className={styles.title}>Cost (in credits) : {vehicle.cost || '--'}</Typography>
                                            </Box>
                                        </Box>
                                    ))
                                    : <Typography variant="subtitle" className={styles.notFound}>No data found</Typography>
                                }
                            </Box>
                            <Typography variant="h3" className={styles.caption}>Starships</Typography>
                            <Box className={styles.films}>
                                {
                                    starships.length > 0
                                    ? starships.map(starship => (
                                        <Box className={styles.starshipBox} key={starship.name}>
                                            <Typography variant="h5" className={styles.title}>{starship.name}</Typography>
                                            <Box className={styles.subBox}>
                                                <Typography variant="subtitle" className={styles.title}>Model {starship.model}</Typography>
                                                <Typography variant="subtitle" className={styles.title}>Cost (in credits) : {starship.cost || '--'}</Typography>
                                            </Box>
                                        </Box>
                                    ))
                                    : <Typography variant="subtitle" className={styles.notFound}>No data found</Typography>   
                                }
                            </Box>
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
}

export default Charecter

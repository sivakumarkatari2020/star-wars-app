import axios from "axios";

const getSearchedPeopleAPI = async (name) => {
    return axios.get(`https://swapi.dev/api/people/?search=${name}`)
    .then((result)=>{
        return result.data;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getSearchedPeopleAPI;
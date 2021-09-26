import axios from "axios";

const getStarshiplistAPI = async (url) => {
    return axios.get(url)
    .then((result)=>{
        let obj = {
            name : result.data.name,
            model: result.data.model,
            cost: result.data.cost
        }
        return obj;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getStarshiplistAPI;
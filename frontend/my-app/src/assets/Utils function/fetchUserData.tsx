import axios from 'axios'
export const fetchUserData = async () =>{
    const config = {
        headers:{
            authorization : 'Bearer '+document.cookie.split(";")[1].substring(7)
        }
    }
    let result = await axios.get("http://localhost:3001/user/me", config)
    return result.data
}

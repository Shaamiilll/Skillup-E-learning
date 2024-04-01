import axios from "axios"
const token = localStorage.getItem("SkillUpTocken")
const baseURI = import.meta.env.VITE_PUBLIC_BASE_API
console.log(baseURI);

const api = axios.create({
    baseURL:`${baseURI}/api/`,
    headers:{
        Authorization:token||''
    }
})

export default api

import axios from "axios";
import { parseCookies } from 'nookies';

export const api = () => {
  const { 'nextauth.token': token } = parseCookies()  
  const instance = axios.create({
    baseURL: 'http://localhost:7777', 
    headers:{
        Authorization: `Bearer ${token}`
    }
  })
  return instance
}

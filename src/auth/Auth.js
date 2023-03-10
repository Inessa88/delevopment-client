//creating a secure component

import {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../App';

export const Auth = (props) =>{
    const [redirect, setRedirect] = useState(false);
    const {setToken} = useContext(AppContext)
    const navigate = useNavigate();

    useEffect(()=>{

        const verify = async() =>{
          
              try{
                  const response = await axios.get('https://delevopment-client-production.up.railway.app/token')

                  console.log(response.data.token);
                  setToken(response.data.token);
                  setRedirect(true);
              }
          catch (e) {
            console.log(e.response.data);
            setToken(null);
            navigate('/login');
          }
        }
        verify()

    })

    return(
        redirect ? props.children : null
    )
}

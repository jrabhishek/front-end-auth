import React, {useContext,useState,useEffect} from "react";
import {AuthContext} from "../App";
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'
import LoadingSpinner from "./Spinner";

const Greet = (props) =>{
    const [loading,setLoading] = useState(false);
    const[message,setMessage] = useState('');
    const[error,setError] = useState(false);
    const {setAuthTokens} = useContext(AuthContext)
    //const [token,setToken]=useState(null);
    const[isLogout,setLogout]=useState(false);
   // setToken(localStorage.getItem("token"));

    useEffect(()=>{
       //setToken(localStorage.getItem("token"));
        const token=localStorage.getItem('token');
        console.log(token)
        if(token!=null){

            axios
                .get('https://basic-node-app.herokuapp.com/greet',{headers:{ Authorization:`Bearer ${token}`}})
                .then((result)=>{
                    if (result.status===200){
                        console.log(result.data.message)
                        setMessage(result.data.message);}
                    else if(result.status===401)
                    {
                        setError(true);
                        setAuthTokens(null);
                    }
                }).catch(err=>{
                    setError(true)
                setMessage("something went wrong")})

            console.log(message)
        }
        else setError(true)


    },[]);

    const logout = ()=>{
        const token=localStorage.getItem('token');
        setLoading(true);
        axios
            .get('https://basic-node-app.herokuapp.com/logout',{headers:{ Authorization:`Bearer ${token}`}})
            .then((result)=>{
                setLoading(false)
                if (result.status===200){
                    localStorage.setItem('token',null);
                    setLogout(true);}
                else if(result.status===401)
                {
                    setError(true);
                    setAuthTokens(null);
                }
            }).catch(err=>{
            setLoading(false)
            setError(true)
            setMessage("something went wrong")})

        console.log(message)

    }

    if(error||isLogout){ return (<Redirect to={'/login'}/> )}
    else{
    return(<div>
        <h1>{message}</h1>
        <button
            className={"btns btn"}
            onClick={logout}
            >
            {loading?<LoadingSpinner/>:"Logout"}
        </button>
    </div>)}
}
export default Greet;

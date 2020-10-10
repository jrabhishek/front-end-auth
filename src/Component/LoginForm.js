import React,{useState,useContext} from "react";
import axios from 'axios';
import {AuthContext} from "../App";
import {Link, Redirect} from 'react-router-dom'
import loginImage from '../login.svg'
import loginImage1 from '../login1.svg'
import style from './style.css'
import LoadingSpinner from "./Spinner";


const LoginForm = () => {
    const [loading,setLoading] = useState(false);
    const[input,setInput] =useState({email:"",password:""});
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState({error:false,message:""});
    const {setAuthTokens} = useContext(AuthContext)
    const submit =(e)=>{
        setLoading(true);
        e.preventDefault()
        axios
            .post('https://basic-node-app.herokuapp.com/login',{email:input.email,password:input.password})
            .then(result => {
                setLoading(false)
                if(result.status === 200){
                    console.log(result)
                    setAuthTokens(result.data.token);
                    setLoggedIn(true);
                }
                else{
                    setIsError({error: true,message: result.data.message});
                }
            }).catch(e=>{
                setLoading(false)
                console.log(e);
                setIsError({error: true,message: "something went wrong"});
        })

    }
    if(isLoggedIn){
        return (<Redirect to={'/'}/>)

    }
    return (
        <div className="base-container">
            <div className="header">Login</div>
            <div className="content">
            <img src={loginImage1} className="image"/>
            <div className="form-container">
                <div className="form">

                    <label className="label">Email Id</label>
                    <input
                        className="input"
                        name="emailId"
                        type={'text'}
                        placeholder={"Email ID"}
                        value={input.email}
                        onChange={e=>setInput({...input,email: e.target.value})}
                    />

                </div>
                <div className="form">
                    <label className="label">Password</label>
                    <input
                        className="input"
                        name={"password"}
                        type={'password'}
                        placeholder={"Password"}
                        value={input.password}
                        onChange={event => setInput({...input,password: event.target.value})}
                    />
                </div>
                <div className="footer" >


            <button className={"btns btn"}  onClick={()=>{ window.location.href='/register'}} > Sign Up</button>
                    <button className="btn"
                            type="submit"
                            onClick={submit}
                            disabled={loading}>

                        {loading?<LoadingSpinner/>:"Login"}
                    </button>
                </div>
                </div>
            </div>
            {isError.message}
        </div>

    )
}
export default LoginForm;

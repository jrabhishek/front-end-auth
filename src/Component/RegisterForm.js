import React,{useState} from "react";
import axios from 'axios';
import loginImage from '../login.svg'
import registerImage from '../login.svg'
import style from './style.css'
import LoadingSpinner from "./Spinner";


const RegisterForm = () => {
    const[input,setInput] =useState({email:"",password:"",name:""});
    const [isError, setIsError] = useState({error:false,message:""});
    const [loading,setLoading] = useState(false);

    const submit =(e)=>{
        setLoading(true)
        e.preventDefault()
        axios
            .post('https://basic-node-app.herokuapp.com/register',{email:input.email,password:input.password,name:input.name})
            .then(result => {
                setLoading(false);
                if(result.status === 200){
                    console.log(result)
                    setIsError({error: false,message: "registration successful"})

                }
                else{
                    setIsError({error: true,message: result.data.message});
                }
            }).catch(e=>{
            setLoading(false);
            console.log(e);
            setIsError({error: true,message: "something went wrong"});
        })

    }


    return (
        <div className="base-container">
            <div className="header">Register</div>
            <div className="content">
                <img src={registerImage} className="image"/>
                <div className="form-container">
                    <div className="form">

                        <label className="label">Name</label>
                        <input
                            className="input"
                            name="name"
                            type={'text'}
                            placeholder={"Name"}
                            value={input.name}
                            onChange={e=>setInput({...input,name: e.target.value})}
                        />

                    </div>
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


                        <button
                            className={"btns btn"}
                            onClick={submit}
                        disabled={loading}>
                            {loading?<LoadingSpinner/>:"Register"}
                        </button>

                    </div>
                </div>
            </div>
            {isError.message}
        </div>

    )
}
export default RegisterForm;

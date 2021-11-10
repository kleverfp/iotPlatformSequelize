import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';
const Login = () => {

    const [FormData,setFormData] = useState({
    
        email:'',
        password:'',
    })
    
   

    const emailHandler = (e)=>{
        setFormData({...FormData,email:e.target.value});
    };
    const passwordHandler = (e)=>{
        setFormData({...FormData,password:e.target.value});
    };
   

    const submitHandler= async (e)=>{
        e.preventDefault();
        if(FormData.password !== FormData.password2)
            //setAlert("Passwords do not match",'danger',10000);
            console.log("error")
        else{
            const {name,email,password} = FormData;
           //register({name,email,password});
        }
    }
    return (
       <Fragment>
           <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={submitHandler}>
               
                <div className="form-group">
                    <input type="email" placeholder="Email Address" onChange={emailHandler} name="email" />
                 
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={passwordHandler}
                    minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
       </Fragment>
    )
}

export default Login

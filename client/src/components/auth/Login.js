import React,{Fragment,useState} from 'react';
import {Link,Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({login,isAuthenticated}) => {

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
        const {email,password} = FormData;
        login({email,password});
    }

    if(isAuthenticated){
        return(
            <Navigate path='/dashboard'/>
        )
    }
    return (
        <section className="container">
           <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
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
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
       </section>
    )
}

Login.propTypes ={
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
};
const mapStateToProps = state=>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login)

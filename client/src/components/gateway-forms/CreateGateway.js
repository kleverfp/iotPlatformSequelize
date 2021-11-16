import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGateway } from '../../actions/gateway';
import { useNavigate } from 'react-router-dom';


const CreateGateway = ({gateway:{gateway},createGateway}) => {
    const navigate = useNavigate();
    const [FormData,setFormData] = useState({
        name:'',
        gatewayid:'',
        type:'',
        lat:'',
        lon:''

    });
    const formDataHaandler = (e) =>{
        setFormData({...FormData,[e.target.name]:e.target.value});
    }
    const submitHandler = async(e)=> {
        e.preventDefault();
        console.log(FormData);
        createGateway(FormData,navigate,false);
    }
    return (
        <section className="container">
            <h1 className="large text-primary">Create Your Gateway</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information about your gateway</p>
            <small>* = required field</small>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-group">
                    <input type="text" placeholder="name" name="name" onChange={formDataHaandler}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="gateway id" name="gatewayid" onChange={formDataHaandler} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="type" name="type" onChange={formDataHaandler}/>
                </div>
              
        
                <div className="form-group">
                  <input type="text" placeholder="latitude" name="lat" onChange={formDataHaandler}/>
                </div>

                <div className="form-group">
                  <input type="text" placeholder="longitude" name="lon" onChange={formDataHaandler}/>
                </div>

              
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
              </form>
        </section>
        
    )
}
CreateGateway.propTypes = {
    createGateway:PropTypes.func.isRequired,
    gateway:PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    gateway: state.gateway
})

export default connect(mapStateToProps,{createGateway})(CreateGateway);

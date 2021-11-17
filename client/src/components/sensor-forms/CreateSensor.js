import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { createSensor } from '../../actions/sensor';


const CreateSensor = ({setAlert,createSensor,sensor:{sensor}}) => {
    const navigate = useNavigate();
    const {gatewayid} = useParams();

    const [formData,setFormData]  = useState({
        name:'',
        sensorid:'',
        communication:'',
        type:'',
        lon:'',
        lat:''
    });

    const sensorHandler = ()=>{
        navigate(`/sensor/${gatewayid}`);
       
    }
    const formDataHandler=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const submitHandler  =async(e)=>{
       e.preventDefault();
       createSensor(gatewayid,formData,navigate);
    }
    return (
        <section className="container">
            <h1 className="large text-primary">Add Your Sensor</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information about your sensor</p>
            <small>* = required field</small>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-group">
                    <input type="text" placeholder="name" onChange={formDataHandler}  name="name" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="sensor id" onChange={formDataHandler} name="sensorid" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="type" onChange={formDataHandler} name="type" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="communication protocol" onChange={formDataHandler} name="communication" />
                </div>
        
                <div className="form-group">
                  <input type="text" placeholder="latitude" onChange={formDataHandler} name="lat"/>
                </div>

                <div className="form-group">
                  <input type="text" placeholder="longitude" onChange={formDataHandler} name="lon"/>
                </div>

              
                <input type="submit"  className="btn btn-primary my-1" />
                <button className="btn btn-light my-1" onClick={sensorHandler}>Go Back</button>
              </form>
        </section>
        
    )
}

CreateSensor.propTypes={
    createSensor:PropTypes.func.isRequired

}
const mapStateToProps = state =>({
    sensor:state.sensor
})
export default connect(mapStateToProps,{createSensor})(CreateSensor);

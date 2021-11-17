import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link,useNavigate } from 'react-router-dom';




const Gateway = ({gateway}) => {
    const navigate = useNavigate();
    const sensorHandler = (gtw)=>{
        navigate(`/sensor/${gtw.gatewayid}`);
       
    }
    const gateways =gateway.map(gtw =>(
        <tr key={gtw.gatewayid}>
            <td>{gtw.gatewayid}</td>
            <td className="hide-sm">{gtw.name}</td>
            <td>
               <button onClick={()=>sensorHandler(gtw)} className="btn btn-success">Sensors</button>
            </td>
            <td>
                <button  className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ))
    return (
        <section className="container">
            <h2 className="my-2">Gateways</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th className='hide-sm'>name</th>
                    </tr>
                </thead>
                <tbody>{gateways}</tbody>
            </table>
            <Link to='/create-gateway' className="btn btn-primary my-1">Create gateway</Link>
        </section>
    )
}

Gateway.propTypes = {
    gateway:PropTypes.array.isRequired,

}



export default  Gateway
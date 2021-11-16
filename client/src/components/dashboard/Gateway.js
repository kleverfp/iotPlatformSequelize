import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



const Gateway = ({gateway}) => {

    const gateways =gateway.map(gtw =>(
        <tr key={gtw.gatewayid}>
            <td>{gtw.gatewayid}</td>
            <td className="hide-sm">{gtw.name}</td>
            <td>
                <button  className="btn btn-success">Sensors</button>
            </td>
            <td>
                <button  className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
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
        </Fragment>
    )
}

Gateway.propTypes = {
    gateway:PropTypes.array.isRequired,

}

export default Gateway
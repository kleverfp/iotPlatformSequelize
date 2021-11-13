import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import { getGateways } from '../../actions/gateway';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const Dashboard = ({getGateways,auth:{user},gateway:{gateway}})=> {
    useEffect(()=>{
        getGateways();
    },[]);
    return (
        <section className="container">{
            gateway ===null ? (<Spinner/>):
            (<Fragment>
                <h1 className='large text-primary'>  Dashboard</h1>
                <p className='lead'>
                    <i className='fas f-user'/>Welcome {user && user.name}
                </p>
                {gateway!== null ? (<Fragment>has</Fragment>):(<Fragment>no has</Fragment>)}
            </Fragment>)
        }

        </section>
    )
}


Dashboard.propTypes={
    getGateways: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    gateway:PropTypes.object.isRequired,
};

const mapStateToProps= state =>({
    auth:state.auth,
    gateway:state.gateway

});

export default connect(mapStateToProps,{getGateways})(Dashboard)

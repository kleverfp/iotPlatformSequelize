import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { getGateways } from '../../actions/gateway';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Gateway from './Gateway';

const Dashboard = ({getGateways,auth:{user},gateway:{gateway}})=> {
    useEffect(()=>{
        getGateways();
    },[]);
    return (
        <section className="container">{
            gateway ===null  ? (<Spinner/>):
            (<Fragment>
                <h1 className='large text-primary'>  Dashboard</h1>
                <p className='lead'>
                    <i className='fas f-user'/>Welcome {user && user.name}
                </p>
                {(gateway!== null && gateway.length >0) ? (<Fragment>
                    <Gateway gateway={gateway}/>
                </Fragment>):(<Fragment>
                    <p>No gateway registered.</p>
                    <Link to='/create-gateway' className="btn btn-primary my-1">Create gateway</Link>
                    </Fragment>)}
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

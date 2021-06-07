import React from 'react';
import { connect } from 'react-redux';
import { Route,Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component,state , ...rest }) => {

  return (
    <Route {...rest} render={
        props => {
          if (state.isAuthenticated) {
            return <Component {...rest} {...props}   />
          } else {
            return <Redirect to={
              {
                pathname: '/unauthorized',
                state: {
                  from: props.location
                }
              }
            } />
          }
        }
      } />
  )
}

const mapsStateToProps = (state) => {
  return {state}
} 

export default connect(mapsStateToProps)(ProtectedRoute);
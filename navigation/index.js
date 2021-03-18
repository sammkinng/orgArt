import Routes from "./Routes"
import React from 'react';
import { AuthProvider } from "./AuthProvider";
const Providers =()=>{
    return(
        <AuthProvider>
            <Routes/>
        </AuthProvider>
    )
}

export default Providers;
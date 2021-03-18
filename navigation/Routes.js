import React ,{useContext,useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { DefaultTheme } from "@react-navigation/native";
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};
const Routes=()=>{
    const {user,setUser}=useContext(AuthContext);
    const [initializing,setInitializing]=useState(true);
    const onAuthStateChanged=(user)=>{
        console.log('auth change');
        setUser(user);
        if(initializing){
            setInitializing(false);
        }
    }
    useEffect(()=>{
        const subscriber =auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    },[]);
    if(initializing){
        return null;
    }
    return(
        <NavigationContainer theme={theme}>
            {user?<AppStack/>:<AuthStack/>}
        </NavigationContainer>
    );
}

export default Routes;
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin} from '@react-native-community/google-signin';
// screens
import { LoginScreen,OnboardingScreen,SignupScreen,ForgotScreen} from "../screens/";
import { useEffect } from "react";
import  AsyncStorage  from "@react-native-community/async-storage";



const Stack = createStackNavigator();
const AuthStack=()=>{
    const [isFirstLaunch,setIsFirstLaunch]=React.useState(null);
    let routeName;
    useEffect(()=>{
        AsyncStorage.getItem('alreadyLaunched').then(value=>{
            if(value==null){
                AsyncStorage.setItem('alreadyLaunched','true');
                setIsFirstLaunch(true);
            }else{
                setIsFirstLaunch(false);
            }
        });
        GoogleSignin.configure({
            webClientId:'655611597234-kfiqtjj7b5a6kq57j4s0od86uuc4c76p.apps.googleusercontent.com',
        });
    },[]);
    if(isFirstLaunch===null){
        return null;
    }else if(isFirstLaunch===true){
        routeName='Onboarding';
    }else{
        routeName='Login';
    }
    return(
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{header:()=>null}}/>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{header:()=>null}}/>
            <Stack.Screen 
                name="Signup"
                component={SignupScreen}
                options={({navigation})=>({
                    title:'',
                    headerStyle:{
                        backgroundColor:'#f9fafd',
                        shadowColor:'#f9fafd',
                        elevation:0
                    },
                    headerLeft:()=>(
                        <View style={{marginLeft:10}}>
                            <FontAwesome.Button
                                name='long-arrow-left'
                                size={25}
                                backgroundColor='#f9fafd'
                                color="#333"
                                onPress={()=>navigation.navigate('Login')}
                            />
                        </View>
                    ) 
                })}
            />
            <Stack.Screen 
                name="ForgotScreen"
                component={ForgotScreen}
                options={({navigation})=>({
                    title:'',
                    headerStyle:{
                        backgroundColor:'#fff',
                        shadowColor:'#fff',
                        elevation:0
                    },
                    headerLeft:()=>(
                        <View style={{marginLeft:10}}>
                            <FontAwesome.Button
                                name='long-arrow-left'
                                size={25}
                                backgroundColor='#fff'
                                color="#333"
                                onPress={()=>navigation.navigate('Login')}
                            />
                        </View>
                    ) 
                })}
            />
        </Stack.Navigator>
    );
    
}

export default AuthStack;

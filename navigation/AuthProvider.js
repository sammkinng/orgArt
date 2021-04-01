import React ,{ createContext } from "react";
import { useState } from "react";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from "@react-native-community/google-signin";
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Snackbar from 'react-native-snackbar';
export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email,password)=>{
                    try{
                        await auth().signInWithEmailAndPassword(email,password);
                    }catch(e){
                        console.log(e);
                        Snackbar.show({
                            text: 'Email or password is incorrect',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                },
                googleLogin:async()=>{
                    try {
                        const {idToken} =await GoogleSignin.signIn();
                        const googleCredential =auth.GoogleAuthProvider.credential(idToken);
                        await auth().signInWithCredential(googleCredential);
                    } catch (e) {
                        console.log(e);
                        Snackbar.show({
                            text: 'Please try again',
                            duration: Snackbar.LENGTH_SHORT,
                          });
                    }
                },
                fbLogin:async()=>{
                    try {
                        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

                        if (result.isCancelled) {
                          throw 'User cancelled the login process';
                        }
                      
                        // Once signed in, get the users AccesToken
                        const data = await AccessToken.getCurrentAccessToken();
                      
                        if (!data) {
                          throw 'Something went wrong obtaining access token';
                        }
                      
                        // Create a Firebase credential with the AccessToken
                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                      
                        // Sign-in the user with the credential
                        await auth().signInWithCredential(facebookCredential);
                      
                    } catch (error) {
                        console.log(error);
                        Snackbar.show({
                            text: 'Please try again',
                            duration: Snackbar.LENGTH_SHORT,
                          });
                    }
                },
                register:async(email,password)=>{
                    try{
                        await auth().createUserWithEmailAndPassword(email,password);
                    }catch(e){
                        console.log(e);
                        Snackbar.show({
                            text: 'Email address already in use',
                            duration: Snackbar.LENGTH_SHORT,
                          });
                    }
                },
                logout:async()=>{
                    try{
                        await auth().signOut();
                    }catch(e){
                        console.log(e);
                        Snackbar.show({
                            text: 'Please try again',
                            duration: Snackbar.LENGTH_SHORT,
                          });
                    }
                },
                passwordReset: async(email) => {
                    try {
                        await auth().sendPasswordResetEmail(email);
                        Snackbar.show({
                            text: 'Password reset link sent to give email',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    } catch (error) {
                        console.log(error);
                        Snackbar.show({
                            text: 'Please try again',
                            duration: Snackbar.LENGTH_SHORT,
                          });
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
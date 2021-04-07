import React ,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { useNavigationState} from "@react-navigation/native"
import { TouchableOpacity } from 'react-native-gesture-handler';

const PhoneAuth=({navigation})=>{
    const [phone,setPhone]=useState();
    const [valid,setValid]=useState();
    const [otpSent,setOtpSent]=useState(false);
    const [otp,setOtp]=useState();
    const [resend,setResend]=useState(false)
    const [time,setTime]=useState(30);
    const usePreviousRouteName=()=>{
        return useNavigationState(state =>
          state.routes[state.index - 1]?.name
            ? state.routes[state.index - 1].name
            : 'None'
        );
      }
    const textInputChange=(val)=>{
        if(val.length===10){
            setPhone(val);
            setValid(false);
        }else{
            setValid(true);
            setPhone(val);
        }
    }
    const p=usePreviousRouteName();
    const counter=()=>{
        setResend(true);
        setTime(30)
    }
    useEffect(()=>{
        if(time>0){
            setTimeout(()=>{setTime(time-1)},1000)
        }else{
            setResend(false)
        }
    })
    return(
        <View style={styles.container}>
            <Image
                source={require('../assets/orguru.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>
                Enter your mobile no.
            </Text>
            <FormInput
                labelValue={phone}
                onChangeText={(userNo) => textInputChange(userNo)}
                placeholderText="Phone"
                iconType="phone"
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
            />
            {valid?<Text style={[styles.color_textPrivate,{color:'#f00'}]}>
                        Mobile no. must be of 10 digits 
                    </Text>: null}
            <FormButton
                buttonTitle='Send OTP'
                onPress={()=>{
                    if(valid===false){
                    setPhone(null)
                    setOtpSent(true)}}}
            />
            {1?
            (<View style={{marginTop:58,flex:1,width:'100%',alignItems:'center'}}>
                <FormInput
                    labelValue={otp}
                    onChangeText={(userNo) => setOtp(userNo)}
                    placeholderText="OTP"
                    iconType="lock"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FormButton
                    buttonTitle="Submit OTP"
                    onPress={() => {
                        if(p==='Login'){
                            
                        }else{
                            navigation.navigate('CreateUser')
                        }}
                    }
                />
                {resend?<TouchableOpacity style={{marginTop:15}}><Text style={styles.navButtonText}>Please try Again in {time} seconds</Text></TouchableOpacity>:
                <TouchableOpacity style={{marginTop:15}} onPress={()=>counter()} >
                    <Text style={styles.navButtonText}>
                        Resend OTP
                    ?</Text>
                </TouchableOpacity>}
            </View>):null}
        </View>
    )
}

export default PhoneAuth;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:20,
        alignItems:'center',
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
      },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
    },
    logo: {
        height: 180,
        width: 180,
        resizeMode: 'cover',
    },
    navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
    },
});
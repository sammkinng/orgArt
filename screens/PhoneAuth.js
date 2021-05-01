import React ,{useState,useEffect,useContext} from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { useNavigationState} from "@react-navigation/native"
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../navigation/AuthProvider'

const PhoneAuth=({navigation})=>{
    const {phoneOTP,verifyLogin,verifySignIn,confirm,setConfirm}=useContext(AuthContext);
    const [phone,setPhone]=useState();
    const [valid,setValid]=useState();
    const [otp,setOtp]=useState();
    const [resend,setResend]=useState(false)
    const [time,setTime]=useState(60);
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
    useEffect(()=>{
        if(time>0){
            setTimeout(()=>{setTime(time-1)},1000)
        }else{
            setResend(true)
        }
    },[resend,time])
    return(
        <View style={styles.container}>
            {confirm?
            (<View style={{marginTop:58,flex:1,width:'100%',alignItems:'center'}}>
                <Text style={[styles.navButtonText,{marginBottom:15}]}>OTP sent to +91 {phone}</Text>
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
                            verifyLogin(otp)
                        }else{
                            verifySignIn(otp)
                        }}
                    }
                />
                <TouchableOpacity style={{marginTop:15}} onPress={()=>{
                    setConfirm(null)
                    setOtp(null)
                    setResend(null)
                    setTime(60)
                    }}>
                    <Text style={styles.navButtonText}>Change Number?</Text>
                </TouchableOpacity>
                {resend?<TouchableOpacity style={{marginTop:15}} onPress={()=>{
                    phoneOTP('+91 '+phone)
                    setResend(false)
                    setTime(60)
                    }}>
                    <Text style={styles.navButtonText}>
                        Resend OTP
                    ?</Text>
                </TouchableOpacity>
                :<Text style={[styles.navButtonText,{marginTop:15}]}>Resend Button will be enable  in {time} seconds</Text>}
            </View>):<View style={{flex:1,width:'100%'}}>
            <Image
                source={require('../assets/orgurru.png')}
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
                    phoneOTP('+91 '+phone)
                    }}
            /></View>}
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
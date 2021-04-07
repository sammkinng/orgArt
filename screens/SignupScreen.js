import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import Snackbar from 'react-native-snackbar';
const SignupScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    check_pw:false,
    check_pw_match:false
    // secureTextEntry: true,
    // confirm_secureTextEntry: true,
  });
  const textInputChange = (val) => {
    var tt=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if( tt.test(val) ) {
        setData({
            ...data,
            email: val,
            check_textInputChange: false
        });
        console.log('true');
    } else {
        setData({
            ...data,
            email: val,
            check_textInputChange: true
        });
        console.log('false');
    }
}

const handlePasswordChange = (val) => {
  var tt=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if( tt.test(val) ) {
      setData({
          ...data,
          password: val,
          check_pw: false
      });
      console.log('true');
  } else {
      setData({
          ...data,
          password: val,
          check_pw: true
      });
      console.log('false');
  }
}

const handleConfirmPasswordChange = (val) => {
    if(val===data['password']){
    setData({
        ...data,
        confirm_password: val,
        check_pw_match:false
    });
    console.log('true');
  }
    else{
      setData({
        ...data,
        confirm_password: val,
        check_pw_match:true
    });
    console.log('cnfrmfail');
    }
}

// const updateSecureTextEntry = () => {
//     setData({
//         ...data,
//         secureTextEntry: !data.secureTextEntry
//     });
// }

// const updateConfirmSecureTextEntry = () => {
//     setData({
//         ...data,
//         confirm_secureTextEntry: !data.confirm_secureTextEntry
//     });
// }
  const {fbSignUp,googleSignUp} = useContext(AuthContext);

  return (
    <KeyboardAwareScrollView 
    style={{backgroundColor:'#f9fafd'}}
    resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={data['email']}
        onChangeText={(userEmail) => textInputChange(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {data.check_textInputChange ? 
        <Text style={[styles.color_textPrivate,{color:'#f00'}]}>
          Please enter valid email
        </Text>: null}
      <FormInput
        labelValue={data['password']}
        onChangeText={(userPassword) => handlePasswordChange(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      {data.check_pw ? 
        <Text style={[styles.color_textPrivate,{color:'#f00'}]}>
            Password must contain atleast 1 capital letter, special symbol and a number and min length 8
        </Text>: null}
      <FormInput
        labelValue={data['confirmPassword']}
        onChangeText={(userPassword) => handleConfirmPasswordChange(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
      {data.check_pw_match ? 
        <Text style={[styles.color_textPrivate,{color:'#f00'}]}>
          Passwords do not match
        </Text>: null}
      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          if(data['confirm_password'].length===0||data['password'].length===0||data['email'].length===0){
            Snackbar.show({
              text: 'Please fill all the fields',
              duration: Snackbar.LENGTH_SHORT,
            });
          }else{
          if(data['check_textInputChange']===false&&
            data['check_pw']===false&&
            data['check_pw_match']===false){
          // register(data['email'], data['password'])
          navigation.navigate('CreateUser',{uemail:data.email,upassword:data.password})
          // navigation.navigate('EmailVerify')
        }
        else{
          
        }
        }}}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('TermsScreen')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyScreen')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Privacy policy
          </Text>
        </TouchableOpacity>
      </View>

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign Up with Phone No."
            btnType="phone"
            color="#03ad6c"
            backgroundColor="#d8f2e8"
            onPress={() => navigation.navigate('PhoneAuth')}
          />
          <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbSignUp()}
          />
    
          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleSignUp()}
          />
        </View>
       ) : null} 

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
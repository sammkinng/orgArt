import React,{useState} from 'react';
import {View, Text ,Image} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import Snackbar from 'react-native-snackbar';
import { useContext } from 'react';

const ForgotScreen=({navigation})=>{
    const [email, setEmail] = useState();
    const [valid,setValid]=useState({
        em:false
    });
    const {passwordReset}=useContext(AuthContext);
    const valid_email=(val)=>{
        var tt=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if( tt.test(val) ) {
            setEmail(val);
            setValid({
                ...valid,
                em: false,
            })
        }
        else{
            setEmail(val);
            setValid({
                ...valid,
                em: true,
            })
        }
    }
    return(
        <View style={{
            backgroundColor: '#fff',
            flex: 1,
            alignItems: 'center',
            padding: 20,
          }}>
            <Image
                source={require('../assets/key.png')}
                style={{
                    height: 150,
                    width: 150,
                    resizeMode: 'cover',
                  }}
            />
            <Text style={{
                fontSize: 18,
                fontWeight: '500',
                color: '#04691d',
                fontFamily: 'Lato-Regular',
            }}>
                Forgot your password?
            </Text>
            <Text style={{
                fontSize: 13,
                fontWeight: '400',
                fontFamily: 'Lato-Regular',
                color: 'grey',
                marginTop:25
            }}>
                Don't worry! Just fill in your email and we'll send
            </Text>
            <Text style={{
                fontSize: 13,
                fontWeight: '400',
                fontFamily: 'Lato-Regular',
                color: 'grey',
                marginBottom:25
            }}>
                you a link to reset your password.
            </Text>
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => valid_email(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            {valid.em ? 
            <Text style={{color:'#f00'}}>
            Please enter valid email
            </Text>: null}
            <FormButton
                buttonTitle="Send Email"
                onPress={() => {
                    if(typeof(email)==='string'){
                        if(email.length==0){
                          Snackbar.show({
                            text: 'Please fill all the fields',
                            duration: Snackbar.LENGTH_SHORT,
                          });
                        }
                        else if(valid.em){
                            
                        }
                        else{
                            passwordReset(email);
                            navigation.goBack();}
                    }else{
                      Snackbar.show({
                        text: 'Please fill all the fields',
                        duration: Snackbar.LENGTH_SHORT,
                      });}
                }}
            />
        </View>
    )
}

export default ForgotScreen;
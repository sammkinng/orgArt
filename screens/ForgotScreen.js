import React,{useState} from 'react';
import {View, Text ,Image} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import { useContext } from 'react';

const ForgotScreen=({navigation})=>{
    const [email, setEmail] = useState();
    const {passwordReset}=useContext(AuthContext);
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
                marginVertical:35,
            }}>
                Forgot your password?
            </Text>
            <Text style={{
                fontSize: 13,
                fontWeight: '400',
                fontFamily: 'Lato-Regular',
                color: 'grey',
            }}>
                Don't worry! Just fill in your email and we'll send
            </Text>
            <Text style={{
                fontSize: 13,
                fontWeight: '400',
                fontFamily: 'Lato-Regular',
                color: 'grey',
                marginBottom:35
            }}>
                you a link to reset your password.
            </Text>
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormButton
                buttonTitle="Send Email"
                onPress={() => {
                    passwordReset(email);
                    navigation.navigate('Login');
                }}
            />
        </View>
    )
}

export default ForgotScreen;
import React ,{useContext, useEffect, useState} from 'react'
import { View ,Text,StyleSheet} from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import {AuthContext} from '../navigation/AuthProvider';
import { useNavigationState} from "@react-navigation/native"


const CreateUser=({navigation,route})=>{
    const {register}=useContext(AuthContext)
    const [data,setData]=useState({
        firstName:'',
        lastName:'',
        phone:null,
        address:'',
        city:'',
        noValid:null,
        addValid:null,
    })
    const validNo=(val)=>{
        if(val.length===10){
            setData({
                ...data,
                phone:val,
                noValid:false
            })
        }else{
            setData({
                ...data,
                phone:val,
                noValid:true
            })
        }
    }
    const validAdd=(val)=>{
        if(val.length>=20){
            setData({
                ...data,
                address:val,
                addValid:false
            })
        }else{
            setData({
                ...data,
                address:val,
                addValid:true
            })
        }
    }
    const validForm=()=>{
        if(data.addValid===false&&data.noValid===false&&data.firstName.length>0&&data.lastName.length>0&&data.city.length>0){
            return(true)
        }else{
            return(false)
        }
    }
    const usePreviousRouteName=()=>{
        return useNavigationState(state =>
          state.routes[state.index - 1]?.name
            ? state.routes[state.index - 1].name
            : 'None'
        );
      }
    const p=usePreviousRouteName()
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                Fill your Details
            </Text>
            <FormInput
                labelValue={data.firstName}
                onChangeText={(val)=>setData({
                    ...data,
                    firstName:val
                })}
                placeholderText="First Name"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={data.fullName}
                onChangeText={(val)=>setData({...data,
                    lastName:val
                })}
                placeholderText="Last Name"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
            />
            {p==='Signup'?(<View style={{alignItems:'center'}}>
                <FormInput
                    labelValue={data.phone}
                    onChangeText={(val)=>validNo(val)}
                    placeholderText="Phone"
                    iconType="phone"
                    keyboardType='numeric'
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {data.noValid?<Text style={[styles.color_textPrivate,{color:'#f00'}]}>
                    Mobile no. must be of 10 digits 
                </Text>: null}  
            </View>):null}
            <FormInput
                labelValue={data.city}
                onChangeText={(val)=>setData({
                    ...data,
                    city:val
                })}
                placeholderText="City"
                iconType="find"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={data.address}
                onChangeText={(val)=>validAdd(val)}
                placeholderText="Home Address"
                iconType="home"
                autoCapitalize="none"
                autoCorrect={false}
            />
            {data.addValid?<Text style={[styles.color_textPrivate,{color:'#f00'}]}>
                    Address must be of at least length 20 
                </Text>: null}
            <FormButton
                buttonTitle="Submit"
                onPress={() => {
                    if(validForm()){
                       register(route.params.uemail,route.params.upassword,data.firstName,data.lastName,data.phone,data.city,data.address)
                    }else{
                        console.log('not valid')
                    }
                }}
            />
        </View>
    )
}

export default CreateUser

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
})
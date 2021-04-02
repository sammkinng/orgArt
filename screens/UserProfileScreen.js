import React, { useContext } from 'react';
import { View,StyleSheet,Text, Button } from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

const UserProfileScreen=({navigation})=>{
    const {user,logout}=useContext(AuthContext);
    return(
        <View style={styles.container}>
            <Text>
                Welcome {user.uid}
            </Text>
            <Button title='Log out' onPress={()=>logout()}/>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default UserProfileScreen;
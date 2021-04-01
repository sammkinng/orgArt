import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

const PrivacyScreen=({navigation})=>{
    return(
        <View style={styles.container}>
            <Text>
                Privacy Screen
            </Text>
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

export default PrivacyScreen;
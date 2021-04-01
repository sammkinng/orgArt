import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

const TermsScreen=({navigation})=>{
    return(
        <View style={styles.container}>
            <Text>
                Terms Screen
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

export default TermsScreen;
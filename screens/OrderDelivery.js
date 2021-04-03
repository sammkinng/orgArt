import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

const OrderDelivery=({navigation})=>{
    return(
        <View style={styles.container}>
            <Text>
                Order Screen
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

export default OrderDelivery;
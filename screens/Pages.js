import React from 'react';
import { View,StyleSheet,Text, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
const Loader=()=>{
    return(<View style={styles.container}>
        <ActivityIndicator size='large' color="#00f00"/>
    </View>
    )
}
const Pages=({navigation,route})=>{
    
    return(
        // <WebView source={{uri:'https://happy-roentgen-d53470.netlify.app/'}}/>
        <WebView source={{uri:'https://happy-roentgen-d53470.netlify.app/'+route.params.page}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            renderLoading={Loader}
            startInLoadingState={true}
        />
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Pages;
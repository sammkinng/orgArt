import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16,color:"#918306"}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16,color:"#918306"}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16,color:"#918306"}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: '#401d04',
            image: <Image source={require('../assets/ofimg1.jpg')} />,
            title: 'orGuru',
            subtitle: 'Your Guru to learn Organic Farming',
          },
          {
            backgroundColor: '#fbebe4',
            image: <Image source={require('../assets/qnda.png')} />,
            title: 'Questions Answer Forum',
            subtitle: 'Share Your Thoughts With Similar Kind of People and Ask questions.',
          },
          {
            backgroundColor: '#026928',
            image: <Image source={require('../assets/mart.png')} />,
            title: 'Organic Mart',
            subtitle: "Shop Organic Foods and Starter Packs  as well as Equipments.",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
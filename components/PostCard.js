import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants'

import {
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  InteractionWrapper,
  InteractionText,
} from './FeedStyles';

import ProgressiveImage from './ProgressiveImage';

import { AuthContext } from '../navigation/AuthProvider';

import moment from 'moment';
import { TouchableOpacity, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PostCard = ({ item, upvote, onPress, downvote, screen }) => {
  const [userData, setUserData] = useState(null);
  const likeIconColor = item.liked ? COLORS.primary : COLORS.secondary;
  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Card onPress={onPress}>
      <UserInfo>
        <UserImg>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }} >{userData ? userData.fname.toUpperCase()[0] || 'T' : 'T'}</Text>
        </UserImg>
        <UserInfoText>

          <UserName>
            {userData ? userData.fname || 'Test' : 'Test'}{' '}
            {userData ? userData.lname || 'User' : 'User'}
          </UserName>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
        {screen ? (<InteractionWrapper>

          <TouchableOpacity onPress={()=>upvote(item.id)}>
            <Ionicons name="angle-up" size={25} color={likeIconColor} />
          </TouchableOpacity>
          <InteractionText >{item.upVotes}</InteractionText>
          <TouchableOpacity onPress={()=>downvote(item.id)} >
            <Ionicons name="angle-down" size={25} color={likeIconColor} />
          </TouchableOpacity>
        </InteractionWrapper>) :
          (
            <InteractionWrapper>
              <InteractionText >{item.upVotes} Upvotes</InteractionText>
            </InteractionWrapper>
          )
        }
      </UserInfo>
      <PostText>{item.ques}</PostText>
      {item.img != null ? (
        <ProgressiveImage
          defaultImageSource={require('../assets/default-img.jpg')}
          source={{ uri: item.img }}
          style={{ width: '100%', height: 250 }}
          resizeMode="cover"
        />
      ) : null}
    </Card>
  );
};

export default PostCard;

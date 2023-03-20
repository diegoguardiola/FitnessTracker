import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const Home = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/myprofile');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {profiles.map((profile) => (
        <View key={profile._id}>
          <Text>{profile.firstName} {profile.lastName}</Text>
          <Text>{profile.email}</Text>
          <Text>{profile.age}</Text>
          <Text>{profile.height}</Text>
          <Text>{profile.weight}</Text>
          {profile.profilePicture && <Text>{profile.profilePicture}</Text>}
        </View>
      ))}
    </View>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/core";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Home = () => {
  const [profiles, setProfiles] = useState([]);

  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

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
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      {profiles.map((profile) => (
        <View key={profile._id} style={{alignSelf: 'center'}}> 
          <Text style={styles.profileInfoText}>{profile.firstName} {profile.lastName}</Text>
          <Text style={styles.profileInfoText}>{profile.email}</Text>
          <Text style={styles.profileInfoText}>{profile.age}</Text>
          <Text style={styles.profileInfoText}>{profile.height}</Text>
          <Text style={styles.profileInfoText}>{profile.weight}</Text>
          {profile.profilePicture && <Text>{profile.profilePicture}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#04151F'
  },
  profileInfoText: {
    fontSize: 25,
    color: '#6B818C',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#04151F',
    width: '20%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  }
});


export default Home;

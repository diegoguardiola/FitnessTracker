import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ProfileForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleSubmit = () => {
    const formData = {
      firstName,
      lastName,
      email,
      age,
      height,
      weight,
      profilePicture,
    };
    console.log('Submitted data: ', formData);
    axios
    .post('http://localhost:3000/api/v1/myprofile', formData)
    .then((response) => {
      console.log('Profile saved: ', response.data);
    })
    .catch((error) => {
      console.log('Error saving profile: ', error.message);
    });
}


const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
  
    if (!result.cancelled) {
      setProfilePicture(result.base64); // convert the image to a base64 string and save it as a string in the database.
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        placeholder="Height (cm)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Weight (kg)"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Pick Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProfileForm;

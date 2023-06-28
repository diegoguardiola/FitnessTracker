import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigation = useNavigation();

  const handleClick = () => {
    logout();
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Workout Buddy</Text>
        </TouchableOpacity>
        <View>
          {user ? (
            <View>
              <Text>{user.email}</Text>
              <TouchableOpacity onPress={handleClick}>
                <Text>Log out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text>Signup</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Navbar;

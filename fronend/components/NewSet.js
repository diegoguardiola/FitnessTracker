import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';



const CreateNewSet = () => {
  const [setInputs, setSetInputs] = useState([]);

  const onPressNewSet = () => {
    setSetInputs(prevSetInputs => [...prevSetInputs, <View></View> ]);
  };
  const onPressDeleteSet = () => {
    setSetInputs(prevItems => prevItems.slice(0, -1));
  };

  return (
    <>
    <View>
       <View style={styles.setView}>
            {setInputs.map((item, index) => (
                <View style={styles.setRow} key={index}>
                    <Text >Set {index+1}</Text>
                    <TextInput style={styles.TextInputStyle}></TextInput>
                    <TextInput style={styles.TextInputStyle}></TextInput>
                </View>
            ))}
        </View>
        <View style={styles.SetButtons}>
            <TouchableOpacity style={styles.SetButtonStyle} onPress={onPressNewSet}>
                <Text>New Set</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.SetButtonStyle} onPress={onPressDeleteSet}>
                <Text>Delete Set</Text>
            </TouchableOpacity>
        </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
    SetButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5
    },
    SetButtonStyle: {
        margin: 5
    },
    setView: {
      flexDirection: 'column',
      margin: 5,
      width: 260,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    setRow: {
      flexDirection: 'row',
      margin: 5,
      width: 250,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    TextInputStyle: {
      backgroundColor: '#4a9972',
      width: 75
    }
  })

  export default CreateNewSet;
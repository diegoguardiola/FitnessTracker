import React, { useState } from 'react';
import { View, ScrollView, Modal, Picker, Text, TouchableOpacity, TextInput, StyleSheet, Button, FlatList  } from 'react-native';


export const ExerciseView = ({ onData, exerciseName }) => {


    const [childData, setChildData] = useState([]);
  
    const handleButtonClick = () => {
      setChildData(data);
      onData(data);
    };

    const [setInfo, setSetInfo] = useState({ weight: "", reps: "" });
    const [data, setData] = useState({});
  
    const handlePress = () => {
      setData(prevData => ({
        ...prevData,
        [exerciseName]: [
          ...(prevData[exerciseName] || []),
          { ...setInfo }
        ]
      }));
      setSetInfo({ weight: "", reps: "" });
      console.log(exerciseName)
      console.log(data)
    };
  
    return (
      <View style={styles.setDataBox}>
        <View style={styles.addSetInfo}>
          <Text>Weight</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={setInfo.weight}
            onChangeText={text => setSetInfo(prevSetInfo => ({ ...prevSetInfo, weight: text }))}
          />
          <Text>Reps</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={setInfo.reps}
            onChangeText={text => setSetInfo(prevSetInfo => ({ ...prevSetInfo, reps: text }))}
          />
          <Button
            title="Add Set"
            onPress={handlePress}
          />
        </View>
        <View style={styles.setDisplay}>
            {data[exerciseName] && (
            <FlatList
                data={data[exerciseName]}
                renderItem={({ item, index }) => (
                <View style={styles.setDisplayText}>
                    <Text>Set {index+1}</Text>
                    <Text>Weight: {item.weight}</Text>
                    <Text>Reps: {item.reps}</Text>
                </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            )}
        </View>
        <View style={styles.setButton}>
          <Button style={styles.setButton} title="Complete Exercise" 
        onPress={() => {handleButtonClick(); handlePress();}} />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    setDataBox: {
      width: 500,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    addSetInfo: {
      width: 400,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      margin: 10,
    },
    setDisplay: {
      width: 400,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    setDisplayText: {
      width: 400,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      margin: 10,
    },
    textInput: {
      width: 50,
      height: 20,
      borderWidth: 1,
      borderRadius: 5
    },
    setButton: {
      width: 90,
    },
  })


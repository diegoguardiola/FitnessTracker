import React, { useState } from 'react';
import { 
          View, ScrollView, Modal, Picker, 
          Text, TouchableOpacity, TextInput,
          StyleSheet, Button, FlatList  
} from 'react-native';


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
          <Text style={styles.setDisplayText}>Weight</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={setInfo.weight}
            onChangeText={text => setSetInfo(prevSetInfo => ({ ...prevSetInfo, weight: text }))}
          />
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={setInfo.reps}
            onChangeText={text => setSetInfo(prevSetInfo => ({ ...prevSetInfo, reps: text }))}
          />
          <TouchableOpacity onPress={handlePress} style={styles.setButton}>
            <Text style={styles.buttonText}>Add Set</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.setHeader}>
          <Text style={styles.setDisplayText}>Set</Text>
          <Text style={styles.setDisplayText}>Weight</Text>
          <Text style={styles.setDisplayText}>Reps</Text>
        </View>
        <View style={styles.setDisplay}>
          {data[exerciseName] && (
              <FlatList
                  data={data[exerciseName]}
                  renderItem={({ item, index }) => (
                      <View key={item.id} style={styles.setDataHeader}>
                          <Text style={styles.setDisplayText}>{index+1}</Text>
                          <Text style={styles.setDisplayText}>{item.weight}</Text>
                          <Text style={styles.setDisplayText}>{item.reps}</Text>
                      </View>
                  )}
              />
          )}
        </View>

        <View >
          <TouchableOpacity onPress={() => {handleButtonClick(); handlePress();}} style={styles.completeExerciseButton}>
            <Text style={styles.buttonText}>Complete Exercise</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    setDataBox: {
      width: '90%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    addSetInfo: {
      width: '85%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      margin: 10,
    },
    setDisplay: {
      width: '85%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    setHeader: {
      flexDirection: 'row',
      width: '80%',
      justifyContent: 'space-evenly',
    },
    setDataHeader: {
      flexDirection: 'row',
      width: '80%',
      justifyContent: 'space-evenly',
      marginBottom: 10,
    },
    setDisplayText: {
      color: '#DEDECE'
    },
    textInput: {
      width: 50,
      height: 20,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#DEDECE',
      color: '#DEDECE'
    },
    setButton: {
      backgroundColor: '#955E42',
      width: 80,
      padding: 10,
      borderRadius: 5,
    },
    completeExerciseButton: {
      backgroundColor: '#955E42',
      width: 150,
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 8
    },
    buttonText: {
      color: '#DEDECE', 
      alignSelf: 'center', 
      fontSize: 15,
    }
  })


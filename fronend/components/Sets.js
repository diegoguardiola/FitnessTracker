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
      <View>
        <Text>Weight</Text>
        <TextInput
          keyboardType="numeric"
          value={setInfo.weight}
          onChangeText={text => setSetInfo(prevSetInfo => ({ ...prevSetInfo, weight: text }))}
        />
        <Text>Reps</Text>
        <TextInput
          keyboardType="numeric"
          value={setInfo.reps}
          onChangeText={text => setSetInfo(prevSetInfo => ({ ...prevSetInfo, reps: text }))}
        />
        <Button
          title="Add Set"
          onPress={handlePress}
        />
        <View style={styles.SetDataBox}>
            {data[exerciseName] && (
            <FlatList
                data={data[exerciseName]}
                renderItem={({ item }) => (
                <View>
                    <Text>Weight: {item.weight}</Text>
                    <Text>Reps: {item.reps}</Text>
                </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            )}
        </View>
        <Button title="Send Data to Parent" 
        onPress={() => {handleButtonClick(); handlePress();}} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    SetDataBox: {
      flex: 1,
      flexDirection: 'column',
      borderWidth: 2,
      borderRadius: 5
    } ,
  })


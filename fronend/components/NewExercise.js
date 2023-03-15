import React, { useState } from 'react';
import axios from 'axios';
import { View, ScrollView, Modal, Picker, Text, TouchableOpacity, TextInput, StyleSheet, Button, FlatList  } from 'react-native';
import myExerciseList from './ExerciseList';
import {ExerciseView} from './Sets';

const exercises = myExerciseList

const ExerciseList = () => {

  const [dataFromChild, setDataFromChild] = useState([]);

  const handleChildData = (data) => {
    setDataFromChild([...dataFromChild, data]);
  };

  const [views, setViews] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  //Form data to be sent to the database
  const [formData, setFormData] = useState({
    exercises: [{
      exerciseName: '',
      sets: [{
        weight: '',
        reps: ''
      }]
    }]
  })

  const handlePress = (item) => {
    setSelectedValue(item)
    const newView = <View  key={views.length} >
                      <Text>Exercise: {item.name}</Text>
                      <ExerciseView exerciseName={item.name} onData={handleChildData} ></ExerciseView>
                    </View>;
    setViews([...views, newView]);
    setVisible(false);
  };

  const submitAll = async (event) => {
    event.preventDefault()
    const dataSend = JSON.stringify(dataFromChild)
    console.log(dataSend)

    const updatedFormData = dataFromChild.map((exercise) => {
      const exerciseName = Object.keys(exercise)[0]
      const sets = exercise[exerciseName].map((set) => {
        return {
          weight: set.weight,
          reps: set.reps
        }
      })
      return {
        exerciseName,
        sets
      }
    })
    setFormData({
      exercises: updatedFormData
    })
    
    console.log(formData)
      
    try {
      const response = await axios.post('http://localhost:3000/api/v1/myworkouts', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log(dataSend)
  }



  return (
    <View>
      {/* Render the views */}
      <View style={styles.ExerciseBox}>
        {views}
      </View>
     

      {/* Add a new view */}
      <TouchableOpacity onPress={() => setVisible(true)}>
          <Text>Select an Exercise</Text>
        </TouchableOpacity>
        <Modal visible={visible}>
          <ScrollView>
            {exercises.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => handlePress(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
        <Button title="Submit All" onPress={submitAll} />
    </View>
  );
}

const styles = StyleSheet.create({
  ExerciseBox: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    width: 500,
  }
})

export default ExerciseList;

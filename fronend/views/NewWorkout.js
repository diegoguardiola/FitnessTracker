import ExerciseList from "../components/NewExercise";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Button } from 'react-native';
import axios from "axios";
import React from "react";
import { useState } from 'react';


function NewWorkout() {

    const [workoutData, setworkoutData] = useState({
      Exercise_ID: '',
      Exercise_Name: '',
      Reps: '',
      Weight: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
    
        const newFormDocument = {
          Exercise_ID: formData.Exercise_ID,
          Exercise_Name: formData. Exercise_Name,
          Reps: formData.Reps,
          Weight: formData.Weight
        }
    
        try {
          await axios.post('/api/v1/first', newFormDocument)
          alert('Success')
        } catch {
          console.log('Error')
        }
    
      }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>New Workout</Text>
        <StatusBar style="auto" />
        <ExerciseList/>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    );
  }

  export default NewWorkout;

  


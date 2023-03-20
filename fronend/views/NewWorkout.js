import ExerciseList from "../components/NewExercise";
import { 
  StyleSheet, Text, View, 
  TouchableOpacity, StatusBar, 
  Button, SafeAreaView 
} from 'react-native';
import axios from "axios";
import React from "react";
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


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
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>New Workout</Text>
          <StatusBar style="auto" />
          <ExerciseList/>
        </View>
        </SafeAreaView>
      </SafeAreaProvider>

    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#04151F'
    },
    headerContainer: {
      flex: 1,
      alignItems: 'center'
    },
    headerText: {
      fontSize: 44,
      color: '#9C914F',
    }
  });

  export default NewWorkout;

  


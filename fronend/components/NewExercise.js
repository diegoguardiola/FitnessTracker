import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  View, ScrollView, Modal, 
  Text, TouchableOpacity, StyleSheet, 
  FlatList 
} from 'react-native';
import myExerciseList from './ExerciseList';
import { ExerciseView } from './Sets';

const exercises = myExerciseList;

const ExerciseList = () => {
  //timer function
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const [timerInterval, setTimerInterval] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1000);
      }, 1000);
      setTimerInterval(interval);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning]);

  const startTimer = () => {
    startTimeRef.current = new Date();
    setIsRunning(true);
  };

  const finishTimer = async () => {
    const currentTime = new Date();
    endTimeRef.current = currentTime;
    setIsRunning(false);
    console.log('Start time:', startTimeRef.current);
    console.log('End time:', currentTime);
  };


  const formatTime = (timeInMillis) => {
    const totalSeconds = timeInMillis / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  //retrieves data from child component (sets.js)
  const [dataFromChild, setDataFromChild] = useState([]);
  const handleChildData = (data) => {
    setDataFromChild([...dataFromChild, data]);
    console.log(dataFromChild);
  };
//creates new view for each exercise
  const [views, setViews] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handlePress = (item) => {
    setSelectedValue(item);
    const newView = (
      <View key={views.length}>
        <Text>Exercise: {item.name}</Text>
        <ExerciseView exerciseName={item.name} onData={handleChildData}></ExerciseView>
      </View>
    );
    setViews([...views, newView]);
    setVisible(false);
  };
//submitsall data to backend
const submitAll = async (event) => {
  event.preventDefault();

  const exercisesToSend = dataFromChild.map((exercise) => {
    const exerciseName = Object.keys(exercise)[0];
    const sets = exercise[exerciseName].map((set) => {
      return {
        weight: set.weight,
        reps: set.reps,
      };
    });
    return {
      exerciseName,
      sets,
    };
  });

  const requestData = {
    startTime: startTimeRef.current,
    endTime: endTimeRef.current,
    exercises: exercisesToSend,
  };

  console.log(requestData);

  try {
    const response = await axios.post('http://localhost:3000/api/v1/myworkouts', requestData);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <View style={styles.container}>
      <ScrollView>
       {/* Render the clock */}
        <View style={styles.timeContainer}>
          <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
          <View style={styles.timeButtonContainer}>
            <TouchableOpacity style={styles.startButton} onPress={startTimer}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finishButton} onPress={finishTimer}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Render the views */}
        <View style={styles.ExerciseBox}>
          {views}
        </View>
        {/* Add a new view */}
        <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={{color: '#6B818C', alignSelf: 'center'}}>Select an Exercise</Text>
        </TouchableOpacity>
        <Modal visible={visible}>
          <ScrollView 
            ontentContainerStyle={styles.scrollViewContainer} 
            contentInset={{top: 10, left: 10, bottom: 10, right: 10}}
            bounces='true'>
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
        {/* Submit All */}
        <TouchableOpacity onPress={submitAll} style={styles.submitAllButton}>
          <Text style={styles.buttonText}>Submit All</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ExerciseBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10
  },
  timerText: {
    fontSize: 38,
    color: '#6B818C'
  },
  timeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  startButton: {
    backgroundColor: '#6B818C',
    color: '#EFEFE6',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  finishButton: {
    backgroundColor: '#6B818C',
    color: '#EFEFE6',
    padding: 8,
    borderRadius: 4,
  },
  scrollViewContainer: {
    alignItems: 'center',
    width: 450
  },
  submitAllButton: {
    backgroundColor: '#955E42',
    alignSelf: 'center',
    alignItems: 'center',
    width: 300,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
})

export default ExerciseList;

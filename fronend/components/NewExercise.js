import React, { useState } from 'react';
import { View, ScrollView, Modal, Picker, Text, TouchableOpacity, TextInput, StyleSheet, Button, FlatList  } from 'react-native';
import myExerciseList from './ExerciseList';
import {ExerciseView} from './Sets';

const exercises = myExerciseList

const ExerciseList = () => {

  const [dataFromChild, setDataFromChild] = useState([]);

  const handleChildData = (data) => {
    [... dataFromChild, setDataFromChild(data)];
  };

  const [views, setViews] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);


  const handlePress = (item) => {
    setSelectedValue(item)
    const newView = <View  key={views.length} >
                      <Text>Exercise: {item.name}</Text>
                      <ExerciseView exerciseName={item.name} onData={handleChildData} ></ExerciseView>
                    </View>;
    setViews([...views, newView]);
    setVisible(false);
  };

  const submitAll = (e) => {
    e.preventDefault()
    const viewAll = views.map((item) => {
      return item
    })
    console.log(dataFromChild)
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
    flex: 1,
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: 5
  }
})

export default ExerciseList;

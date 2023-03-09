import React, { useState } from 'react';
import { View, ScrollView, Modal, Text, TouchableOpacity, TextInput, StyleSheet  } from 'react-native';
import myExerciseList from './ExerciseList';
import CreateNewSet from './NewSet';


const exercises = myExerciseList

const ExerciseList = () => {
  //new exercise
  const [inputs, setInputs] = useState([]);         //inputs for exercise list
  const [visible, setVisible] = useState(false);    //visibility of list
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (item) => {
    // Do something with selected item
    setInputs([...inputs, ""]);           //takes previous list config and adds an empty string?
    setVisible(false);
    setSelectedItem(item);
  };



  return (
    <View>
      <View>
        <View style={styles.ExerciseBox}>
          {inputs.map((item, index) => (
            <View style={styles.ExerciseBoxMinor} key={index}>        {/* new set */}  
              <Text>Exercise{index+1}</Text>
              <Text>{selectedItem.name}</Text>
              {/* new set button goes here */}
              <CreateNewSet></CreateNewSet>
            </View>
          ))}
        </View>
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
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  ExerciseBox: {
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: 5
  },
  ExerciseBoxMinor: {
    flexDirection: 'column',
    padding: 5,
    margin: 10,
    borderWidth: 2,
    borderRadius: 5
  },
})


export default ExerciseList;

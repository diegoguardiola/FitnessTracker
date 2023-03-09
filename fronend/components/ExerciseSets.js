import React, { useState } from 'react';

function Exercise() {
  const [newExerciseDocument, setNewExerciseDocument] = useState({
    Reps: '',
    Weight: '',
  });
  const [exerciseDocuments, setExerciseDocuments] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExerciseDocument({ ...newExerciseDocument, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setExerciseDocuments([...exerciseDocuments, newExerciseDocument]);
    setNewExerciseDocument({ Reps: '', Weight: ''});
    console.log(newExerciseDocument)
    console.log(exerciseDocuments)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Weight:
        <input
          type="text"
          name="Reps"
          value={newExerciseDocument.Reps}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Reps:
        <input
          type="text"
          name="Weight"
          value={newExerciseDocument.Weight}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
      <ul>
        {exerciseDocuments.map((exerciseDocument, index) => (
          <li key={index}>
            {exerciseDocument.Reps} {exerciseDocument.Weight} 
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Exercise;

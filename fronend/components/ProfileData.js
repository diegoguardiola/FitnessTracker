import axios from 'axios';

const fetchProfileData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/myprofile/:id');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch profile data.');
  }
};

export { fetchProfileData };

import axios from 'axios';

export const apiFunction = axios.create({
    baseURL: 'http://localhost:8000',
});

export async function getCourses(){
    try {
        const response = await apiFunction.get('/courses');
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error fetching courses');
    }
}
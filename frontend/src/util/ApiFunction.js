import axios from 'axios';

export const getHeaders = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    }

}

export const apiFunction = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

export async function getAllCategory(){
    try{
        const response = await apiFunction.get('/category/', {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error fetching category');
    }
}

export async function getCourseByCategory(categoryId){

}

export async function getCourses(){
    try {
        const response = await apiFunction.get('/courses',{
            headers: getHeaders()
        });
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error fetching courses');
    }
}

export async function getCoursesByBookmark(){
    try {
        const response = await apiFunction.get('/bookmark', {
            headers: getHeaders()
        });
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error fetching bookmarked courses');
    }
}

export async function deleteBookmark(courseId){
    try {
        const response = await apiFunction.delete(`/bookmark/${courseId}`, {
            headers: getHeaders()

        });
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error deleting bookmarked course');
    }
}
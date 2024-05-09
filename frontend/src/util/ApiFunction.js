import axios from 'axios';

export const getHeaders = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    }

}

export const apiFunction = axios.create({
    baseURL: 'http://localhost:8000',
});

export async function getAllCategory(){
    try{
        const response = await apiFunction.get('/category/', {
            headers: getHeaders()
        });
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error fetching category');
    }
}

export async function getCourseByCategory(categoryId){
    try{
        const response = await apiFunction.get('/allcoursesbycategory_id='+categoryId+'/', {
          headers: getHeaders()
        })
        console.log(response.data);
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error fetching courses by category');
    }
}

export async function getDocumentsbyCourse(courseId){
    try{
        const response = await apiFunction.get('/course_detail/'+courseId+'/', {
            headers: getHeaders()
        })
        console.log(response.data);
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error fetching courses by category');
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

export  async function  getDocumentDetails(documentId){
    try{
        console.log(getHeaders())
        const response= await apiFunction.get(`/document/documentdetail_id=1/`,{
            headers:getHeaders()
        })
        return response.data

    }catch (e){
        console.log( e)
        throw  new Error("ERROR for getting documents details")
    }
}

export async function createCourse(course){
    try {
        const response = await apiFunction.post('/createcourse/', course, {
            headers: getHeaders()
        });
        console.log(response.data);
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error creating course');
    }
}

export async function createDocument(document, course_id){
    try {
        const response = await apiFunction.post('/course/'+course_id+'/createdocument/', document, {
            headers: getHeaders()
        });
        console.log(response.data);
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error creating document');
    }
}

export const createChapter= async  (documentId, newChapter)=>{
    try{
        const response = await apiFunction.post(`/document/${documentId}/createchapter/`,newChapter,{
            headers: getHeaders()
        } )
        console.log(response.data)
        return response.data
    }catch (e) {
        console.log(e)
        throw  e
    }
}

export async function getDocumentByUser(){
    try {
        const response = await apiFunction.get('/getAllDocumentsByUser/', {
            headers: getHeaders()
        });
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error fetching user documents');
    }
}

export async function deleteDocument(documentId){
    try {
        const response = await apiFunction.delete(`/deleteDocument/${documentId}/`, {
            headers: getHeaders()
        });
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error deleting document');
    }
}
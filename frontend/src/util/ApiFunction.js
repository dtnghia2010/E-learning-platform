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
        const response= await apiFunction.get(`/document/documentdetail_id=${documentId}/`,{
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

export  const getChapter= async (chapterId)=>{
    try{
        const response= await apiFunction.get(`/chapter/${chapterId}/`,{
            headers:getHeaders()
        })
        // console.log(response)
        return response.data

    }catch (e){
        console.log(e)
    }
}

export const updateDocument= async (documentId, updatedDocument)=>{
    try{
        const response =await apiFunction.put(`/updateDocument/${documentId}/`,updatedDocument,{
            headers: getHeaders()
        })
        return response.data
    }catch (e) {
        console.log(e)
        throw e
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
export  async function updateChapter(chapterId, updatedChapter){
    try{
        const response= await apiFunction.put(`/updateChapter/${chapterId}/`,updatedChapter,{
            headers:getHeaders()
        })
        return response.data;
    }catch (e) {
        console.log(e)
    }
}

export async function getQuizzById(quizzId){
    try {
        const response = await apiFunction.get(`/quizz/${quizzId}/questions/`, {
            headers: getHeaders()
        });
        console.log(response.data);
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error fetching quizz');
    }
}
export async function createQuizz(form){
    try{
        const res= await  apiFunction.post("/createQuizz/",form,{
            headers:getHeaders()
        })
        return res.data

    }catch (e) {
        console.log(e)
        throw  e
    }
}
export async function createQuestion(quizzId, form){
    try{
        const res= await  apiFunction.post(`/quizz/${quizzId}/createQuestion/`,form,{
            headers:getHeaders()
        })
        return res.data
    }catch (e) {
        console.log(e)
        throw  e
    }
}

export async function updateQuestion(quizzId, questionId, form){
    try{
        const res= await  apiFunction.put(`/quizz/${quizzId}/updateQuestion/${questionId}/`,form,{
            headers:getHeaders()
        })
        return res.data
    }catch (e) {
        console.log(e)
        throw  e
    }
}

export async function getQuizzByUser(){
    try {
        const response = await apiFunction.get('/getAllQuizzesByUser/', {
            headers: getHeaders()
        });
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error('Error fetching user quizz');
    }
}
export async  function getAllResult(quizzId){
    try{
        const res= await  apiFunction.get(`/quizz/${quizzId}/results/`,{
            headers: getHeaders()
        })
        return res.data

    }catch (e) {
        console.log(e)
        throw  e
    }
}

import axios from "axios";

export const getHeaders = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }

}

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

export async function getDocumentDetails(document_id){
    try {
        const response = await api.get("/document/documentdetail_id=1/");

        console.log("This is the response data" + response);
        return response.data;
    }catch (error){
        throw new Error("Error fetching rooms")
    }
}

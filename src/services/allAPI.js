import commonAPI from "../services/commonAPI";
import SERVER_URl from '../services/serverUrl'

export const registerAPI=async(reqBody)=>
{
    return await commonAPI("POST",`${SERVER_URl}/register`,reqBody)
}

export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URl}/login`,reqBody)
}

export const addTaskAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URl}/addtask`,reqBody,reqHeader)
}

export const userTasksAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URl}/view-task`,{},reqHeader)
}

export const taskUpdateAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URl}/task/${id}/edit`, reqBody, reqHeader)
}

export const taskDeleteAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URl}/task/${id}/delete`, {}, reqHeader)
}
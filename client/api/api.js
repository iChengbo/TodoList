/**
 * Created by Administrator on 2019/3/7.
 */
import axios from 'axios'
// import Qs from 'qs'

const baseUrl =
process.env.NODE_ENV === "development" ?
"https://nei.netease.com/api/apimock/f3e5d93d5eaceda5a624378374ad5cd7"
: "http://localhost:8080"

export const getAllTask = params => { return axios.get(`${baseUrl}/api/all`, {params: params}) }
export const addTask = params => { return axios.post(`${baseUrl}/api/add`, params).then(res => res.data) }
export const deleteTask = params => { return axios.post(`${baseUrl}/api/deletes`, params).then(res => res.data) }
export const updateTask = params => { return axios.post(`${baseUrl}/api/update`, params).then(res => res.data) }
export const updateManyTask = params => { return axios.post(`${baseUrl}/api/updateMany`, params).then(res => res.data) }
export const deleteCompletedTask = params => { return axios.post(`${baseUrl}/api/deletemany`, params) }
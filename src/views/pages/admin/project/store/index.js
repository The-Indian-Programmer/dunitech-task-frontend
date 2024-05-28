import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import urlConfig, { project } from '@configs/urlConfig'

// ** Axios Imports
import axios from 'axios'

axios.defaults.baseURL = urlConfig.apiUrl 

export const getAllProject = createAsyncThunk('projects/getAllProject', async (body) => {
    const response = await axios.post(project.getAllProject, body)
    return response.data
})
export const createProject = createAsyncThunk('projects/createProject', async (body) => {
    const response = await axios.post(project.createProject, body)
    return response.data
})



export const appProjecSlice = createSlice({
    name: 'projects',
    initialState: {
        projectList: {data: [], total: 0}
    },
    extraReducers: builder => {
        builder.addCase(getAllProject.fulfilled, (state, action) => {
            state.projectList = action.payload.data
        })
        
    }
})

export default appProjecSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import urlConfig, { question } from '@configs/urlConfig'

// ** Axios Imports
import axios from 'axios'

axios.defaults.baseURL = urlConfig.apiUrl 

export const getAllQuestions = createAsyncThunk('questions/getAllQuestions', async (body) => {
    const response = await axios.post(question.getAllQuestion, body)
    return response.data
})
export const createQuestions = createAsyncThunk('questions/create', async (body) => {
    const response = await axios.post(question.createQuestions, body)
    return response.data
})




export const appQuestionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questionList: {data: [], total: 0}
    },
    extraReducers: builder => {
        builder.addCase(getAllQuestions.fulfilled, (state, action) => {
            state.questionList = action.payload.data
        })
        
    }
})

export default appQuestionsSlice.reducer
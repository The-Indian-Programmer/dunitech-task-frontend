import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import urlConfig, { question } from '@configs/urlConfig'

// ** Axios Imports
import axios from 'axios'

axios.defaults.baseURL = urlConfig.apiUrl 

export const getAllQuestions = createAsyncThunk('questions/getAllQuestions', async (body) => {
    const response = await axios.post(question.user.getAllQuestion, body)
    return response.data
})

export const submitAnswer = createAsyncThunk('questions/submit', async (body) => {
    const response = await axios.post(question.user.submitAnswer, body)
    return response.data
})


export const getResult = createAsyncThunk('questions/result', async (body) => {
    const response = await axios.post(question.user.result, body)
    return response.data
})



export const appQuestionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questionList: {data: [], total: 0},
        result: {}
    },
    extraReducers: builder => {
        builder.addCase(getAllQuestions.fulfilled, (state, action) => {
            state.questionList = action.payload.data
        })
        builder.addCase(getResult.fulfilled, (state, action) => {
            state.result = action.payload.data
        })
        
        
    }
})

export default appQuestionsSlice.reducer
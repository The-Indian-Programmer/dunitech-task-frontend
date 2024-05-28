import { decode } from 'base-64'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getResult } from '../project/store'
import { toast, Slide } from 'react-toastify'
import Toast from '@src/views/components/toast/Toast'
import { Button } from 'reactstrap'
const QuizResult = () => {


    const {projectId} = useParams()
    const history = useHistory()

    const dispatch = useDispatch()



    const result = useSelector(state => state.userProject.result)


    const fetchResult = async () => {
        try {
            const body = {
                projectId: decode(projectId)
            }

            const response  = await dispatch(getResult(body))
            if (!response.payload.status) {
                toast.error(<Toast status='error' message={response.payload.message} />, { transition: Slide, hideProgressBar: true })
            } 

        } catch (error) {
            toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
        }
    }

    useEffect(() => {
        fetchResult()
    }, [])

  return (
    <>
    <div className='text-center my-3'>
      <h1>Quiz Result</h1>
    {result && <h2>Your Score: {result.points}</h2>}
    <Button color='primary' className='mt-4' onClick={() => history.push('/dashboard')}>Back</Button>

    </div>

    </>
  )
}

export default QuizResult

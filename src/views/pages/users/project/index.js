import { decode } from 'base-64'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Row, Col, Card, CardHeader, Button, CardBody, Badge, Table } from 'reactstrap'
import { getAllQuestions, submitAnswer } from './store'
import { toast, Slide } from 'react-toastify'
import Toast from '@src/views/components/toast/Toast'
import { isEmpty } from '../../../../helper/function'
const PlayProjectQuiz = () => {


  const [selectedQuestion, setSelectedQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const questionData = useSelector(state => state.question.questionList)


  const { projectId } = useParams()
  const history = useHistory()

  const dispatch = useDispatch()
  const fetchQuestions = async () => {
    try {
      const bodyData = {
        projectId: decode(projectId)
      }
      await dispatch(getAllQuestions(bodyData))
    } catch (error) {
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [projectId])




  const questionList = (!isEmpty(questionData) && !isEmpty(questionData.data)) ? questionData.data : []

  const currentQuestion = !isEmpty(questionList) ? questionList[selectedQuestion] : {}

  const handleAnswerSubmit = async ({ submit }) => {
    try {
      const bodyData = {
        questionId: currentQuestion.id,
        answer: selectedAnswer
      }

      const res = await dispatch(submitAnswer(bodyData))
      if (!res.payload.status) {
        toast.error(<Toast status='error' message={res.payload.message} />, { transition: Slide, hideProgressBar: true })
      } else {
        if (submit) {

          toast.success(<Toast status='success' message='Quiz submitted successfully' />, { transition: Slide, hideProgressBar: true })
          history.push(`/project/result/${projectId}`)
        }
        setSelectedAnswer('')
        setSelectedQuestion(selectedQuestion + 1)
      }

    } catch (error) {

    }
  }

  return (
    <div className='admin-project-list'>
      <Card>
        <CardBody>
          <CardHeader><h4>Play Project Quiz </h4> </CardHeader>
          <hr />
          <Row>
            {!isEmpty(currentQuestion) && <Col sm='12'>
              <h3 >
                Question : {currentQuestion?.question}
              </h3>
              <hr />
              <p className={`border-3 border px-3 py-2 ${selectedAnswer == currentQuestion.option1 && 'border-success'}`} role='button' onClick={() => setSelectedAnswer(currentQuestion.option1)}>
                Option A: {currentQuestion?.option1}
              </p>

              <p className={`border-3 border px-3 py-2 ${selectedAnswer == currentQuestion.option2 && 'border-success'}`} role='button' onClick={() => setSelectedAnswer(currentQuestion.option2)}>
                Option B: {currentQuestion?.option2}
              </p>

              <p className={`border-3 border px-3 py-2 ${selectedAnswer == currentQuestion.option3 && 'border-success'}`} role='button' onClick={() => setSelectedAnswer(currentQuestion.option3)}>
                Option C: {currentQuestion?.option3}
              </p>

              <p className={`border-3 border px-3 py-2 ${selectedAnswer == currentQuestion.option4 && 'border-success'}`} role='button' onClick={() => setSelectedAnswer(currentQuestion.option4)}>
                Option D: {currentQuestion?.option4}
              </p>


              {
                selectedQuestion < questionList.length - 1 ?
                  <Button disabled={isEmpty(selectedAnswer)} color='primary' onClick={() => handleAnswerSubmit({ submit: false })}>Next</Button>
                  :
                  <Button onClick={() => handleAnswerSubmit({ submit: true })} color='success'>Submit</Button>

              }



            </Col>}
          </Row>
        </CardBody>
      </Card>

    </div>
  )
}

export default PlayProjectQuiz

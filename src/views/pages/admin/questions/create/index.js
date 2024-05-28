import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, Form, Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { createProject, createQuestions } from '../store/index'
import { Slide, toast } from 'react-toastify'
import Toast from "@src/views/components/toast/Toast"
import { useHistory, useParams } from 'react-router-dom'
import { decode } from 'base-64'

const CreateQuestions = () => {

  const [isLoading, setIsLoading] = useState(false)

  

  const dispatch = useDispatch()

  const history = useHistory()
  const {projectId} = useParams()



  const handleFormSubmit = async (values) => {
    try {
      const bodyData = {
        projectId: decode(projectId),
        ...values
      }
      setIsLoading(true)
      const response = await dispatch(createQuestions(bodyData))
      setIsLoading(false)
      if (response.payload.status) {
        toast.success(<Toast status='success' message={response.payload.message} />, { transition: Slide, hideProgressBar: true })
        history.push('/admin/project')
      } else {
        toast.error(<Toast status='error' message={response.payload.message} />, { transition: Slide, hideProgressBar: true })
      }
    } catch (error) {
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
  }

  const answerOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ]

  const formik = useFormik({
    initialValues: {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      points: '',
    },
    validationSchema: Yup.object({
      question: Yup.string().required('Question is required').max(255, 'Question must be less than 255 characters'),
      option1: Yup.string().required('Option 1 is required').notOneOf([Yup.ref('option2'), Yup.ref('option3'), Yup.ref('option4')], 'Option 1 can not be same as Option 2 or Option 3 or Option 4'),
      option2: Yup.string().required('Option 2 is required').notOneOf([Yup.ref('option1'), Yup.ref('option3'), Yup.ref('option4')], 'Option 2 can not be same as Option 1 or Option 3 or Option 4'),
      option3: Yup.string().required('Option 3 is required').notOneOf([Yup.ref('option1'), Yup.ref('option2'), Yup.ref('option4')], 'Option 3 can not be same as Option 1 or Option 2 or Option 4'),
      option4: Yup.string().required('Option 4 is required').notOneOf([Yup.ref('option1'), Yup.ref('option2'), Yup.ref('option3')], 'Option 4 can not be same as Option 1 or Option 2 or Option 3'),
      answer: Yup.string().required('Answer is required'),
      points: Yup.number().required('Points is required').min(1, 'Points must be greater than 0').max(10, 'Points must be less than 10'),
    }),
    onSubmit: values => {
      
      handleFormSubmit(values)
    }
  })



  return (
    <div className='admin-project-list'>
      <Card>
        <CardHeader>
          <h4>Create Project</h4>
        </CardHeader>


        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm='12' md='12'>
                <FormGroup>
                  <Label for='question'>Question</Label>
                  <Input type='text' name='question' id='question' placeholder='Enter question' {...formik.getFieldProps('question')} />
                  {formik.touched.question && formik.errors.question ? (
                    <span className='text-danger'>{formik.errors.question}</span>
                  ) : null}
                </FormGroup>
              </Col>

              <Col sm='12' md='6'>
                <FormGroup>
                  <Label for='option1'>Option 1</Label>
                  <Input type='text' name='option1' id='option1' placeholder='Enter option 1' {...formik.getFieldProps('option1')} />
                  {formik.touched.option1 && formik.errors.option1 ? (
                    <span className='text-danger'>{formik.errors.option1}</span>
                  ) : null}
                </FormGroup>
              </Col>

              <Col sm='12' md='6'>
                <FormGroup>
                  <Label for='option2'>Option 2</Label>
                  <Input type='text' name='option2' id='option2' placeholder='Enter option 2' {...formik.getFieldProps('option2')} />
                  {formik.touched.option2 && formik.errors.option2 ? (
                    <span className='text-danger'>{formik.errors.option2}</span>
                  ) : null}
                </FormGroup>
              </Col>

              <Col sm='12' md='6'>
                <FormGroup>
                  <Label for='option3'>Option 3</Label>
                  <Input type='text' name='option3' id='option3' placeholder='Enter option 3' {...formik.getFieldProps('option3')} />
                  {formik.touched.option3 && formik.errors.option3 ? (
                    <span className='text-danger'>{formik.errors.option3}</span>
                  ) : null}
                </FormGroup>

              </Col>

              <Col sm='12' md='6'>
                <FormGroup>
                  <Label for='option4'>Option 4</Label>
                  <Input type='text' name='option4' id='option4' placeholder='Enter option 4' {...formik.getFieldProps('option4')} />
                  {formik.touched.option4 && formik.errors.option4 ? (
                    <span className='text-danger'>{formik.errors.option4}</span>
                  ) : null}
                </FormGroup>
              </Col>

              <Col sm='12' md='6'>
                <FormGroup>
                  <Label for='answer'>Answer</Label>
                  <Input type='select' name='answer' id='answer' {...formik.getFieldProps('answer')}>
                    <option value=''>Select Answer</option>
                    {answerOptions.map((item, index) => (
                      <option key={index} value={item.value}>{item.label}</option>
                    ))}
                  </Input>
                  {formik.touched.answer && formik.errors.answer ? (
                    <span className='text-danger'>{formik.errors.answer}</span>
                  ) : null}
                </FormGroup>
              </Col>

              <Col sm='12' md='6'>
                <FormGroup>
                  <Label for='points'>Points</Label>
                  <Input type='number' name='points' id='points' placeholder='Enter points' {...formik.getFieldProps('points')} />
                  {formik.touched.points && formik.errors.points ? (
                    <span className='text-danger'>{formik.errors.points}</span>
                  ) : null}
                </FormGroup>
              </Col>



              <Col sm='12' md='12'>
                <button disabled={isLoading} type='submit' className='btn btn-primary'>
                  {isLoading ? 'Please wait...' : 'Create Question'}
                </button>
              </Col>
            </Row>
          </Form>

        </CardBody>
      </Card>

    </div>
  )
}

export default CreateQuestions

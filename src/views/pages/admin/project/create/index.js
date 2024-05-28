import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, Form, Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { createProject } from '../store/index'
import { Slide, toast } from 'react-toastify'
import Toast from "@src/views/components/toast/Toast"
import { useHistory } from 'react-router-dom'

const CreateProject = () => {

  const [selectedImage, setSelectedImage] = useState(null)
  const [imageError, setImageError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  

  const dispatch = useDispatch()

  const history = useHistory()

  const purponseOptions = [
    { value: 'Social Media', label: 'Social Media' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Education', label: 'Education' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Health', label: 'Health' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Travel', label: 'Travel' },
  ]


  useEffect(() => {{
    if (selectedImage) {
      setImageError(null)
    }
  }}, [selectedImage])


  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData()
      formData.append('file', selectedImage)
      formData.append('name', values.name)
      formData.append('description', values.description)
      formData.append('purpose', values.purpose)
      setIsLoading(true)
      const response = await dispatch(createProject(formData))
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

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      purpose: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').min(10, 'Name must be at least 10 characters').max(50, 'Name must be at most 50 characters'),
      description: Yup.string().required('Description is required').min(10, 'Description must be at least 10 characters').max(500, 'Description must be at most 500 characters'),
      purpose: Yup.string().required('Purpose is required'),
    }),
    onSubmit: values => {
      if (!selectedImage) {
        setImageError('Image is required')
        return
      }
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
                  <Label for='logo'>Logo</Label>
                  <Input type='file' accept="image/*" name='logo' id='logo' onChange={(e) => setSelectedImage(e.target.files[0])} />
                  <FormText color='muted'>
                    Max size 1mb
                  </FormText>
                  {imageError ? <p className='text-danger'>{imageError}</p> : null}
                </FormGroup>
              </Col>
              <Col sm='12' md='6'>
                <FormGroup>
                  <Label for='name'>Name</Label>
                  <Input
                    type='text'
                    className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
                    name='name' id='name'
                    placeholder='Project Name' value={formik.values.name} onChange={formik.handleChange} />
                  {formik.errors.name && formik.touched.name ? <p className='text-danger'>{formik.errors.name}</p> : null}
                </FormGroup>
              </Col>

              <Col sm='12' md='6'>
                <FormGroup>
                  <Label for='purpose'>Purpose</Label>
                  <Input
                    type='select'
                    className={`form-control ${formik.errors.purpose && formik.touched.purpose ? 'is-invalid' : ''}`}
                    name='purpose' id='purpose'
                    value={formik.values.purpose} onChange={formik.handleChange}>
                    <option value=''>Select Purpose</option>
                    {purponseOptions.map((item, index) => (
                      <option key={index} value={item.value}>{item.label}</option>
                    ))}
                  </Input>
                  {formik.errors.purpose && formik.touched.purpose ? <p className='text-danger'>{formik.errors.purpose}</p> : null}
                </FormGroup>
              </Col>

              <Col sm='12' md='12'>
                <FormGroup>
                  <Label for='description'>Description</Label>
                  <Input
                    type='textarea'
                    className={`form-control ${formik.errors.description && formik.touched.description ? 'is-invalid' : ''}`}
                    name='description' id='description'
                    placeholder='Description' value={formik.values.description} onChange={formik.handleChange} />
                  {formik.errors.description && formik.touched.description ? <p className='text-danger'>{formik.errors.description}</p> : null}
                </FormGroup>
              </Col>

              <Col sm='12' md='12'>
                <button disabled={isLoading} type='submit' className='btn btn-primary'>
                  {isLoading ? 'Please wait...' : 'Create Project'}
                </button>
              </Col>
            </Row>
          </Form>

        </CardBody>
      </Card>

    </div>
  )
}

export default CreateProject

// ** React Imports
import { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'


// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'
import Toast from "@src/views/components/toast/Toast"



// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

import Logo from '@src/assets/images/logo/logo.png'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, FormGroup, FormFeedback, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'



const Login = () => {

  // ** Variables States
  const [isLoading, setIsLoading] = useState(false)


  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const history = useHistory()
  const ability = useContext(AbilityContext)
  
 


  // ** Handle Login
  const handleUserLogin = async values => {
    try {
      setIsLoading(true)
      const response = await useJwt.adminLogin(values)
      setIsLoading(false)
      if (!response.data.status) return toast.error(<Toast status='error' message={response.data.message} />, { transition: Slide, hideProgressBar: true })

      const responseUserData = {...response.data.data.user, ability: [
        {
          action: 'manage',
          subject: 'all'
        }
      ]}
      const token = response.data.data.token

      const userData = {...responseUserData, accessToken: token, refreshToken: token}

      // Set user data and token in localstorage
      dispatch(handleLogin(userData))
      ability.update(responseUserData.ability)
      const route = getHomeRouteForLoggedInUser('admin')
      history.push(route)
      toast.success(<Toast status='success' message={response.data.message} />, { transition: Slide, hideProgressBar: true })

    } catch (error) {
      setIsLoading(false)
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
  }


  // ** Formik Initial Values
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: values => {
      handleUserLogin(values)
    }
  })
 

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <div className='d-flex align-items-center'>
            <img src={Logo} style={{height: '40px'}} alt='login with project manager' />
          <h2 className='brand-text text-primary ms-1'>Dunitech - Project Management</h2>

          </div>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
           <h1> Welcome to project management</h1>
          </div>
        </Col>
       
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to Project manager 👋
            </CardTitle>
            <Form className='auth-login-form mt-2' onSubmit={formik.handleSubmit}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={formik.values.email}
                  id='login-email'
                  name='email'
                  onChange={formik.handleChange}  
                  invalid={formik.errors.email && formik.touched.email}
                  />
                {formik.errors.email && formik.touched.email && <FormFeedback>{formik.errors.email}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  value={formik.values.password}
                  id='login-password'
                  name='password'
                  onChange={formik.handleChange}
                  className='input-group-merge'
                  invalid={formik.errors.password && formik.touched.password}
                />
                {formik.errors.password && formik.touched.password && <FormFeedback>{formik.errors.password}</FormFeedback>}
              </FormGroup>

              <Button.Ripple disabled={isLoading} type='submit' color='primary' block>
                {isLoading ? 'Loading...' : 'Sign in'}
              </Button.Ripple>
            </Form>
            
            
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login

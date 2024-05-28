import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, Button, CardBody, Badge } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { getAllProject } from './store'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import Toast from '@src/views/components/toast/Toast'
import urlConfig from '@configs/urlConfig'
import { encode } from 'base-64'

const Dashboard = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [perPageItem, setPerPageItem] = useState(10)
  const [sort, setSort] = useState('id')
  const [sortOrder, setSortOrder] = useState('desc')
  const [searchKey, setSearchKey] = useState('')


  const projectData = useSelector(state => state.project.projectList)

  // Routes vars
  const history = useHistory()

  // action vars
  const dispatch = useDispatch()




  // ** Function to get data
  const getAllProjectList = async () => {
    try {
      await dispatch(getAllProject({ page: currentPage, perPage: perPageItem, sort, sortOrder, searchKey: searchKey }))
    } catch (error) {
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
  }


  useEffect(() => {
    getAllProjectList()
  }, [currentPage, perPageItem, sort, sortOrder])


  const data = projectData?.data || []

  const handleClick = () => {
    history.push('/admin/project/create')
  }

  const { apiUrl } = urlConfig

  const imagePath = apiUrl + '/uploads/'

  
  const handlePlay = (row) => {
    history.push(`/project/${encode(row.id)}`)
  }

  return (
    <div className='admin-project-list'>
      <Card>
        <CardBody>
          <Row>
            {data.map((item, index) => (


              <Col sm='6' md='4' lg='4' className='' key={index}>
                <Card>
                  <div>
                    <div className='d-flex align-items-center'>

                      <img className='border rounded-circle h-10 w-10 logo_img' src={`${imagePath}${item.logo}`} alt='logo' />
                      <div className='mx-4'>
                        <h4 className='text-capitalize'>{item.name}</h4>
                        <Badge color='light-primary' pill>{item.purpose}</Badge>
                      </div>
                    </div>

                    <p className='p-1'> {item.description}</p>

                  </div>

                  <Row>
                    <Col sm='6' md='6' lg='6'>
                  <Button onClick={() => handlePlay(item)} color='dark'>Play Quiz</Button>
                  </Col>
                    <Col sm='6' md='6' lg='6'>
                  </Col>
                 
                  </Row>
                  
                </Card>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>

    </div>
  )
}

export default Dashboard

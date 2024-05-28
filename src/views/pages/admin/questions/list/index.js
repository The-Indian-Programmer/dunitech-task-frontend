import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, Button, CardBody, Badge, Table } from 'reactstrap'
import { useHistory, useParams } from 'react-router-dom'
import { getAllQuestions } from '../store/index'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import Toast from '@src/views/components/toast/Toast'
import urlConfig from '@configs/urlConfig'
import { Check } from 'react-feather'
import { decode } from 'base-64'
const ListQuestions = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [perPageItem, setPerPageItem] = useState(10)
  const [sort, setSort] = useState('id')
  const [sortOrder, setSortOrder] = useState('desc')
  const [searchKey, setSearchKey] = useState('')


  const questionData = useSelector(state => state.question.questionList)

  // Routes vars
  const history = useHistory()


  const { projectId } = useParams()

  // action vars
  const dispatch = useDispatch()




  // ** Function to get data
  const getAllQuestionsList = async () => {
    try {
      const bodyData = {
        projectId: decode(projectId),
        page: currentPage, perPage: perPageItem, sort, sortOrder, searchKey: searchKey
      }
      await dispatch(getAllQuestions(bodyData))
    } catch (error) {
      toast.error(<Toast status='error' message={error.message} />, { transition: Slide, hideProgressBar: true })
    }
  }


  useEffect(() => {
    getAllQuestionsList()
  }, [currentPage, perPageItem, sort, sortOrder])


  const data = questionData?.data || []

  const handleClick = () => {
    history.push(`/admin/project/question/add/${projectId}`)
  }

  const { apiUrl } = urlConfig

  const imagePath = apiUrl + '/uploads/'

  
  const handleAddQuestion = (row) => {
    history.push(`/admin/questions/${row.id}`)
  }

  return (
    <div className='admin-project-list'>
      <Card>
        <CardHeader>
          <h4>Manage Questions</h4>
          <Button onClick={handleClick} color='primary'>Add Question</Button>
        </CardHeader>


        <hr/>


        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>Question</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Points</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.question}</td>
                  <td>{row.option1}
                     {row.currectAnswer === row.option1 ? <Check className='text-success' /> : ''}
                  </td>
                  <td>{row.option2}
                      {row.currectAnswer === row.option2 ? <Check className='text-success' /> : ''}
                  </td>
                  <td>{row.option3}
                      {row.currectAnswer === row.option3 ? <Check className='text-success' /> : ''}
                  </td>
                  <td>{row.option4}
                      {row.currectAnswer === row.option4 ? <Check className='text-success' /> : ''}
                  </td>
                 
                  <td>{row.points}</td>
                  <td>
                    <Button color='primary' onClick={() => handleAddQuestion(row)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

    </div>
  )
}

export default ListQuestions

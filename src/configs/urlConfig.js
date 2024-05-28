const URLCONFIG = {
    baseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3500'
}


const project = {
    getAllProject: '/admin/project/get-all',
    createProject: '/admin/project/create',
}
const question = {
    getAllQuestion: '/admin/question/get-all',
    createQuestions: '/admin/question/create',
    user: {
        getAllQuestion: '/user/question/get-all',
        submitAnswer: '/user/question/submit',
        result: '/user/project/result',
    }
}


export default URLCONFIG
export { project, question }
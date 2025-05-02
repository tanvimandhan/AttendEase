import axios from 'axios'

const GetAllGrades=()=>axios.get('/api/grade');
const createNewStudent=(data)=>axios.post('/api/student',data)
const GetAllStudents=()=>axios.get('/api/student')

const DeleteStudentRecord=(id)=>axios.delete('/api/student?id='+id)

const GetAttendanceList = (grade, month) => {
    const params = new URLSearchParams();
    if (grade && grade !== 'undefined') params.append("grade", grade);
    if (month) params.append("month", month);
    return axios.get(`/api/attendance?${params.toString()}`);
};
const MarkAttendance=(data)=>axios.post('/api/attendance',data);

const MarkAbsent = (studentId, day, date) =>
    axios.delete(`/api/attendance?studentId=${studentId}&day=${day}&date=${date}`);
const TotalPresentCountbyDay = (date, grade="5") => {
    // Only make the request if grade is defined
    if (!grade) {
      console.error("Grade is required");
      return Promise.reject("Grade is required");
    }
    return axios.get(`/api/dashboard?date=${date}&grade=${grade}`);
}
export default{
    GetAllGrades,
    createNewStudent,
    GetAllStudents,
    DeleteStudentRecord,
    GetAttendanceList,
    MarkAbsent,
    MarkAttendance,
    TotalPresentCountbyDay

}
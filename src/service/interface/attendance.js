import ajax from '../http.js';

export const getAttendanceList = () => {
  return ajax.get('/getAttendanceTable')
}
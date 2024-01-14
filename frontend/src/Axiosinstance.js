// import axios from 'axios'
//  const authToken=localStorage.getItem('authToken')
// //  const axiosInstance=axios.create({
   
// //         headers: {
// //             Authorization: `Bearer ${authtoken}`,
// //         },
// //     }
// //  );
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:4000/api/getnotes',
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },})
//  export default axiosInstance;
import axios from 'axios';

const authToken = localStorage.getItem('authToken');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/getnotes',
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

export default axiosInstance;

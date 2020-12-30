// import { axiosInstance } from "./axiosInstance.js";

// export default {
//     async getAllUsers() {
//         let response=await axiosInstance.get(`${this.$store.getters.hostUrl}/api/info/user/available`);
//         var allUsers=[];
//         if(response.status!==200) {
//             console.log(response.data);
//         } else {
//             var users=response.data;
//             users=users.filter((el) => {
//                 return el.role==="user";
//             });
//             users=users.sort((a,b) => {
//                 return a.score<=b.score
//                     ? a.score===b.score
//                         ? a.username>b.username
//                             ? 1
//                             :-1
//                         :1
//                     :-1;
//             });
//             var rank=0;
//             users.forEach((el) => {
//                 rank++;
//                 this.users.push({
//                     rank: rank,
//                     username: el.username,
//                     email: el.email,
//                     score: el.score,
//                     status: el.status===0? "Active":"Banned",
//                 });
//                 return response.data;
//             }
//         }
//         return allUsers;
//     }
// };


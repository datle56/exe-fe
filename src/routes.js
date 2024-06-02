
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import NewDashboard from "views/examples/NewDashboard.js";
import { jwtDecode } from 'jwt-decode';

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  // {
    
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: <Index />,
  //   layout: "/admin",
  // },
  {
    path: "/explore",
    name: "Explore",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/tutors",
    name: "Tutors",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/meeting",
    name: "Meeting",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  
  {
    path: "/payment",
    name: "Payment",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  
  {
    path: "/BookingHistory]",
    name: "Booking History",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
 
];
export default routes;



// window.onload = function() {
//   const token = localStorage.getItem('token');
  
//   // Kiểm tra xem token có tồn tại hay không
//   if (token) {
//     const decodedToken = jwtDecode(token);
//     const username = decodedToken.username;
//     const role = decodedToken.role;

//     const ws = new WebSocket(`ws://https://speak.id.vn/api/online/${username}/${role}`);

//     ws.onopen = () => {
//       console.log('WebSocket is connected');
//       ws.send(JSON.stringify({ token }));
//     };

//     ws.onmessage = (event) => {
//       const response = JSON.parse(event.data);
//       if (response.message) {
//         console.log(response.message);
//       }
//     };

//     ws.onclose = () => {
//       console.log('WebSocket is closed');
//     };

//     window.onbeforeunload = function() {
//       ws.close();
//     };
//   }
// }

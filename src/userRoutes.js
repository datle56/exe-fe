// adminRoutes.js
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import NewDashboardForm from "views/users/dashboard.js"
import UserPaymentForm from "views/users/payment.js"
import GrammarForm from "views/users/grammar.js"
import MeetingForm from "views/users/meet.js"
import VoiceForm from "views/users/voice.js"
import LearningHistoryFrom from "views/users/learninghistory.js"
import UserMeetingRoomForm from "views/users/room.js"
import RedirectComponent from "views/users/pronounce.js"
import { jwtDecode } from 'jwt-decode';

var userRoutes = [
  {
    path: "/dashboard",
    name: "Dasboard",
    icon: "ni ni-tv-2 text-green",
    component: <NewDashboardForm />,
    layout: "/user",
  },
  // {
  //   path: "/explore",
  //   name: "Explore",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/user",
  // },
  // {
  //   path: "/find-tutor",
  //   name: "Find a tutor",
  //   icon: "ni ni-active-40 text-yellow",
  //   component: <MeetingForm />,
  //   layout: "/user",
  // },
  {
    path: "/match",
    name: "Talking Now",
    icon: "ni ni-chat-round text-orange",
    component: <MeetingForm />,
    layout: "/user",
  },
  {
    path: "/meeting",
    name: "Meeting",
    icon: "ni ni-laptop text-purple",
    component: <UserMeetingRoomForm />,
    layout: "/user",
  },
  // {
  //   path: "/schedule",
  //   name: "Schedule",
  //   icon: "ni ni-calendar-grid-58 text-brown",
  //   component: <Profile />,
  //   layout: "/user",
  // },

  {
    path: "/grammar",
    name: "Grammar Checking",
    icon: "ni ni-check-bold text-green",
    component: <GrammarForm />,
    layout: "/user",
  },
  {
    path: "/aitalk",
    name: "Talk With AI",
    icon: "ni ni-headphones text-pink",
    component: <VoiceForm />,
    layout: "/user",
  },
  {
    path: "/pronounce",
    name: "Pronunciation",
    icon: "ni ni-planet text-blue",
    component: <RedirectComponent />,
    layout: "/user",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-circle-08 text-blue",
    component: <Profile />,
    layout: "/user",
  },
  {
    path: "/payment",
    name: "Payment",
    icon: "ni ni-credit-card text-cyan",
    component: <UserPaymentForm />,
    layout: "/user",
  },


  {
    path: "/history",
    name: "Learning history",
    icon: "ni ni-single-copy-04 text-black",
    component: <LearningHistoryFrom />,
    layout: "/user",
  },


];

export default userRoutes;
window.onload = function () {
  const token = localStorage.getItem('token');

  // Kiểm tra xem token có tồn tại hay không
  if (token) {
    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;
    const role = decodedToken.role;

    const ws = new WebSocket(`ws://https://speak.id.vn/api/online/${username}/${role}`);

    ws.onopen = () => {
      console.log('WebSocket is connected');
      ws.send(JSON.stringify({ token }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.message) {
        console.log(response.message);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket is closed');
    };

    window.onbeforeunload = function () {
      ws.close();
    };
  }
}
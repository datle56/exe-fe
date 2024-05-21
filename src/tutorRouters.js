// adminRoutes.js
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import TutorDashboardForm from "views/tutors/dashboard.js";
import CVForm from "views/tutors/cv.js"
import MeetingForm from 'views/tutors/meeting.js' 
import TutorWithdrawForm from "views/tutors/payment";
import TutorLearningHistoryFrom from "views/tutors/leaninghistory.js"
import TutorMeetingRoomForm from "views/tutors/room.js"

var tutorRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-green",
    component: <TutorDashboardForm />,
    layout: "/tutor",
  },
  // {
  //   path: "/explore",
  //   name: "Explore",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/tutor",
  // },
  {
    path: "/matching",
    name: "Talking Now",
    icon: "ni ni-chat-round text-orange",
    component: <MeetingForm />,
    layout: "/tutor",
  },
  {
    path: "/meeting",
    name: "Meeting",
    icon: "ni ni-laptop text-purple",
    component: <TutorMeetingRoomForm />,
    layout: "/tutor",
  },
  // {
  //   path: "/schedule",
  //   name: "Schedule",
  //   icon: "ni ni-calendar-grid-58 text-brown",
  //   component: <Profile />,
  //   layout: "/tutor",
  // },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-circle-08 text-blue",
    component: <Profile />,
    layout: "/tutor",
  },

  {
    path: "/cv",
    name: "CV",
    icon: "ni ni-paper-diploma text-yellow",
    component: <CVForm/>,
    layout: "/tutor",
  },
  {
    path: "/withdraw",
    name: "Withdraw",
    icon: "ni ni-money-coins text-red",
    component: <TutorWithdrawForm />,
    layout: "/tutor",
  },
  {
    path: "/history",
    name: "Teached History",
    icon: "ni ni-single-copy-04 text-black",
    component: <TutorLearningHistoryFrom />,
    layout: "/tutor",
  },
];

export default tutorRoutes;

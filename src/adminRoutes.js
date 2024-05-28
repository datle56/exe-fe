// adminRoutes.js
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import NewDashboard from "views/examples/NewDashboard.js";
import CV from "views/admin/cv.js";
import AdminBuyPacked from "views/admin/packedhistory.js"

import AdminPaymentForm from "views/admin/payment.js";
import AdminWithdrawForm from "views/admin/widthdraw.js";
import TutorListForm from "views/admin/tutors.js";
import UserListForm from "views/admin/users.js";
import AdminLearningHistoryFrom from "views/admin/learninghistory.js"

var adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-green",
    component: <Index />,
    layout: "/admin",
  },
  // {
  //   path: "/explore",
  //   name: "Explore",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  
  // {
  //   path: "/meeting",
  //   name: "Meeting",
  //   icon: "ni ni-laptop text-purple",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/schedule",
  //   name: "Schedule",
  //   icon: "ni ni-calendar-grid-58 text-brown",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  {
    path: "/users",
    name: "User Management",
    icon: "ni ni-single-02 text-yellow",
    component: <UserListForm />,
    layout: "/admin",
  },
  {
    path: "/tutors",
    name: "Tutor Management",
    icon: "ni ni-hat-3 text-orange",
    component: <TutorListForm />,
    layout: "/admin",
  },
  {
    path: "/cv",
    name: "New Tutor",
    icon: "ni ni-badge text-blue",
    component: <CV />,
    layout: "/admin",
  },
  {
    path: "/payment",
    name: "User Payment",
    icon: "ni ni-credit-card text-cyan",
    component: <AdminPaymentForm />,
    layout: "/admin",
  },
  {
    path: "/withdraw",
    name: "Tutor Withdraw",
    icon: "ni ni-money-coins text-red",
    component: <AdminWithdrawForm />,
    layout: "/admin",
  },
  {
    path: "/history",
    name: "History",
    icon: "ni ni-single-copy-04 text-brown",
    component: <AdminLearningHistoryFrom />,
    layout: "/admin",
  },
  {
    path: "/packed",
    name: "Packed History",
    icon: "ni ni-single-copy-04 text-brown",
    component: <AdminBuyPacked />,
    layout: "/admin",
  },
  
];

export default adminRoutes;

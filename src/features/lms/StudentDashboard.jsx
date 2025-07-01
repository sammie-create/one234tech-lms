import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiClipboard,
  FiAward,
  FiSettings,
  FiUser,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import {
  RiMenu2Fill,
  RiCloseFill,
  RiCloseLargeFill,
  RiInformationFill,
  RiAlertFill,
} from "react-icons/ri";
import LMSNavbar from "./LMSNavbar";
import SideBar from "./SideBar";
import { useLMSContext } from "../../contexts/LMSContext";
// import { supabase } from "../supabaseClient";

function StudentDashboard() {
  const [courses, _] = useState([]);
  const { student } = useLMSContext();

  const studentName = student?.name.split(" ")[0] || "Student";
  console.log(studentName);

  return (
    <div data-aos="fade-in" className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="bg-emerald-900 p-6 rounded-2xl shadow-lg text-white">
        <h1 className="text-2xl font-semibold ">Welcome, {studentName}</h1>
        <p className="text-sm text-emerald-100 mt-1">
          Here’s your learning progress at a glance.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-900 text-white p-5 rounded-2xl shadow-lg">
          <h4 className="text-sm">Courses Completed</h4>
          <p className="text-2xl font-bold mt-1">
            {courses.filter(c => c.progress >= 100).length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-5 rounded-2xl shadow-lg text-yellow-900">
          <h4 className="text-sm">Assignments Submitted</h4>
          <p className="text-2xl font-bold mt-1">12</p>
        </div>
        <div className="bg-gradient-to-br from-lime-700 to-emerald-800 p-5 rounded-2xl shadow-lg text-white">
          <h4 className="text-sm">Certificates Earned</h4>
          <p className="text-2xl font-bold mt-1">2</p>
        </div>
      </div>

      {/* My Courses */}
      <section className="bg-white space-y-4 border border-gray-200 p-4 rounded-2xl shadow-sm ">
        <h2>My Courses</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {courses.length < 0 ? (
            courses.map((course, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <h3 className="font-medium text-gray-800 mb-2">
                  {course.title}
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {course.progress}% completed
                </div>
                <button className="mt-3 text-sm text-blue-600 hover:underline">
                  Continue
                </button>
              </div>
            ))
          ) : (
            <p className="text-[12px]">No course selected yet</p>
          )}
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white space-y-4 border border-gray-200 p-4 rounded-2xl shadow-sm ">
        <h2>Notifications</h2>
        <ul className="space-y-3">
          <li className="bg-emerald-50 p-4 rounded-lg flex items-center gap-2">
            <RiAlertFill className="text-base text-yellow-500" />
            <div>
              <p className="text-[12px] text-gray-700 font-semibold">
                Assignment due soon
              </p>
              <span>Product Research assignment due in 2 days </span>
            </div>
          </li>
          <li className="bg-lime-50 p-4 rounded-lg flex gap-2 items-center">
            <RiInformationFill className="text-base text-blue-700" />
            <div>
              <p className="text-[12px] text-gray-700 font-semibold">
                New session available
              </p>
              <span>User Research II now live</span>
            </div>
          </li>
          {/* <li className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
                Certificate issued for MVP Design.
                </li> */}
        </ul>
      </section>
    </div>
  );
}

export default StudentDashboard;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FiHome,
//   FiBook,
//   FiClipboard,
//   FiAward,
//   FiSettings,
//   FiUser,
//   FiLogOut,
//   FiMenu,
// } from "react-icons/fi";
// import {
//   RiMenu2Fill,
//   RiCloseFill,
//   RiCloseLargeFill,
//   RiInformationFill,
//   RiAlertFill,
// } from "react-icons/ri";
// import LMSNavbar from "./LMSNavbar";
// import SideBar from "./SideBar";

// function StudentDashboard() {
//   const [studentName, setStudentName] = useState("Student");
//   const [courses, setCourses] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex flex-col gap-6">
//       {/* Welcome Banner */}
//       <div className="bg-emerald-100 p-6 rounded-2xl shadow-sm border border-emerald-200">
//         <h1 className="text-2xl font-semibold text-emerald-900">
//           Welcome, {studentName}!
//         </h1>
//         <p className="text-sm text-emerald-700 mt-1">
//           Here’s your learning progress at a glance.
//         </p>
//       </div>

//       {/* Progress Cards */}
//       <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
//         <div className="bg-gradient-to-br from-blue-50 to-white text-blue-700 p-5 rounded-2xl shadow border border-blue-200">
//           <h4 className="text-sm">Courses Completed</h4>
//           <p className="text-2xl font-bold mt-1">
//             {courses.filter(c => c.progress >= 100).length}
//           </p>
//         </div>
//         <div className="bg-gradient-to-br from-yellow-50 to-white p-5 rounded-2xl shadow border border-yellow-200 text-yellow-700">
//           <h4 className="text-sm">Assignments Submitted</h4>
//           <p className="text-2xl font-bold mt-1">12</p>
//         </div>
//         <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-2xl shadow border border-green-200 text-green-700">
//           <h4 className="text-sm">Certificates Earned</h4>
//           <p className="text-2xl font-bold mt-1">2</p>
//         </div>
//       </div>

//       {/* My Courses */}
//       <section className="bg-white space-y-4 border border-gray-200 p-6 rounded-2xl shadow">
//         <h2 className="text-lg font-semibold text-gray-800">My Courses</h2>
//         <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
//           {courses.length > 0 ? (
//             courses.map((course, i) => (
//               <div
//                 key={i}
//                 className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2"
//               >
//                 <h3 className="font-medium text-gray-800">{course.title}</h3>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
//                     style={{ width: `${course.progress}%` }}
//                   ></div>
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   {course.progress}% completed
//                 </div>
//                 <button className="mt-2 text-sm text-emerald-600 hover:underline">
//                   Continue
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No course selected yet.</p>
//           )}
//         </div>
//       </section>

//       {/* Notifications */}
//       <section className="bg-white space-y-4 border border-gray-200 p-6 rounded-2xl shadow">
//         <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
//         <ul className="space-y-3">
//           <li className="bg-emerald-50 p-4 rounded-xl flex items-start gap-3">
//             <RiAlertFill className="text-lg text-yellow-500 mt-0.5" />
//             <div>
//               <p className="text-sm text-gray-700 font-semibold">
//                 Assignment due soon
//               </p>
//               <span className="text-xs text-gray-600">
//                 Product Research assignment due in 2 days
//               </span>
//             </div>
//           </li>
//           <li className="bg-lime-50 p-4 rounded-xl flex gap-3 items-start">
//             <RiInformationFill className="text-lg text-blue-700 mt-0.5" />
//             <div>
//               <p className="text-sm text-gray-700 font-semibold">
//                 New session available
//               </p>
//               <span className="text-xs text-gray-600">
//                 User Research II now live
//               </span>
//             </div>
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// }

// export default StudentDashboard;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FiHome,
//   FiBook,
//   FiClipboard,
//   FiAward,
//   FiSettings,
//   FiUser,
//   FiLogOut,
//   FiMenu,
// } from "react-icons/fi";
// import {
//   RiMenu2Fill,
//   RiCloseFill,
//   RiCloseLargeFill,
//   RiInformationFill,
//   RiAlertFill,
// } from "react-icons/ri";
// import LMSNavbar from "./LMSNavbar";
// import SideBar from "./SideBar";

// function StudentDashboard() {
//   const [studentName, setStudentName] = useState("Student");
//   const [courses, setCourses] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex flex-col gap-6 bg-white min-h-screen px-4 py-6 text-slate-800">
//       {/* Welcome Banner */}
//       <div className="bg-emerald-100 p-6 rounded-2xl shadow-sm border border-emerald-200">
//         <h1 className="text-2xl font-semibold text-emerald-900">
//           Welcome, {studentName}!
//         </h1>
//         <p className="text-sm text-emerald-700 mt-1">
//           Here’s your learning progress at a glance.
//         </p>
//       </div>

//       {/* Progress Cards */}
//       <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
//         <div className="bg-blue-100 text-blue-900 p-5 rounded-2xl shadow-lg border border-blue-200">
//           <h4 className="text-sm">Courses Completed</h4>
//           <p className="text-2xl font-bold mt-1">
//             {courses.filter(c => c.progress >= 100).length}
//           </p>
//         </div>
//         <div className="bg-yellow-100 p-5 rounded-2xl shadow-lg border border-yellow-200 text-yellow-800">
//           <h4 className="text-sm">Assignments Submitted</h4>
//           <p className="text-2xl font-bold mt-1">12</p>
//         </div>
//         <div className="bg-green-100 p-5 rounded-2xl shadow-lg border border-green-200 text-green-900">
//           <h4 className="text-sm">Certificates Earned</h4>
//           <p className="text-2xl font-bold mt-1">2</p>
//         </div>
//       </div>

//       {/* My Courses */}
//       <section className="bg-white space-y-4 border border-gray-200 p-6 rounded-2xl shadow">
//         <h2 className="text-lg font-semibold text-slate-800">My Courses</h2>
//         <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
//           {courses.length > 0 ? (
//             courses.map((course, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm space-y-2"
//               >
//                 <h3 className="font-medium text-slate-800">{course.title}</h3>
//                 <div className="w-full bg-slate-200 rounded-full h-2">
//                   <div
//                     className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
//                     style={{ width: `${course.progress}%` }}
//                   ></div>
//                 </div>
//                 <div className="text-xs text-slate-500">
//                   {course.progress}% completed
//                 </div>
//                 <button className="mt-2 text-sm text-emerald-600 hover:underline">
//                   Continue
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-slate-500">No course selected yet.</p>
//           )}
//         </div>
//       </section>

//       {/* Notifications */}
//       <section className="bg-white space-y-4 border border-gray-200 p-6 rounded-2xl shadow">
//         <h2 className="text-lg font-semibold text-slate-800">Notifications</h2>
//         <ul className="space-y-3">
//           <li className="bg-yellow-100 p-4 rounded-xl flex items-start gap-3">
//             <RiAlertFill className="text-lg text-yellow-600 mt-0.5" />
//             <div>
//               <p className="text-sm text-yellow-800 font-semibold">
//                 Assignment due soon
//               </p>
//               <span className="text-xs text-yellow-700">
//                 Product Research assignment due in 2 days
//               </span>
//             </div>
//           </li>
//           <li className="bg-blue-100 p-4 rounded-xl flex gap-3 items-start">
//             <RiInformationFill className="text-lg text-blue-600 mt-0.5" />
//             <div>
//               <p className="text-sm text-blue-900 font-semibold">
//                 New session available
//               </p>
//               <span className="text-xs text-blue-800">
//                 User Research II now live
//               </span>
//             </div>
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// }

// export default StudentDashboard;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FiUsers,
//   FiBarChart2,
//   FiBookOpen,
//   FiSettings,
//   FiUser,
//   FiLogOut,
//   FiMenu,
//   FiUpload,
//   FiDownload,
//   FiCheck
// } from "react-icons/fi";
// import { supabase } from "../supabaseClient";

// export default function AdminDashboard() {
//   const [adminName, setAdminName] = useState("Admin");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [file, setFile] = useState(null);
//   const [assignments, setAssignments] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchAdmin() {
//       const { data: user } = await supabase.auth.getUser();
//       setAdminName(user?.user?.user_metadata?.full_name || "Admin");
//     }
//     async function fetchAssignments() {
//       const { data, error } = await supabase
//         .from("assignments")
//         .select("id, student_name, title, submitted_at, file_path, graded")
//         .order("submitted_at", { ascending: false });
//       if (!error && data) setAssignments(data);
//     }
//     fetchAdmin();
//     fetchAssignments();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/login");
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setUploading(true);
//     const { data, error } = await supabase.storage
//       .from("course-materials")
//       .upload(`materials/${file.name}`, file, {
//         cacheControl: "3600",
//         upsert: false
//       });
//     setUploading(false);
//     if (error) alert("Upload failed");
//     else alert("Upload successful");
//     setFile(null);
//   };

//   const handleMarkGraded = async (assignmentId, title) => {
//     const { error } = await supabase
//       .from("assignments")
//       .update({ graded: true })
//       .eq("id", assignmentId);

//     if (error) {
//       alert("Failed to mark as graded");
//     } else {
//       alert(`Marked ${title} as graded`);
//       setAssignments((prev) =>
//         prev.map((a) => (a.id === assignmentId ? { ...a, graded: true } : a))
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
//       <nav className="bg-white flex justify-between items-center px-6 py-4 border-b border-gray-200 relative">
//         <div className="text-2xl font-bold text-blue-600">Admin Panel</div>
//         <div className="md:hidden">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-gray-700 hover:text-blue-600"
//           >
//             <FiMenu className="w-6 h-6" />
//           </button>
//         </div>
//         <div className="relative">
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600"
//           >
//             <FiUser className="w-5 h-5" />
//             <span>{adminName}</span>
//           </button>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
//               <Link
//                 to="/admin/settings"
//                 className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 <FiSettings className="mr-2" /> Settings
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 <FiLogOut className="mr-2" /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>

//       <div className="flex min-h-screen">
//         <aside
//           className={\`fixed md:relative z-40 w-64 bg-white border-r border-gray-200 p-6 transform \${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200 ease-in-out\`}
//         >
//           <ul className="space-y-6 text-sm font-medium">
//             <li className="flex items-center space-x-2 text-blue-600">
//               <FiBarChart2 /> <span>Dashboard</span>
//             </li>
//             <li>
//               <Link to="/admin/users" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
//                 <FiUsers /> <span>Manage Users</span>
//               </Link>
//             </li>
//             <li>
//               <Link to="/admin/courses" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
//                 <FiBookOpen /> <span>Manage Courses</span>
//               </Link>
//             </li>
//             <li>
//               <Link to="/admin/reports" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
//                 <FiBarChart2 /> <span>Reports</span>
//               </Link>
//             </li>
//             <li>
//               <Link to="/admin/settings" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
//                 <FiSettings /> <span>Settings</span>
//               </Link>
//             </li>
//           </ul>
//         </aside>

//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30"
//             onClick={() => setSidebarOpen(false)}
//           ></div>
//         )}

//         <main className="flex-1 p-6 space-y-8 md:ml-0">
//           <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
//             <h1 className="text-2xl font-semibold text-blue-800">Welcome, {adminName}!</h1>
//             <p className="text-sm text-blue-500 mt-1">Monitor and manage the LMS efficiently.</p>
//           </div>

//           <section className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Upload New Course Material (PDF, Video, etc.)
//             </h2>
//             <div className="flex items-center space-x-4">
//               <input
//                 type="file"
//                 accept=".pdf,.mp4,.mov,.docx,.pptx"
//                 onChange={handleFileChange}
//                 className="text-sm"
//               />
//               <button
//                 onClick={handleUpload}
//                 disabled={uploading || !file}
//                 className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
//               >
//                 <FiUpload className="mr-2" /> {uploading ? "Uploading..." : "Upload"}
//               </button>
//             </div>
//           </section>

//           <section className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Submitted Assignments</h2>
//             {assignments.length === 0 ? (
//               <p className="text-sm text-gray-500">No assignments submitted yet.</p>
//             ) : (
//               <ul className="divide-y divide-gray-100">
//                 {assignments.map((a) => (
//                   <li
//                     key={a.id}
//                     className="py-3 text-sm text-gray-700 flex justify-between items-center"
//                   >
//                     <div>
//                       <span className="font-medium">{a.student_name}</span> submitted "{a.title}" on {new Date(a.submitted_at).toLocaleDateString()}
//                       {a.graded && (
//                         <span className="ml-2 text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
//                           Graded
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex space-x-3">
//                       <a
//                         href={\`https://YOUR_SUPABASE_URL/storage/v1/object/public/assignments/\${a.file_path}\`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         <FiDownload className="inline mr-1" />Download
//                       </a>
//                       <button
//                         onClick={() => handleMarkGraded(a.id, a.title)}
//                         disabled={a.graded}
//                         className="text-green-600 hover:text-green-800 disabled:opacity-50"
//                       >
//                         <FiCheck className="inline mr-1" />
//                         {a.graded ? "Graded" : "Mark Graded"}
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </section>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//               <h4 className="text-sm text-gray-500">Total Students</h4>
//               <p className="text-xl font-bold text-gray-800 mt-1">248</p>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//               <h4 className="text-sm text-gray-500">Courses Offered</h4>
//               <p className="text-xl font-bold text-gray-800 mt-1">36</p>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//               <h4 className="text-sm text-gray-500">Active Sessions</h4>
//               <p className="text-xl font-bold text-gray-800 mt-1">5</p>
//             </div>
//           </div>

//           <section className="space-y-4">
//             <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm text-sm text-gray-700">
//                 Student Jane Doe enrolled in "Product Discovery".
//               </li>
//               <li className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm text-sm text-gray-700">
//                 Admin updated the "UI/UX Foundations" course module.
//               </li>
//               <li className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm text-sm text-gray-700">
//                 Report generated for April 2025.
//               </li>
//             </ul>
//           </section>
//         </main>
//       </div>

//       <footer className="text-center py-4 text-sm text-gray-400 border-t border-gray-200">
//         © 2025 LMS Admin. Terms · Privacy Policy
//       </footer>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";

// import {
//   FiUsers,
//   FiBarChart2,
//   FiBookOpen,
//   FiSettings,
//   FiUser,
//   FiLogOut,
//   FiMenu,
//   FiUpload,
//   FiDownload,
//   FiCheck,
//   FiUserPlus,
// } from "react-icons/fi";
// import { supabase } from "../../integrations/supabaseClient";
import { HiMiniUser, HiMiniUsers } from "react-icons/hi2";
import { HiOutlineStatusOnline, HiUserAdd } from "react-icons/hi";
import { IoLibrary } from "react-icons/io5";
import { RiAwardFill, RiTaskFill, RiUpload2Fill } from "react-icons/ri";

const popularCourses = [
  {
    id: 2000,
    title: "Product Management",
    progress: "60%",
    enrolled: "2000",
  },
  {
    id: 2100,
    title: "Product Design",
    progress: "30%",
    enrolled: "4000",
  },
  {
    id: 2200,
    title: "Product Marketing",
    progress: "70%",
    enrolled: "3000",
  },
];

function AdminDashboard() {
  // const [adminName, setAdminName] = useState("Admin");

  // const [uploading, setUploading] = useState(false);
  // const [file, setFile] = useState(null);
  // const [assignments, setAssignments] = useState([]);

  // useEffect(() => {
  //   async function fetchAdmin() {
  //     const { data: user } = await supabase.auth.getUser();
  //     setAdminName(user?.user?.user_metadata?.full_name || "Admin");
  //   }
  //   async function fetchAssignments() {
  //     const { data, error } = await supabase
  //       .from("assignments")
  //       .select("id, student_name, title, submitted_at, file_path, graded")
  //       .order("submitted_at", { ascending: false });
  //     if (!error && data) setAssignments(data);
  //   }
  //   fetchAdmin();
  //   fetchAssignments();
  // }, []);

  // // const handleLogout = async () => {
  // //   await supabase.auth.signOut();
  // //   navigate("/login");
  // // };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   if (!file) return;
  //   setUploading(true);
  //   const { error } = await supabase.storage
  //     .from("course-materials")
  //     .upload(`materials/${file.name}`, file, {
  //       cacheControl: "3600",
  //       upsert: false,
  //     });
  //   setUploading(false);
  //   if (error) alert("Upload failed");
  //   else alert("Upload successful");
  //   setFile(null);
  // };

  // const handleMarkGraded = async (assignmentId, title) => {
  //   const { error } = await supabase
  //     .from("assignments")
  //     .update({ graded: true })
  //     .eq("id", assignmentId);

  //   if (error) {
  //     alert("Failed to mark as graded");
  //   } else {
  //     alert(`Marked ${title} as graded`);
  //     setAssignments((prev) =>
  //       prev.map((a) => (a.id === assignmentId ? { ...a, graded: true } : a)),
  //     );
  //   }
  // };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <div className="space-y-4 rounded-xl border border-gray-100 bg-gradient-to-r from-green-600 to-emerald-600 p-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
            <HiMiniUsers className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div className="text-white">
            <p className="text-base font-bold md:text-lg">2 345</p>
            <p className="md:text-sm">Total Students</p>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100">
            <IoLibrary className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div>
            <p className="text-base font-bold md:text-lg">2 345</p>
            <p className="md:text-sm">Total Courses</p>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100">
            <HiMiniUser className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div>
            <p className="text-base font-bold md:text-lg">2 345</p>
            <p className="md:text-sm">Total Instructors</p>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100">
            <HiOutlineStatusOnline className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div>
            <p className="text-base font-bold md:text-lg">2 345</p>
            <p className="md:text-sm">Active Students</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_14rem]">
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
          <h3>Popular Courses</h3>

          {popularCourses.map((course) => (
            <div key={course.id} className="flex items-center gap-4">
              <div className="flex flex-1 justify-between md:text-xs lg:text-sm">
                <p className="font-semibold text-gray-500">{course.title}</p>
                <p>{course.enrolled}</p>
              </div>
              <div className="h-1.5 flex-1 rounded-full bg-gray-200">
                <div
                  className={`h-1.5 rounded-full ${course.title === "Product Management" ? "bg-green-500" : course.title === "Product Design" ? "bg-amber-500" : "bg-blue-600"}`}
                  style={{ width: course.progress }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 rounded-xl bg-white p-6 lg:row-span-2">
          <h3>Quick Actions</h3>

          <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:grid-cols-1 lg:gap-4">
            <button className="flex flex-col items-center gap-0.5 rounded-lg bg-green-200 p-2 px-4">
              <HiUserAdd className="h-4 w-4 md:h-5 md:w-5" />
              <p className="md:text-xs">Enroll Student</p>
            </button>
            {/* <button className="flex flex-col items-center gap-0.5 rounded-lg bg-green-200 p-2 px-4">
              <HiUserAdd className="h-4 w-4 md:h-5 md:w-5" />
              <p className="md:text-xs">Enroll Student</p>
            </button> */}
            <button className="flex flex-col items-center rounded-lg bg-lime-200 p-2 px-4">
              <RiUpload2Fill className="h-4 w-4 md:h-5 md:w-5" />
              <p className="md:text-xs">Upload Course</p>
            </button>
            <button className="flex flex-col items-center gap-0.5 rounded-lg bg-slate-200 p-2 px-4">
              <RiTaskFill className="h-4 w-4 md:h-5 md:w-5" />
              <p className="md:text-xs">Give Assignment</p>
            </button>
            <button className="flex flex-col items-center gap-0.5 rounded-lg bg-emerald-200 p-2 px-4">
              <RiAwardFill className="h-4 w-4 md:h-5 md:w-5" />
              <p className="md:text-xs">Issue Certificate</p>
            </button>
          </div>
        </div>

        <div className="w-full space-y-4 rounded-xl bg-white p-6">
          <h3>Recent Enrollments</h3>

          <div className="rounded-lg bg-lime-50 p-4">
            <table className="w-full">
              <thead className="table-auto text-left">
                <tr className="border-b border-gray-300">
                  <th>Student</th>
                  <th>Course</th>
                  <th>Enrolled</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="">
                  <td className="">Samuel Durumba</td>
                  <td>Product Marketing</td>
                  <td>{Date.now()}</td>
                </tr>
                <tr>
                  <td>Samuel</td>
                  <td>Product Marketing</td>
                  <td>{Date.now()}</td>
                </tr>
                <tr>
                  <td>Samuel</td>
                  <td>Product Marketing</td>
                  <td>{Date.now()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;

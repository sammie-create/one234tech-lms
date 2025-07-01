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

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiBarChart2,
  FiBookOpen,
  FiSettings,
  FiUser,
  FiLogOut,
  FiMenu,
  FiUpload,
  FiDownload,
  FiCheck,
} from "react-icons/fi";
import { supabase } from "../supabaseClient";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("Admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdmin() {
      const { data: user } = await supabase.auth.getUser();
      setAdminName(user?.user?.user_metadata?.full_name || "Admin");
    }
    async function fetchAssignments() {
      const { data, error } = await supabase
        .from("assignments")
        .select("id, student_name, title, submitted_at, file_path, graded")
        .order("submitted_at", { ascending: false });
      if (!error && data) setAssignments(data);
    }
    fetchAdmin();
    fetchAssignments();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const { data, error } = await supabase.storage
      .from("course-materials")
      .upload(`materials/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    setUploading(false);
    if (error) alert("Upload failed");
    else alert("Upload successful");
    setFile(null);
  };

  const handleMarkGraded = async (assignmentId, title) => {
    const { error } = await supabase
      .from("assignments")
      .update({ graded: true })
      .eq("id", assignmentId);

    if (error) {
      alert("Failed to mark as graded");
    } else {
      alert(`Marked ${title} as graded`);
      setAssignments(prev =>
        prev.map(a => (a.id === assignmentId ? { ...a, graded: true } : a))
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      <nav className="bg-white flex justify-between items-center px-6 py-4 border-b border-gray-100 shadow-sm">
        <div className="text-2xl font-extrabold text-emerald-600 tracking-tight">
          Admin Panel
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 hover:text-emerald-600"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-emerald-600"
          >
            <FiUser className="w-5 h-5" />
            <span>{adminName}</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
              <Link
                to="/admin/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiSettings className="mr-2" /> Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="flex min-h-screen">
        <aside
          className={`fixed md:relative z-40 w-64 bg-black text-white p-6 border-r border-gray-800 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out`}
        >
          <ul className="space-y-6 text-sm font-medium">
            <li className="flex items-center space-x-2 text-emerald-400">
              <FiBarChart2 /> <span>Dashboard</span>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center space-x-2 text-white hover:text-emerald-400"
              >
                <FiUsers /> <span>Manage Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/courses"
                className="flex items-center space-x-2 text-white hover:text-emerald-400"
              >
                <FiBookOpen /> <span>Manage Courses</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reports"
                className="flex items-center space-x-2 text-white hover:text-emerald-400"
              >
                <FiBarChart2 /> <span>Reports</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="flex items-center space-x-2 text-white hover:text-emerald-400"
              >
                <FiSettings /> <span>Settings</span>
              </Link>
            </li>
          </ul>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 p-6 space-y-8 md:ml-0">
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow">
            <h1 className="text-2xl font-semibold text-emerald-700">
              Welcome, {adminName}!
            </h1>
            <p className="text-sm text-emerald-500 mt-1">
              Monitor and manage the LMS efficiently.
            </p>
          </div>

          <section className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Upload New Course Material (PDF, Video, etc.)
            </h2>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".pdf,.mp4,.mov,.docx,.pptx"
                onChange={handleFileChange}
                className="text-sm"
              />
              <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
              >
                <FiUpload className="mr-2" />{" "}
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </section>

          <section className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Submitted Assignments
            </h2>
            {assignments.length === 0 ? (
              <p className="text-sm text-gray-500">
                No assignments submitted yet.
              </p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {assignments.map(a => (
                  <li
                    key={a.id}
                    className="py-3 text-sm text-gray-700 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{a.student_name}</span>{" "}
                      submitted "{a.title}" on{" "}
                      {new Date(a.submitted_at).toLocaleDateString()}
                      {a.graded && (
                        <span className="ml-2 text-xs text-white bg-emerald-500 px-2 py-1 rounded-full">
                          Graded
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={`https://YOUR_SUPABASE_URL/storage/v1/object/public/assignments/${a.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-800"
                      >
                        <FiDownload className="inline mr-1" />
                        Download
                      </a>
                      <button
                        onClick={() => handleMarkGraded(a.id, a.title)}
                        disabled={a.graded}
                        className="text-yellow-500 hover:text-yellow-600 disabled:opacity-50"
                      >
                        <FiCheck className="inline mr-1" />
                        {a.graded ? "Graded" : "Mark Graded"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl shadow border border-emerald-100">
              <h4 className="text-sm text-gray-600">Total Students</h4>
              <p className="text-2xl font-bold text-emerald-700 mt-1">248</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl shadow border border-emerald-100">
              <h4 className="text-sm text-gray-600">Courses Offered</h4>
              <p className="text-2xl font-bold text-emerald-700 mt-1">36</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl shadow border border-emerald-100">
              <h4 className="text-sm text-gray-600">Active Sessions</h4>
              <p className="text-2xl font-bold text-emerald-700 mt-1">5</p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Activities
            </h2>
            <ul className="space-y-3">
              <li className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm text-sm text-gray-700">
                Student Jane Doe enrolled in "Product Discovery".
              </li>
              <li className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm text-sm text-gray-700">
                Admin updated the "UI/UX Foundations" course module.
              </li>
              <li className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm text-sm text-gray-700">
                Report generated for April 2025.
              </li>
            </ul>
          </section>
        </main>
      </div>

      <footer className="text-center py-4 text-sm text-gray-400 border-t border-gray-200">
        © 2025 LMS Admin. Terms · Privacy Policy
      </footer>
    </div>
  );
}

// import { useForm } from "react-hook-form";
// import { useState, useEffect } from "react";
// import { useEnrollStudent } from "@/hooks/useEnrollStudent";
// import { supabase } from "@/integrations/supabaseClient";
// import toast from "react-hot-toast";

// function EnrollStudentForm() {
//   const { register, handleSubmit, reset } = useForm();
//   const { mutateAsync: enrollStudent, isLoading } = useEnrollStudent();
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   console.log(students);

//   useEffect(() => {
//     async function fetchData() {
//       const { data: studentData } = await supabase
//         .from("profiles")
//         .select("id, name, email")
//         .eq("role", "student");
//       const { data: courseData } = await supabase
//         .from("courses")
//         .select("id, title");
//       setStudents(studentData || []);
//       setCourses(courseData || []);
//     }
//     fetchData();
//   }, []);

//   async function onSubmit(values) {
//     try {
//       await enrollStudent({
//         student_id: values.student_id,
//         course_id: values.course_id,
//       });
//       toast.success("Student enrolled successfully");
//       reset();
//     } catch (err) {
//       toast.error(err || "Enrollment failed");
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="grid grid-cols-1 gap-6 md:grid-cols-3"
//     >
//       <div className="space-y-2">
//         <label className="block text-sm font-medium text-gray-700">
//           Select Student
//         </label>
//         <select
//           {...register("student_id")}
//           className="w-full appearance-none rounded border border-gray-300 bg-gray-100 p-2 outline-none focus:border-emerald-500 focus:ring-emerald-500"
//         >
//           <option value="" className="">
//             Choose a Student...
//           </option>
//           {students.map((s) => (
//             <option key={s.id} value={s.id}>
//               {s.name} ({s.email})
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Select Course
//         </label>
//         <select
//           {...register("course_id")}
//           className="w-full rounded border p-2"
//         >
//           <option value="">-- Select Course --</option>
//           {courses.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.title}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button
//         type="submit"
//         className="cursor-pointer rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
//         disabled={isLoading}
//       >
//         {isLoading ? "Enrolling..." : "Enroll Student"}
//       </button>
//     </form>
//   );
// }

// export default EnrollStudentForm;

import { useForm } from "react-hook-form";
import { useEnrollStudent } from "@/hooks/useEnrollStudent";

import toast from "react-hot-toast";
import { useState } from "react";
import CustomSelect from "@/ui/CustomSelect";
import { useAllStudents } from "@/hooks/useAllStudents";
import { useAllCourses } from "@/hooks/useAllCourses";

export default function EnrollStudentForm() {
  const { handleSubmit, reset } = useForm();
  const { mutateAsync: enrollStudent } = useEnrollStudent();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { data: studentData } = useAllStudents();
  const { data: coursesData } = useAllCourses();

  const students = studentData?.map((s) => ({
    value: s.id,
    label: `${s.name} (${s.email})`,
  }));

  const courses = coursesData?.map((c) => ({
    value: c.id,
    label: c.title,
  }));

  const onSubmit = async () => {
    if (!selectedStudent || !selectedCourse) {
      toast.error("Please select both student and course");
      return;
    }

    const toastId = toast.loading("Enrolling student...");
    try {
      await enrollStudent({
        student_id: selectedStudent.value,
        course_id: selectedCourse.value,
      });
      toast.success("Student enrolled successfully", { id: toastId });
      setSelectedStudent(null);
      setSelectedCourse(null);
      reset();
    } catch (error) {
      toast.error(error.message || "Failed to enroll student", { id: toastId });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full gap-4 space-y-5 lg:grid-cols-[1fr_1fr_12rem]"
    >
      <CustomSelect
        label="Select Student"
        options={students}
        selected={selectedStudent}
        onChange={setSelectedStudent}
      />
      <CustomSelect
        label="Select Course"
        options={courses}
        selected={selectedCourse}
        onChange={setSelectedCourse}
      />
      <div className="lg:self-end">
        <button
          type="submit"
          disabled={!selectedStudent || !selectedCourse}
          className="mt-1 w-full cursor-pointer rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-600 lg:border lg:border-inherit"
        >
          Enroll Student
        </button>
      </div>
    </form>
  );
}

import { useState } from "react";
// import toast from "react-hot-toast";
// import AddEditModuleModal from "./AddEditModuleModal";
import { useAllCourses } from "@/hooks/useAllCourses";
import { useCourseModules } from "@/hooks/useCourseModules";
import CustomSelect from "../../../ui/CustomSelect";
// import { set } from "react-hook-form";
import AddEditModuleModal from "../ui/admin/AddEditModuleModal";
import { BsThreeDots } from "react-icons/bs";
import Table from "@/ui/Table";

function ModulesManagement() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null); // controls which row's actions are open
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data: courses, isLoading: coursesLoading } = useAllCourses();

  const courseOptions = courses?.map((course) => ({
    value: course.id,
    label: course.title,
  }));

  const { data: modules, isLoading: modulesLoading } = useCourseModules(
    selectedCourse?.value,
  );

  console.log(modules);

  function handleAddModule() {
    setEditingModule(null);
    setShowModal(true);
  }

  function handleEditModule(module) {
    setEditingModule(module);
    setShowModal(true);
  }

  const columns = [
    {
      accessorKey: "order_index",
      header: "Order",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => (
        <div className="group relative">
          <span className="line-clamp-1 text-wrap">{info.getValue()}</span>
        </div>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const module = row.original;
        console.log(module);
        return (
          <div className="relative flex space-x-2">
            <BsThreeDots
              className="cursor-pointer text-2xl"
              onClick={() =>
                setActiveRowId(activeRowId === module.id ? null : module.id)
              }
            />
            {activeRowId === module.id && (
              <div className="absolute top-6 right-0 z-10 flex w-24 flex-col rounded border border-gray-200 bg-white shadow-md">
                <button
                  onClick={() => {
                    setActiveRowId(null);
                    handleEditModule(module);
                  }}
                  className="px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setEditingModule(module);
                    setDeleteModalOpen(true);
                    setActiveRowId(null);
                  }}
                  className="px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];
  console.log(courseOptions);
  console.log(selectedCourse);
  console.log();
  console.log(editingModule);

  return (
    <div className="p-6 space-y-6">
      <h1 className="mb-6 text-2xl font-bold">Manage Modules</h1>

      {/* Course Selector */}
      <CustomSelect
        label="Select Course"
        options={courseOptions}
        selected={selectedCourse}
        onChange={setSelectedCourse}
      />

      {/* Modules Table */}
      {modulesLoading ? (
        <p>Loading modules...</p>
      ) : modules?.length ? (
        <Table
          columns={columns}
          data={modules || []}
          isLoading={modulesLoading}
        />
      ) : // <table className="w-full border border-gray-200">
      //   <thead>
      //     <tr className="bg-gray-100">
      //       <th className="p-3 text-left">Order</th>
      //       <th className="p-3 text-left">Title</th>
      //       <th className="p-3 text-left">Description</th>
      //       <th className="p-3 text-left">Actions</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {modules.map((module) => (
      //       <tr key={module.id} className="border-t">
      //         <td className="p-3">{module.order_index}</td>
      //         <td className="p-3">{module.title}</td>
      //         <td className="p-3">{module.description}</td>
      //         <td className="space-x-2 p-3">
      //           <button
      //             className="rounded bg-blue-600 px-3 py-1 text-white"
      //             onClick={() => handleEditModule(module)}
      //           >
      //             Edit
      //           </button>
      //           <button
      //             className="rounded bg-red-600 px-3 py-1 text-white"
      //             onClick={() => toast.error("Delete not implemented yet")}
      //           >
      //             Delete
      //           </button>
      //         </td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </table>
      selectedCourse ? (
        <p className="mt-1 text-[10px] text-gray-400 italic">
          No modules found for this course.
        </p>
      ) : (
        <p className="mt-1 text-[10px] text-gray-400 italic">
          Please select a course to view its modules.
        </p>
      )}

      {/* Add Button */}
      {selectedCourse && (
        <div className="mt-6">
          <button
            onClick={handleAddModule}
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Add Module
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <AddEditModuleModal
          courseId={selectedCourse.value}
          module={editingModule}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ModulesManagement;

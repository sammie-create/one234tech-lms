import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";
import { Link } from "react-router-dom";
import Navbar from "../index/Navbar";
import Footer from "../index/Footer";

function ExploreCourses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exploreCourses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });

  console.log("ExploreCourses data:", data);

  if (isLoading) return <p className="text-center">Loading courses...</p>;
  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-10 lg:py-15">
        <h1 className="mb-8 text-center text-2xl text-gray-800 md:text-3xl">
          Explore Courses
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg"
            >
              <img
                src={course.cover_image}
                alt={course.title}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h2 className="mb-2">{course.title}</h2>
                <p className="mb-3 text-sm text-gray-600">
                  {course.description}
                </p>
                <div className="mb-4 text-sm text-gray-500">
                  <span>Duration</span> &bull; <span>{course.duration}</span>
                </div>
                <Link
                  to={`/lms/student/courses/${course.slug}`}
                  className="font-medium !text-emerald-600 hover:underline md:text-[12px]"
                >
                  View Course →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ExploreCourses;

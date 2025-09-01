import { GrUserExpert, GrCertificate } from "react-icons/gr";
import { GiProgression } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import Card from "./Card";

const valueProps = [
  {
    id: 1,
    title: "Built by Leaders",
    description: "Built by product leaders for future product leaders.",
    icon: (
      <GrUserExpert className="text-[20px] text-emerald-600 md:text-[30px]" />
    ),
    iconContainer: "self-center bg-emerald-100 p-3 rounded-full md:p-4",
    valueCardClass:
      "flex flex-col gap-2 bg-white px-4 py-6 lg:px-8 xl:px-5 rounded-[12px] shadow-sm",
  },
  {
    id: 2,
    title: "Structured for Growth",
    description: "Step-by-step learning paths with real-world projects.",
    icon: (
      <GiProgression className="text-[20px]  text-lime-600 md:text-[30px]" />
    ),
    iconContainer: "self-center bg-lime-100 p-3 rounded-full md:p-4",
    valueCardClass:
      "flex flex-col gap-2 bg-white px-4 py-6 lg:px-8 xl:px-5 rounded-[12px] shadow-sm",
  },
  {
    id: 3,
    title: "Easy Collaboration",
    description: "Join a growing tribe of budding product talents.",
    icon: <RiTeamFill className="text-[20px] text-gray-700 md:text-[30px]" />,
    iconContainer: "self-center bg-gray-100 p-3 rounded-full md:p-4",
    valueCardClass:
      "flex flex-col gap-2 bg-white px-4 py-6 lg:px-8 xl:px-5 rounded-[12px] shadow-sm",
  },
  {
    id: 4,
    title: "Get Certified",
    description:
      "Highlight your product skills with a certificate that shows you're ready.",
    icon: (
      <GrCertificate className="text-[20px] text-green-600 md:text-[30px]" />
    ),
    iconContainer: "self-center bg-green-100 p-3 rounded-full md:p-4",
    valueCardClass:
      "flex flex-col gap-2 bg-white px-4 py-6 lg:px-8 xl:px-5 rounded-[12px] shadow-sm",
  },
];

function ValueCard() {
  return (
    <>
      {valueProps.map(value => (
        <Card
          key={value.id}
          icon={value.icon}
          iconContainer={value.iconContainer}
          cardStyle={value.valueCardClass}
          title={value.title}
          description={value.description}
        />
      ))}
    </>
  );
}

export default ValueCard;

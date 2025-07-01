import thinkingIcon from "../../assets/illustrations/thinking.svg";
import toolsIcon from "../../assets/illustrations/tools.svg";
import resumeFolderIcon from "../../assets/illustrations/resume-folder.svg";
import teamworkIcon from "../../assets/illustrations/team-work.svg";

const cards = [
  {
    id: 1,
    title: "Think Like a Product Pro",
    description:
      "Build decision-making frameworks that mirror real product roles.",
    bgClass: "bg-white border-l-4 border-emerald-500",
    illustration: thinkingIcon,
  },
  {
    id: 2,
    title: "Job-Ready Skills",
    description:
      "Learn the tools, practices, and workflows used by modern product teams.",
    bgClass: "bg-gray-50 border-t-4 border-green-500",
    illustration: toolsIcon,
  },
  {
    id: 3,
    title: "Portfolio-Worthy Projects",
    description:
      "Turn your learning into proof with projects you can showcase anywhere.",
    bgClass: "bg-emerald-50",
    illustration: resumeFolderIcon,
  },
  {
    id: 4,
    title: "Learn to Collaborate",
    description:
      "Gain clarity, skills, and mindset to break into product roles with purpose.",
    bgClass: "bg-gradient-to-br from-green-50 to-white",
    illustration: teamworkIcon,
  },
];

function Benefits() {
  return (
    <section aria-labelledby="benefitSection" className="py-15">
      <div className="mx-auto max-w-[85%]">
        <h2
          data-aos="fade-up"
          id="benefitSection"
          className="mb-12 text-center"
        >
          What You’ll Gain
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {cards.map(card => (
            <div
              key={card.id}
              data-aos="fade-up"
              className={`${card.bgClass} px-4 py-6 rounded-xl shadow-sm !transition-all !duration-400 ease-in-out hover:scale-105 hover:shadow-md`}
            >
              <div className="flex flex-col gap-1.5">
                <h3>{card.title}</h3>
                <p className="text-xs md:text-sm">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;

/* 
import React from 'react';



export default function WhatYoullGainSection() {
  return (
    <section className="py-16 bg-white">
     
    </section>
  );
}

*/

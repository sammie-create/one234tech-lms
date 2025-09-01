import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function StudentDashboardProgressCard({ value, label, color }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-20 w-20 text-center font-bold lg:h-28 lg:w-28">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: "#1e293b",
            trailColor: "#e5e7eb",
          })}
        />
      </div>

      <p className="text-center text-xs lg:text-base">{label}</p>
    </div>
  );
}

export default StudentDashboardProgressCard;

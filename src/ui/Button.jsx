// import { useNavigate } from "react-router-dom";

function Button({ children, size, variation, style }) {
  return (
    <button
      // data-aos="fade-in"
      className={`btn btn-${size} btn-${variation} ${style}`}
    >
      {children}
    </button>
  );
}

export default Button;

import { useNavigate } from "react-router-dom";

function Button({ children, size, variation }) {
  const navigate = useNavigate();

  return (
    <button data-aos="fade-in" className={`btn btn-${size} btn-${variation}`}>
      {children}
    </button>
  );
}

export default Button;

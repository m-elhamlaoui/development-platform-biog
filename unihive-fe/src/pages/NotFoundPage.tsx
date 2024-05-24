import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <div className="not-found-logo">
        <img
          src="https://storage.googleapis.com/unihive-files/uh-logo.png"
          alt="UniHive Logo"
        />
      </div>
      <span className="num">404</span>
      <span className="msg">Not Found!</span>
      <button
        className="btn btn-primary go-home"
        onClick={() => navigate("/home")}
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFoundPage;

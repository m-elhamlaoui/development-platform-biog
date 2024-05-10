import HomeNavbar from "../components/HomeNavbarComponent";
import Footer from "../components/FooterComponent";
import { decodeToken, isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import Student from "../models/Student";
import StudentService from "../services/StudentService";
import { InfinitySpin } from "react-loader-spinner";
import ScrollToTop from "react-scroll-to-top";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import StudentProfileComponent from "../components/StudentProfileComponent";
import { useNavigate } from "react-router-dom";

function StudentProfilePage() {
  const [isLogged, setIsLogged] = useState(false);
  const [student, setStudent] = useState<Student>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    var token: string = "";

    if (localStorage.getItem("student")) {
      token = localStorage.getItem("student") as string;
    }

    if (token !== "") {
      setIsLogged(true);
    }

    const isMyTokenExpired = isExpired(token);

    if (isMyTokenExpired) {
      setIsLogged(false);
      if (token) {
        localStorage.removeItem("student");
        navigate("/home");
      } else {
        navigate("/home");
      }
    }

    const decodedToken: any = decodeToken(token);
    console.log(decodedToken);

    const fetchData = async () => {
      try {
        if (!isMyTokenExpired) {
          const studentResponse = await StudentService.getStudent(
            token,
            decodedToken.sub
          );
          setStudent(studentResponse.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="load">
          <InfinitySpin color="#46bfff" />
        </div>
      ) : (
        <>
          <HomeNavbar loggedin={isLogged} student={student!} />
          <StudentProfileComponent student={student!} />
          <Footer />
          <ScrollToTop
            smooth
            component={
              <button
                style={{
                  width: "3rem",
                  height: "3rem",
                  backgroundColor: "#46bfff",
                  borderRadius: "0.5rem",
                  border: "none",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
              >
                <ArrowUpIcon width={30} height={30} color="white" />
              </button>
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "3rem",
              height: "3rem",
              padding: "0",
              borderRadius: "0.5rem",
            }}
          />
        </>
      )}
    </>
  );
}

export default StudentProfilePage;

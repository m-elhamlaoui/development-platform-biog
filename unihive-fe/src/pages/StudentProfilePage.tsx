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
import { useNavigate, useParams } from "react-router-dom";
import Club from "../models/Club";
import StudentSettingsComponent from "../components/StudentSettingsComponent";

function StudentProfilePage() {
  const { option } = useParams();
  const [isLogged, setIsLogged] = useState(false);
  const [student, setStudent] = useState<Student>();
  const [isLoading, setIsLoading] = useState(true);
  const [clubs, setClubs] = useState<Club[]>([]);
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
          if (studentResponse.data) {
            const ClubsResponse = await StudentService.getClubs(
              token,
              studentResponse.data.id
            );
            setClubs(ClubsResponse.data);
          }
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
          {option === "profile" && (
            <StudentProfileComponent student={student!} clubs={clubs} />
          )}
          {option === "settings" && (
            <StudentSettingsComponent student={student!} clubs={clubs} />
          )}
          <Footer />
          <ScrollToTop
            smooth
            component={
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#46bfff",
                  borderRadius: "0.5rem",
                  border: "none",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
              >
                <ArrowUpIcon width={30} height={30} color="white" />
              </div>
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

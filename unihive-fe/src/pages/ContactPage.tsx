import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../components/FooterComponent";
import HomeNavbar from "../components/HomeNavbarComponent";
import PageTitleComponent from "../components/PageTitleComponent";
import Student from "../models/Student";
import StudentService from "../services/StudentService";

function Contact() {
  const [isLogged, setIsLogged] = useState(false);
  const [student, setStudent] = useState<Student>();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "UniHive - Contact";
    var token: string = "";

    if (localStorage.getItem("student")) {
      token = localStorage.getItem("student") as string;
    } else if (localStorage.getItem("superadmin")) {
      navigate("/superadmin/dashboard");
    } else if (localStorage.getItem("admin")) {
      navigate("/admin/dashboard");
    }

    if (token !== "") {
      setIsLogged(true);
    }

    const isMyTokenExpired = isExpired(token);

    if (isMyTokenExpired) {
      setIsLogged(false);
      if (token) {
        localStorage.removeItem("student");
        window.location.reload();
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
          setEmail(studentResponse.data.email);
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
          <HomeNavbar loggedin={isLogged} student={student!} contact />
          <PageTitleComponent title="CONTACT US" />
          <div className="container-fluid contact">
            <div className="contact-us">
              <span className="title">Contact Us</span>
              <span className="desc">
                Please submit your inquiry using the form below and one of the
                admins will get in touch with you.
              </span>
            </div>
            <div className="contact-fields">
              <div className="contact-field">
                <label>Your Email</label>
                <input
                  type="email"
                  placeholder="your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={isLogged}
                />
              </div>
              <div className="contact-field">
                <label>Subject</label>
                <input
                  type="email"
                  placeholder="subject"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                />
              </div>
              <div className="contact-field">
                <label>Message</label>
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>
              <button
                className="btn btn-primary contact-submit-btn"
                type="button"
              >
                Submit
              </button>
            </div>
          </div>
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

export default Contact;

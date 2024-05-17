import { useEffect, useState } from "react";
import FooterComponent from "../components/FooterComponent";
import HomeNavbarComponent from "../components/HomeNavbarComponent";
import Student from "../models/Student";
import { isExpired } from "react-jwt";


function EventPage() {
    const [isLogged, setIsLogged] = useState(false);
    const [student, setStudent] = useState<Student>();
    
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
            window.location.reload();
          }
        }
    }, []);

    return (<>
    <HomeNavbarComponent loggedin={isLogged} student={student!}/> 

    <FooterComponent/>
    </>  );
}

export default EventPage;
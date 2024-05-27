import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

function FooterComponent() {
  return (
    <div className="container-fluid footer mt-auto">
      <div className="footer-about-contact">
        <span>About Us</span>
        <span>Contact Us</span>
      </div>
      <div className="footer-socials">
        <span>FOLLOW US</span>
        <div className="socials">
          <FontAwesomeIcon icon={faFacebook} size={"2x"} />
          <FontAwesomeIcon icon={faInstagram} size={"2x"} />
          <FontAwesomeIcon icon={faLinkedin} size={"2x"} />
          <FontAwesomeIcon icon={faXTwitter} size={"2x"} />
        </div>
      </div>
      <span style={{ fontWeight: 300 }}>
        UniHive. ©2024 All rights reserved.
      </span>
    </div>
  );
}

export default FooterComponent;

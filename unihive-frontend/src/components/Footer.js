import React, { Component } from 'react';
import '../Styles/footer.css';
 
class Footer extends Component {
  render() {
    return (
      <div className="banner">
        <div className='above-section'>
             <span>About Us</span>
             <span>Contact</span>
        </div>
       <div className='bottom-section'>      
         <span>Follow Us  </span>
         <span className='icons'>
            <img src="/fb.png" alt="Facebook" />
            <img src="/ytb.png" alt="youtube" />
            <img src="/x.png" alt="Twitter" />
            <img src="/ig.png" alt="Instagram" />
        </span>

         </div>


      </div>        
    );
  }
}
 
export default Footer;
import React from "react";
import "./comp.css";
class SideMenu extends React.Component {
    render() {
        const { userType } = this.props;
        let menuItems; //here items are static , with no link , links to be added later
        if (userType === "Super Admin") {
            menuItems = ["Dashboard", "Admins", "Clubs", "Events", "Schools", "Students", "Sign up requests"];
        } else if (userType === "Admin") {
            menuItems = ["Dashboard", "Clubs", "Events", "Students"];
        }
        return (
            <div className="menu-container clearfix">
                {menuItems.map(item => (
                    <div key={item} className="clickable-rectangle">
                        <img src="https://static.vecteezy.com/system/resources/previews/007/409/979/original/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg" alt="Icon" className="icon"/>
                        <span className="title">{item}</span>
                    </div>
                ))}
            </div>
        );
    }
}

export default SideMenu;

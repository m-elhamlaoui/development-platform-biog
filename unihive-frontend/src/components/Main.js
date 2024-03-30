import React from "react";
import "./comp.css";
import Button from "./Button";

class Main extends React.Component {
    render() {
        const menuItems = ["Admins", "Clubs"];
        return (
            <div className="main-container">
                <div>
                    {menuItems.map(item => (
                        <div key={item} className="item-container">
                            <span className="mediumtitle">{item}</span>
                            < Button/>
                        </div>
                    ))}
                </div>
                {/* Main Content */}

            </div>
        );
    }
}

export default Main;

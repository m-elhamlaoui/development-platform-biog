import React from "react";
import "./comp.css";

class Button extends React.Component {
    render() {
        const content = "view details";
        return (
            <div className="button">
                    {content}
           </div>
        );
    }
}

export default Button;

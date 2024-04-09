import React from "react";
import SideMenu from "../components/SideMenu";
import Main from "../components/Main";
class Dashboard extends  React.Component {
    render() {
        const { userType } = this.props; // Destructure userType from props
        return (

        <div className = "Dashboard">
        <h1 className="bigtitle"> {userType} dashboard </h1>
            <div className="dashboard-content">
                <SideMenu userType= {userType} />
                <Main />
            </div>
        </div>
    )

    }
}
export default Dashboard;
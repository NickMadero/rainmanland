/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import '../style/App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap'

// These imports are where we get front end components from .jsx files so we don't have
// to define them directly inside this file.
// IMPORTANT NOTE: filename and class name must start with a capital letter to be
// 				   imported! I was stuck on this for two hours.
import LandingPage from './components/LandingPage.jsx';
import CustomerInfoPage from "./components/CustomerInfoPage";
import Calendar from "./components/Calendar";
import EmployeeSignInPage from "./components/EmployeeSignInPage";
import OwnerDashboard from "./components/OwnerDashboard";
import EmployeeDashBoard from "./components/EmployeeDashboard";

// The App class handles the components that appear on the front end and sends requests
// to the node.js backend (index.js) each time the front end needs to interact with the
// database. This is basically the core of the front end.
class App extends Component {
    constructor(props) {
        super(props)
            this.state = {
                // state attribute that controls which page is rendered
                currentPage: 'LandingPage',

                // state attribute that remembers the user's info (false means they are not logged in)
                userInfo: false,

                // other state attributes
                setSomeField1: '',
                setSomeField2: '',
                fetchJobsTodayData: [],
                someFieldUpdate: ''
            };

            // Binds methods to App class so it re-renders each time they are called
            this.handleSetApptButtonClick = this.handleSetApptButtonClick.bind(this);
            this.handleGoToCalendarButtonClick = this.handleGoToCalendarButtonClick.bind(this);
            this.handleEmployeeSignInButtonClick = this.handleEmployeeSignInButtonClick.bind(this);
            this.handleEmpLoginButtonClick = this.handleEmpLoginButtonClick.bind(this);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // The following handlers change the "currentPage" state attribute to a new page from the "components" directory,
    // which triggers one of the bindings right up there^^^, which calls App.render() to render that page.

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // When the user clicks the "Book now" button on the landing page, this method brings up CustomerInfoPage
    handleSetApptButtonClick() {
        this.setState({currentPage: 'CustomerInfoPage'});
    }

    // When the user clicks the "go to calendar button" on CustomerInfoPage, this method brings up the Calendar page
    handleGoToCalendarButtonClick() {
        this.setState({currentPage: 'Calendar'});
    }

    // When the user clicks the "Employee sign in" button on LandingPage, this method brings up EmployeeSignInPage
    handleEmployeeSignInButtonClick() {
        this.setState({currentPage: 'EmployeeSignInPage'});
    }

    // When the user clicks the "Log in" button on EmployeeSignInPage, this method validates the credentials and brings
    // up the appropriate dashboard for the employee
    handleEmpLoginButtonClick(email, password) {
        const userInfo = this.getUserInfo(email, password)  // returns either user fields from user table or false if bad credentials
        if (!userInfo) {
            this.setState({currentPage: 'EmployeeSignInPage'});
            alert("Invalid login. Please try again or contact the business owner for credentials.")
            return;
        }
        else {
            this.setState({userInfo: userInfo})
        }

        if (this.state.userInfo.user_type === "owner") {
            this.setState({currentPage: 'OwnerDashboard'});
        }
        else if (this.state.userInfo.user_type === "employee") {
            this.getJobsTodayForCrew(this.state.userInfo.crew_number)
            this.setState({currentPage: 'EmployeeDashboard'});
        }
    }

    // checks sign-in credentials against the MySQL database
    getUserInfo(email, pw) {
        axios.post("/api/get-user-info", {email: email, password: pw})
            .then((response) => {
                if (response.data && response.data.length === 1) {
                    return response.data[0];
                }
            })
        return false;
    }

    // gets a list of today's jobs for the specified crew from the database
    getJobsTodayForCrew(crew_number) {
        axios.get(`/api/get-jobs/${crew_number}`)
            .then((response) => {
                this.setState({
                    fetchJobsTodayData: response.data
                })
            })
    }

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            [nam]: val
        })
    };

    handleChange2 = (event) => {
        this.setState({
            someFieldUpdate: event.target.value
        })
    }

    submit = () => {
        axios.post('/api/insert', this.state)
	    .then(() => { alert('success post') })
	console.log(this.state)
	document.location.reload();
    }

    delete = (id) => {
        if (confirm("Do you want to delete? ")) {
            axios.delete(`/api/delete/${id}`)
            document.location.reload()
		}
    }

    edit = (id) => {
        axios.put(`/api/update/${id}`, this.state)
	document.location.reload();
    }

	// loads components from the landing_page.jsx file and renders them in the browser
    render() {

        // a map containing the imported pages from the components directory
        const pages = {
            LandingPage: <LandingPage
                onBookButtonClick={this.handleSetApptButtonClick}
                onEmployeeSignInButtonClick={this.handleEmployeeSignInButtonClick}/>,
            CustomerInfoPage: <CustomerInfoPage onGoToCalendarButtonClick={this.handleGoToCalendarButtonClick}/>,
            Calendar: <Calendar />,
            EmployeeSignInPage: <EmployeeSignInPage
                onLoginClick={this.handleEmpLoginButtonClick}/>,
            OwnerDashboard: <OwnerDashboard/>,
            EmployeeDashboard: <EmployeeDashboard
                jobsToday={this.state.fetchJobsTodayData}
                crewNum={this.state.userInfo.crew_number}/>
        };

        // the render method will display whichever page is set as this.state.currentPage
        return (
            <div>
                {pages[this.state.currentPage]}
            </div>
        );
	}
}

export default App;

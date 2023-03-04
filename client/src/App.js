/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap'

// These imports are where we get front end components from .jsx files so we don't have
// to define them directly inside this file.
// IMPORTANT NOTE: filename and class name must start with a capital letter to be
// 				   imported! I was stuck on this for two hours.
import LandingPage from './components/LandingPage.jsx';
import CustomerInfoPage from "./components/CustomerInfoPage";
import Calendar from "./components/Calendar";

// The App class handles the components that appear on the front end and sends requests
// to the node.js backend (index.js) each time the front end needs to interact with the
// database. This is basically the core of the front end.
class App extends Component {
    constructor(props) {
        super(props)
            this.state = {
                // state attribute that controls which page is rendered
                currentPage: 'LandingPage',

                // state attributes that handle what information the user can see
                userIsEmployee: false,
                userIsOwner: false,

                // other state attributes
                setSomeField1: '',
                setSomeField2: '',
                fetchData: [],
                someFieldUpdate: ''
            };

            // Binds methods to App class so it re-renders each time they are called
            this.handleSetApptButtonClick = this.handleSetApptButtonClick.bind(this);
            this.handleGoToCalendarButtonClick = this.handleGoToCalendarButtonClick.bind(this);
    }
    // changes "currentPage" state attribute to CustomerInfoPage, which renders the new page
    handleSetApptButtonClick() {
        this.setState({currentPage: 'CustomerInfoPage'});
    }

    // changes "currentPage" state attribute to Calendar
    handleGoToCalendarButtonClick() {
        this.setState({currentPage: 'Calendar'});
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

    componentDidMount() {
        axios.get("/api/get")
            .then((response) => {
                this.setState({
                    fetchData: response.data
                })
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
            LandingPage: <LandingPage onBookButtonClick={this.handleSetApptButtonClick}/>,
            CustomerInfoPage: <CustomerInfoPage onGoToCalendarButtonClick={this.handleGoToCalendarButtonClick}/>,
            Calendar: <Calendar />
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

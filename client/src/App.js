
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap'
import React, {Component}  from 'react';
import {
  Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  Redirect,
} from "react-router-dom";
import WelcomePage from './pages/welcomePage';


class App extends Component {
  constructor(props) {
    super(props);
        this.state = {
          setUserName: '',
          setPassword: '',
          fetchData: []

        }
  }

  handleChange = (Event) => {
    let name = Event.target.name;
    let pass = Event.target.value;
    this.setState({
      [name]:pass
    })
  }

  handleChange2 = (event) => {
    this.setState({
      reviewUpdate: event.target.value
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
    if (window.confirm("Do you want to delete? ")) {
      axios.delete(`/api/delete/${id}`)
      document.location.reload()
    }
  }
  render() {

    let card = this.state.fetchData.map((val, key) => {
      return (
          <React.Fragment>
            <Card style={{ width: '18rem' }} className='m-2'>
              <Card.Body>
                <Card.Title>{val.user_name}</Card.Title>
                <Card.Text>
                  {val.password_name}
                </Card.Text>
                <input name='reviewUpdate' onChange={this.handleChange2} placeholder='Update Review' ></input>
               // <Button onClick={() => { this.delete(val.id) }}>Delete</Button>
              </Card.Body>
            </Card>
          </React.Fragment>
      )
    })

    return (
        <div className='App'>
          <h1>Dockerized Fullstack React Application</h1>
          <div className='form'>
            <input name='setUserName' placeholder='Enter Book Name' onChange={this.handleChange} />
            <input name='setPassword' placeholder='Enter Review' onChange={this.handleChange} />
          </div>

          <Button className='my-2' variant="primary" onClick={this.submit}>Submit</Button> <br /><br/>

          <Container>
            <Row>
              {card}
            </Row>
          </Container>
        </div>
    );
  }
}
export default App;
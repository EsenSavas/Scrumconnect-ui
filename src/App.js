import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import logo from './logo.svg';
import './App.css';
import UserForm from './UserForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      country: undefined,
      age: undefined,
      sex: undefined,
      countries: [],
      isLoaded: false,
      error: {
        status: undefined,
        message: undefined,
        details: []
      }
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  callAPI() {
    fetch("http://localhost:3004/api/countries")
      .then(res => {
        const result = res.json()
        return result;
      }
      )
      .then(res => {
        this.setState({ countries: JSON.parse(res) });
      }
      )
      .catch(err => err);
  }
  componentWillMount() {
    this.callAPI();
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target,value,name)
    this.setState({
      [name]: value,
      isLoaded: false
    });
  }

  async call(data) {
    let response;

    await fetch("http://localhost:3004/api/save", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      const result = res.json();
      console.log('resefe', result)
      return result;
    }
    ).then(res => {
      console.log('resss', res.status)
      if (res.status === undefined) {
        this.setState({ returnedValue: res.name, isLoaded: true , error:undefined});
      }else{
        this.setState({ isLoaded: true, error: { status: res.status, message: res.message, details: res.details } })
      } 
      
      response = res.name;

    }
    )
      .catch((err) => {
        this.setState({ isLoaded: true, error: { status: 500, message: 'Failed To Fetch' } })

        console.log('err',err)
      });
  }

  handleSubmit(event) {

    const data = {
      name: this.state.name,
      sex: this.state.sex,
      age: this.state.age,
      country: this.state.country
    };

    this.call(data);
    event.preventDefault();
  }

  render() {
    return (

      <div class="container">

        <Formik>
          {() => (
            <form onSubmit={this.handleSubmit}>

              <div class="row">
                <div class="col-25">
                  <label for="fname">Name</label>
                </div>
                <div class="col-75">
                  <Field placeholder="Your name.." name="name" type="text" onChange={this.handleChange
                  } />
                </div>
              </div>



              <br />

              <div class="row">
                <div class="col-25">
                  <label for="age">Age</label>
                </div>
                <div class="col-75">
                  <Field placeholder="Age" name="age" type="number" onChange={this.handleChange
                  } value={this.state.age} />

                </div>
              </div>

              <br />
              <div class="row">
                <div class="col-25">
                  <label for="country">Country</label>
                </div>
                <div class="col-75">
                  <Field component="select" name="country" onChange={this.handleChange}>      
                    <option default value="null" onChange={this.handleChange}> Select country</option>

                    {this.state.countries ? Array.from(this.state.countries).map((country) => <option key={country} value={country}>{country}</option>) : ''}

                  </Field>
                </div>
              </div>

              <div class="row">
                <div class="col-25">
                  <label for="sex">Gender</label>
                </div>
                <div class="col-75">
                  <input
                    type="radio"
                    name="sex"
                    value="Female"
                    onChange={this.handleChange}
                  />Female
                <input
                    type="radio"
                    name="sex"
                    value="Male"
                    onChange={this.handleChange}
                  />Male
                </div>
              </div>
              <div class="row">
                <input type="button" onClick={this.handleSubmit} value="Submit" />
              </div>


              {this.state.isLoaded && (
                <div>
                  {this.state.error ? (
                    <div>
                      <div class="row">
                        {this.state.error.status}-{this.state.error.message}
                      </div>
                      <div class="row">
                        {this.state.error.details && this.state.error.details.map(error =>
                          <p>{error}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                      <div>
                        <h1>Application Complete</h1>
                        <h3>{this.state.returnedValue} Thank you for applying to this usefull goverment service</h3>
                      </div>
                    )


                  }
                </div>)}
            </form>
          )}
        </Formik>
      </div>
    )
  }

}



export default App;

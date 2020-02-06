import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import logo from './logo.svg';
import './App.css';
import UserForm from './UserForm';
const CustonerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  age: Yup.number()
    .min(0, 'Age Should Be Bigger Than 0!')
    .max(150, 'Age Should be Less Than 150!')
    .required('Required'),
  country: Yup.string()
    .required('Required'),
  sex: Yup.string()
    .required('Required')

});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      country: undefined,
      age: undefined,
      sex: undefined,
      countries: [],
      isLoaded: false
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this)

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
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  ageOnChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ value: e.target.age })
    }
  };
  handleAgeChange(evt) {
    const age = (evt.target.validity.valid) ? evt.target.value : this.state.age;

    this.setState({ age });
  }

  async call(data) {
    let response;

    await fetch("http://localhost:3004/api/save", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(res => {
      const result = res.json();
      return result;
    }
    )

      .then(res => {
        console.log('ese', res.name)
        response = res.name;
        this.setState({ returnedValue: res.name });
        this.setState({isLoaded : true})
        //this.setState({ returnedValue: JSON.parse(res) });
      }
      )
      .catch(err => err);

    return response;
  }

  handleSubmit(event) {

    const data = {
      name: this.state.name,
      sex: this.state.sex,
      age: this.state.age,
      country: this.state.country
    };

    const response = this.call(data);

    alert('A name was submitted: ' + response);
    event.preventDefault();
  }

  render() {
    return (

      <div class="container">

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validationSchema={CustonerSchema}
        >
          {({ handleChange, errors, touched }) => (
            <form onSubmit={this.handleSubmit}>

              <div class="row">
                <div class="col-25">
                  <label for="fname">Name</label>
                </div>
                <div class="col-75">
                  <Field placeholder="Your name.." name="name" type="text" onChange={e => {

                    this.setState({ name: e.target.value })
                    handleChange(e);

                  }
                  } />
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}    </div>
              </div>



              <br />

              <div class="row">
                <div class="col-25">
                  <label for="age">Age</label>
                </div>
                <div class="col-75">
                  <Field placeholder="Age" name="age" type="number" pattern="[0-9]*" onInput={e => {
                    this.setState({ age: e.target.value })
                    handleChange(e);
                  }} value={this.state.age} />
                  {errors.age && touched.age ? (
                    <div>{errors.age}</div>
                  ) : null}
                </div>
              </div>

              <br />
              <div class="row">
                <div class="col-25">
                  <label for="country">Country</label>
                </div>
                <div class="col-75">
                  <Field component="select" name="country" onChange={e => {

                    this.setState({ country: e.target.value })
                    handleChange(e);

                  }}>      <option> Select country</option>

                    {this.state.countries ? Array.from(this.state.countries).map((country) => <option key={country} value={country}>{country}</option>) : ''}

                  </Field>{errors.country && touched.country ? (
                    <div>{errors.country}</div>
                  ) : null}
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
                    onChange={e => {

                      this.setState({ sex: e.target.value })
                      handleChange(e);

                    }}
                  />Female
                <input
                    type="radio"
                    name="sex"
                    value="Male"
                    onChange={e => {

                      this.setState({ sex: e.target.value })
                      handleChange(e);

                    }}
                  />Male
                </div>
              </div>
              <div class="row">
                <input type="submit" value="Submit" />
              </div>


              {this.state.isLoaded && 
              <div> 
                <h1>Application Complete</h1>
                <h3>{this.state.returnedValue} Thank you for applying to this usefull goverment service</h3>
              </div>

              }
            </form>
          )}
        </Formik>
      </div>
    )
  }

}



export default App;

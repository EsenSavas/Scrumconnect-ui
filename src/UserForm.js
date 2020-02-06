import React from 'react';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      country:undefined,
      age: undefined,
      sex: undefined,
      countries: this.props.countries,
      isLoading : true
    };
    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this)

  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(value, name)
    this.setState({
      [name]: value
    });
  }
  ageOnChange(e){
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({value: e.target.age})
    }
 };
 handleAgeChange(evt) {
  const age = (evt.target.validity.valid) ? evt.target.value : this.state.age;
  
  this.setState({ age });
}

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
      { !this.state.isLoading &&
      <Formik>
      <form onSubmit={this.handleSubmit}>
      <label>{this.state.apiResponse}</label>
        <label>{'deneme'+this.state.countries}
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <br />
       
        <br />
        <label>
          Age:
          <input type="text" pattern="[0-9]*" onInput={this.handleAgeChange.bind(this)} value={this.state.age} />
        </label>
        <br />
        <br />
        <label>
        <input
          type="radio"
          name="sex"
          value="Female"
          onChange={this.handleChange}
        />a
      </label>
      <label>
        <input
          type="radio"
          name="sex"
          value="Male"
          onChange={this.handleChange}
        />b
      </label>
      <br />
      <br />
        <label>
          Country
          <select value={this.state.country} onChange={this.handleChange}>
            <option> choose country</option>
            {this.state.countries ? this.state.countries.map((country) => <option key={country} value={country}>{country}</option>): ''}

          </select>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      </Formik>
      }
      </div>
    );
  }
}

UserForm.propTypes ={
  countries : PropTypes.array.isRequired
}

export default UserForm;

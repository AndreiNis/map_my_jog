import React from 'react';
import { withRouter } from 'react-router-dom';
import { signup } from '../../actions/session_actions';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            day: '',
            month: '',
            year: '',
            gender: ''
            // country:
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const user = Object.assign({}, this.state);
        user.dob = new Date(user.year, user.month, user.day)
        this.props.processForm(user);
    }

    renderErrors() {
        return(
            <ul>
                {this.props.errors.map((error, i) => {
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                })}
            </ul>
        )
    }

    render() {
        console.log(this.state);

        const name = this.props.formType === "Sign up" ? (
            <div>
                <label>
                <input type="text"
                        placeholder="First name"
                        value={this.state.first_name}
                        onChange={this.update('first_name')}
                        className="signin-input" />
                </label>
                <br/>
                <label>
                <input type="text"
                        placeholder="Last name"
                        value={this.state.last_name}
                        onChange={this.update('last_name')}
                        className="signin-input" />
                </label>
            </div>
        ) : ""  
        const gender = this.props.formType === "Sign up" ? (

            <div id="gender-box">
                <label id="male">Male
                <input type="radio"
                    checked = {this.state.gender === "Male"}
                    value='Male'
                    onChange={this.update('gender')}
                    className="gender-input" />
                </label>
                
                <label id="female">Female
                <input type="radio"
                    checked={this.state.gender === "Female"}
                    value='Female'
                    onChange={this.update('gender')}
                    className="gender-input" />
                </label>
            </div>
        ) : ""
        
        const day = ["Day"];
        for (let i = 1; i <= 31; i++) { day.push(i.toString()) }
        const month = ["Month" ,"January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November", "December"];
        const year = ["Year"];
        const currYear = new Date().getFullYear();
        for (let i = 1900; i <= currYear; i++) { year.unshift(i.toString()) }

        const mapDays = day.map( (el, i) => {
            return (
                <option value={el} key={`day-${i}`}>
                    {el}
                </option>
            )
        })

        const mapMonths = month.map( (el , i) => {
            return (
                <option value={el} key={`month-${i}`}>
                    {el}
                </option>
            )
        })

        const mapYears = year.map( (el, i) => {
            return (
                <option value={el} key={`year-${i}`}>
                    {el}
                </option>
            )
        })

        const date = this.props.formType === "Sign up" ? (
            <div>
                <label id="day">
                
                    <select 
                        value={this.state.day}
                        onChange={this.update('day')}
                        className="date-input" > 
                        {mapDays}
                    </select>
                </label>

                <label id="month">
                <select 
                    value={this.state.month}
                    onChange={this.update('month')}
                    className="date-input">
                    {mapMonths}
                </select>
                </label>

                <label id="year">
                <select 
                    value={this.state.year}
                    onChange={this.update('year')}
                    className="date-input">
                    {mapYears}
                </select>    
                </label>
            </div>
        ) : ""
 
        return (
        <div className="login-form-container">
            <form onSubmit={this.handleSubmit} className="login-form-box">
                
                <br />
                    <label className="login-or-signup">{this.props.navLink}</label>
                {this.renderErrors()}
                <div className="login-form">
                    <br/>
                        {name}
                    <label>
                        <input type="text" 
                        placeholder="Email"
                        value={this.state.email} 
                        onChange={this.update('email')} 
                        className="login-input"/>
                    </label>
                    
                    <label>
                        <input type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            className="login-input" />
                    </label>
                        {date}
                        <br/>
                        <br/>
                        {gender}
                    <br/>
                    <input className="session-submit" type="submit" value={this.props.formType}/>
                </div>
            </form>
        </div>
        )
    }
}

export default withRouter(SessionForm);
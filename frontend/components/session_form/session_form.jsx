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
        this.handleDemoLogin = this.handleDemoLogin.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const user = Object.assign({}, this.state);
        user.dob = new Date(`${user.month} ${user.day}, ${user.year}`)
        this.props.processForm(user);
    }

    handleDemoLogin(e) {
        e.preventDefault();
        this.props.loginDemoUser()
            .then(() => this.props.history.replace('/routes/create'));
    }

    // className = {`error-${i}`}
    renderErrors() {
        const errorsArray = Object.values(this.props.errors);
        // console.log(errorsArray);
        const errors = errorsArray.map((value, i) => {
            return (
                <li  key={i}>
                    {value}
                </li>
            )
            })
        
        return(
            <ul>
               {errors}
            </ul>
        )
    }

    render() {
        const { errors } = this.props;
        const emailClass = errors["Email"] ? "login-input login-errors" : "login-input";
        const passwordClass = errors["Password"] ? "login-input login-errors" : "login-input";
        const firstClass = errors["First"] ? "signin-input signin-errors" : "signin-input";
        const lastClass = errors["Last"] ? "signin-input signin-errors" : "signin-input";
        const genderClass = errors["Gender"] ? "gender-input gender-errors" : "gender-input";
        const maleClass = errors["Gender"] ? "male male-errors" : "male";
        const femaleClass = errors["Gender"] ? "female female-errors" : "female";
        const dobClass = errors["Dob"] ? "date-input date-errors" : "date-input";
        
        const name = this.props.formType === "Sign up" ? (
            <div>
                <label>
                    <span className="first-span">
                        {errors["First"]}
                    </span>
                    <input type="text"
                        placeholder="First name"
                        value={this.state.first_name}
                        onChange={this.update('first_name')}
                        className={firstClass} />
                    </label>
                    <br/>
                    <label>
                    <span className="last-span">
                        {errors["Last"]}
                    </span>
                    <input type="text"
                        placeholder="Last name"
                        value={this.state.last_name}
                        onChange={this.update('last_name')}
                        className={lastClass} />
                </label>
            </div>
        ) : ""  
        const checkMark = (
            <span className="check-mark">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z" /></svg>
            </span>
        )
        const gender = this.props.formType === "Sign up" ? (

            <div id="gender-box">
                <span className="gender-span">
                    {errors["Gender"]}
                </span>
                <label className="gender-label">
                    <label className={maleClass}>Male
                    
                    <input type="radio"
                        checked = {this.state.gender === "Male"}
                        value='Male'
                        onChange={this.update('gender')}
                        className={genderClass} />
                        {this.state.gender === "Male" ? checkMark : ""}
                    </label>
                    
                    <label className={femaleClass}>Female
                    <input type="radio"
                        checked={this.state.gender === "Female"}
                        value='Female'
                        onChange={this.update('gender')}
                        className={genderClass} />
                        {this.state.gender === "Female" ? checkMark : ""}
                    </label>
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
                <span className="dob-span">
                    {errors["Dob"]}
                </span>
                <label className="dob-label">
                    <label id="day">
                        <select 
                            value={this.state.day}
                            onChange={this.update('day')}
                            className={dobClass} > 
                            {mapDays}
                        </select>
                    </label>

                    <label id="month">
                    <select 
                        value={this.state.month}
                        onChange={this.update('month')}
                        className={dobClass}>
                        {mapMonths}
                    </select>
                    </label>

                    <label id="year">
                    <select 
                        value={this.state.year}
                        onChange={this.update('year')}
                        className={dobClass}>
                        {mapYears}
                    </select>    
                    </label>
                </label>
            </div>
        ) : ""
        
        return (
        <div className="login-form-container">
            <form onSubmit={this.handleSubmit} className="login-form-box">
                
                <br />
                    <label className="login-or-signup">{this.props.navLink}</label>
                    <button className="demo-login" onClick={this.handleDemoLogin}>Demo Log In</button>
                <div className="login-form">
                    <br/>
                        {name}
                        <span className="invalid-span">
                            {errors["Invalid email "]}
                        </span>
                    <label className="email-label">
                        <span className="email-span">
                            {errors["Email"]}
                        </span>
                        <input type="text" 
                        placeholder="Email"
                        value={this.state.email} 
                        onChange={this.update('email')} 
                        className={emailClass}/>
                    </label>
                    
                    <label className="password-label">
                        <span className="password-span">
                            {errors["Password"]}
                        </span>
                        <input type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            className={passwordClass} />
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
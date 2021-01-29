import React from "react";

/*
Created by Joel Tierney
React Component to allow users to contact StuBank.
*/
export class ContactUs extends React.Component {
    /*
    Stores default values.
    */
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: ""
        }
    }

    /*
    Stores what the user inputs into the form, within React.
    */
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    /*
    Checks there are no errors from validate(), then uses the JS Fetch API to
    send a HTTP POST request containing the name, message and email. If this is
    successful, the form is reset and a success message is displayed. The user is
    redirected to the homepage.
    */
    handleSubmit(event) {
        event.preventDefault();
        this.validate();
        if (
            this.state.nameError === "" &&
            this.state.messageError === "" &&
            this.state.emailError === ""
        ) {
            fetch('http://localhost:3005/send', {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(
                (response) => (response.json())
            ).then((response) => {
                if (response.status === 'success') {
                    alert("Form Sent. Thank you for contacting us.");
                    this.resetForm()
                } else if (response.status === 'fail') {
                    alert("Form failed to send. Please try again.")
                }
            })
            this.props.history.push("/");
        }
    }

    /*
    If the user does not input a name/email/message, it outputs an error on screen.
    Also, if the email is not in the valid format, it outputs an error on screen.
    */
    validate = event => {
        let nameError = "";
        let emailError = "";
        let messageError = "";
        const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");

        if (!this.state.name) {
            nameError = "Name is required"
        }
        if (!this.state.email) {
            emailError = "Email is required"
        } else if (!(emailRegex.test(this.state.email))) {
            emailError = "Email must be valid"
        }
        if (!this.state.message) {
            messageError = "Message is required"
        }

        this.setState({nameError, emailError, messageError})
    }

    /*
    Resets the form once it has been sent successfully.
    */
    resetForm() {
        this.setState({name: "", email: "", message: ""})
    }

    render() {
        return (
            /*
            Form which takes a name, email and message and passes
            this to the handleSubmit function.
            */
            <div>
                <h1>Contact Us</h1>
                <p>Please do not hesitate to get in touch with any questions, queries or concerns you have. <br/>Before
                    you do, have you tried our FAQ?</p>
                <form action="ContactUs" id="ContactUsForm" method="post" onSubmit={e => this.handleSubmit(e)}>

                    <label htmlFor="username">Name: </label><br/>
                    <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
                    <div style={{color: "red"}}>{this.state.nameError}</div>
                    <br/>

                    <label htmlFor="password">Email: </label><br/>
                    <input type="email" id="email" name="email" value={this.state.email}
                           onChange={this.handleChange}/>
                    <div style={{color: "red"}}>{this.state.emailError}</div>
                    <br/>

                    <label htmlFor="message">Message: </label><br/>
                    <textarea id="message" name="message" rows="6" cols="18" value={this.state.message}
                              onChange={this.handleChange}/>
                    <div style={{color: "red"}}>{this.state.messageError}</div>
                    <br/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

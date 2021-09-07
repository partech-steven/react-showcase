import React, { Component } from "react";
import DynamicForm from "./dynamic/form/DynamicForm";

class ContactForm extends Component {
    /**
   * Constructor
   * 
   * @param {*} props 
   */
  constructor(props) {
        super(props);

        this.state = {
            model: [
                {
                    key: "step-one",
                    type: "step",
                    groups: [{
                        key: "techniques",
                        label: "Techiques you've worked with",
                        type: "group",
                        inputs: [
                        {
                            key: "react_js",
                            label: "ReactJS",
                            type: "checkbox",
                            value: "ReactJS"
                        },
                        {
                            key: "react_native",
                            label: "React Native",
                            type: "checkbox",
                            value: "React Native"
                        },
                        {
                            key: "dot_net",
                            label: ".NET",
                            type: "checkbox",
                            value: ".NET"
                        }]
                    }]
                    },
                    {
                    key: "step-two",
                    type: "step",
                    groups: [{
                        key: "experience",
                        label: "Years of work-experience",
                        type: "group",
                        inputs: [
                        {
                            key: "years_exp",
                            type: "radio",
                            options: [
                                {key: "two_years", value: "2", label: "Two years"},
                                {key: "two_to_four_years", value: "2-4", label: "Two to for years"},
                                {key: "four_to_six_years", value: "4-6", label: "Four to six years"},
                                {key: "six_to_eight_years", value: "6-8", label: "Six to eight years"},
                                {key: "eight_years_plus", value: "8+", label: "Over eight years"}
                            ],
                            props: {required: true}
                        }
                        ]
                    }]
                },
                {
                key: "step-three",
                type: "step",
                groups: [{
                    key: "highest_education",
                    label: "Highest Education completed",
                    type: "group",
                    inputs: [
                    {
                        key: "highest_edu",
                        type: "radio",
                        options: [
                            {key: "hbo", value: "HBO", label: "HBO"},
                            {key: "mbo", value: "MBO", label: "MBO"},
                            {key: "different", value: "different", label: "Something else...", freeInput: true}
                        ],
                        props: {required: true}
                    }
                    ]
                }]
                },
                {
                key: "step-four",
                type: "step",
                groups: [{
                    key: "basic_info",
                    label: "Basic Information",
                    type: "group",
                    inputs: [
                    {
                        key: "name",
                        label: "Name",
                        props: {
                            required: true
                        }
                    },
                    {
                        key: "email",
                        label: "Email address",
                        props: {
                            required: true,
                        pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                        }
                    }]
                }]
            }],
            submittedData: null
        }
    }

    //Function used to check for changes in the form
    formOnChange(events, state) {
        //Put code here...
    }

    //Function to do stuff when someone submits the form
    formOnSubmit(event) {
        this.setState({submittedData: event});
    }

    render() {
        return (
            <div>
                {this.state.submittedData === null ?
                    <DynamicForm 
                    className="contact__form"
                    submitText={"Send"}
                    model={this.state.model}
                    onChange={this.formOnChange.bind(this)}
                    onSubmit={this.formOnSubmit.bind(this)}
                  />
                : 
                    <div>
                        <h3>Thank you for providing us with this information!</h3>
                        <p>To recap, this is the information you provided:</p>
                        <ul>
                            {Object.keys(this.state.submittedData).map((key, i) => {
                                let value = this.state.submittedData[key];
                                if(typeof value === "string") {
                                    return(<li key={key}><strong><em>{key}: </em></strong>{value}</li>);
                                } else {
                                    return null;
                                }
                            })}
                        </ul>
                        <p>As soon as we have reviewed the data we shall contact you!</p>
                    </div>
                }
            </div>
        );
    }
};

export default ContactForm;
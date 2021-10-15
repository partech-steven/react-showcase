import React from 'react';

import Input from './fields/Input';
import Label from './fields/Label';
import Textarea from './fields/TextArea';
import Radio from './fields/Radio';
import Select from './fields/Select';
import Date from "./fields/Date";

let changed = [];

/**
 * HTML Form builder
 */
export default class DynamicForm extends React.Component {

    /**
     * Contructor
     *
     * @param props
     */
    constructor(props) {
        super(props);
        let data = {};
        if (props.defaultValues) {
            data = props.defaultValues;
        }

        this.state = {
            ...data,
            baseData: data,
            cachedProps: [],
            currentStep: 1,
            maxAllowedStep: 1
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.state.cachedProps.value) {
            this.setState({ ...prevState, cachedProps: this.props });
        }
    }

    /**
     * Submit event
     *
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state);
    }

    onKeyDown(e) {
        //13 = Enter
        if (e.keyCode === 13 && e.ctrlKey) {
            this.onSubmit(e);
        }
    }

    onClear(e) {
        let self = this;

        //Copy the existing JSON into new variables, not making references to them
        let baseValues = JSON.parse(JSON.stringify(this.state.baseData));
        let currentValues = JSON.parse(JSON.stringify(this.state));

        //Delete irrelevant keys for the comparison step
        delete currentValues.cachedProps;
        delete currentValues.baseData;

        //Set the state and then call the parent/child-callback
        this.setState({ ...baseValues }, () => (
            this.props.onClear()
        ));

        baseValues.forEach((key, val) => {
            let input = !!document.getElementById("f-" + key);
            //Purely a failsafe, just in case the element doesn't seem to exist
            if (input) {
                input.value = val;
                self.change(e, key, val);
            }
        });
    }

    /**
     * Change event
     *
     * @param evt
     * @param name
     * @param state
     */
    change(evt, name, state) {
        console.log(name, state)
        if (state.value !== this.state[name]) {
            if (!changed[name]) changed[name] = true;

            this.setState({
                [name]: state.value
            }, function () {
                let maxAllowedStep = 1;
                Object.keys(this.state).forEach((key, val) => {
                    let element = null;
                    if (document.querySelector('[name="' + key + '"]')) {
                        element = document.querySelector('[name="' + key + '"]');
                        maxAllowedStep = parseInt(element.getAttribute("belongstostep")) + 1;
                    }
                })
                this.setState({ maxAllowedStep: maxAllowedStep })
                if (this.props.onChange) this.props.onChange(evt, this.state);
            });
        }
    }

    /**
     * blur event
     *
     * @param evt
     * @param name
     * @param state
     */
    blur(evt, name, state) {
        if (changed[name] === true) {
            delete changed[name];
            if (this.props.onBlur) {
                this.props.onBlur(evt, name, this.state);
            }
        }
    }

    gotoStep(step) {
        if (step <= this.state.maxAllowedStep) {
            this.setState(
                (prevState, props) =>
                    ({ currentStep: step }),
                function () {
                    this.scrollFormContent();
                }
            )
        }
    }

    scrollFormContent() {
        let formContent = document.getElementById("form-content " + this.props.className);
        formContent.scrollTo({
            top: 0,
            left: formContent.offsetWidth * (this.state.currentStep - 1),
            behavior: "smooth"
        });
    }

    /**
     * Renders the fields
     *
     * @returns {*}
     */
    renderForm() {
        let model = this.props.model;
        let currentRenderStep = 0;

        let returnFields = model.map((m) => {
            let type = m.type || 'input';
            switch (type) {
                default:
                case 'input':
                case 'textarea':
                case 'json':
                case 'radio':
                case 'select':
                case 'label':
                    return this.renderField(m);
                case 'group':
                    if ((m.inputs && m.inputs.length > 0) || (m.rows && m.rows.length > 0)) {
                        return this.renderGroup(m);
                    }
                    break;
                case 'row':
                    if (m.inputs && m.inputs.length > 0) {
                        return this.renderRow(m);
                    }
                    break;
                case 'step':
                    if ((m.inputs && m.inputs.length > 0) || (m.rows && m.rows.length > 0) || (m.groups && m.groups.length > 0)) {
                        currentRenderStep++;
                        return this.renderStep(m, currentRenderStep);
                    }
                    break;
            }

            return null;
        });

        return returnFields;
    }

    renderGroup(m, currentRenderStep = 1) {
        let label;
        let className = m.className || "";

        if (m.addon) {
            label = <div className="static-field__label" key={"f-" + m.key} htmlFor={'f-' + m.key}>
                {m.addon}
            </div>;
        } else {
            label = m.label;
        }

        return (
            <div key={'group-' + m.key} className={this.props.className + `__group ` + (m.addon ? "input-group" : "form-group") + (className && " " + className)}>
                {label &&
                    <h4 key={'g-' + m.key} className={m.addon ? "input-group__title" : "form-group__title"}>
                        {label}
                    </h4>
                }

                {m.rows &&
                    m.rows.map((row) => {
                        return this.renderRow(row, currentRenderStep);
                    })
                }

                {m.inputs &&
                    <div className={m.addon ? "input-group__fields" : "form-group__fields"}>
                        {m.inputs.map((i) => {
                            return this.renderField(i, currentRenderStep);
                        })}
                    </div>
                }
            </div>
        );
    }

    //TODO: Expand upon setting an order for groups and rows. Maybe pass on an 'index' prop? Worries for later, I guess.
    renderStep(m, currentRenderStep) {
        let label;
        let className = m.className || "";

        if (m.addon) {
            label = <div className="static-field__label" key={"f-" + m.key} htmlFor={'f-' + m.key}>
                {m.addon}
            </div>;
        } else {
            label = m.label;
        }

        return (
            <div key={'step-' + m.key} className={this.props.className + `__step ` + (m.addon ? "input-step" : "form-step") + (className && " " + className)}>
                {label &&
                    <h4 key={'g-' + m.key} className={m.addon ? "input-step__title" : "form-step__title"}>
                        {label}
                    </h4>
                }

                {m.rows &&
                    m.rows.map((row) => {
                        return this.renderRow(row, currentRenderStep);
                    })
                }

                {m.groups &&
                    m.groups.map((group) => {
                        return this.renderGroup(group, currentRenderStep);
                    })
                }

                {m.inputs &&
                    <div className={m.addon ? "input-step__fields" : "form-step__fields"}>
                        {m.inputs.map((i) => {
                            return this.renderField(i, currentRenderStep);
                        })}
                    </div>
                }
            </div>
        );
    }

    renderRow(m, currentRenderStep = 1) {
        return (
            <div key={'form-row-' + m.key} className={"form__row form-row"}>
                {m.inputs.map((i) => {
                    return this.renderField(i, currentRenderStep);
                })}
            </div>
        )
    }

    renderField(m, currentRenderStep = 1) {
        let key = m.key;
        let type = m.type || 'input';
        let props = m.props || {};
        let name = m.name || key;
        let className = m.className || m.class || "";
        let defaultValue = (this.props.defaultValues) && this.props.defaultValues[m.key];
        let value = defaultValue || m.value || "";
        let wrapperClass = m.wrapperClass || "";
        let labelClass = m.labelClass || "";
        let info = m.info || "";
        let autocomplete = m.autocomplete || "off";
        let prefix = m.prefix || "";

        let placeholder = (props !== undefined) ? props.placeholder : "";

        let input = null;
        let label;
        let additionalStyle = {};

        if (m.label) {
            label = (
                <label className={"form-label " + labelClass} key={"f-" + key} htmlFor={'f-' + name} title={m.title} style={additionalStyle}>
                    {m.label}
                    {(m.props !== undefined && m.props.required) && <span>*</span>}
                    {info && <div className={"infobox"}>i<div className={"infobox__inner"}>{info}</div></div>}
                </label>
            );
        }

        switch (type) {
            case 'radio':
                input = <Radio props={props} key={key} name={name} options={m.options} value={value} className={className} belongstostep={currentRenderStep} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
                break;

            case 'label':
                input = <Label props={props} key={key} value={value} belongstostep={currentRenderStep} className={className} />;
                break;

            case 'select':
                input = <Select props={props} key={key} name={name} options={m.options} value={value} className={className} belongstostep={currentRenderStep} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
                break;

            case 'date':
            case 'datetime':
                input = <Date props={props} type={type} key={key} name={name} value={value} className={className} belongstostep={currentRenderStep} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
                break;

            case 'json':
            case 'textarea':
                input = <Textarea props={props} autoHeight={m.autoHeight === true} key={key} name={name} value={value} placeholder={placeholder} className={className} belongstostep={currentRenderStep} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
                break;
            default:
            case 'input':
                input = <Input props={props} type={type} key={key} name={name} value={value} placeholder={placeholder} autocomplete={autocomplete} className={className} belongstostep={currentRenderStep} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
        }

        let inputDef = (prefix)
            ? <div className="field-wrapper__wrapper"><div className="prefix">{prefix}</div>{input}</div>
            : input;

        return (
            <div key={'row-' + key} className={this.props.className + '__field-wrapper field-wrapper field-wrapper--' + name + ' ' + wrapperClass + ((props.hastinylabel) ? " tiny-label" : "")}>
                {inputDef}
                {label}
            </div>
        );
    }

    createFormDOM() {
        let submitText = this.props.submitText || "Submit";
        let canClear = (this.props.onClear ? true : false);
        let currentStep = this.state.currentStep;
        let crumbpathDom = [];

        let totalSteps = 0;
        for (let index in this.props.model) {
            let intdex = parseInt(index) + 1; //Because index is a string and we're converting it to an integer. Get it?
            let obj = this.props.model[index];
            if (obj.type === "step") {
                totalSteps++;
                crumbpathDom.push(
                    <div
                        key={intdex}
                        className={"form-crumbpath__crumb" + (currentStep > totalSteps ? " finished" : "") + (currentStep === totalSteps ? " current" : "")}
                        crumbno={intdex}
                        onClick={(e) => { intdex <= this.state.maxAllowedStep && this.gotoStep(intdex) }}>{totalSteps}</div>
                );
            }
        }

        return (
            <form id={this.props.name} className={this.props.className} onSubmit={(e) => { this.onSubmit(e) }} onKeyDown={(e) => { this.onKeyDown(e) }}>
                {(this.props.title !== "" && this.props.title !== null && this.props.title !== undefined) &&
                    <h4 className={'title ' + this.props.className + `__title`} dangerouslySetInnerHTML={{ __html: this.props.title }}></h4>
                }
                {(this.props.label !== "" && this.props.label !== null && this.props.label !== undefined) &&
                    <span className={'form-label ' + this.props.className + `__form-label`} dangerouslySetInnerHTML={{ __html: this.props.label }}></span>
                }
                {(this.props.errors && this.props.errors.length) > 0 &&
                    <ul className={"form-errors"}> {
                        this.props.errors.map((error) => {
                            return <li key={error}>{error}</li>
                        })
                    }
                    </ul>
                }
                <div className="form-container">
                    {totalSteps > 0 &&
                        <div className={"form-crumbpath"}>
                            {crumbpathDom}
                        </div>
                    }
                    <div id={"form-content " + this.props.className} className={"form-content " + this.props.className}>
                        {this.renderForm()}
                    </div>
                </div>
                <div className={`form-actions form-actions--` + this.props.className}>
                    {currentStep > 1 &&
                        <div
                            className="form-action-button form-action-button--previous"
                            onClick={(e) => this.gotoStep(currentStep - 1)}>
                            Previous
                        </div>
                    }
                    {currentStep < totalSteps &&
                        <div
                            className={"form-action-button form-action-button--next"}
                            onClick={(e) => this.gotoStep(currentStep + 1)}>
                            Next
                        </div>
                    }
                    {((this.props.canSubmit || this.props.canSubmit === undefined) && (currentStep === totalSteps || totalSteps === 0)) &&
                        <button type="submit" id="form-submit-btn">{submitText}</button>
                    }
                    {(canClear) && <div className="form-special-actions__clear" onClick={(e) => { this.onClear(e); }}>Reset form</div>}
                </div>
            </form>
        );
    }

    /**
     * Renders the form
     * @returns {*}
     */
    render() {
        let formDOM = this.createFormDOM();

        if (!this.props.hidden) {
            return formDOM;
        } else {
            return null;
        }
    }
}

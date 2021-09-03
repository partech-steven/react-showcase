import React from 'react';

import Input from './Fields/Input';
import Label from './Fields/Label';
import Textarea from './Fields/TextArea';
import Radio from './Fields/Radio';
import Select from './Fields/Select';
import Date from "./Fields/Date";
import List from "./Fields/List";
import $ from 'jquery';
import ImageField from './Fields/ImageField';

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
            cachedProps: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.value !== this.state.cachedProps.value) {
            this.setState({...prevState, cachedProps: this.props});
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
        if(e.keyCode === 13 && e.ctrlKey) {
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
        this.setState({...baseValues}, () => (
            this.props.onClear()
        ));

        $.each(baseValues, function(key, val) {
            let input = $("#f-"+key);
            if($(input).length) {
                $(input).val(val);
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
    change(evt, name, state)
    {
        if (state.value !== this.state[name])
        {
            if (!changed[name]) changed[name] = true;

            this.setState({
                [name]: state.value
            }, function()
            {
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
    blur(evt, name, state)
    {
        if (changed[name] === true)
        {
            delete changed[name];
            if (this.props.onBlur)
            {
                this.props.onBlur(evt, name, this.state);
            }
        }
    }

    /**
     * Renders the fields
     *
     * @returns {*}
     */
    renderForm() {
        let model = this.props.model;
        let returnFields = {};

        let fields = model.map((m) => {
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
                    if ((m.inputs && m.inputs.length > 0) || (m.rows && m.rows.length > 0))
                    {
                        return this.renderGroup(m);
                    }
                    break;
                case 'row':
                    if (m.inputs && m.inputs.length > 0)
                    {
                        return this.renderRow(m);
                    }
                    break;
                case 'step':
                    if (m.inputs && m.inputs.length > 0)
                    {
                        return this.renderStep(m);
                    }
                    break;
            }

            return null;
        });

        return returnFields;
    }

    renderGroup(m)
    {
        let label;
        let rows = [];
        let className = m.className || "";
        let self = this;

        if (m.addon) {
            label = <div className="static-field__label" key={"f-" + m.key} htmlFor={'f-' + m.key}>
                {m.addon}
            </div>;
        } else {
            label = m.label;
        }

        if(m.rows && m.rows.length > 0) {
            $.each(m.rows, function(i, row) {
                if(row.inputs && row.inputs.length > 0) {
                    rows.push(self.renderRow(row));
                }
            })
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
                        return this.renderRow(row);
                    })
                }

                {m.inputs &&
                    <div className={m.addon ? "input-group__fields" : "form-group__fields"}>
                        {m.inputs.map((i) => {
                            return this.renderField(i);
                        })}
                    </div>
                }
            </div>
        );
    }

    //Under construction. 1:1 renderGroup() now
    renderStep(m)
    {
        let label;
        let rows = [];
        let className = m.className || "";
        let self = this;

        if (m.addon) {
            label = <div className="static-field__label" key={"f-" + m.key} htmlFor={'f-' + m.key}>
                {m.addon}
            </div>;
        } else {
            label = m.label;
        }

        if(m.rows && m.rows.length > 0) {
            $.each(m.rows, function(i, row) {
                if(row.inputs && row.inputs.length > 0) {
                    rows.push(self.renderRow(row));
                }
            })
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
                        return this.renderRow(row);
                    })
                }

                {m.inputs &&
                    <div className={m.addon ? "input-group__fields" : "form-group__fields"}>
                        {m.inputs.map((i) => {
                            return this.renderField(i);
                        })}
                    </div>
                }
            </div>
        );
    }

    renderRow(m) {
        return (
            <div key={'form-row-' + m.key} className={"form__row form-row"}>
                {m.inputs.map((i) => {
                    return this.renderField(i);
                })}
            </div>
        )
    }

    renderField(m)
    {
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

        let placeholder = (props !== undefined) ? props.placeholder : "";

        let input = null;
        let label;
        let additionalStyle = {};

        if(type === "image") {
            additionalStyle = {width: m.props.width, height: m.props.height, backgroundImage: "url(" + m.props.backgroundimage + ")"};
        }

        if(m.label) {
            label = (
                <label className={"form-label " + labelClass} key={"f-" + key} htmlFor={'f-' + name} title={m.title}  style={additionalStyle}>
                    {type !== "image" && m.label}
                    {(m.props !== undefined && m.props.required) && <span>*</span>}
                    {info && <div className={"infobox"}>i<div className={"infobox__inner"}>{info}</div></div>}
                </label>
            );
        }

        switch (type) {
            case 'radio':
                input = <Radio props={props} key={key} name={name} options={m.options} value={value} className={className} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
                break;

            case 'label':
                input = <Label props={props} key={key} value={value}  className={className} />;
                break;

            case 'select':
                input = <Select props={props} key={key} name={name} options={m.options} value={value} className={className} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
                break;

            case 'date':
            case 'datetime':
                input = <Date props={props} type={type} key={key} name={name} value={value} className={className} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
                break;

            case 'json':
            case 'textarea':
                input = <Textarea props={props} autoHeight={m.autoHeight === true} key={key} name={name} value={value} placeholder={placeholder} className={className} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
                break;

            case 'image':
                input = <ImageField props={props} type={type} key={key} name={name} value={value} placeholder={placeholder} autocomplete={autocomplete} className={className} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
                break;

            case 'list':
                input = <List props={props} type={type} key={key} name={name} value={value} className={className} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
                break;

            default:
            case 'input':
                input = <Input props={props} type={type} key={key} name={name} value={value} placeholder={placeholder} autocomplete={autocomplete} className={className} change={this.change.bind(this)} onBlur={this.blur.bind(this)} />;
        }

        return (
            <div key={'row-' + key} className={this.props.className + '__field-wrapper field-wrapper field-wrapper--' + name + ' ' + wrapperClass + ((props.hastinylabel) ? " tiny-label" : "")}>
                {input}
                {label}
            </div>
        );
    }

    createFormDOM() {
        let submitText = this.props.submitText || "Submit";
        let canClear = (this.props.onClear ? true : false);
        
        return (
            <form id={this.props.name} className={this.props.className} onSubmit={(e) => {this.onSubmit(e)}} onKeyDown={(e) => {this.onKeyDown(e)}}>
                {(this.props.title !== "" && this.props.title !== null && this.props.title !== undefined) &&
                    <h4 className={'title ' + this.props.className + `__title`} dangerouslySetInnerHTML={{__html: this.props.title}}></h4>
                }
                {(this.props.label !== "" && this.props.label !== null && this.props.label !== undefined) &&
                    <span className={'form-label ' + this.props.className + `__form-label`} dangerouslySetInnerHTML={{__html: this.props.label}}></span>
                }
                {(this.props.errors && this.props.errors.length) > 0 &&
                    <ul className={"form-errors"}> {
                        this.props.errors.map((error) => {
                            return <li key={error}>{error}</li>
                        })
                    }
                    </ul>
                }
                {this.renderForm()}
                {(this.props.canSubmit || this.props.canSubmit === undefined) &&
                    <div className={`form-actions form-actions--` + this.props.className}>
                        <button type="submit" id="form-submit-btn">{submitText}</button>
                        {(canClear) && <div className="form-special-actions__clear" onClick={(e) => {this.onClear(e);}}>Reset form</div> }
                    </div>
                }
            </form>
        );
    }

    /**
     * Renders the form
     * @returns {*}
     */
    render() {
        let formDOM = this.createFormDOM();

        if(!this.props.hidden) {
            return formDOM;
        } else {
            return null;
        }
    }
}

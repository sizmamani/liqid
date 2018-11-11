import React from 'react'
import './index.scss'


const DynamicForm = ({
    dynamicInfo,
    step,
    updateStep,
    updateInputData,
    updateCheckboxData,
    history
}) => {
    let status
    const progressValue = (100 / dynamicInfo.length) * (step)
    const styles = {
        progressBar: {
            width: `${progressValue}%`
        }
    }
    const handleUpdateStep = (value) => {
        history.push(`/${step + value}`)
        updateStep(step + value)
    }
    const validateForm = (obj) => {
        status = (obj.value && obj.value.length && true) || false
        return status
    }
    const renderFormBody = (obj) => {
        const options = []
        switch (obj.type) {
            case "text":
                return (
                    <input
                        type="text"
                        value={obj.value || ""}
                        onChange={(ev) => updateInputData({
                            key: obj._id,
                            value: ev.target.value
                        })}
                    />
                )
            case "number":
                return (
                    <input
                        type="number"
                        value={obj.value}
                        onChange={(ev) => updateInputData({
                            key: obj._id,
                            value: ev.target.value
                        })}
                    />
                )
            case "radio":
                obj.values.map((r, i) => {
                    options.push(
                        <span key={r.key}>
                            {r.text}
                            <input
                                name="genderGroup"
                                checked={r.key === obj.value}
                                type="radio"
                                onChange={() => {
                                    updateInputData({
                                        key: obj._id,
                                        value: r.key
                                    })
                                }}
                            />
                        </span>

                    )
                })
                return [
                    options
                ]
            case "checkbox":
                obj.values.map((r, i) => {
                    options.push(
                        <span key={r.key}>
                            {r.text}
                            <input
                                type="checkbox"
                                key={r.key}
                                value={r.text}
                                onChange={(v) => {
                                    updateCheckboxData({
                                        key: obj._id,
                                        value: r.key
                                    })
                                }}
                                checked={obj.value && obj.value.find(o => o === r.key) || false}
                            />
                        </span>
                    )
                })
                return [
                    options
                ]
            case "select":
                return (
                    <select
                        onChange={(ev) => {
                            updateInputData({
                                key: obj._id,
                                value: ev.target.value
                            })
                        }}
                        value={obj.value || "select"}>
                        {obj && obj.values.map((o, i) => {
                            return (
                                <option
                                    key={i}
                                    value={o.key}
                                >
                                    {o.text}
                                </option>
                            )
                        })}
                    </select>
                )
            default:
                break
        }
    }
    
    return (
        <div className="container">
            <div className="wrapper">
                <div className="progress light-grey">
                    <div className="grey bar" style={styles.progressBar}>{(progressValue > 0) ? `${progressValue}%` : ''}</div>
                </div>
                {
                    dynamicInfo && (dynamicInfo.length > 0 && step < dynamicInfo.length) && 
                    <div className="form-row">
                        <label htmlFor="name">{dynamicInfo[step] && dynamicInfo[step].title}</label>
                        { (step  < dynamicInfo.length) ? renderFormBody(dynamicInfo[step]) : null}
                        {
                            dynamicInfo[step] && dynamicInfo[step].validation && dynamicInfo[step].validation.map((v, i) => {
                                if (v.show) {
                                    return (
                                        <div
                                            key={i}
                                            className="red text-left"
                                        >
                                            {v.show && v.message}
                                        </div>
                                    )
                                }

                            })
                        }
                    </div>
                }
                {
                    dynamicInfo && (dynamicInfo.length > 0 && step === dynamicInfo.length) &&
                    <div className="form-row">Results</div>
                }
                <div className="button-row">
                    {step > 0 &&
                        <input
                            className="pull-left"
                            value="Back"
                            type="button"
                            onClick={() => handleUpdateStep(-1)} />
                    }
                    {step < dynamicInfo.length &&
                    <input
                        className="pull-right"
                        type="button"
                        disabled={!validateForm(dynamicInfo[step])}
                        value={(step + 1 === dynamicInfo.length) ? 'Submit' : 'Next'}
                        onClick={() => handleUpdateStep(1)} />
                    }
                </div>
            </div>
        </div>
    )
}

export default DynamicForm
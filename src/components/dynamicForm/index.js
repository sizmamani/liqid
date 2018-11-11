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

    const getSummary = (element, index) => {
        const { type, value, values, title } = element
        var q, a //QUESTION && ANSWER
        if (type === 'text' || type === 'number') {
            q = title
            a = value
        }
        if (type === 'radio' || type === 'select') {
            q = title
            a = values.find(o => o.key === value).text
        }
        if (type === 'checkbox') {
            a = ""
            value && value.forEach(v => {
                a += `${a !== "" ? "," : ""} ${values.find(o => o.key === v).text}`
            })
            q = title
        }
        return (
            <div className="form-row">
                <span className="bold">
                    {q}
                </span>
                <span>
                    {a}
                </span>
            </div>
        )
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
                    return r
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
                                checked={(obj.value && obj.value.find(o => o === r.key)) || false}
                            />
                        </span>
                    )
                    return r
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
                break;
        }
    }

    return (
        <div className="container">
            <div className="wrapper">

                {/* PROGRESS BAR */}
                <div className="progress light-grey">
                    <div className="grey bar" style={styles.progressBar}>{(progressValue > 0) ? `${progressValue}%` : ''}</div>
                </div>
                {/* PROGRESS BAR */}

                {/* FORM BODY */}
                {
                    dynamicInfo && (dynamicInfo.length > 0 && step < dynamicInfo.length) &&
                    <div className="form-row margin-top-100">
                        <label htmlFor="name">{dynamicInfo[step] && dynamicInfo[step].title}</label>
                        {(step < dynamicInfo.length) ? renderFormBody(dynamicInfo[step]) : null}
                    </div>
                }
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
                        return v    
                    })
                }
                {/* FORM BODY */}


                {/* SUMMARY */}
                {
                    dynamicInfo && (dynamicInfo.length > 0 && step === dynamicInfo.length) &&
                    <section>
                        {
                            dynamicInfo.map((element, i) => {
                                return (getSummary(element, i))
                            })
                        }
                    </section>
                }
                {/* SUMMARY */}

                {/* BUTTON ROW */}
                <div className="button-row">
                    {
                        step > 0 &&
                        <input
                            className="pull-left"
                            value="Back"
                            type="button"
                            onClick={() => handleUpdateStep(-1)} />
                    }
                    {
                        step < dynamicInfo.length &&
                        <input
                            className="pull-right"
                            type="button"
                            disabled={!validateForm(dynamicInfo[step])}
                            value={(step + 1 === dynamicInfo.length) ? 'Submit' : 'Next'}
                            onClick={() => handleUpdateStep(1)} />
                    }
                </div>
                {/* BUTTON ROW */}

            </div>
        </div>
    )
}

export default DynamicForm;
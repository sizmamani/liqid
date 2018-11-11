import React from 'react'
import DynamicForm from '../../../../components/dynamicForm'

const HomeComponent = ({
    dynamicInfo,
    step,
    updateStep,
    updateInputData,
    updateCheckboxData,
    history
}) => {
    return (
        <DynamicForm 
            dynamicInfo={dynamicInfo}
            step={step}
            updateStep={updateStep}
            history={history}
            updateInputData={updateInputData}
            updateCheckboxData={updateCheckboxData}
        />
    )
}
export default HomeComponent
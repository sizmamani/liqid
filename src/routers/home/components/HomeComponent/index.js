import React from 'react'
import './index.scss'
const HomeComponent = ({

}) => {
    return (
        <div className="container">
            <div className="wrapper">
                <div className="progress light-grey">
                    <div className="grey" style={{width:'50%'}}>50%</div>
                </div>
                <div className="form-row">
                    <label for="name">Name</label>
                    <input type="text" id="name" />
                </div>
                <div className="button-row">
                    <button className="pull-right" type="submit">Submit</button>
                    <button className="pull-left" type="submit">Submit</button>
                </div>
            </div>
        </div>
    )
}
export default HomeComponent
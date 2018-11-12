import React, { Component } from 'react';
import HomeComponent from '../components/HomeComponent'

export default class HomeContainer extends Component {
  componentWillMount(){
    this.props.fetchData()
    // BROWSER BACK/FORWARD 
    this.props.history.listen((location, action) => {
        if (action === 'POP') {
          const stepInHistory = location.pathname && location.pathname.split("/")
          if (stepInHistory && stepInHistory.length > 1 && Number(stepInHistory[1]) < this.props.dynamicInfo.length) {
            this.props.updateStep(Number(stepInHistory[1]))
          }
        }
    });
  }

  componentWillReceiveProps(props){
    // CHECK IF STEP IS VALID
    if ((props.step && props.dynamicInfo) && (props.step > props.dynamicInfo.length)) {
      props.updateStep(0)
      props.history.push(`/`)
    }
  }

  render() {
    return (
      <HomeComponent {...this.props}/>
    );
  }
}

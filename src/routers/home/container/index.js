import React, { Component } from 'react';
import HomeComponent from '../components/HomeComponent'

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount(){
    this.props.fetchData()
    this.props.history.listen((location, action) => {
        if (action === 'POP') {
          const stepInHistory = location.pathname && location.pathname.split("/")
          if (stepInHistory && stepInHistory.length > 1 && Number(stepInHistory[1]) < this.props.dynamicInfo.length) {
            this.props.updateStep(Number(stepInHistory[1]))
          }
        }
    });
  }
  render() {
    return (
      <HomeComponent {...this.props}/>
    );
  }
}

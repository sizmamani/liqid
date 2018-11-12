import { connect } from 'react-redux'
import { fetchData, updateStep, updateInputData, updateCheckboxData } from './module/home'
import HomeContainer from './container'


function mapStateToProps(state) {
  return {
    dynamicInfo: state && state.home && state.home.dynamicInfo,
    step: state && state.home && state.home.step
  }
}

const mapDispatchToProps = {
    fetchData,
    updateStep,
    updateInputData,
    updateCheckboxData,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)


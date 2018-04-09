import React from 'react'
import { ErrorComponent } from './ErrorComponent'
import { Measures } from './Measures'
//import { Buttons } from './Buttons'
// These fields are evaluated in the inspectedWindow to get information about measures.
let queries = {
  measuresLength: 'JSON.stringify(__REACT_PERF_DEVTOOL_GLOBAL_STORE__.length)',
  rawMeasures: 'JSON.stringify(__REACT_PERF_DEVTOOL_GLOBAL_STORE__.rawMeasures)',
  workLoopMeasures: '__REACT_FIBERLINE_GLOBAL_HOOK__.toJSON()',

  clear: `__REACT_PERF_DEVTOOL_GLOBAL_STORE__ = {
          length: 0,
          measures: [],
          rawMeasures: [],
        }`
}

// const divStyle = {
//   paddingLeft: "400px",
//   width: "600px"
// };

export class ReactPerfDevtool extends React.Component {
  timer = null
  evaluate = chrome.devtools.inspectedWindow.eval

  constructor(props) {
    super(props)
    this.state = {
      rawMeasures: [], 
      workLoopMeasures: [],

      loading: false, 
      hasError: false 
    }
  }

  componentWillMount() {
      this.reloadInspectedWindow()
  }

  componentDidMount() {
    this.setState({ loading: true })
    setTimeout(() => {
      this.getMeasures();
      this.getWorkLoopMeasures();

    }, 3500)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  reloadInspectedWindow = () => chrome.devtools.inspectedWindow.reload()

  setErrorState = () => this.setState({ hasError: true, loading: false })

  getMeasures = () => {
    this.evaluate(queries['rawMeasures'], (measures, err) => {
      if (err) {
        this.setErrorState()
        return
      }

      this.setState({
        loading: false,
        rawMeasures: JSON.parse(measures)
      })
    })
  }


  getWorkLoopMeasures = () => {
    this.evaluate(queries['workLoopMeasures'], (measures, err) => {
      if (err) {
        this.setErrorState()
        return
      }
      
      this.setState({
        loading: false,
        workLoopMeasures: JSON.parse(measures)
      })
    })
  }

  clearMeasures = () => this.evaluate(queries['clear'])

  clear = () => {
    this.setState({
      rawMeasures: []
    })
    this.clearMeasures()
  }

  browserReload = () =>
    typeof window !== undefined ? window.location.reload() : null

  // Reload.
  reload = () => {
    this.clear()
    this.browserReload()

    // This avoids a flash when the inspected window is reloaded.
    this.setState({ loading: true })

    this.reloadInspectedWindow()
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <p> Collecting Data... </p>
        </div>
      )
    }

    return (

      <div 
        style={{"height":"800px", width:"1040px"}}
        >

        {this.state.hasError ? (
          <ErrorComponent />
        ) : (
          <React.Fragment>

            <Measures 
              workLoopMeasures={this.state.workLoopMeasures}
              rawMeasures={this.state.rawMeasures} 
              reload={this.reload}
              getWorkLoopMeasures={this.getWorkLoopMeasures} 
              maxPoints={350}
            />

          </React.Fragment>
        )}
      </div>
    )
  }
}


import React from 'react'
import { ErrorComponent } from './ErrorComponent'
import { Measures } from './Measures'
import { Buttons } from './Buttons'

// These fields are evaluated in the inspectedWindow to get information about measures.
let queries = {
  measuresLength: 'JSON.stringify(__REACT_PERF_DEVTOOL_GLOBAL_STORE__.length)',
  rawMeasures:
    'JSON.stringify(__REACT_PERF_DEVTOOL_GLOBAL_STORE__.rawMeasures)',
  updateQueues: 'JSON.stringify(__REACT_DEVTOOLS_GLOBAL_HOOK__.updateQueues)',
  //updateQueueTimes: 'JSON.stringify(__REACT_DEVTOOLS_GLOBAL_HOOK__.updateQueueTimes)',
  clear: `__REACT_PERF_DEVTOOL_GLOBAL_STORE__ = {
          length: 0,
          measures: [],
          rawMeasures: [],
        }`
}

export class ReactPerfDevtool extends React.Component {
  timer = null
  evaluate = chrome.devtools.inspectedWindow.eval

  constructor(props) {
    super(props)
    this.state = {
      rawMeasures: [], 
      updateQueues: [],
      loading: false, 
      hasError: false 
    }
  }

  componentWillMount() {
      this.reloadInspectedWindow()
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.timer = setInterval(() => {
      this.getMeasures();
      this.getUpdateQueues();
    }, 2000)
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

  getUpdateQueues = () => {
    this.evaluate(queries['updateQueues'], (measures, err) => {
      if (err) {
        this.setErrorState()
        return
      }

      this.setState({
        loading: false,
        updateQueues: JSON.parse(measures)
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
          <p> Collecting React performance measures... </p>
        </div>
      )
    }

    return (
      <div>
        <div style={{ display: 'inlineBlock' }}>
          <Buttons  clear={this.clear} reload={this.reload} />
          
        </div>
        {this.state.hasError ? (
          <ErrorComponent />
        ) : (
          <React.Fragment>
            <Measures updateQueues={this.state.updateQueues} 
            rawMeasures={this.state.rawMeasures} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

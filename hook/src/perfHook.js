const registerObserver = (params, callback) => {

  if (window.PerformanceObserver) {

    let observer = new window.PerformanceObserver(list => {

      if (!window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__){
        window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__ = {
          length: list.getEntries().length,
          rawMeasures: [],
          queue: []
        }
      }

      window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__.
      rawMeasures = window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__.
      rawMeasures.concat(list.getEntries())
    })

    observer.observe({
      entryTypes: ['measure']
    })
  }
}

export { registerObserver }

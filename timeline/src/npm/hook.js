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

      //console.log(window.__REACT_PERF_DEVTOOL_GLOBAL_STORE__)

      // if (callback && typeof callback === 'function') {
      //   callback(measures)
      // }  
    })

    observer.observe({
      entryTypes: ['measure']
    })
  }
}

export { registerObserver }

import {Decimal} from 'decimal.js';

let dataCache = []


export default function formatFiberlineData(data){
  console.log('formatter', data)
  // data = data[0]
  const keys = Object.keys(data);
  const result = [];

  for (let i = dataCache.length; i < keys.length; i++){
    for (let j = 0; j < data[keys[i]].length-1; j++){

      const datum = { 
        x0: data[keys[i]][j].time/1000, 
        x: data[keys[i]][j+1].time/1000,
        name: data[keys[i]][j].evt,
        label: data[keys[i]][j].evt,

        y: keys[i],
        // color: getColor(data[keys[i]][j].eventName)
      };

      result.push(datum)
    }
    
  }
  console.log('datum=', result)
  dataCache = dataCache.concat(result)
  return dataCache;

}

// function getColor(eventName){
//   switch(tag) {
//         case 'bailedOutOnFinishedWork':
//             return 'red';
//         case 1:
//             return 'Functional Component';
//         case 2:
//             return 'Class Component';
//         case 3:
//             return 'Host Root';
//         case 4:
//             return 'Host Portal';
//         case 5:
//             return 'Host Component';
//         case 6:
//             return 'Host Text';
//         case 7:
//             return 'Call Component';
//         case 8:
//             return 'Call Handler Phase';
//         case 9:
//             return 'Return Component';
//         case 10:
//             return 'Fragment';
//         case 11:
//             return 'Mode';
//         case 12:
//             return 'Context Consumer';
//         case 13:
//             return 'Context Provider';
//         case 14:
//             return 'Loading Component';
//         case 15:
//             return 'Timeout Component';
//         default:
//             return 'unknown';
//     }
// }
// export default function formatFiberlineData(data) {

//   let stack = [0]
//   let startTime;
//   let duration;
//   let lastEndTime;
//   let result = []
//   const keys = Object.keys(data);

//   for (let i = dataCache.length; i < keys.length; i++) {

//     if (i < keys.length-1 && 
//       data[keys[i]].workStarted[0].time === data[keys[i+1]].workStarted[0].time && 
//       data[keys[i]].workCompleted[0].time === data[keys[i+1]].workCompleted[0].time){

//       let temp = data[keys[i]];
//       data[keys[i]] = data[keys[i+1]];
//       data[keys[i+1]] = temp;
//     }

//     let datum = { 
//       x0: data[keys[i]].workStarted[0].time/1000, 
//       x: data[keys[i]].workCompleted[0].time/1000,
//       name: data[keys[i]].workStarted[0].tag
//     };

//     datum["color"] = Math.random()*.1;

//     while (data[keys[i]].workStarted[0].time >= stack[stack.length-1] && stack.length >= 0){
//       stack.pop();
//     }
  
//     datum["y"] = -stack.length-1;
//     result.push(datum);
//     startTime = new Decimal(data[keys[i]].workStarted[0].time)
//     duration = new Decimal(data[keys[i]].workCompleted[0].time - data[keys[i]].workStarted[0].time)
//     lastEndTime = startTime.plus(duration);
//     stack.push(lastEndTime)

//   }
//   dataCache = dataCache.concat(result)
//   return dataCache;
// };
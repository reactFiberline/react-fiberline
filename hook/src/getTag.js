
function getTag(tag) {
  switch(tag) {
      case 0:
          return 'Indeterminate Component';
      case 1:
          return 'Functional Component';
      case 2:
          return 'Class Component';
      case 3:
          return 'Host Root';
      case 4:
          return 'Host Portal';
      case 5:
          return 'Host Component';
      case 6:
          return 'Host Text';
      case 7:
          return 'Call Component';
      case 8:
          return 'Call Handler Phase';
      case 9:
          return 'Return Component';
      case 10:
          return 'Fragment';
      case 11:
          return 'Mode';
      case 12:
          return 'Context Consumer';
      case 13:
          return 'Context Provider';
      case 14:
          return 'Loading Component';
      case 15:
          return 'Timeout Component';
      default:
          return 'unknown';
  }
}

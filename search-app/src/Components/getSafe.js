function getSafe(props) {
    try {
      return props.request();
    } catch (e) {
      return undefined;
    }
  }
  
  export default getSafe;
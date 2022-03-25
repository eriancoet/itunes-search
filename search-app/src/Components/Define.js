function getSafe(props) {
    try {
      return props.request();
    } catch (e) {
      return undefined;
    }
  }
  
  // Export component to be used in other files
  export default getSafe;
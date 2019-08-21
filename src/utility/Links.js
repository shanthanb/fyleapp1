const home = () =>{
    return `/`
  }
  const bankDetails = (id) =>{
    return `bank/${id}`
  }
  const staticLink = staticLink => {
    return `/${staticLink}`;
  };
  
  export default {
    home,
    staticLink,
    bankDetails
  };
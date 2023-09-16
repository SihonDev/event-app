const style = () => ({
    container: {
      paddingTop: 10,
      display: 'flex',
      justifyContent: 'center',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      margin: 5,
      padding: 5,
    },
    fileInput: {
      width: '97%',
      margin: '10px 0',
    },
    buttonSubmit: {
      marginBottom: 10,
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: 300,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      border: 'none',
    }
  });
  
  export default style
const formatDate = (date_value: Date): string => {
  var dateObj = new Date(date_value); 
      var dataformtada = dateObj.toLocaleDateString('pt-BR');
    
  return dataformtada;
      

}

export default formatDate; 
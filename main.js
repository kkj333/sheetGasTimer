function main() {
    var array = getScript();
    
    function getScript(){
      var scriptProperties = PropertiesService.getScriptProperties();
      var data = scriptProperties.getProperties();
      var array = [];
      for (var key in data) {
        if(!(Number.isNaN(Number(key)))){
          array.push(data[key].split(','));
        }
      }
      return array
    }
  }
  
  
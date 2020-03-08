function setTriger(){
    var start_row = 1
    var record = getRecord("test", start_row)
    var dict = makeDict(record)
    for(var i=0; i<dict.length; i++){
      if(isAlertDay(dict[i]["week"])){
        setTime(dict[i]["time"])
        var array = [dict[i]['sheet_name'],dict[i]['comment']]
        PropertiesService.getScriptProperties().setProperty(i, array.join(','));
      }
    }
    
    function setTime(times){
      for(key in times){
        switch (times[key]) {
          case 1:
            register("09", "00")
            break;
          case 2:
            register("12", "00")
            break;
          case 3:
            register("23", "00")
            break;
          default:
            Logger.log("not setTime")
        }
      }
      
      function register(hour, min){
        var triggerDay = new Date();
        triggerDay.setHours(hour);
        triggerDay.setMinutes(min);
        ScriptApp.newTrigger("main").timeBased().at(triggerDay).create();
        Logger.log("timerがセットされました" + triggerDay)
      }
    }
    
    function isAlertDay(weeks){
      var date = new Date();
      var day_of_week = date.getDay();
      for(key in weeks){
        if(day_of_week == weeks[key]) return true
          }
      return false
    }
    
    function makeDict(record){
      var arr = []
      for(var i = 1; i < record.length; i++){
        var dict = {}
        dict['sheet_name'] = record[i][0]
        dict['week'] = getTimer(record[i], 1, 6)
        dict['time'] = getTimer(record[i], 8, 10)
        dict['comment'] = record[i][11]
        arr.push(dict)
      }
      return arr
      
      function getTimer(arr, start, end){
        var getTime = [];
        var offset = start -1
        for(var i=start; i<=end; i++){
          if(arr[i]=="○"){
            getTime.push(i-offset)
          }
        }
        return getTime
      }
    }
  
    function getRecord(sheet_name, start) {
      var record = []
      var ss = SpreadsheetApp.getActiveSpreadsheet()
      var sheet = ss.getSheetByName(sheet_name)
      var last_row = sheet.getLastRow()
      var last_col = sheet.getLastColumn()
      for(var row = start; row <= last_row; row++){
        var array = []
        for(var col = 1; col <= last_col; col++){
          array.push(sheet.getRange(row, col).getValue())
        }
        record.push(array)
      }
      return record
    }
  }
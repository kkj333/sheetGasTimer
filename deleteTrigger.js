// 毎日18時に動いてメイントリガーが存在すれば削除する
function deleteTrigger() {
    var triggers = ScriptApp.getProjectTriggers();
    for(var i=0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() == "main") {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
  }
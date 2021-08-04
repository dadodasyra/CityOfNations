function execute()
{
  var response = UrlFetchApp.fetch("", {muteHttpExceptions: true}); //Link removed to avoid ddos the CoN server
  var resparr = JSON.parse(response.getContentText());
  if(!resparr["online"]){
    var towrite = "offline"
    write(towrite);
  } else {
    write(resparr["players"]["online"]);
  }

  updateGraphs();
}

function write(towrite)
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  var lastrow = sheet.getLastRow() + 1;
  sheet.getRange(lastrow, 1).setValue([Utilities.formatDate(new Date(), "GMT+2", "dd/MM HH:mm")]);
  sheet.getRange(lastrow, 2).setValue([towrite]);
}

function updateGraphs()
{
  var sheetdata = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Graphs');
  var lastrow = sheetdata.getLastRow();
  var corresponds = {
    "10 dernières minutes": 10,
    "Dernière heure": 60,
    "12 dernières heures": 720,
    "24 dernières heures": 1444};

  sheet.getCharts().forEach(chart => {
    var name = chart.getOptions().get("title");
    console.log(name)
    if(corresponds[name] !== undefined) {
      var correspond = corresponds[name];
      var oldrow = lastrow - correspond;
      if(oldrow < 1) oldrow = 1;
      console.log("A"+oldrow+":B"+lastrow)
      var range = sheetdata.getRange("A"+oldrow+":B"+lastrow)
      chart = chart.modify()
        .clearRanges()
        .addRange(range)
        .build();
      sheet.updateChart(chart);
    }

  })
}

function sleep(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}

function timeplayed()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Time Played');
  var response = UrlFetchApp.fetch("", {muteHttpExceptions: true}); //Link removed to avoid DDOS of CoN server 
  var resparr = JSON.parse(response.getContentText());
  if(!resparr["ok"]) return;

  var teams = { "aypierre": "FRANCE", "Bichard": "FRANCE", "Frigiel": "FRANCE", "Fukano": "FRANCE", "FuzeIII": "FRANCE", "Guep": "FRANCE", "JimmyB0yyy": "FRANCE", "Lapin": "FRANCE", "luccio": "FRANCE", "Magicknup": "FRANCE", "MathoX": "FRANCE", "nemenems": "FRANCE", "Niimbus_": "FRANCE", "ninjaxxu": "FRANCE", "Nino_mssclick": "FRANCE", "RedToxx_": "FRANCE", "Soulravenn": "FRANCE", "Thatdanmgirll": "FRANCE", "TheGuill84": "FRANCE", "Tityy": "FRANCE", "xLuccio": "FRANCE", "Carpyy": "ITALIA", "Dere_X": "ITALIA", "Dissociatore": "ITALIA", "Djovanni": "ITALIA", "Francy1998": "ITALIA", "GiankoExtreme": "ITALIA", "Giiacomo": "ITALIA", "GuerraReturns": "ITALIA", "Iskandert": "ITALIA", "Mark3s": "ITALIA", "MICHA3L_tv": "ITALIA", "MrDominator": "ITALIA", "Napo7700": "ITALIA", "NoLifeGabbo": "ITALIA", "nonsonolink": "ITALIA", "NovaXCIV": "ITALIA", "Tech4Play": "ITALIA", "Triton707": "ITALIA", "UltimateITA": "ITALIA", "xAlphaReturns": "ITALIA","Aurigas": "ESPAÑA", "aXoZer": "ESPAÑA", "BarcaGamer": "ESPAÑA", "Bobicraft": "ESPAÑA", "cibergun": "ESPAÑA", "Conterstine": "ESPAÑA", "Crisgreen": "ESPAÑA", "EsVandal": "ESPAÑA", "GERAMC": "ESPAÑA", "Giaantv": "ESPAÑA", "hasvik": "ESPAÑA", "IcraK": "ESPAÑA", "Lakshart": "ESPAÑA", "iLuh": "ESPAÑA", "Mayichi": "ESPAÑA", "MrDs4ster": "ESPAÑA", "Serpias": "ESPAÑA", "Shadoune666": "ESPAÑA", "Suw1e": "ESPAÑA", "xPandih": "ESPAÑA", "Atwy": "ESPAÑA", "giaantv": "ESPAÑA", "Arfore": "DEUTSCHLAND", "ATellyBridger": "DEUTSCHLAND", "AustrianGaming": "DEUTSCHLAND", "Blizzor96": "DEUTSCHLAND", "Caravas": "DEUTSCHLAND", "castcrafter": "DEUTSCHLAND", "gamingguidesde": "DEUTSCHLAND", "nooreax": "DEUTSCHLAND", "NxtFake": "DEUTSCHLAND", "predii": "DEUTSCHLAND", "RealBenex": "DEUTSCHLAND", "Stxgi": "DEUTSCHLAND", "TheFabo": "DEUTSCHLAND", "Tjan": "DEUTSCHLAND", "verweisunq": "DEUTSCHLAND", "Wichtiger": "DEUTSCHLAND", "X_SUS": "DEUTSCHLAND", "xLymex": "DEUTSCHLAND", "ZombieZockt": "DEUTSCHLAND", "zPrxme": "DEUTSCHLAND", "Trustcn": "DEUTSCHLAND", "xpieps_": "DEUTSCHLAND", "a6d": "UNITED STATES", "Antfrost": "UNITED STATES", "bekyamon": "UNITED STATES", "Brumin_": "UNITED STATES", "Elstyos": "UNITED STATES", "GEVids": "UNITED STATES", "GOLRIVER": "UNITED STATES", "Graecie_": "UNITED STATES", "RageTrain": "UNITED STATES", "Reddoons": "UNITED STATES", "RedVelvetCake": "UNITED STATES", "SammyGreen": "UNITED STATES", "sdslqyer": "UNITED STATES", "Seapeekay": "UNITED STATES", "spideyarmy": "UNITED STATES", "spifeyy": "UNITED STATES", "theorionsound": "UNITED STATES", "Tryhard": "UNITED STATES", "TurboPiggyYT": "UNITED STATES", "vGumiho": "UNITED STATES", "Vraxooo": "UNITED STATES", "ZachPlaysAN": "UNITED STATES", "Fasterr": "UNITED STATES", "Narkotiqu": "UNITED STATES", "SpaceX": "UNITED STATES", "Super_Genius_007": "UNITED STATES", "xAyman": "UNITED STATES", "aleuwurawrxd": "UNITED STATES", "Mogii": "UNITED STATES", "Omarmu": "UNITED STATES", "Xxelah": "UNITED STATES", "_Prototype": "STAFF", "_Zary_": "STAFF", "adrichefclan": "STAFF", "Alex_15889": "STAFF", "Arc_Nolan": "STAFF", "Arthenala": "STAFF", "bigbublle1963": "STAFF", "bZx_": "STAFF", "Cryzopha": "STAFF", "DevilMythe": "STAFF", "DrSallan": "STAFF", "elterapi": "STAFF", "Eowalim": "STAFF", "Falc0rN": "STAFF", "Gabiscuit": "STAFF", "GreyShelby": "STAFF", "HiitSayZ": "STAFF", "Popi_Craft": "STAFF", "Ma0Ling": "STAFF", "InfiniteRobot": "STAFF", "InoRyth": "STAFF", "Louqua": "STAFF", "MlleDujardin": "STAFF", "mokuura": "STAFF", "NaokoRae": "STAFF", "NoixRiver": "STAFF", "RougeCiel": "STAFF", "Roxfor": "STAFF", "SaveThatGam": "STAFF", "Siphano": "STAFF", "SolHeaven": "STAFF", "The_Killeur_999": "STAFF", "the_nt": "STAFF", "Tyyphoonn": "STAFF", "uncheated": "STAFF", "vinceok": "STAFF", "Waahx_": "STAFF", "Xantheas": "STAFF", "Popi_Craft": "STAFF"};
  var scorebyteam = {"FRANCE": 0, "DEUTSCHLAND": 0, "ESPAÑA": 0, "ITALIA": 0, "STAFF": 0, "UNITED STATES": 0};
  var connectedbyteam = {"FRANCE": 0, "DEUTSCHLAND": 0, "ESPAÑA": 0, "ITALIA": 0, "STAFF": 0, "UNITED STATES": 0};
  var players = resparr["players"];
  var i = 1;
  var values = [];
  players.forEach(playerdata => {
    var team = teams[playerdata["name"]]??"unknown";

    connectedsince = "";
    if(playerdata["connected"]) {
      var lastseen = "Connected";
      connectedsince = ((((playerdata["connectedSince"] + 31536000 * 70)/60)/60)/24);
      if(team !== "unknown") connectedbyteam[team]++;
    } else var lastseen = ((((playerdata["lastSeen"] + 31536000 * 70)/60)/60)/24);
    if(team !== "unknown") scorebyteam[team] += playerdata["timePlayed"];

    values.push(["=IMAGE(\"https://minotar.net/avatar/"+playerdata["name"]+"/64.png\")", team, playerdata["name"], formatdate(playerdata["timePlayed"]), lastseen, connectedsince]);
    i++;
  });

  var range = sheet.getRange('A2:F'+i);
  range.setValues(values);
  sheet.getRange('H2:L7').clearContent();
  range.sort({column: 4, ascending: false});
  sheet.getRange('E2:F'+i).setNumberFormat("dd HH:mm:ss")

  updateScoreByTeam(scorebyteam);
  updateConnectedPerTeam(connectedbyteam);
}
function updateScoreByTeam(scorebyteam)
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Time Played');
  var values = [];
  const sortable = Object.fromEntries(Object.entries(scorebyteam).sort(([,a],[,b]) => b - a));
  for (const [key, value] of Object.entries(sortable)) values.push([key, formatdate(value)])

  sheet.getRange('H2:I7').setValues(values);
}
function updateConnectedPerTeam(connectedbyteam)
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Time Played');
  var values = [];
  const sortable = Object.fromEntries(Object.entries(connectedbyteam).sort(([,a],[,b]) => b - a));
  for (const [key, value] of Object.entries(sortable)) values.push([key, value])

  sheet.getRange('K2:L7').setValues(values);
}
function formatdate(timeplayed)
{
  var hour = Math.floor(timeplayed / 3600);
  var minuteSec = timeplayed % 3600;
  var minute = Math.floor(minuteSec / 60);
  var remainingSec = minuteSec % 60;
  var second = Math.ceil(remainingSec);

  return (hour??"0") + ":" + (minute??"00") + ":" + (second??"00")
}
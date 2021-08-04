import requests
import time
import threading
from discord_webhook import DiscordWebhook
from datetime import datetime
global liste_tdc
liste_tdc = []
global urls
urls = [] #les webhooks ici
global liste_allemands,liste_esp,liste_ita,liste_US
liste_allemands = ["arfore", "tellybridger", "austriangamingg","blizzor", "caravasyt", "castcrafter", "nxtfake" "realbenex", "stegi", "Fabo", "tjantv", "verweisunq", "wichtiger", "x_sus","xlymex", "zombiezocktyt", "priimme", "Trustcn", "xpieps_",]
liste_esp = ["aurigas", "axozer", "barcagamer", "bobicraftmc", "cibergun", "conterstine", "crisgreen", "esvandal", "geramc", "giaantv", "hasvik", "icraktv", "lakshartnia", "luh", "mayichi", "serpias", "shadoune666", "suwie", "soypandih",]
liste_ita = ["dere_x", "francycoso", "giankoextreme", "giacomoinsano", "guerrareturns", "iskandert", "micha3l_tv", "sonomrdomi", "MICHA3L_tv", "napo7700", "nolifegabbo", "nonsonolink", "nonsonolink", "novaxciv", "tech4play", "triton_707", "ultimateita", "alphatvlive",]
liste_US = ["a6doff", "antfrost", "bekyamon","brumin","golriver__","graecie","ragetrain","reddoons","velvetiscake","sammygreen","realsdslayer","seapeekay","spideyarmy","spifeyy","theorionsound","tryhord_","turbopiggyyt","vgumiho","vrax","zachplaysanlive",]
liste_france = ["aypierre","bichard","frigiel","fukano","fuzeiii","guep","jimmyboyyy","mathieulapin","luccio","magicknup","mathox","nems","niimbustv","ninjaxxu","nino_mssclick","redtoxx_","soulravenn","thatdamngirll","theguill84","tityyy",]
time.sleep(2)
def check(streamer, nb):
    global liste_allemands,liste_esp,liste_ita,liste_US
    global urls 
    temp = requests.get("https://tmi.twitch.tv/group/user/"+streamer+"/chatters?v="+str(nb)).text.split('"viewers":[')[1].split('","')
    temp4 = 0
    temp5 = ""
    for item in liste_allemands:
        for x in temp:
            if item == x:
                temp4 = 1
                temp5 = item
    for item in liste_esp:
        for x in temp:
            if item == x:
                temp4 = 2
                temp5 = item
                if streamer == "bichard" and item == "icraktv" : temp4 = 0 #pas d'alarme dans ce cas la
                
    for item in liste_ita:
        for x in temp:
            if item == x:
                temp4 = 3
                temp5 = item
    for item in liste_US:
        for x in temp:
            if item == x:
                temp4 = 4
                temp5 = item
                if streamer == "bichard" and item == "a6doff" : temp4 = 0 #pas d'alarme dans ce cas la
    if temp4 == 0 : return
    liste_message = ["ALLEMAND", "ESPAGNOL", "ITALIEN", "RICAIN"]
    temp2 = str(datetime.now()) + " : " + temp5 + " streamhack " + streamer + " (ça veut pas forcément dire streamhack, ils peuvent être amis...) c'est un " + str(liste_message[temp4-1])
    print(temp2)
    temp3 = temp2
    if item not in liste_tdc:
        liste_tdc.append(item)
        for url in urls:
            DiscordWebhook(url=url, content=temp3).execute()
        token = "Il y a un mot de passe ici, pour protéger l'api, vous ne pourrez donc pas envoyer d'alertes aux streamers avec ce code, sans le mdp"
        data = {
                "token" : token,
                "team" : str(liste_message[temp4-1]),
                "pseudo" : temp5,
                "streamer": streamer,
                }
        print(requests.post("https://dadodasyra.fr/city/api/streamhack.php", data=data).text)
    else:
        if nb%60 == 0:
            liste_tdc.remove(item)
    
nb = 0
while True:
    nb += 1
    print(str(datetime.now()) + " boucle numéro :", nb, "ça fait", nb/60, "heures que le bot tourne")
    for streamer in liste_france:
        x = threading.Thread(target=check, args=(streamer,nb, ), daemon=True)
        x.start()
    time.sleep(60)
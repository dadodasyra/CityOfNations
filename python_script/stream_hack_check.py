# Refactoring de "main (2).py"
# By Miromashi
# Discord : Miromashi#9605
# Github : https://github.com/Gregory-Miromashi


from requests import get, post
from time import sleep
from discord_webhook import DiscordWebhook
from datetime import datetime
from json import loads
from pathlib import Path
from threading import Thread


class StreamHack:
    def __init__(self):
        """Constructeur"""

        super().__init__()
        self.mapStreamerToVerify = dict()
        self.listStreamersToProtect = list()
        self.urlWebhooks = list()
        self.whiteList = dict()
        self.timeToWait = 60  # En seconde
        self.loopNumber = 0
        self.token = ""
        self.apiUrl = ""

    def start(self):
        """Permet de lancer le script"""

        print("Démarrage du bot :")
        self.getListStreamers()
        self.getWebhooksUrl()
        self.getWhiteList()
        self.getConfig()

        while True:
            self.loopNumber += 1
            print(
                f"{self.getDate()} boucle numéro : {self.loopNumber} - ça fait {(self.loopNumber/60):.2f} heures que le bot tourne"
            )

            for streamer in self.listStreamersToProtect:
                thread = Thread(target=self.scan(streamer), daemon=True)
                thread.start()

            sleep(self.timeToWait)

    def readJsonFile(self, file_name, dir_name="json"):
        """Permet de lire un fichier donné

        Args:
            file_name (string): Nom du fichier
            dir_name (str, optional): Nom du répertoire contenant les fichiers json. Valeur par défaut "json".

        Returns:
            JSON: Retourne le contenu json du fichier lu précédemment.
        """

        try:
            data = None
            cwd = str(Path(__file__).parents[0])
            with open(f"{cwd}/{dir_name}/{file_name}", "r") as f:
                data = f.read()

            return loads(data)

        except Exception as e:
            print(e)

    def getListStreamers(self):
        """Permet de récupérer la liste des streamers contenu dans le fichier json list_streamers.json"""

        try:
            streamers = self.readJsonFile("list_streamers.json")
            self.listStreamersToProtect = streamers["France"]
            del streamers["France"]
            self.mapStreamerToVerify = streamers
        except Exception as e:
            print(e)

    def getWebhooksUrl(self):
        """Permet de récupérer la liste des streamers contenu dans le fichier json list_webhooks.json"""

        try:
            self.urlWebhooks = self.readJsonFile("list_webhooks.json")["webhooks"]
        except Exception as e:
            print(e)

    def getWhiteList(self):
        """Permet de récupérer la liste des utilisateurs whitelisté par streamer"""

        try:
            self.whiteList = self.readJsonFile("white_list.json")
        except Exception as e:
            print(e)

    def get_viewers(self, streamer_name=""):
        """Récupérer la liste des viewers pour un streamer donné

        Args:
            streamer_name (string): Nom du streamer
        """
        if streamer_name != "":
            return loads(
                get(
                    f"https://tmi.twitch.tv/group/user/{streamer_name}/chatters"
                ).content
            )["chatters"]["viewers"]

    def getDate(self):
        """Permet de récupérer la date et l'heure correctement formatées

        Returns:
            string: Date et heure sous le format "jour/mois/année heure/minute/seconde"
        """
        return datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    def getConfig(self):
        """Récupère les informations dans le fichier de configuration"""
        config = self.readJsonFile("config.json")
        self.token = config["token"]
        self.apiUrl = config["apiUrl"]

    def scan(self, streamer):
        """Permet de scanner la liste des viewers d'un streamer et de detecter s'il y a un streamhacker

        Args:
            streamer (string): Pseudo du streamer
        """
        try:
            viewers = self.get_viewers(streamer)
            spotted = None

            for key, value in self.mapStreamerToVerify.items():
                for name in value:
                    if name in viewers and (
                        streamer not in self.whiteList
                        or name not in self.whiteList[streamer]
                    ):
                        spotted = {
                            "team": key,
                            "pseudo": name,
                            "streamer": streamer,
                            "time": self.getDate(),
                        }

            if spotted is not None:
                content = f"{spotted['time']}: {spotted['pseudo']} streamhack {spotted['streamer']} (ça veut pas forcément dire streamhack, ils peuvent être amis...) c'est un {spotted['team']}"
                print(content)
                for url in self.urlWebhooks:
                    DiscordWebhook(url=url, content=content).execute()

                data = {
                    "token": self.token,
                    "team": spotted["team"],
                    "pseudo": spotted["pseudo"],
                    "streamer": spotted["streamer"],
                }

                print(post(self.apiUrl, data=data).content.decode())

        except Exception as e:
            print(e)


if __name__ == "__main__":
    streamHack = StreamHack()
    streamHack.start()

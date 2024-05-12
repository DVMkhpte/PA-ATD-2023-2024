from socket import *
from threading import *

clients = set()
serverSocket = socket(AF_INET, SOCK_STREAM)

hostIp = "127.0.0.1"
portNumber = 7500
serverSocket.bind((hostIp, portNumber))

def clientThread(clientSocket, clientAddress):
    clientSocket.send("Entrez votre nom: ".encode("utf-8"))
    clientName = clientSocket.recv(1024).decode("utf-8")

    while True:
        message = clientSocket.recv(1024).decode("utf-8")

        if not message:
            clients.remove((clientSocket, clientName))
            print(clientName + " déconnecté")
            break

        print(clientName + " : " + message)

        for client, name in clients:
            if client is not clientSocket:
                client.send((clientName + " : " + message).encode("utf-8"))

    clientSocket.close()

serverSocket.listen()
print ("Waiting for connection...")

while True:
    clientSocket, clientAddress = serverSocket.accept()
    clients.add((clientSocket, ""))
    print ("Connexion établie avec: ", clientAddress[0] + ":" + str(clientAddress[1]))
    thread = Thread(target=clientThread, args=(clientSocket, clientAddress,))
    thread.start()

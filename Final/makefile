all: schat cchat

schat: clientData.o commandManager.o serverIO.o
	gcc clientData.o commandManager.o serverIO.o schat.c -o schat -pthread -std=gnu99


clientData.o: clientData.c
	gcc -c clientData.c

commandManager.o: commandManager.c
	gcc -c commandManager.c 

serverIO.o: serverIO.c
	gcc -c serverIO.c

cchat: clientIO.o
	gcc clientIO.o cchat.c -o cchat -pthread -std=gnu99

clientIO.o: clientIO.c
	gcc -c clientIO.c

clean: 
	rm -f *.o schat cchat

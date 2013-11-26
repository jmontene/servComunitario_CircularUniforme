client: clientIO.o client.o
	gcc clientIO.o client.o -o client

clientIO.o: clientIO.c clientIO.h
	gcc -c clientIO.c

client.o: client.c
	gcc -c main.c

all: main

main: clientData.o commandManager.o main.o
	gcc clientData.o commandManager.o main.o -o main

clientData.o: clientData.c clientData.h
	gcc -c clientData.c

commandManager.o: clientData.o commandManager.h commandManager.c 
	gcc -c commandManager.c 

main.o: main.c
	gcc -c main.c

clean: 
	rm -f *.o main

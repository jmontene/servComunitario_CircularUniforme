#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#define MAX_THREADS 256
#define MAX_MSG_SIZE 256

/**
 * Lee un mensaje de un cliente
 * @param buffer buffer en el cual se guarda la informacion leida
 * @param fd file descriptor del cliente 
 * @return void
 */
void readFromClient(char *buffer, int fd);

/**
 * Escribe un mensaje a un cliente
 * @param men mensaje a enviar al cliente
 * @param fd file descriptor del cliente 
 * @return void
 */
void writeToClient(const char *mes, int fd);

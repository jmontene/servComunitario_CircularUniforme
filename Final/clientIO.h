#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <regex.h>
#include <strings.h>
#define MAX_MSG_SIZE 256

/**
 * Parsea una instruccion para chequear correctitud
 * @param buffer buffer que contiene la instruccion a parsear
 * @return int entero que dice si la instruccion es correcta (1) o no(0)
 */
int parseInstruction(const char *buffer);

/**
 * Escribe un mensaje al servidor
 * @param buffer buffer que contiene la informacion a enviar
 * @param fd file descriptor del server
 * @return void
 */
void writeToServer(const char *mes, int fd);

/**
 * Lee un mensaje del server
 * @param buffer buffer en el cual se guarda la informacion leida
 * @param fd file descriptor del cliente 
 * @return void
 */
void readFromServer(char *buffer, int fd);

/**
 * Ejecuta comandos a partir de un archivo
 * @param file_name path del archivo a leer
 * @param sockfd file descriptor del server
 * @return void
 */
void executeFromFile(const char *file_name,int sockfd);


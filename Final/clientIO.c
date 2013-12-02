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

/*Parsea la instruccion dada para verificar que tenga sintaxis correcta
*/
int parseInstruction(const char *buffer){
  if(strcmp(buffer,"sal\n") == 0 || strcmp(buffer,"usu\n") == 0 || strcmp(buffer,"des\n") == 0 ||
     strcmp(buffer,"fue\n") == 0){
     return 0;
  }else if(strncmp(buffer,"men ",4) == 0 || strncmp(buffer,"sus ",4) == 0 || strncmp(buffer,"eli ",4) == 0 ||
          strncmp(buffer,"cre ",4) == 0){
     return 0;
  }else{
     return 1;
  }
}

/*Escribe un mensaje al servidor
*/
void writeToServer(const char *mes, int fd){

  int n;
  n = write(fd,mes,strlen(mes));

  if (n < 0)
    error("ERROR writing to socket");
}

/*Lee un mensaje del servidor
*/

void readFromServer(char *buffer, int fd){
  bzero(buffer,MAX_MSG_SIZE);

  int n;
  n = read(fd,buffer,MAX_MSG_SIZE);
  if (n < 0)
     error("ERROR reading from socket");
}

/*Lee y ejecuta los contenidos del archivo si hay uno
*/

void executeFromFile(const char *file_name, int sockfd){
  FILE *fp;
  char buffer[MAX_MSG_SIZE];

  if(file_name != NULL){
      fp = fopen(file_name,"rt");
      if (fp == NULL) {
        error("Error opening file",sockfd);
      }
      int i = 1;
      while (fgets(buffer,sizeof(buffer),fp) != NULL) {
        if(parseInstruction(buffer) == 1){
          printf("Error en la linea %d del archivo\n",i);
        }else{
          writeToServer(buffer,sockfd);
          if(strcmp(buffer,"fue\n") == 0){
             printf("Te has desconectado\n");
             exit(0);
          }
          readFromServer(buffer,sockfd);
          printf("%s",buffer);
        }
        ++i;
      }
  }
}

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
#include <pthread.h>
#include "clientIO.h"
#define MAX_MSG_SIZE 256

void error(const char *msg)
{
    perror(msg);
    exit(0);
}

typedef struct servData{
  char buffer[MAX_MSG_SIZE];
  int fd;
}servData;

struct hostent *obtenerDireccion(const char *addr);

int main(int argc, char *argv[])
{
    
    //Variables necesarias para hacer coneccion
    int sockfd, asynfd, portno;
    struct sockaddr_in serv_addr;
    char *server_address;
    char *client_name; 
    char *file_name = NULL;
    struct hostent *server;
    char buffer[MAX_MSG_SIZE];
    pthread_t lectura;
    servData *datosLectura;

    //Chequeo de argumentos dados al programa
    if ((argc < 7) || (argc == 8) || (argc > 9)) {
       fprintf(stderr,"uso: %s -h hostname -p puerto -n nombre [-a pathname]. Los primeros tres flags son obligatorios\n", argv[0]);
       exit(0);
    }

    //Se procesan los flags. Se hace dentro del main para poder cambiar las variables
    for(int i = 1; i < argc; i = i + 2){
       if(strcmp(argv[i],"-h") == 0){
         server_address = argv[i+1];
       }else if (strcmp(argv[i],"-p") == 0){
         portno = atoi(argv[i+1]);
       }else if (strcmp(argv[i],"-n") == 0){
         client_name = argv[i+1];
       }else if (strcmp(argv[i],"-a") == 0){
         file_name = argv[i+1];
       }else{
         error(argv[i]);
       }
    }

    //Se abre el socket del cliente con TCP   
    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) 
        error("ERROR opening socket");

    //Se verifica si se paso un hostname o una ip
    server = obtenerDireccion(server_address);
    if (server == NULL) {
        fprintf(stderr,"ERROR, no such host\n");
        exit(0);
    }
 
    //Se hace la conexion con el servidor 
    bzero((char *) &serv_addr, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    bcopy((char *)server->h_addr, 
         (char *)&serv_addr.sin_addr.s_addr,
         server->h_length);
    serv_addr.sin_port = htons(portno);
    if (connect(sockfd,(struct sockaddr *) &serv_addr,sizeof(serv_addr)) < 0) 
        error("ERROR connecting");

    //Se le manda al servidor el nombre del cliente
    writeToServer(client_name,sockfd);

    //Primero se chequea si hay un archivo y en caso positivo se leen sus comandos
    executeFromFile(file_name,buffer,sockfd);

    //Loop de entrada de instrucciones
    while(1) {
      //Primero se pide la instruccion a parsear
      printf("[%s]: ", client_name);
      bzero(buffer,MAX_MSG_SIZE);
      fgets(buffer,MAX_MSG_SIZE,stdin);

      //Luego se parsea la instruccion
      if(parseInstruction(buffer)){
        printf("Error de sintaxis\n");
      }else{
        writeToServer(buffer,sockfd);
        if(strcmp(buffer,"fue\n") == 0){
           printf("Te has desconectado\n");
           exit(0);
        }
        readFromServer(buffer,sockfd);
        serverCommand(buffer);
      }
    }

    close(sockfd);
    return 0;
}

/*Obtiene la direccion ip del servidor, convirtiendo el string pasado a
un objeto hostent*/
struct hostent *obtenerDireccion(const char *addr){
  regex_t regex;
  int reti;
  struct hostent *server;
  
  reti = regcomp(&regex, "^[:digit:]{1,3}[.][:digit:]{1,3}[.][:digit:]{1,3}", 0);
  if(reti) { error("Could not compile regex"); }
 
  reti = regexec(&regex,addr,0,NULL,0);
  if(!reti){
    server = gethostbyaddr(addr, sizeof(addr), AF_INET);
  }else{
    server = gethostbyname(addr);
  }
   
  regfree(&regex);
  return server;
}

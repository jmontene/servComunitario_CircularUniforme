//Working on git branch server

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h> 
#include <sys/socket.h>
#include <netinet/in.h>
#include <pthread.h>
#define MAX_CLIENTS 256
#define MAX_SALAS 100

void error(const char *msg)
{
    perror(msg);
    exit(1);
}

//Buffer de escritura
char buffer[256];

/*Estructura que representa los usuarios
  nombre: username
  descriptor: file descriptor del socket del que proviene el usuario
*/
typedef struct usuario usuario;
struct usuario {
  char *nombre;
  int descriptor;
  int array_pos;
};

/*Estructura que representa las salas
  nombre: nombre de la sala
  usuarios: arreglo de usuarios suscritos a la sala
*/ 
typedef struct sala sala;
struct sala {
  char *nombre;
  usuario *usuarios;
};

void *ejecutarComandos (void *info);

int main(int argc, char *argv[])
{
     //Creando variables necesarias para establecer conexiones e hilos
     int sockfd, newsockfd, portno;
     socklen_t clilen;
     struct sockaddr_in serv_addr, cli_addr;
     pthread_t conns[MAX_CLIENTS];

     //Arreglo de Usuarios y de salas
     usuario usuarios[MAX_CLIENTS];
     sala salas[MAX_SALAS];

     //Chequeo de errores de argumentos
     if (argc < 2) {
         fprintf(stderr,"ERROR, no port provided\n");
         exit(1);
     }

     //Creacion del socket
     sockfd = socket(AF_INET, SOCK_STREAM, 0);
     if (sockfd < 0) 
        error("ERROR opening socket");

     //Binding del servicio. Se esta usando TCP
     bzero((char *) &serv_addr, sizeof(serv_addr));
     portno = atoi(argv[1]);
     serv_addr.sin_family = AF_INET;
     serv_addr.sin_addr.s_addr = INADDR_ANY;
     serv_addr.sin_port = htons(portno);
     if (bind(sockfd, (struct sockaddr *) &serv_addr,
              sizeof(serv_addr)) < 0) 
              error("ERROR on binding");

     //Se comienza a escuchar requests
     listen(sockfd,5);
     clilen = sizeof(cli_addr);

     //Ciclo de escucha de nuevos clientes
     int current_client_pos = 0;
     while(1) { 
       //Se crea un nuevo file descriptor por usuario
       newsockfd = accept(sockfd, 
                   (struct sockaddr *) &cli_addr, 
                   &clilen);
       if (newsockfd < 0) 
            error("ERROR on accept");
  
       //Generando el nuevo usuario
       usuarios[current_client_pos].nombre = "nombre1";
       usuarios[current_client_pos].descriptor = newsockfd;
       usuarios[current_client_pos].array_pos = current_client_pos;

       //Creando el nuevo hilo
       pthread_create(&(conns[current_client_pos]), NULL, &ejecutarComandos, (void *) &(usuarios[current_client_pos]));
       ++current_client_pos;
     }

     //Fin del programa
     close(sockfd);
     return 0; 
}

/*Funcion que ejecuta los comandos dados por los clientes
  cada hilo del programa corre una copia de esta funcion
*/
void *ejecutarComandos (void *info){
  //Datos del usuario que este hilo representa
  usuario *data;
  data = (usuario *) info;

  while(1) {
    //Se lee el input del usuario
    bzero(buffer,256);
    int n = read((*data).descriptor,buffer,255);
    if (n < 0) error("ERROR reading from socket");

    //Se procesa la informacion recibida
    if(strcmp("fue\n", buffer) == 0){
      n = write((*data).descriptor,"Te has salido",13);
      if (n < 0) error("ERROR writing to socket");
      close((*data).descriptor);
      pthread_exit(NULL);
    }else{
      n = write((*data).descriptor,"Gotcha",6);
      if (n < 0) error("ERROR writing to socket");
    }

    //Se le responde apropiadamente
  }

  //Al salir, se cierra el fd 
  close((*data).descriptor);
  pthread_exit(NULL);
}

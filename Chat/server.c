//Working on git branch server

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h> 
#include <sys/socket.h>
#include <netinet/in.h>
#include <pthread.h>
#include "Commands/commandManager.h"
#include "serverIO.h"
#define MAX_THREADS 256
#define MAX_MSG_SIZE 256

void error(const char *msg)
{
    perror(msg);
    exit(1);
}

//Estructura que se le pasara a todos los nuevos hilos a crear
typedef struct clientData{
   char nombre[MAX_MSG_SIZE];
   int descriptor;
   manager *mg;
}clientData;

//Buffer de escritura
char buffer[MAX_MSG_SIZE];

//Declaraciones Implicitas
void *ejecutarComandos (void *info);
void writeToAllClients(manager *mg, const char *str);
void writeToAllClientRooms(char *name, manager *mg, const char *men);
void enviarSalas(manager *mg, int des);
void enviarUsuarios(manager *mg, int des);

int main(int argc, char *argv[])
{
     //Creando variables necesarias para establecer conexiones e hilos
     int sockfd, newsockfd, newasynfd, portno;
     socklen_t clilen;
     struct sockaddr_in serv_addr, cli_addr;
     pthread_t conns[MAX_THREADS];
     char salaDefecto[MAX_MSG_SIZE];
     bzero(salaDefecto,MAX_MSG_SIZE);
     strcpy(salaDefecto,"Actual");

     //Se hace una nueva inicializacion del commandManager
     manager *mg;
     mg = manager_crear();

     //Chequeo de argumentos dados al programa
     if ((argc < 3) || (argc == 4) ||(argc > 5)) {
        fprintf(stderr,"uso: %s -p puerto -s sala\n", argv[0]);
        exit(0);
     } 

     //Se procesan los flags. Se hace dentro del main para poder cambiar las variables
     int p = 1;
     for(int i = 1; i < argc; i = i + 2){
       if(strcmp(argv[i],"-p") == 0){
         portno  = atoi(argv[i+1]);
         p = 0;
       }else if (strcmp(argv[i],"-s") == 0){
         bzero(salaDefecto,MAX_MSG_SIZE);
         strcpy(salaDefecto,argv[i+1]);
       }else{
         error(argv[i]);
       }
     }
 
     if(p)
       error("No se especificó numero de puerto"); 

     //Creacion del socket
     sockfd = socket(AF_INET, SOCK_STREAM, 0);
     if (sockfd < 0) 
        error("ERROR opening socket");

     //Binding del servicio. Se esta usando TCP
     bzero((char *) &serv_addr, sizeof(serv_addr));
     serv_addr.sin_family = AF_INET;
     serv_addr.sin_addr.s_addr = INADDR_ANY;
     serv_addr.sin_port = htons(portno);
     if (bind(sockfd, (struct sockaddr *) &serv_addr,
              sizeof(serv_addr)) < 0) 
              error("ERROR on binding");

     //De una vez se crea la sala por defecto
     char salaDef[strlen(salaDefecto) + 1];
     strcpy(salaDef,salaDefecto);
     strcat(salaDef,"\n");
     manager_agregarSala(mg,salaDef);

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
  
       //Generando el nuevo usuario, leyendo primero el nombre de dicho usuario
       readFromClient(buffer,newsockfd);
       manager_agregarCliente(mg,buffer,newsockfd);
       manager_suscribirCliente(mg,buffer,salaDef);
       clientData *cd = malloc(sizeof(clientData));
       bzero(cd->nombre, MAX_MSG_SIZE);
       strcpy(cd->nombre, buffer);
       cd->descriptor = newsockfd;
       cd->mg = mg;

       //Creando el nuevo hilo
       pthread_create(&(conns[current_client_pos]), NULL, &ejecutarComandos, (void *) cd);
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
  clientData *data;
  data = (clientData *) info;

  while(1) {
    //Se lee el input del usuario
    readFromClient(buffer,data->descriptor);

    //Se procesa la informacion recibida
    if(strcmp("fue\n", buffer) == 0){
      manager_eliminarCliente(data->mg,data->nombre);
      char str[strlen(data->nombre) + strlen("El usuario  se ha desconectado\n")];
      strcpy(str,"El usuario ");
      strcat(str,data->nombre);
      strcat(str," se ha desconectado\n");
      writeToAllClients(data->mg,str);
      close((*data).descriptor);
      free(info);
      pthread_exit(NULL);
    }else if (strcmp("sal\n",buffer) == 0){
      enviarSalas(data->mg,data->descriptor);
    }else if (strncmp(buffer,"men ",4) == 0){
      char *men = &buffer[4];
      char *nm = data->nombre;
      char str[strlen(men) + strlen(nm) + 4];
      strcpy(str,"[");
      strcat(str,nm);
      strcat(str,"]: ");
      strcat(str,men);
      writeToAllClientRooms(nm,data->mg,str);
    }else if (strncmp(buffer,"sus ",4) == 0){
      char *men = &buffer[4];
      char *statSusc = "Suscrito a la sala ";
      char *statNoSusc = "Ya estas suscrito a esta sala\n";
      if(manager_suscribirCliente(data->mg,data->nombre,men)){
        char str[strlen(statSusc) + strlen(men) + 1];
        strcpy(str,statSusc);
        strcat(str,men);
        strcat(str,"\n");
        writeToClient(str,data->descriptor);
      }else{
        writeToClient(statNoSusc,data->descriptor);
      }
    }else if (strncmp(buffer,"eli ",4) == 0){
      char *men = &buffer[4];
      char *stat = "Eliminada la sala ";
      char str[strlen(stat) + strlen(men)];
      manager_eliminarSala(data->mg,men);
      strcpy(str,stat);
      strcat(str,men);
      strcat(str,"\n");
      writeToAllClients(data->mg,str);
    }else if (strcmp(buffer,"usu\n") == 0){
      enviarUsuarios(data->mg,data->descriptor);
    }else if (strcmp(buffer,"des\n") == 0){
      manager_desuscribirCliente(data->mg,data->nombre);
      char *stat1 = "El usuario ";
      char *stat2 = " se ha desuscrito de todas las salas\n";
      char str[strlen(stat1) + strlen(data->nombre) + strlen(stat2) + 1];
      strcpy(str,stat1);
      strcat(str,data->nombre);
      strcat(str,stat2);
      writeToAllClients(data->mg,str);
   }else if(strncmp(buffer,"cre ",4) == 0){
      char *men = &buffer[4];
      char *stat1 = "Se ha creado la sala ";
      char str[strlen(men) + strlen(stat1)+1];
      strcpy(str,stat1);
      strcat(str,men);
      strcat(str,"\n");
      manager_agregarSala(data->mg,men);
      writeToAllClients(data->mg,str);
   }else{
      writeToClient("Error",data->descriptor);
   }
      

    //Se le responde apropiadamente
  }

  //Al salir, se cierra el fd 
  close((*data).descriptor);
  pthread_exit(NULL);
}

void writeToAllClients(manager *mg, const char *str){
  for(int i = 0;i < mg->numClientes;i++){
    writeToClient(str,mg->clientes[i]->descriptor);
  }
}

void writeToAllClientRooms(char *name, manager *mg, const char *men){
  int n = manager_buscarCliente(mg,name);
  for(int i = 0; i < mg->clientes[n]->numSalas; i++){
     for(int j = 0; j < mg->salas[manager_buscarSala(mg,mg->clientes[n]->salas[i])]->numClientes; j++){
        writeToClient(men,mg->clientes[manager_buscarCliente(mg,mg->salas[i]->clientes[j])]->descriptor);
     }
  }
}

void enviarSalas(manager *mg, int des){
  int size = MAX_SIZE * (mg->numSalas + 1) + 16;
  char str[size];
  strcpy(str, "Salas Abiertas:\n");
  printf("hmm?\n");
  for(int i = 0; i < mg->numSalas ; i++){
     strcat(str,mg->salas[i]->name);
     strcat(str,"\n");
  }
  writeToClient(str,des);
}  

void enviarUsuarios(manager *mg, int des){
  int size = MAX_SIZE * (mg->numClientes + 1) + 21;
  char str[size];
  strcpy(str, "Usuarios Conectados:\n"); 
  for(int i = 0; i < mg->numClientes;i++){
     strcat(str,mg->clientes[i]->name);
     strcat(str,"\n");
  }
  writeToClient(str,des);
}

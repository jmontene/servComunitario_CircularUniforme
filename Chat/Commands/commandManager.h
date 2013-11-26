#include <stdio.h>
#include <stdlib.h>
#include "clientData.h"


typedef struct Manager
{
  cliente** clientes;
  sala** salas;
  
  
  //limits number of rooms and clients
  int numSalas;
  int maxSalas;
  
  int numClientes;
  int maxClientes;
  
} manager;

manager* manager_crear();
void manager_agregarCliente(manager *mng, char* clname, int fd);
void manager_agregarSala(manager *mng, char* sname);
int manager_suscribirCliente(manager *mng, char *clname, char * sname);
void manager_desuscribirCliente(manager *mng, char *clname);
void manager_eliminarCliente(manager *mng, char *clname);
void manager_eliminarSala(manager *mng, char* sname);
void manager_mostrarClientes(manager *mng);
void manager_mostrarSalas(manager *mng);
int manager_buscarCliente(manager *mng, char *clname);
int manager_buscarSala(manager *mng, char *sname);

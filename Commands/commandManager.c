#include <stdlib.h>
#include <stdio.h>
#include <strings.h>
#include <string.h>
#include "commandManager.h"

#define INIT_SIZE 3

manager* manager_crear(){
    manager *mng = malloc(sizeof(manager));
    
    //creates rooms and clients
    mng->salas = (sala **) malloc(INIT_SIZE * sizeof(sala *));    
    mng->clientes = (cliente **) malloc(INIT_SIZE * sizeof (cliente *));
   
    mng->numSalas = 0;
    mng->maxSalas = INIT_SIZE;
    
    mng->numClientes = 0;
    mng->maxClientes = INIT_SIZE;
    
    return mng; 
}


void doubleClientes(cliente ***clientes, int arraySize){

    int newSize = arraySize *2;
    *clientes = realloc(*clientes, newSize * sizeof(cliente *));  
     
    //Reallocate array
    int i;
    for (i = arraySize; i < newSize; i++)
      (*clientes)[i] = malloc((MAX_SIZE) * sizeof(cliente)); 
}


void manager_agregarCliente(manager *mng, char* clname){
  
    if (mng->numClientes == mng->maxClientes){
    
      doubleClientes(&(mng->clientes), mng->maxClientes);
      mng->maxClientes = mng->maxClientes * 2;
      
    }
 
    mng->clientes[mng->numClientes] = cliente_crear(clname);
    mng->numClientes = mng->numClientes + 1;
  
  
}

void doubleSalas(sala ***salas, int arraySize){

    int newSize = arraySize *2;
    *salas = realloc(*salas, newSize * sizeof(sala *));  
     
    //Reallocate array
    int i;
    for (i = arraySize; i < newSize; i++)
      (*salas)[i] = malloc((MAX_SIZE) * sizeof(sala)); 
}


void manager_agregarSala(manager *mng, char* sname){
  
    if (mng->numSalas == mng->maxSalas){
    
      doubleSalas(&(mng->salas), mng->maxSalas);
      mng->maxSalas = mng->maxSalas * 2;
      
    }
 
    mng->salas[mng->numSalas] = sala_crear(sname);
    mng->numSalas = mng->numSalas + 1;
  
  
}

int manager_buscarCliente(manager *mng, char *clname){

  return buscar(mng->clientes, mng->numClientes, clname);
}

int manager_buscarSala(manager *mng, char *sname){

  return buscar(mng->salas,mng->numSalas, sname);
}

//Suscribe un cliente a una sala.
void manager_suscribirCliente(manager *mng, char *clname, char * sname){


    int indexCliente = manager_buscarCliente(mng, clname);
    int indexSala = manager_buscarSala(mng, sname);
    
    if (indexCliente < 0){
      printf("Error: Cliente no encontrado.\n");
    
    }
     
    if (indexSala < 0) {
      printf("Error: Sala no encontrada.\n");
    }
    
    
    int numSalasCl = mng->clientes[indexCliente]->numSalas;
    if (buscar(mng->clientes[indexCliente]->salas, numSalasCl, sname) >= 0){
      printf("Error: cliente ya se encuentra en la sala.\n");
      return;
    }
    
    cliente_agregarSala(mng->clientes[indexCliente], sname);
    sala_agregarCliente(mng->salas[indexSala], clname);
    
}

//Desuscribe el cliente de todas las salas que pertenece.
void manager_desuscribirCliente(manager *mng, char *clname){

    int indexCliente = manager_buscarCliente(mng, clname);
    
    if (indexCliente < 0){
      printf("Error: Cliente no encontrado.\n");
      return;
    
    }    
    
    if (mng->clientes[indexCliente]->numSalas <= 0){
      printf("Error: Cliente no posee suscripciones");
      return;
    }
    
    int i;
    int indexSala;
    char *sala;
    for (i = 0; i< mng->clientes[indexCliente]->numSalas; i++){
      sala = mng->clientes[indexCliente]->salas[i];
      
      indexSala = manager_buscarSala(mng, sala);
      
      sala_eliminarCliente(mng->salas[indexSala], clname);
    }
    
    cliente_borrarSalas(mng->clientes[indexCliente]);

}


void manager_eliminarCliente(manager *mng, char *clname){


    int indexCliente = manager_buscarCliente(mng, clname);    
    if (indexCliente < 0){
      printf("Error: Cliente no encontrado.\n");
      return;
    }
    
    manager_desuscribirCliente(mng, clname);
    cliente_eliminar(mng->clientes[indexCliente]);
    
    
    int i;
    for (i = indexCliente; i < (mng->numClientes -1); i++){
    
      *mng->clientes[i] =  *mng->clientes[i+1];
    }

    memset(mng->clientes[mng->numClientes-1], 0, sizeof (cliente *));
    mng->numClientes = mng->numClientes -1;
   

}
void manager_eliminarSala(manager *mng, char* sname){

    int indexSala = manager_buscarSala(mng, sname);    
    if (indexSala < 0){
      printf("Error: Sala no encontrada.\n");
      return;
    }
    
    
    //elimino la sala de todos los clientes
    int i;
    
    int numSalasCl;
    for (i = 0; i < mng->numClientes ; i++){
      numSalasCl = mng->clientes[i]->numSalas;
      if (buscar(mng->clientes[i]->salas, numSalasCl,sname) >= 0){
        cliente_eliminarSala(mng->clientes[i],sname);
      }
    }
 
 
    //elimino la sala. 
    sala_eliminar(mng->salas[indexSala]);   
    for (i = indexSala; i < (mng->numSalas -1); i++){
      *mng->salas[i] =  *mng->salas[i+1];
    }

    memset(mng->salas[mng->numSalas-1], 0, sizeof (sala *));
    mng->numSalas = mng->numSalas -1;

}



void manager_mostrarClientes(manager *mng){
    int i;
    for (i = 0; i < mng->numClientes; i++){
      cliente_imprimir(mng->clientes[i]);
    }
}
void manager_mostrarSalas(manager *mng){
    int i;
    for (i = 0; i < mng->numSalas; i++){
      sala_imprimir(mng->salas[i]);
    }
}


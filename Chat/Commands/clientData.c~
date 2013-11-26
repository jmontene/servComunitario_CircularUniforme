#include <stdlib.h>
#include <stdio.h>
#include <strings.h>
#include "clientData.h"
#include <string.h>

#define INIT_SIZE 10


void doubleArray(char ***array, int arraySize){

    int newSize = arraySize *2;
    *array = (char **) realloc(*array, newSize * sizeof(char *));  
     
    //Reallocate array
    int i;
    for (i = arraySize; i < newSize; i++)
      (*array)[i] = malloc((MAX_SIZE) * sizeof(char)); 
    
}

//finds element on array, returns its index. 
int buscar(char** array , int arraySize, char* elem){

  int i;
  for (i=0; i < arraySize;i++){
    if (strcmp(elem, array[i]) == 0){
      return i;
    }
  }
  return -1;

}

cliente* cliente_crear(char *clname){
    cliente *cl = malloc(sizeof(cliente));
    strcpy(cl->name,clname);
    
    cl->salas = (char**) malloc(INIT_SIZE * sizeof(char*));
    int i;
    for (i = 0; i < INIT_SIZE; i++)
      cl->salas[i] = malloc((MAX_SIZE) * sizeof(char)); 

    cl->numSalas = 0;
    cl->maxSalas = INIT_SIZE;

    return cl;
}


void cliente_agregarSala(cliente *cl, char *sala){

    if (buscar(cl->salas, cl->numSalas, sala) >= 0){
      printf("Error: cliente ya se encuentra en la sala.\n");
      return;
      
    }
    
    if (cl->numSalas == cl->maxSalas){
    
      doubleArray(&(cl->salas), cl->maxSalas);
      cl->maxSalas = cl->maxSalas * 2;
      
    }
    
    
    strcpy(cl->salas[cl->numSalas],sala);
    cl->numSalas = cl->numSalas + 1;
    
   
}



void cliente_eliminarSala(cliente *cl, char *sala){
   int index =  buscar(cl->salas, cl->numSalas, sala);
   if (index < 0){
     printf("%s \n", "Error: El cliente no se encuentra en dicha sala.");
     return;
   }
   
   int i;

   for (i = index; i < (cl->numSalas -1); i++){
      strcpy(cl->salas[i], cl->salas[i+1]);
   }

   //Modifies deleted element to null value
   memset(cl->salas[cl->numSalas-1], 0, MAX_SIZE);
   cl->numSalas = cl->numSalas -1;

}



void cliente_borrarSalas(cliente *cl){

  
    //Clears all rooms
    int i;
    for (i = 0; i < cl->maxSalas; i++){
      free(cl->salas[i]);
    }
    free(cl->salas);
    
    //Reallocate to initial size
    cl->salas = (char**) malloc(INIT_SIZE * sizeof(char*));
    for (i = 0; i < INIT_SIZE; i++)
      (cl->salas)[i] = malloc((MAX_SIZE) * sizeof(char)); 

    cl->numSalas = 0;
    cl->maxSalas = INIT_SIZE;
   
   

} //Delete all rooms from client
void cliente_eliminar(cliente *cl){


    //Clears all rooms
    int i;
    for (i = 0; i < cl->maxSalas; i++){
      free(cl->salas[i]);
    }
    free(cl->salas);
    
    cl->numSalas = 0;
    cl->maxSalas = INIT_SIZE;
    
}

void cliente_imprimir(cliente *cl){
  printf("Cliente: %s ", cl->name);
  printf("Salas: [");
  int i;
  if (cl->numSalas == 0){
    printf("]\n");
    return;
  }
  
  for (i = 0; i < cl->numSalas - 1;i++){
    printf("%s, ", cl->salas[i]);
  }
  
  printf("%s", cl->salas[cl->numSalas -1]);
  printf("] \n");
}


// SALAS //

sala* sala_crear(char *sname){
    sala *s = malloc(sizeof(sala));
    strcpy(s->name,sname);
    
    s->clientes = (char**) malloc(INIT_SIZE * sizeof(char*));
    int i;
    for (i = 0; i < INIT_SIZE; i++)
      (s->clientes)[i] = malloc((MAX_SIZE) * sizeof(char)); 

    s->numClientes = 0;
    s->maxClientes = INIT_SIZE;

    return s;
}


void sala_agregarCliente(sala *s, char *cliente){


    if (buscar(s->clientes,s->numClientes, cliente) >= 0){
      printf("Error: cliente ya se encuentra en la sala.\n");
      return;
      
    }
    
    if (s->numClientes == s->maxClientes){
    
      doubleArray(&(s->clientes), s->maxClientes);
      s->maxClientes = s->maxClientes * 2;
      
    }
    
    
    strcpy(s->clientes[s->numClientes],cliente);
    s->numClientes = s->numClientes + 1;

}
void sala_eliminarCliente(sala *s, char *cliente){
   int index =  buscar(s->clientes,s->numClientes, cliente);
   if (index < 0){
     printf("%s \n", "Error: El cliente no se encuentra en dicha sala.");
     return;
   }
   
   int i;
   
   for (i = index; i < (s->numClientes -1); i++){
      strcpy(s->clientes[i], s->clientes[i+1]);
   }

   //Modifies deleted element to null value
   memset(s->clientes[s->numClientes-1], 0, MAX_SIZE);
   s->numClientes = s->numClientes -1;

}

void sala_borrarClientes(sala *s){

    //Clears all rooms
    int i;
    for (i = 0; i < s->maxClientes; i++){
      free(s->clientes[i]);
    }
    free(s->clientes);
    
    //Reallocate to initial size
    s->clientes = (char**) malloc(INIT_SIZE * sizeof(char*));
    for (i = 0; i < INIT_SIZE; i++)
      (s->clientes)[i] = malloc((MAX_SIZE) * sizeof(char)); 

    s->numClientes = 0;
    s->maxClientes = INIT_SIZE;
    
   
   


} //Delete all rooms from client


void sala_eliminar(sala *s){


    //Clears all rooms
    int i;
    for (i = 0; i < s->maxClientes; i++){
      free(s->clientes[i]);
    }
    free(s->clientes);
    
    s->numClientes = 0;
    s->maxClientes = INIT_SIZE;
    
}

void sala_imprimir(sala *s){
  printf("Sala: %s ", s->name);
  printf("Clientes: [");
  
  if (s->numClientes == 0){
    printf("]\n");
    return;
  }
  
  int i;
  for (i = 0; i < s->numClientes -1;i++){
    printf("%s, ", s->clientes[i]);
  }
  printf("%s]\n", s->clientes[s->numClientes -1]);
}



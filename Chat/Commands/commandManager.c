#include <stdlib.h>
#include <stdio.h>
#include <strings.h>
#include <string.h>
#include "commandManager.h"

#define INIT_SIZE 10

/**
 * Modulo que implementa las funcionalidades 
 * de los comandos del chat. Manager
 * 
 * Posee un arreglo de clientes y de salas.
 * Y lo modifica de acuerdo a las funciones. 
 */


/**
 * Inicializador del modulo.
 * Inicializa la lista de sala y de clientes.
 * Reserva su espacio e inicializa su informacion.
 * Posee una lista de clientes, y una lista de salas.
 * @return mng manager que fue inicializado
 */
manager* manager_crear(){

    //Reserva espacio inicial
    manager *mng = malloc(sizeof(manager));
    
    if (!mng) {
      perror("Error: Malloc failure.\n");
      exit(-1);
    }
    
    //Reserva espacio para clientes y salas.
    mng->salas = (sala **) malloc(INIT_SIZE * sizeof(sala *));
    mng->clientes = (cliente **) malloc(INIT_SIZE * sizeof (cliente *));
    
    int i;
    for (i = 0; i < INIT_SIZE; i++){
      mng->salas[i] = malloc(sizeof(sala)); 
      mng->clientes[i] = malloc(sizeof(cliente)); 
    }
    
    //Inicializa informacion de los arreglos
    mng->numSalas = 0;
    mng->maxSalas = INIT_SIZE;
    
    mng->numClientes = 0;
    mng->maxClientes = INIT_SIZE;
    
    return mng; 
}

/**
 * Duplica el arreglo de clientes del manager.
 * Copia la informacion del arreglo en una nueva
 * direccion de memoria, y reserva el espacio restante.
 * @param clientes arreglo a ser duplicado
 * @param arraySize tamanio del arreglo.
 */
void doubleClientes(cliente ***clientes, int arraySize){

    //Localiza el arreglo a una nueva direccion de 
    //memoria con doble capacidad.
    int newSize = arraySize *2;
    *clientes = realloc(*clientes, newSize * sizeof(cliente *));  
    
    if (!clientes) {
      perror("Error: Realloc failure.\n");
      exit(-1);
    }
     
    //Reserva espacio de memoria para los elementos restantes.
    int i;
    for (i = arraySize; i < newSize; i++){
      (*clientes)[i] = malloc((MAX_SIZE) * sizeof(cliente));
    }
    
}

/**
 * Agrega un cliente al manager.
 * Imprime un mensaje de error si ya existe.
 * @param mng manager a ser modificado
 * @param clname nombre del cliente a agregar
 */
int manager_agregarCliente(manager *mng, char* clname, int fd){

    //Primer elemento a agregar
    if (mng->numClientes == 0){
      free(mng->clientes[0]);
      mng->clientes[0] = cliente_crear(clname, fd);
      mng->numClientes = mng->numClientes + 1;
      return;
    }

    //Revisa si el cliente se encuentra en el arreglo.
    if (manager_buscarCliente(mng, clname) >= 0){
      printf("Error: el cliente ya se encuentra.");
      return;
    }
  
    //Revisa si es necesario duplicar el tamanio del arreglo.
    if (mng->numClientes == mng->maxClientes){
      doubleClientes(&(mng->clientes), mng->maxClientes);
      mng->maxClientes = mng->maxClientes * 2;
    }
    
    //Busca la posicion a agregar el elemento
    int index = buscarIndice(mng->clientes, mng->numClientes, clname);
    
    //Desplaza el arreglo una posicion para agregar el nuevo elemento.   
    int i;
    for(i=mng->numClientes; i > index; i--){
     *mng->clientes[i] = *mng->clientes[i-1];
    }
 
    //Guarda el nuevo elemento e incrementa el tamanio.
    free(mng->clientes[index]);
    mng->clientes[index] = cliente_crear(clname,fd);
    mng->numClientes = mng->numClientes + 1;
  
}

/**
 * Duplica el arreglo de salas del manager.
 * Copia la informacion del arreglo en una nueva
 * direccion de memoria, y reserva el espacio restante.
 * @param salas arreglo a ser duplicado
 * @param arraySize tamanio del arreglo.
 */
void doubleSalas(sala ***salas, int arraySize){

    //Localiza el arreglo a una nueva direccion de 
    //memoria con doble capacidad.
    int newSize = arraySize *2;
    *salas = realloc(*salas, newSize * sizeof(sala *)); 
    
    if (!salas) {
      perror("Error: Realloc failure.\n");
      exit(-1);
    }
     
    //Reserva espacio de memoria para los elementos restantes.
    int i;
    for (i = arraySize; i < newSize; i++){
      (*salas)[i] = malloc((MAX_SIZE) * sizeof(sala));
    } 
    
}

/**
 * Agrega una sala al manejador
 * Imprime un mensaje de error si ya existe.
 * @param mng manager a ser modificado
 * @param sname nombre de la sala a agregar
 */
int manager_agregarSala(manager *mng, char* sname){
    
    //Primer elemento a agregar
    if (mng->numSalas == 0){
      free(mng->salas[0]);
      mng->salas[0] = sala_crear(sname);
      mng->numSalas = mng->numSalas + 1;
      return 1;
    }
    
    //Revisa si la sala se encuentra en el arreglo.
    if (manager_buscarSala(mng, sname) >= 0){
      printf("Error: la sala ya se encuentra.");
      return 0;
    }
  
    //Revisa si es necesario duplicar el tamanio del arreglo.
    if (mng->numSalas == mng->maxSalas){
      doubleSalas(&(mng->salas), mng->maxSalas);
      mng->maxSalas = mng->maxSalas * 2; 
    }
 
    //Busca la posicion a agregar el elemento
    int index = buscarIndice(mng->salas, mng->numSalas, sname); 
    
    //Desplaza el arreglo una posicion para agregar el nuevo elemento.   
    int i;
    for(i=mng->numSalas; i > index; i--){
      *mng->salas[i] = *mng->salas[i-1];
    }
 
    //Guarda el nuevo elemento e incrementa el tamanio.
    free(mng->salas[index]);
    mng->salas[index] = sala_crear(sname);
    mng->numSalas = mng->numSalas + 1;
    return 1;
}

/**
 * Busca un cliente en el manejador
 * Retorna su posicion en el arreglo. 
 * Retorna -1 si no existe.
 * @param mng manager a ser buscado
 * @param clname nombre del cliente a buscar
 */
int manager_buscarCliente(manager *mng, char *clname){

  return buscar(mng->clientes, mng->numClientes, clname);
}

/**
 * Busca una sala en el manejador
 * Retorna su posicion en el arreglo. 
 * Retorna -1 si no existe.
 * @param mng manager a ser buscado
 * @param sname nombre de la sala a buscar
 */
int manager_buscarSala(manager *mng, char *sname){

  return buscar(mng->salas,mng->numSalas, sname);
}


/**
 * Suscribe un cliente a una sala.
 * Imprime error si el cliente o la sala no existen.
 * Imprime error si el cliente ya se encontraba suscrito
 * a dicha sala.
 * @param mng manager a modificar
 * @param clname nombre del cliente a suscribir
 * @param sname nombre de la sala a la cual suscribir el cliente.
 */
int  manager_suscribirCliente(manager *mng, char *clname, char * sname){

    //Busca el cliente y la sala
    int indexCliente = manager_buscarCliente(mng, clname);
    int indexSala = manager_buscarSala(mng, sname);
    
    
    //Revisa que ambos existan
    if (indexCliente < 0){
      printf("Error: Cliente no encontrado.\n");
      return 0;
 
    }
    if (indexSala < 0) {
      printf("Error: Sala no encontrada.\n");
      return 0;
    }
    
    
    //Revisa que el cliente no este suscrito a dicha sala.
    int numSalasCl = mng->clientes[indexCliente]->numSalas;
    if (buscar(mng->clientes[indexCliente]->salas, numSalasCl, sname) >= 0){
      printf("Error: cliente ya se encuentra en la sala.\n");
      return 0;
    }
    
    //Agrega la sala a la lista de salas del cliente.
    //Agrega el cliente a la lista de clientes de la sala.
    cliente_agregarSala(mng->clientes[indexCliente], sname);
    sala_agregarCliente(mng->salas[indexSala], clname);
    return 1;
    
}

/**
 * Desuscribe un cliente de todas las salas.
 * Imprime error si el cliente no existe o
 * si no se encuentra suscrito a ninguna sala.
 * @param mng manager a modificar
 * @param clname nombre del cliente a desuscribir
 */
void manager_desuscribirCliente(manager *mng, char *clname){

    //Busca el cliente
    int indexCliente = manager_buscarCliente(mng, clname);
    
   //Revisa que el cliente exista 
    if (indexCliente < 0){
      printf("Error: Cliente no encontrado.\n");
      return;
    
    }    
    
    //Revisa que el cliente se encuentre suscrito a alguna sala
    if (mng->clientes[indexCliente]->numSalas <= 0){
      printf("Error: Cliente no posee suscripciones");
      return;
    }
    
    //Elimina la informacion del cliente en todas las salas
    //que se encuentre suscrito.
    int i;
    int indexSala;
    char *sala;
    for (i = 0; i < mng->clientes[indexCliente]->numSalas; i++){
      sala = mng->clientes[indexCliente]->salas[i];    
      indexSala = manager_buscarSala(mng, sala);
      sala_eliminarCliente(mng->salas[indexSala], clname);
    }
    
    //Elimina las salas del cliente.
    cliente_borrarSalas(mng->clientes[indexCliente]);

}

/**
 * Elimina un cliente del manejador
 * Imprime error si no existe.
 * @param mng manager a modificar
 * @param clname nombre del cliente a eliminar
 */
void manager_eliminarCliente(manager *mng, char *clname){

    //Revisa que el cliente exista
    int indexCliente = manager_buscarCliente(mng, clname);    
    if (indexCliente < 0){
      printf("Error: Cliente no encontrado.\n");
      return;
    }
    
    //Si posee suscripciones lo desuscribe
    if (mng->clientes[indexCliente]->numSalas > 0){ 
      manager_desuscribirCliente(mng, clname);
    }
    
    //Elimina el cliente
    cliente_eliminar(mng->clientes[indexCliente]);
    
    
    //Desplaza el arreglo una posicion, hasta el indice encontrado.
    int i;
    for (i = indexCliente; i < (mng->numClientes -1); i++){
      *mng->clientes[i] =  *mng->clientes[i+1];
    }

    //Pongo la memoria en blanco de la previa posicion maxima
    memset(mng->clientes[mng->numClientes-1], 0, sizeof (cliente *));
    
    //Decremento el tamanio
    mng->numClientes = mng->numClientes -1;
   
}


/**
 * Elimina una sala del manejador
 * Imprime error si no existe.
 * @param mng manager a modificar
 * @param sname nombre de la sala a eliminar
 */
int manager_eliminarSala(manager *mng, char* sname){

    //Revisa que la sala exista
    int indexSala = manager_buscarSala(mng, sname);    
    if (indexSala < 0){
      printf("Error: Sala no encontrada.\n");
      return 0;
    }
    
    //Elimino la sala de todos los clientes
    int i;
    int numSalasCl;
    for (i = 0; i < mng->numClientes ; i++){
      numSalasCl = mng->clientes[i]->numSalas;
      if (buscar(mng->clientes[i]->salas, numSalasCl,sname) >= 0){
        cliente_eliminarSala(mng->clientes[i],sname);
      }
    }
 
    //Elimino la sala. 
    sala_eliminar(mng->salas[indexSala]); 
    
    //Desplaza el arreglo una posicion, hasta el indice encontrado.  
    for (i = indexSala; i < (mng->numSalas -1); i++){
      *mng->salas[i] =  *mng->salas[i+1];
    }

    //Pongo la memoria en blanco de la previa posicion maxima
    memset(mng->salas[mng->numSalas-1], 0, sizeof (sala *));
    
    //Decremento el tamanio
    mng->numSalas = mng->numSalas -1;

    return 1;
}


/**
 * Muestra todos los clientes del manager
 * @param mng manager a consultar
 */
void manager_mostrarClientes(manager *mng){
    int i;
    for (i = 0; i < mng->numClientes; i++){
      cliente_imprimir(mng->clientes[i]);
    }
}

/**
 * Muestra todas las salas del manager
 * @param mng manager a consultar
 */
void manager_mostrarSalas(manager *mng){
    int i;
    for (i = 0; i < mng->numSalas; i++){
      sala_imprimir(mng->salas[i]);
    }
}

/**
 * Elimina un manager
 * @param mng manager a eliminar
 */
void manager_eliminar(manager *mng){
    int i;
    
    //Elimino todas las salas
    for (i = 0; i < mng->numSalas; i++){
      sala_eliminar(mng->salas[i]);
      free(mng->salas[i]);
    }
    for (i = mng->numSalas; i < mng->maxSalas; i++){
      free(mng->salas[i]);
    }
    free(mng->salas);
    
    //Elimino todos los clientes.
    for (i = 0; i < mng->numClientes; i++){
      cliente_eliminar(mng->clientes[i]);
      free(mng->clientes[i]);
    }
    for (i = mng->numClientes; i < mng->maxClientes; i++){
      free(mng->clientes[i]);
    }
    free(mng->clientes);
    
    
    
}


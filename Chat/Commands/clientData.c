#include <stdlib.h>
#include <stdio.h>
#include <strings.h>
#include "clientData.h"
#include <string.h>

#define INIT_SIZE 10

/**
 * Modulo que define los tipos cliente y sala.
 * Las cuales seran usados por el manager.
 * 
 * Implementa funciones auxiliares, a ser usadas
 * por ambos tipos.
 */


/**
 * Funcion auxiliar.
 * Duplica el tamanio de un arreglo de caracteres.
 * Copia la informacion del arreglo en una nueva
 * direccion de memoria, y reserva el espacio restante.
 */
void doubleArray(char ***array, int arraySize){

    //Localiza el arreglo a una nueva direccion de 
    //memoria con doble capacidad.
    int newSize = arraySize *2;
    *array = (char **) realloc(*array, newSize * sizeof(char *));  
     
    if (!array) {
      perror("Error: Realloc failure.\n");
      exit(-1);
    } 
    
    //Reserva espacio de memoria para los elementos restantes.
    int i;
    for (i = arraySize; i < newSize; i++){
      (*array)[i] = malloc((MAX_SIZE) * sizeof(char));
    }
    
}

/**
 * Funcion auxiliar.
 * Busca un elemento en un arreglo y retorna su posicion.
 * Emplea busqueda binaria.
 * Si el elemento no existe, retorna -1
 */
int buscar(char** array , int arraySize, char* elem){

  //Variables para emplear busqueda binaria. 
  int inf = 0;
  int sup = arraySize - 1;
    
  while (sup >= inf) {
			int medio = (inf + sup) / 2;

			// Si consigo el elemento retorno la posicion encontrada
			if (strcmp(elem, array[medio]) == 0) {
				return medio;
			}
			// Si el elemento a agregar es mayor que que el
			// elemento medio
			// incremento inf
			if (strcmp(elem, array[medio]) > 0) {
				inf = medio + 1;
			}
			// Si el elemento a agregar es menor que el
			// elemento medio
			// decremento sup
			if (strcmp(elem, array[medio]) < 0) {
				sup = medio - 1;
			}
		}
		// Si no consigo el elemento retorno -1
		return -1;

}

/**
 * Funcion auxiliar.
 * Busca el indice de un nuevo elemento a agregar.
 * Emplea busqueda binaria.
 * Si el elemento ya existe, retorna -1
 */
int buscarIndice(char** array , int arraySize, char* elem){

  //Variables para emplear busqueda binaria. 
  int inf = 0;
  int sup = arraySize - 1;
  
  //Si el elemento a agregar es mayor que el ultimo,
  //Lo coloco al final.  
  if (strcmp(elem, array[sup]) > 0){
    return arraySize;
  }

  //Si el elemento a agregar es menor que el primero,
  //Lo coloco al inicio.
  if (strcmp(elem, array[inf]) < 0){
    return 0;
  }
  
  while (sup >= inf) {
			int medio = (inf + sup) / 2;
			// Si consigo el elemento retorno -1
			if (strcmp(elem, array[medio]) == 0) {
				return -1;
			}
			// Si el elemento a agregar es mayor que que el
			// elemento medio
			// incremento inf
			if (strcmp(elem, array[medio]) > 0) {
				inf = medio + 1;
			}
			// Si el elemento a agregar es menor que el
			// elemento medio
			// decremento sup
			if (strcmp(elem, array[medio]) < 0) {
				sup = medio - 1;
			}
		}
		// Retorno la ultima posicion incrementada en 1 dado
		// que la posicion donde debo agregar el elemento debe
		// contener un elemento mayor que este
		return sup+1;

}


/**
 * Tipo cliente
 * Posee nombre y la lista de nombres 
 * de sala al cual pertenece
 */


/**
 * Inicializador del tipo cliente.
 * Inicializa su lista de salas y su nombre.
 * @param clname nombre del cliente
 * @return cliente que fue inicializado
 */
cliente* cliente_crear(char *clname, int fd){

    //Reserva espacio inicial.
    cliente *cl = malloc(sizeof(cliente));
    
    if (!cl) {
      perror("Error: Malloc failure.\n");
      exit(-1);
    }
    
    //Inicializa el nombre y file descriptor del cliente.
    strcpy(cl->name,clname);
    cl->descriptor = fd;
    
    //Reserva espacio para salas
    cl->salas = (char**) malloc(INIT_SIZE * sizeof(char*));
    int i;
    for (i = 0; i < INIT_SIZE; i++){
      cl->salas[i] = malloc((MAX_SIZE) * sizeof(char));
    }

    //Inicializa informacion de las salas
    cl->numSalas = 0;
    cl->maxSalas = INIT_SIZE;

    return cl;
}

/**
 * Agrega una sala a un cliente.
 * Imprime un mensaje de error si el cliente posee dicha sala.
 * @param cl cliente a ser modificado
 * @param sala a agregar
 */
void cliente_agregarSala(cliente *cl, char *sala){

    //Primer elemento a agregar
    if (cl->numSalas == 0){
      strcpy(cl->salas[0],sala);
      cl->numSalas = cl->numSalas + 1;
      return;
    }
  
    //Revisa si la sala se encuentra en el arreglo.
    if (buscar(cl->salas, cl->numSalas, sala) >= 0){
      printf("Error: cliente ya se encuentra en la sala.\n");
      return;
      
    }
    
    //Revisa si es necesario duplicar el tamanio del arreglo.
    if (cl->numSalas == cl->maxSalas){
      doubleArray(&(cl->salas), cl->maxSalas);
      cl->maxSalas = cl->maxSalas * 2;
    }
    
    //Busca la posicion a agregar el elemento
    int index = buscarIndice(cl->salas, cl->numSalas, sala);
    
    //Desplaza el arreglo una posicion para agregar el nuevo elemento.   
    int i;
    for(i = cl->numSalas; i > index; i--){
      strcpy(cl->salas[i], cl->salas[i-1]);
    }
    
    //Guarda el nuevo elemento e incrementa el tamanio.
    strcpy(cl->salas[index],sala);
    cl->numSalas = cl->numSalas + 1;   
   
}

/**
 * Elimina una sala del cliente
 * Imprime error si no existe
 * @param cl cliente a modificar
 * @param sala a eliminar
 */
void cliente_eliminarSala(cliente *cl, char *sala){

   //Revisa que el cliente posea dicha sala
   int index =  buscar(cl->salas, cl->numSalas, sala);
   if (index < 0){
     printf("%s \n", "Error: El cliente no se encuentra en dicha sala.");
     return;
   }
   
   //Desplaza el arreglo una posicion, hasta el indice encontrado.
   int i;
   for (i = index; i < (cl->numSalas -1); i++){
      strcpy(cl->salas[i], cl->salas[i+1]);
   }

   //Pongo la memoria en blanco de la previa posicion maxima
   memset(cl->salas[cl->numSalas-1], 0, MAX_SIZE);
   
   //Decremento el tamanio
   cl->numSalas = cl->numSalas -1;

}


/**
 * Elimina todas las salas de un cliente
 * Imprime error si no existe
 * @param cl cliente a modificar
 */
void cliente_borrarSalas(cliente *cl){

    //Libera espacio de todas las salas
    int i;
    for (i = 0; i < cl->maxSalas; i++){
      free(cl->salas[i]);
    }
    free(cl->salas);
    
    //Reserva el espacio original
    cl->salas = (char**) malloc(INIT_SIZE * sizeof(char*));
    for (i = 0; i < INIT_SIZE; i++){
      (cl->salas)[i] = malloc((MAX_SIZE) * sizeof(char));
    }

    //Modifica informacion de las salas
    cl->numSalas = 0;
    cl->maxSalas = INIT_SIZE;
   
} 

/**
 * Elimina el cliente y toda su informacion.
 * @param cl cliente a eliminar
 */
void cliente_eliminar(cliente *cl){

    //Elimina todas las salas
    int i;
    for (i = 0; i < cl->maxSalas; i++){
      free(cl->salas[i]);
    }
    free(cl->salas);
    
    //Modifica informacion de las salas
    cl->numSalas = 0;
    cl->maxSalas = INIT_SIZE;
    
}

/**
 * Imprime la informacion del cliente
 * @param cl cliente a imprimir
 */
void cliente_imprimir(cliente *cl){

  printf("Cliente: %s ", cl->name);
  printf("Salas: [");
  int i;
  if (cl->numSalas == 0){
    printf("]\n");
    return;
  }
  
  for (i = 0; i < cl->numSalas-1;i++){
    printf("%s, ", cl->salas[i]);
  }
  
  printf("%s", cl->salas[cl->numSalas-1]);
  printf("] \n");
  
}


/**
 * Tipo sala
 * Posee nombre y la lista de nombres 
 * de clientes que pertenecen a ella.
 */
 
/**
 * Inicializador del tipo sala.
 * Inicializa su lista de clientes y su nombre.
 * @param sname nombre de la sala
 * @return sala que fue inicializada
 */
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

/**
 * Agrega un cliente a una sala
 * Imprime un mensaje de error si en la sala
 * ya se encuentra dicho cliente.
 * @param s sala a ser modificada
 * @param cliente a agregar
 */
void sala_agregarCliente(sala *s, char *cliente){

    //Primer elemento a agregar
    if (s->numClientes == 0){
      strcpy(s->clientes[0], cliente);
      s->numClientes = s->numClientes + 1;
      return;
    }

    //Revisa si el cliente se encuentra en el arreglo.
    if (buscar(s->clientes,s->numClientes, cliente) >= 0){
      printf("Error: cliente ya se encuentra en la sala.\n");
      return;
    }
    
    //Revisa si es necesario duplicar el tamanio del arreglo.
    if (s->numClientes == s->maxClientes){
    
      doubleArray(&(s->clientes), s->maxClientes);
      s->maxClientes = s->maxClientes * 2;
      
    }
    
    //Busca la posicion a agregar el elemento
    int index = buscarIndice(s->clientes, s->numClientes, cliente);    
    
    //Desplaza el arreglo una posicion para agregar el nuevo elemento.     
    int i;
    for(i = s->numClientes; i > index; i--){
      strcpy(s->clientes[i], s->clientes[i-1]);
    }
    
    //Guarda el nuevo elemento e incrementa el tamanio.
    strcpy(s->clientes[index],cliente);
    s->numClientes = s->numClientes + 1;

}

/**
 * Elimina un cliente de una sala
 * Imprime error si no existe
 * @param s sala a modificar
 */
void sala_eliminarCliente(sala *s, char *cliente){

   //Revisa que el cliente se encuentre en  dicha sala
   int index =  buscar(s->clientes,s->numClientes, cliente);
   if (index < 0){
     printf("%s \n", "Error: El cliente no se encuentra en dicha sala.");
     return;
   }
   
   //Desplaza el arreglo una posicion, hasta el indice encontrado.
   int i;
   for (i = index; i < (s->numClientes -1); i++){
      strcpy(s->clientes[i], s->clientes[i+1]);
   }

   //Pongo la memoria en blanco de la previa posicion maxima
   memset(s->clientes[s->numClientes-1], 0, MAX_SIZE);
   
   //Decremento el tamanio
   s->numClientes = s->numClientes -1;

}

/**
 * Elimina todos los clientes de una sala
 * Imprime error si no existe
 * @param cl cliente a modificar
 */
void sala_borrarClientes(sala *s){

    //Libera espacio de todos los clientes
    int i;
    for (i = 0; i < s->maxClientes; i++){
      free(s->clientes[i]);
    }
    free(s->clientes);
    
    //Reserva el espacio original
    s->clientes = (char**) malloc(INIT_SIZE * sizeof(char*));
    for (i = 0; i < INIT_SIZE; i++){
      (s->clientes)[i] = malloc((MAX_SIZE) * sizeof(char)); 
    }

    //Modifica informacion de las salas
    s->numClientes = 0;
    s->maxClientes = INIT_SIZE;
   
} 

/**
 * Elimina la sala y toda su informacion.
 * @param s sala a eliminar
 */
void sala_eliminar(sala *s){


    //Elimina todos los clientes
    int i;
    for (i = 0; i < s->maxClientes; i++){
      free(s->clientes[i]);
    }
    free(s->clientes);
    
    //Modifico informacion de las salas
    s->numClientes = 0;
    s->maxClientes = INIT_SIZE;
    
}

/**
 * Imprime la informacion de la sala
 * @param s sala a imprimir
 */
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



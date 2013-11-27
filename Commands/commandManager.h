#include <stdio.h>
#include <stdlib.h>
#include "clientData.h"

/**
 * Modulo que implementa las funcionalidades 
 * de los comandos del chat. Manager
 * 
 * Posee un arreglo de clientes y de salas.
 * Y lo modifica de acuerdo a las funciones. 
 */

typedef struct Manager
{
  cliente** clientes;
  sala** salas;
  
  
  //Indica el numero de salas y clientes.
  int numSalas;
  int maxSalas;
  
  int numClientes;
  int maxClientes;
  
} manager;

/**
 * Inicializador del modulo.
 * Inicializa la lista de sala y de clientes.
 * Reserva su espacio e inicializa su informacion.
 * Posee una lista de clientes, y una lista de salas.
 * @return mng manager que fue inicializado
 */
manager* manager_crear();

/**
 * Agrega un cliente al manager.
 * Imprime un mensaje de error si ya existe.
 * @param mng manager a ser modificado
 * @param clname nombre del cliente a agregar
 */
void manager_agregarCliente(manager *mng, char* clname);

/**
 * Agrega una sala al manejador
 * Imprime un mensaje de error si ya existe.
 * @param mng manager a ser modificado
 * @param sname nombre de la sala a agregar
 */
void manager_agregarSala(manager *mng, char* sname);

/**
 * Busca un cliente en el manejador
 * Retorna su posicion en el arreglo. 
 * Retorna -1 si no existe.
 * @param mng manager a ser buscado
 * @param clname nombre del cliente a buscar
 */
int manager_buscarCliente(manager *mng, char *clname);

/**
 * Busca una sala en el manejador
 * Retorna su posicion en el arreglo. 
 * Retorna -1 si no existe.
 * @param mng manager a ser buscado
 * @param sname nombre de la sala a buscar
 */
int manager_buscarSala(manager *mng, char *sname);

/**
 * Suscribe un cliente a una sala.
 * Imprime error si el cliente o la sala no existen.
 * Imprime error si el cliente ya se encontraba suscrito
 * a dicha sala.
 * @param mng manager a modificar
 * @param clname nombre del cliente a suscribir
 * @param sname nombre de la sala a la cual suscribir el cliente.
 */
void manager_suscribirCliente(manager *mng, char *clname, char * sname);

/**
 * Desuscribe un cliente de todas las salas.
 * Imprime error si el cliente no existe o
 * si no se encuentra suscrito a ninguna sala.
 * @param mng manager a modificar
 * @param clname nombre del cliente a desuscribir
 */
void manager_desuscribirCliente(manager *mng, char *clname);

/**
 * Elimina un cliente del manejador
 * Imprime error si no existe.
 * @param mng manager a modificar
 * @param clname nombre del cliente a eliminar
 */
void manager_eliminarCliente(manager *mng, char *clname);

/**
 * Elimina una sala del manejador
 * Imprime error si no existe.
 * @param mng manager a modificar
 * @param sname nombre de la sala a eliminar
 */
void manager_eliminarSala(manager *mng, char* sname);

/**
 * Muestra todos los clientes del manager
 * @param mng manager a consultar
 */
void manager_mostrarClientes(manager *mng);

/**
 * Muestra todas las salas del manager
 * @param mng manager a consultar
 */
void manager_mostrarSalas(manager *mng);




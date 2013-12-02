#define MAX_SIZE 50

/**
 * Modulo que define los tipos cliente y sala.
 * Las cuales seran usados por el manager.
 * 
 * Implementa funciones auxiliares, a ser usadas
 * por ambos tipos.
 */


/**
 * Tipo cliente
 * Posee nombre y la lista de nombres 
 * de sala al cual pertenece
 */
typedef struct Cliente
{
   char  name[MAX_SIZE];
   char** salas;
   int numSalas; //Current number of rooms
   int maxSalas; //Max number of rooms
   int descriptor;
   
} cliente;

/**
 * Tipo sala
 * Posee nombre y la lista de nombres 
 * de clientes que pertenecen a ella.
 */
typedef struct Sala
{
  char name[MAX_SIZE];
  char** clientes;
  int numClientes;
  int maxClientes;
} sala;

/**
 * Inicializador del tipo cliente.
 * Inicializa su lista de salas y su nombre.
 * @param clname nombre del cliente
 * @param fd file descriptor del cliente
 * @return cliente que fue inicializado
 */
cliente* cliente_crear(char *clname, int fd);

/**
 * Agrega una sala a un cliente.
 * Imprime un mensaje de error si el cliente posee dicha sala.
 * @param cl cliente a ser modificado
 * @param sala a agregar
 */
void cliente_agregarSala(cliente *cl, char *sala);

/**
 * Elimina una sala del cliente
 * Imprime error si no existe
 * @param cl cliente a modificar
 * @param sala a eliminar
 */
void cliente_eliminarSala(cliente *cl, char *sala);

/**
 * Elimina todas las salas de un cliente
 * Imprime error si no existe
 * @param cl cliente a modificar
 */
void cliente_borrarSalas(cliente *cl);

/**
 * Imprime la informacion del cliente
 * @param cl cliente a imprimir
 */
void cliente_imprimir(cliente *cl);

/**
 * Elimina el cliente y toda su informacion.
 * @param cl cliente a eliminar
 */
void cliente_eliminar(cliente *cl);

/**
 * Inicializador del tipo sala.
 * Inicializa su lista de clientes y su nombre.
 * @param sname nombre de la sala
 * @return sala que fue inicializada
 */
sala* sala_crear(char *sname);

/**
 * Agrega un cliente a una sala
 * Imprime un mensaje de error si en la sala
 * ya se encuentra dicho cliente.
 * @param s sala a ser modificada
 * @param cliente a agregar
 */
void sala_agregarCliente(sala *s, char *cliente);

/**
 * Elimina un cliente de una sala
 * Imprime error si no existe
 * @param s sala a modificar
 */
void sala_eliminarCliente(sala *s, char *cliente);

/**
 * Elimina todos los clientes de una sala
 * Imprime error si no existe
 * @param cl cliente a modificar
 */
void sala_borrarClientes(sala *s);

/**
 * Imprime la informacion de la sala
 * @param s sala a imprimir
 */
void sala_imprimir(sala *s);

/**
 * Elimina la sala y toda su informacion.
 * @param s sala a eliminar
 */
void sala_eliminar(sala *s);


#define MAX_SIZE 50


typedef struct Cliente
{
   char  name[MAX_SIZE];
   char** salas;
   int numSalas; //Current number of rooms
   int maxSalas; //Max number of rooms
   int descriptor;
   
} cliente;

typedef struct Sala
{
  char name[MAX_SIZE];
  char** clientes;
  int numClientes;
  int maxClientes;
} sala;


cliente* cliente_crear(char *clname, int des);
void cliente_agregarSala(cliente *cl, char *sala);
void cliente_eliminarSala(cliente *cl, char *sala);
void cliente_borrarSalas(cliente *cl);
void cliente_imprimir(cliente *cl);
void cliente_eliminar(cliente *cl);

sala* sala_crear(char *sname);
void sala_agregarCliente(sala *s, char *cliente);
void sala_eliminarCliente(sala *s, char *cliente);
void sala_borrarClientes(sala *s);
void sala_imprimir(sala *s);
void sala_eliminar(sala *s);

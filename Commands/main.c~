#include <stdio.h>
#include <stdlib.h>
#include "commandManager.h"

int main()
{
    
    manager *mg;
    mg = manager_crear();
    
    manager_agregarCliente(mg,"user1");
    manager_agregarCliente(mg,"user42");
    manager_agregarCliente(mg,"user432");
    manager_agregarCliente(mg,"user453");
    manager_agregarCliente(mg,"user53");
    manager_agregarCliente(mg,"user43");
    manager_agregarCliente(mg,"user32");
   
    
    manager_agregarSala(mg,"room32");
    manager_agregarSala(mg,"room342");
    manager_agregarSala(mg,"room532");
    manager_agregarSala(mg,"room545");
    manager_agregarSala(mg,"room54");
    manager_agregarSala(mg,"room24");
    
    manager_suscribirCliente(mg, "user32","room342"); 
    
    manager_suscribirCliente(mg, "user53","room54");
    manager_suscribirCliente(mg, "user53","room24"); 
    manager_suscribirCliente(mg, "user53","room32"); 
    manager_suscribirCliente(mg, "user53","room342"); 
    
    
    
    manager_suscribirCliente(mg, "user42","room342"); 
    
    manager_mostrarClientes(mg);
    printf("-----------------\n");
    
    manager_mostrarSalas(mg);
    
    
    
    
    manager_eliminarCliente(mg, "user42");
    manager_agregarCliente(mg, "user4342");
    manager_eliminarCliente(mg, "user53");
    
    manager_eliminarSala(mg, "room342");
    
    manager_suscribirCliente(mg, "user453","room32"); 
    manager_suscribirCliente(mg, "user32","room32"); 
    manager_suscribirCliente(mg, "user432","room32"); 
    
    printf("AFTER\n");
    
    manager_mostrarClientes(mg);
    printf("-----------------\n");
    
    manager_mostrarSalas(mg);
    
    manager_eliminarSala(mg, "room32");
    
    manager_suscribirCliente(mg, "user4342","room24"); 
    
    manager_eliminarSala(mg, "room24");
    
    printf("AFTER\n");
    
    manager_mostrarClientes(mg);
    printf("-----------------\n");
    
    manager_mostrarSalas(mg);
    
    return 0;
}

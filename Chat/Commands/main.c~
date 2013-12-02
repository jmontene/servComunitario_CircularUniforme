#include <stdio.h>
#include <stdlib.h>
#include "commandManager.h"
#include <string.h>
#include <time.h>

int main()
{
    
    manager *mg;
    mg = manager_crear("lobby");
    
    manager_agregarCliente(mg,"user1",3);
    manager_agregarCliente(mg,"user3",3);
    manager_agregarCliente(mg,"user32",4);
    manager_agregarCliente(mg,"user453",4);
    manager_agregarCliente(mg,"user53",4);
    manager_agregarCliente(mg,"user43",4);
    manager_agregarCliente(mg,"user42",5);
   
    
    manager_agregarSala(mg,"room32");
    manager_agregarSala(mg,"room342");
    manager_agregarSala(mg,"room532");
    
    manager_mostrarSalas(mg);
    
    manager_eliminarSala(mg, "room32");
    manager_eliminarSala(mg, "lobby");
    
/*    manager_agregarSala(mg,"room453");*/
/*    manager_agregarSala(mg,"room54");*/
/*    manager_agregarSala(mg,"room24");*/
/*    */
/*    manager_suscribirCliente(mg, "user32","room24"); */
/*    */
/*    manager_suscribirCliente(mg, "user53","room54");*/
/*    manager_suscribirCliente(mg, "user53","room24"); */
/*    manager_suscribirCliente(mg, "user53","room32"); */
/*    manager_suscribirCliente(mg, "user53","room342"); */
/*    */
/*    */
/*    */
/*    manager_suscribirCliente(mg, "user42","room342"); */
/*    */
    manager_mostrarClientes(mg);
/*    printf("-----------------\n");*/
/*    */
/*    manager_mostrarSalas(mg);*/
/*    */
/*    */
/*    */
/*    */
/*    manager_eliminarCliente(mg, "user42");*/
/*    manager_eliminarCliente(mg, "user53");*/
/*    */
/*    manager_eliminarSala(mg, "room342");*/
/*    */
/*    manager_suscribirCliente(mg, "user453","room32"); */
/*    manager_suscribirCliente(mg, "user32","room32"); */
/*    */
/*    printf("AFTER\n");*/
/*    */
/*    manager_mostrarClientes(mg);*/
/*    printf("-----------------\n");*/
/*    */
/*    manager_mostrarSalas(mg);*/
/*    */
/*    manager_eliminarSala(mg, "room32");*/
/*    */
/*    */
/*    manager_eliminarSala(mg, "room24");*/
/*    */
/*    printf("AFTER\n");*/
/*    */
/*    manager_mostrarClientes(mg);*/
/*    printf("-----------------\n");*/
/*    */
/*    manager_mostrarSalas(mg);*/
/*    */
/*    manager_eliminarCliente(mg,"user235");*/
/*    */
/*    manager_eliminar(mg);*/
/*    free(mg);*/
    
    //Efficienty Tests
/*    manager *mg_et; */
/*    mg_et = manager_crear();*/
/*    */
/*    int i;*/
/*    int n;*/
/*    int testValue = 20;*/
/*    char buffer[16];*/
/*    char user[16];*/
/*    char room[16];*/
/*    int maxValue = 25000;*/
/*    */
/*    srand(time(NULL));*/
    
    
/*    for (i = 0; i < testValue; i++){*/
/*      */
/*      n = rand() % maxValue;*/
/*      */
/*      strcpy(user, "user");*/
/*  */
/*      sprintf(buffer, "%d", n);*/
/*      */
/*      strcat(user,buffer);*/
/*      manager_agregarCliente(mg_et,user);*/
/*      manager_agregarSala(mg_et,buffer);*/
/*    } */

/*   manager_agregarCliente(mg_et,"testUser");*/
/*   */
/*   for (i = 0; i < testValue; i++){*/
/*      n = rand() % maxValue;*/
/*      strcpy(room, "room");*/
/*      sprintf(buffer, "%d", n);*/
/*      strcat(room,buffer);*/
/*      manager_agregarSala(mg_et, room);*/
/*      manager_suscribirCliente(mg_et, "testUser",room);*/
/*   }*/

/*   manager_agregarSala(mg_et,"testRoom");*/
/*   */
/*   for (i = 0; i < testValue; i++){*/
/*      n = rand() % maxValue;*/
/*      strcpy(user, "user");*/
/*      sprintf(buffer, "%d", n);*/
/*      strcat(user,buffer);*/
/*      manager_agregarCliente(mg_et, user);*/
/*      manager_suscribirCliente(mg_et, user, "testRoom");*/
/*   }*/

/*    */
/*   manager_mostrarClientes(mg_et);*/
/*   manager_mostrarSalas(mg_et);*/
    
    return 0;
}

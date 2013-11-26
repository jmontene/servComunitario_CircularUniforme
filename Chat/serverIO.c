#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#define MAX_THREADS 256
#define MAX_MSG_SIZE 256

void readFromClient(char *buffer, int fd){
  bzero(buffer,MAX_MSG_SIZE);
  int n;
  n = read(fd,buffer,MAX_MSG_SIZE-1);
  if (n < 0)
     error("ERROR reading from socket");
}

void writeToClient(const char *mes, int fd){
  int n;
  n = write(fd,mes,strlen(mes)-1);
  if (n < 0)
     error("ERROR writing to socket");
}

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#define MAX_THREADS 256
#define MAX_MSG_SIZE 256

void readFromClient(char *buffer, int fd);
void writeToClient(const char *mes, int fd);
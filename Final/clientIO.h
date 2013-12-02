#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <regex.h>
#include <strings.h>
#define MAX_MSG_SIZE 256

int parseInstruction(const char *buffer);
void writeToServer(const char *mes, int fd);
void readFromServer(char *buffer, int fd);
void executeFromFile(const char *file_name,int sockfd);
void serverCommand(const char *buffer);

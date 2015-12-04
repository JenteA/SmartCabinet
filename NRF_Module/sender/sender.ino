#include <QueueArray.h>
#include <SPI.h>
#include <avr/pgmspace.h>
#include "RF24.h"

// Hardware configuration: Set up nRF24L01 radio on SPI bus plus pins 7 & 8 
RF24 radio(7,8);

// FIFO buffer for storing user input.
QueueArray <char> input_buffer;

const byte transmitterAddress[] = "Oli";
const byte receiverAddress[] = "Reini";

void setup() {
  // Don't go too fast. Don't want buffer overflow before radio can send.
  Serial.begin(9600);
  // Default serial timeout is 1 second, which seems to be too short for long messages.
  Serial.setTimeout(100000);
  
  // Initialize RF24.
  radio.begin();

  // Set the Power Amplifier level low, since the radios will be close to each other in this case.
  radio.setPALevel(RF24_PA_LOW);
  
  // Open a writing and reading pipe on each radio, with opposite addresses  
  radio.openWritingPipe(transmitterAddress);
  radio.openReadingPipe(1,receiverAddress);
  
  // This radio will only send.
  radio.stopListening();
  
  Serial.println(F("Type your message and press enter to send."));
}

// Interrupt when serial data is available. Does not work on Esplora, Leonardo, or Micro.
// If the serial baud rate is too high, the buffer will probably overflow before it gets sent over radio. - TO BE TESTED -
void serialEvent(){
   // Push serial data to FIFO as long as the 64-byte Serial Buffer isn't empty.
  do {input_buffer.push(Serial.read());}
  while (Serial.peek() != -1);
} 

void loop() {
  // If there's data in the FIFO buffer.
  if(!input_buffer.isEmpty()){   
    // Pop a char out of the buffer.
    char current = input_buffer.pop();
    
    // Send it over radio.
    if(radio.write(&current,1)){   
      // Succes, print what was sent.
      Serial.print(current);
    }
    else{
      // Failed.
      Serial.println(F("TX FAIL"));
    }
  } 
}


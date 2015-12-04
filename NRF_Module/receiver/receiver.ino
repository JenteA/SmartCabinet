#include <SPI.h>
#include "RF24.h"

/* Hardware configuration: Set up nRF24L01 radio on SPI bus plus pins 7 & 8 */
RF24 radio(7,8);

const byte transmitterAddress[] = "Reini";
const byte receiverAddress[] = "Oli";

void setup() {
  Serial.begin(9600);
  
  // Initialize RF24.
  radio.begin();

  // Set the Power Amplifier level low, since the radios will be close to each other in this case.
  radio.setPALevel(RF24_PA_LOW);

  radio.openWritingPipe(transmitterAddress);
  radio.openReadingPipe(1,receiverAddress);

  // Start the radio listening for data
  radio.startListening();
}

int msg[1];

void loop() {
  // If data was received from radio.
  if (radio.available()){
    // Read 1 byte of data.
    radio.read(msg, 1); 
    char theChar = msg[0];
    
    // Print what was received.
    Serial.print(theChar);     
   }
 }


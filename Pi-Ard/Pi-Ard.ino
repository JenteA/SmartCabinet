#include <SoftwareSerial.h>
#define RFID_READ 0x01
#define RFID_WRITE 0x02
#define txPin 6
#define rxPin 8
#define whichSpace 3
#define first 01                 // first, second, third, and fourth are four arbitrary values which will be written to the RFID tag at address whichSpace
#define second 01
#define third 01
#define fourth 01

String ArduinoData = "";
String OldArduinoData = "";
int incomingByte = 0;
bool dicht = true;
int Led = 11;
int Knop = 13;
bool same = false;


SoftwareSerial mySerial(rxPin, txPin);
int val;
int runs = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(Led, OUTPUT);
  pinMode(Knop, INPUT);
  mySerial.begin(9600);
  pinMode(txPin, OUTPUT);
  pinMode(rxPin, INPUT);
}
void suppressAll()                                //suppresses the "null result" from being printed if no RFID tag is present
{
  if (mySerial.available() > 0)
  { mySerial.read();
    suppressAll();
  }
}

void Read()
{
  mySerial.print("!RW");
  mySerial.write(byte(RFID_READ));
  mySerial.write(byte(32));

  if (mySerial.available() > 0)
  {
    val = mySerial.read();                        //The mySerial.read() procedure is called, but the result is not printed because I don't want the "error message: 1" cluttering up the serial monitor
    if (val != 1)                                   //If the error code is anything other than 1, then the RFID tag was not read correctly and any data collected is meaningless. In this case since we don't care about the resultant values they can be suppressed
    {
      suppressAll();
    }
  }
  if (mySerial.available() > 0) {
    val = mySerial.read();
    ArduinoData += String(val, HEX);
  }

  if (mySerial.available() > 0) {
    val = mySerial.read();
    ArduinoData += String(val, HEX);
  }

  if (mySerial.available() > 0) {
    val = mySerial.read();
    ArduinoData += String(val, HEX);
  }

  if (mySerial.available() > 0) {
    val = mySerial.read();
    ArduinoData += String(val, HEX);
  }
 ArduinoData += "\r\n";
}

void loop() {
  // put your main code here, to run repeatedly:

  readDoor();
  
  if(dicht)
  {
    if(Serial.available() > 0)
    {
      incomingByte = Serial.read();
      Serial.println(incomingByte, DEC);
    }
  }
  else
  {
    
    Read();
    Serial.println(ArduinoData);
  }
 
}
void readDoor()
{
  if(digitalRead(Knop)==0)
  {
    digitalWrite(Led, LOW);
    dicht = true;
  }
  else 
  {
    digitalWrite(Led, HIGH);
    dicht = false;
  }


    
}

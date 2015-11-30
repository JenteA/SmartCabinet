#include <SoftwareSerial.h>
#define RFID_READ 0x01
#define RFID_WRITE 0x02
#define txPin 6
#define rxPin 8
#define whichSpace 3
#define first 01                 // first, second, thrid, and fourth are four arbitrary values which will be written to the RFID tag at address whichSpace
#define second 01
#define third 01
#define fourth 01

SoftwareSerial mySerial(rxPin, txPin);
int val;
int runs = 0;

void setup()
{
  Serial.begin(9600);
  Serial.println("RFID Read/Write Test");
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

void Write()
{
  mySerial.print("!RW");
  mySerial.write(byte(RFID_WRITE));
  mySerial.write(byte(whichSpace));
  mySerial.write(byte(first));
  mySerial.write(byte(second));
  mySerial.write(byte(third));
  mySerial.write(byte(fourth));

if(mySerial.available() > 0) {        
    val = mySerial.read();
    if (val == 1)                                        //If data was written successfully
      { Serial.println("Data written succesfully!");
        suppressAll();
      }
    else suppressAll();                                  //If an error occurred during writing, discard all data recieved from the RFID writer
    }
delay(250);
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
    Serial.print("1st:");
    Serial.println(val, HEX);
  }

  if (mySerial.available() > 0) {
    val = mySerial.read();
    Serial.print("2nd:");
    Serial.println(val, HEX);
  }

  if (mySerial.available() > 0) {
    val = mySerial.read();
    Serial.print("3rd:");
    Serial.println(val, HEX);
  }

  if (mySerial.available() > 0) {
    val = mySerial.read();
    Serial.print("4th:");
    Serial.println(val, HEX);
    Serial.println("-----------------");
  }

  delay(750);
}

void loop()
{
  int val;
  Read();
  delay(1000);
  Write();
  delay(1000);
  Read();
  delay(1000);
}

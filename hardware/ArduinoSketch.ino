static const int minPin = 1;
static const int maxPin = 15;
String inData;

void setup() {     
  Serial.begin(9600); 
  // initialize all pins as outputs
  for (int i = minPin; i < maxPin; i++) {
    pinMode(i, OUTPUT);
  }
}

void loop() {
    while (Serial.available() > 0){
        char recieved = Serial.read();
        inData += recieved; 
        if (recieved == '\n'){
            if(inData.startsWith("s")){
              // PARSE INPUT
              int separator1 = inData.indexOf(" ");
              int separator2 = inData.lastIndexOf(" ");
              int pin = inData.substring(separator1 + 1, separator2).toInt();
              int pwm = inData.substring(separator2 + 1, inData.length()-1).toInt();

              // SANITIZE INPUT
              pin = min(maxPin, max(minPin, pin));
              pwm = min(255, max(0, pwm));
              digitalWrite(pin,pwm);
            }
            inData = ""; // Clear recieved buffer
        }
    }
}
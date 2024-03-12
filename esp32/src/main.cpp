#include <WiFi.h>
#include <Arduino.h>
#include <PubSubClient.h>
#include <DHT.h>

#define DHTPIN 15
#define DHTTYPE DHT11

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);

// const char* ssid          = "DEVIMED_TICs";
// const char* password      = "*DevimeD*";
const char* ssid          = "OPPO Reno7";
const char* password      = "abcd1234";

const int pinServo              = 18;
const char* mqtt_servidor       = "iot.devimed.com.co";
const int mqtt_puerto           = 1883;
const char* mqtt_usuario        = "johnarleycano";
const char* mqtt_clave          = "dfalULNJNjKTm9rw";
const char* topicoTemperatura   = "EIA/Piso2/Salon4/temperatura";

void recibirMensaje(char* topic, byte* payload, unsigned int length) {
    String topico = topic; // Se almacena el nombre del tópico en un string
    String mensaje = "";
  
    // Se recorren los caracteres que llegaron en el mensaje
    for (int i = 0; i < length; i++) mensaje += (char)payload[i];
    
    // Se limpia la cadena de posibles caracteres en blanco
    mensaje.trim();
    Serial.println(topico);
    Serial.println(mensaje);
}

void reconectar() {
  	while (!client.connected()) {
		Serial.print("Intentando conexión Mqtt...");
		// Creamos un cliente ID
		String clientId = "esp32_";
		clientId += String(random(0xffff), HEX);
		// Intentamos conectar
		if (client.connect(clientId.c_str(), mqtt_usuario, mqtt_clave)) {
			Serial.println("Conectado!");
        	delay(500);

			// Nos suscribimos
			if(client.subscribe(topicoTemperatura) == 1) Serial.println("Suscrito a humedad");
		} else {
			Serial.print("Falló :( con error -> ");
			Serial.print(client.state());
			Serial.println("Intentando de nuevo en 5 segundos...");

			delay(5000);
		}
    }
}

void setup() {
    Serial.begin(115200);
    
    // Conexión Wifi
    delay(10);
    Serial.println();
    Serial.print("Conectando a la red wifi ");
    Serial.print(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print('.');
    }
    Serial.println("Conectado.");

    dht.begin();

    client.setServer(mqtt_servidor, mqtt_puerto);
    client.setCallback(recibirMensaje);
    // client.setKeepAlive(30);
}

void loop() {
    delay(2500);
    
    float temperatura = dht.readTemperature();

    // Si se obtiene error al leer
    if(isnan(temperatura)) {
        Serial.println("Error leyendo");
        return;
    }

    Serial.print("Temperatura: ");
    Serial.println(temperatura);

    char msg_out[20];
    dtostrf(temperatura,5,2,msg_out);
    client.publish(topicoTemperatura, msg_out);

    // Si el cliente no se conectó, se intenta nuevamente
  	if (!client.connected()) reconectar();
  	
	// Socket conectado constantemente
	client.loop();
}
# Arduino ESP32 Kodları

Bu klasörde, Smart IoT Panel için kullanılan ESP32 kodları yer alır.

## Gerekli Kütüphaneler

Aşağıdaki kütüphaneler Arduino IDE üzerinden yüklenmelidir:

- WiFi (ESP32 ile birlikte gelir)
- PubSubClient
- SPI
- MFRC522
- ESP32Servo
- DHT sensor library

## Nasıl Yüklenir?

1. Arduino IDE'yi açın.
2. `ESP32Kod.ino` dosyasını açın.
3. Araçlar > Kart: `ESP32 Dev Module` seçin.
4. Gerekli kütüphaneleri **Kütüphane Yöneticisi** üzerinden yükleyin.
5. ESP32'nizi bilgisayara bağlayın ve kodu yükleyin.

## Donanım Bağlantıları

- ESP32
- MFRC522 RFID Okuyucu
- DHT11 veya DHT22 Sensor
- Servo Motor x2
- LED x4 (Kırmızı, Mavi, Beyaz, Sarı)
- Buzzer

## Not

Kod ile birlikte kullanılan pin tanımları, MQTT konuları ve sistem mantığı `ESP32Kod.ino` içinde açıklanmıştır.
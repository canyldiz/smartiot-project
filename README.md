# 🧠 IoT Smart Control Panel

Bu proje, IoT cihazlarının web tabanlı kontrolünü ve izlenmesini sağlayan tam entegre bir sistemdir. Spring Boot (Java) backend, React frontend ve MQTT protokolü üzerinden ESP32 ile haberleşen bir yapıya sahiptir.

---

## 🚀 Proje Yapısı

```
iot-smart-panel/
├── backend/             # Spring Boot projesi (Java + MQTT + PostgreSQL)
├── frontend/            # React arayüzü
├── mqtt-config/         # Mosquitto MQTT yapılandırma dosyası (opsiyonel)
├── .gitignore
├── README.md            # Bu dosya
```

---

## 🔧 Kullanılan Teknolojiler

| Katman      | Teknoloji                        |
|-------------|----------------------------------|
| Backend     | Java, Spring Boot, Spring Web, Spring Data JPA |
| Veritabanı  | PostgreSQL                       |
| IoT         | ESP32, MQTT, DHT11, RFID, Servo, LED, Buzzer |
| MQTT Broker | Eclipse Mosquitto                |
| Frontend    | React, Axios, HTML/CSS           |
| Diğer       | Lombok, Maven, IntelliJ          |

---

## ⚙️ Özellikler

- 📡 RFID kart okuma ve kayıt
- 🔐 Giriş & Kayıt sistemi (JWT/Session olmadan basit auth)
- 🌡️ Anlık sıcaklık ve nem ölçümü (DHT11 sensörü)
- ⚙️ Servo motor kontrolü (0–180°)
- 💡 LED kontrolü (Renkli ve genel)
- 🔔 Buzzer kontrolü
- 📁 PostgreSQL tabanlı kullanıcı & cihaz yönetimi
- 📶 MQTT ile çift yönlü haberleşme

---

## 📦 Kurulum Talimatları

### 1. PostgreSQL Kurulumu

```bash
# Yeni veritabanı oluştur
CREATE DATABASE smartiot;

# Kullanıcı adı ve şifreyi application.properties içinde güncelle
```

---

### 2. Backend (Spring Boot)

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

- `application.properties` dosyasında MQTT ve PostgreSQL ayarlarını yapmayı unutma.
- `spring.jpa.hibernate.ddl-auto=update` sayesinde tablolar otomatik oluşur.

---

### 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

- React arayüzü `localhost:3000`'de çalışır.
- Backend'e erişim için `axios` istekleri `/api/...` şeklindedir (CORS ayarlı).

---

## 📸 Ekran Görüntüleri (Opsiyonel)

| Panel Görünümü | Cihaz Kontrolü |
|----------------|----------------|
| ![Panel](./screenshots/panel.png) | ![Kontrol](./screenshots/control.png) |

> 📁 `screenshots/` klasörü oluşturarak buraya görüntüleri koyabilirsin.

---

## 📚 Kaynaklar & Belgeler

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://reactjs.org/)
- [Mosquitto MQTT Docs](https://mosquitto.org/)
- [ESP32 Arduino MQTT Kütüphanesi](https://pubsubclient.knolleary.net/)

---

## 👨‍💻 Geliştirici

**Can Yıldız**  

📧 canylddz0@gmail.com  
🔗 GitHub: [github.com/canyldiz](https://github.com/canyldiz)

**Mustafa Çetin**

📧 mc.cetin.mustafa@gmail.com  
🔗 GitHub: [github.com/mustafacetin19](https://github.com/mustafacetin19)
   

---

## 🪪 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Ayrıntılar için LICENSE dosyasına bakın.

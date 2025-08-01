package com.example.smartiot.config;

import com.example.smartiot.model.Device;
import com.example.smartiot.repository.DeviceRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DeviceDataInitializer {

    @Autowired
    private DeviceRepository deviceRepository;

    @PostConstruct
    public void init() {
        if (deviceRepository.count() == 0) {
            deviceRepository.save(new Device("RFID-001", "RFID Reader", "RFID", true));
            deviceRepository.save(new Device("LED-001", "White LED", "LED-White", true));
            deviceRepository.save(new Device("LED-002", "Red LED", "LED-Red", true));
            deviceRepository.save(new Device("LED-003", "Blue LED", "LED-Blue", true));
            deviceRepository.save(new Device("BUZ-001", "Buzzer", "BUZZER", true));
            deviceRepository.save(new Device("SERVO-001", "Servo Motor 1", "SERVO-1", true));
            deviceRepository.save(new Device("SERVO-002", "Servo Motor 2", "SERVO-2", true));
            deviceRepository.save(new Device("DHT11-001", "Temp & Humidity", "DHT11", true));
            System.out.println("Varsayılan cihazlar başarıyla eklendi.");
        } else {
            System.out.println("Devices zaten mevcut, ekleme yapılmadı.");
        }
    }
}

package com.example.smartiot.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "devices")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "device_uid", nullable = false, unique = true)
    private String deviceUid;

    @Column(name = "device_name")
    private String deviceName;

    @Column(name = "device_model")
    private String deviceModel;

    @Column(name = "active")
    private boolean active = true;

    //ID hariç constructor (DeviceDataInitializer için)
    public Device(String deviceUid, String deviceName, String deviceModel, boolean active) {
        this.deviceUid = deviceUid;
        this.deviceName = deviceName;
        this.deviceModel = deviceModel;
        this.active = active;
    }
}

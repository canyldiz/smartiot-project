package com.example.smartiot.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_devices")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FK: users
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // FK: devices
    @ManyToOne
    @JoinColumn(name = "device_id", nullable = false)
    private Device device;

    @Column(name = "assigned_name")
    private String assignedName;


}

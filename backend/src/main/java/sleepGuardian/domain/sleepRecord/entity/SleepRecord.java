package sleepGuardian.domain.sleepRecord.entity;

import jakarta.persistence.*;
import lombok.*;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class SleepRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "measure_time", nullable = false)
    private LocalDateTime measureTime;

    @Column(name = "illumination")
    private double Illumination;

    @Column(name = "humidity")
    private double Humidity;

    @Column(name = "temperature")
    private double Temperature;

    @Column(name = "noise")
    private double Noise;

    @Column(name = "emg")
    private double Emg;

    @Column(name = "o2")
    private double o2;

    @Column(name = "pulse")
    private double pulse;

    @Column(name = "score")
    private double score; //emg+o2+pulse

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "total_information_id", nullable = false)
    private TotalInformation totalInformation;
}

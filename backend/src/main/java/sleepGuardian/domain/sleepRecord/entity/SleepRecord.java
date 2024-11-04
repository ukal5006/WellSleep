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
    private double illumination;

    @Column(name = "humidity")
    private double humidity;

    @Column(name = "temperature")
    private double temperature;

    @Column(name = "noise")
    private double noise;

    @Column(name = "emg")
    private double emg;

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

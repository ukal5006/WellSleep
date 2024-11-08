package sleepGuardian.domain.sleepTime.entity;

import jakarta.persistence.*;
import lombok.*;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class SleepTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "shalllow_sleep_time")
    private int shallowSleepTime;

    @Column(name = "deep_sleep_time")
    private int deepSleepTime;

    @Column(name = "rem_sleep_time")
    private int remSleepTime;

    @Column(name = "no_sleep_time")
    private int noSleepTime;

    @Column(name = "start_sleep_time")
    private int startSleepTime;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "total_information_id", nullable = false)
    private TotalInformation totalInformation;
}

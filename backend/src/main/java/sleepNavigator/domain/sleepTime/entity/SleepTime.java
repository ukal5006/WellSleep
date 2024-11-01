package sleepNavigator.domain.sleepTime.entity;

import jakarta.persistence.*;
import lombok.Getter;
import sleepNavigator.domain.totalInformation.entity.TotalInformation;

@Entity
@Getter
public class SleepTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "shalllow_sleep_time")
    private int shalllowSleepTime;

    @Column(name = "deep_sleep_time")
    private int deepSleepTime;

    @Column(name = "rem_sleep_time")
    private int remSleepTime;

    @Column(name = "no_sleep_time")
    private int noSleepTime;

    @Column(name = "start_sleep_time")
    private int startSleepTime;

    @ManyToOne
    @JoinColumn(name = "total_information_id", nullable = false)
    private TotalInformation totalInformation;
}

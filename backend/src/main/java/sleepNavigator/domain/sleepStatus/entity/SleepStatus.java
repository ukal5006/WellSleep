package sleepNavigator.domain.sleepStatus.entity;

import jakarta.persistence.*;
import lombok.Getter;
import sleepNavigator.domain.totalInformation.entity.TotalInformation;

import java.util.Date;

@Entity
@Getter
public class SleepStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "total_information_id", nullable = false)
    private TotalInformation totalInformation;

    @Column(name = "sleep_step", nullable = false)
    private int sleepStep;

    @Column(name = "transition_time", nullable = false)
    private Date transitionTime;

}

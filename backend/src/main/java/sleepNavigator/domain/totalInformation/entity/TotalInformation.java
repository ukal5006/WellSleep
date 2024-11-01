package sleepNavigator.domain.totalInformation.entity;

import jakarta.persistence.*;
import lombok.Getter;
import sleepNavigator.domain.user.entity.Users;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
public class TotalInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "avg")
    private double avg;

    @Column(name = "date")
    private Date date;

    @Column(name = "sleep_time")
    private long sleepTime;

    @Column(name = "caffeine_intake ")
    private int caffeineIntake;

    @Column(name = "alcohol_intake ")
    private int isAlcohol;

    @Column(name = "start_time")
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;

    @Column(name = "start_sleep_time")
    private Date startSleepTime;

    @OneToMany(mappedBy = "total_information", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<TotalInformation> totalInformations = new ArrayList<>();
}

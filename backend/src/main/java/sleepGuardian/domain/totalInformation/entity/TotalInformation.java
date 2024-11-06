package sleepGuardian.domain.totalInformation.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import sleepGuardian.domain.user.entity.Users;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@ToString
public class TotalInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "avg")
    private double avg;

    @CreationTimestamp
    @Column(name = "date")
    private LocalDateTime date;


    @Column(name = "sleep_time")
    private int sleepTime;

    @Column(name = "real_sleep_time")
    private int realSleepTime;

    @Column(name = "caffeine_intake ")
    private int caffeineIntake;

    @Column(name = "alcohol_intake ")
    private int alcoholIntake;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "start_sleep_time")
    private LocalDateTime startSleepTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    public TotalInformation(Users user) {
        this.users = user;
        this.startTime = LocalDateTime.now();
    }

    public void setSleepImpact(int alcoholIntake, int caffeineIntake) {
        this.alcoholIntake = alcoholIntake;
        this.caffeineIntake = caffeineIntake;
    }

    public void setSleepEnd(double avg, LocalDateTime date, int sleepTime, int realSleepTime, LocalDateTime endTime, LocalDateTime startSleepTime) {
            this.avg = avg;
            this.date = date;
            this.sleepTime = sleepTime;
            this.realSleepTime = realSleepTime;
            this.endTime = endTime;
            this.startSleepTime = startSleepTime;
    }
}

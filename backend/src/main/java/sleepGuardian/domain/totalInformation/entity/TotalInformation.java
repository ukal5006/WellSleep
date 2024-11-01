package sleepGuardian.domain.totalInformation.entity;

import jakarta.persistence.*;
import lombok.*;
import sleepGuardian.domain.user.entity.Users;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class TotalInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "avg")
    private double avg;

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
}

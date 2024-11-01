package sleepGuardian.domain.sleepStatus.entity;

import jakarta.persistence.*;
import lombok.*;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class SleepStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "sleep_step", nullable = false)
    private Step sleepStep;

    @Column(name = "transition_time", nullable = false)
    private LocalDateTime transitionTime;

    @ManyToOne
    @JoinColumn(name = "total_information_id", nullable = false)
    private TotalInformation totalInformation;
}

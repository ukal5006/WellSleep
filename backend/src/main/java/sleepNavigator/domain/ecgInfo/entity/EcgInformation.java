package sleepNavigator.domain.ecgInfo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import sleepNavigator.domain.driveInfo.entity.DriveInformation;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@AllArgsConstructor (access = AccessLevel.PRIVATE)
@Builder
public class EcgInformation {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "drive_information_id", nullable = false)
    private DriveInformation driveInformation;

    @Column (name = "measure_time", nullable = false)
    @CreationTimestamp
    private LocalDateTime measureTime;

    @Column (name = "value", nullable = false)
    private double value;
}

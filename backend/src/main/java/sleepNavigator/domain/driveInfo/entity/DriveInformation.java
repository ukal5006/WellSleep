package sleepNavigator.domain.driveInfo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import sleepNavigator.domain.ecgInfo.entity.EcgInformation;
import sleepNavigator.domain.oxygenInfo.entity.O2Information;
import sleepNavigator.domain.pulseInfo.entity.PulseInformation;
import sleepNavigator.domain.user.entity.Users;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@AllArgsConstructor (access = AccessLevel.PRIVATE)
@Builder
public class DriveInformation {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "user_id", nullable = false)
    private Users user;

    @Column (name = "start_point", nullable = false)
    private String startPoint;

    @Column (name = "end_point", nullable = false)
    private String endPoint;

    @Column (name = "start_at", nullable = false)
    @CreationTimestamp
    private LocalDateTime startAt;

    @Column (name = "end_at")
    @CreationTimestamp
    private LocalDateTime endAt;

    @OneToMany (mappedBy = "driveInformation", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<EcgInformation> EcgInformationList;

    @OneToMany (mappedBy = "driveInformation", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<O2Information> O2InformationList;

    @OneToMany (mappedBy = "driveInformation", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<PulseInformation> PulseInformationList;
}

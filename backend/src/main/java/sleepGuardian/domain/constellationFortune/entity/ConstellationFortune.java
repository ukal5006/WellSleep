package sleepGuardian.domain.constellationFortune.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class ConstellationFortune {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "constellation", nullable = false)
    private Constellation constellation;

    @Column(name = "fortune", nullable = false, columnDefinition = "TEXT")
    private String fortune;

    public void updateFortune(String fortune) {
        this.fortune = fortune;
    }
}

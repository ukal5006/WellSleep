package sleepNavigator.domain.restArea.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class RestAreas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Enumerated(EnumType.STRING)
    @Column (name = "category", nullable = false)
    private Category category;

    @Column (name = "address", nullable = false)
    private String address;

    @Column (name = "latitude", nullable = false)
    private double latitude;

    @Column (name = "longitude", nullable = false)
    private double longitude;

    @Column (name = "name", nullable = false)
    private String name;
}

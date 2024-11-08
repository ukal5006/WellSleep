package sleepGuardian.domain.totalInformation.dto;

import lombok.*;

@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 모든 필드 생성자 추가 (선택 사항)
@Getter
@Setter // 필요하다면 추가
@ToString
public class SleepImpactRequestDTO {
    private int id;
    private int alcoholIntake;
    private int caffeineIntake;
}
package sleepGuardian.domain.sleepTip.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import sleepGuardian.domain.sleepTip.entity.SleepTip;

@Getter
@AllArgsConstructor
public class SleepTipResponseDTO {
    private int id;
    private int category;
    private String title;
    private String content;
    private String image;
    private String created_at;

    public static SleepTipResponseDTO fromEntity(SleepTip sleepTip) {
        return new SleepTipResponseDTO(
                sleepTip.getId(),
                sleepTip.getCategory().ordinal() + 1, // Enum 인덱스 기반
                sleepTip.getTitle(),
                sleepTip.getContent(),
                sleepTip.getImage(),
                sleepTip.getCreatedAt().toString()
        );
    }
}

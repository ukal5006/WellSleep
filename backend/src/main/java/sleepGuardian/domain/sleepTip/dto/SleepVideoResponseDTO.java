package sleepGuardian.domain.sleepTip.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SleepVideoResponseDTO {
    private String title;
    private String videoId;
    private String channelTitle;
    private String description;
    private String url;
}


package sleepGuardian.domain.totalInformation.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordValueDTO;
import sleepGuardian.domain.sleepRecord.service.SleepRecordService;
import sleepGuardian.domain.totalInformation.dto.SleepImpactRequestDTO;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;
import sleepGuardian.domain.totalInformation.repository.TotalInformationRepository;
import sleepGuardian.domain.user.entity.Users;
import sleepGuardian.domain.user.repository.UserRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TotalInformationService {

    private final UserRepository userRepository;
    private final TotalInformationRepository totalInformationRepository;
    private final SleepRecordService sleepRecordService;

    public void startSleep(int userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 정보가 잘못되었습니다"));
        TotalInformation totalInformation = new TotalInformation(user);
        System.out.println(totalInformation);
        totalInformationRepository.save(totalInformation);
    }

    public int savesleepImpact(SleepImpactRequestDTO dto) {
        TotalInformation totalInfo = totalInformationRepository.findById(dto.getId())
                .orElseThrow(() -> new IllegalArgumentException("수면정보종합이 잘못되었습니다."));

        totalInfo.setSleepImpact(dto.getAlcoholIntake(), dto.getCaffeineIntake());
        return totalInformationRepository.save(totalInfo).getId();
    }

    public void endSleep(int totalInformationId) {
        TotalInformation totalInfo = totalInformationRepository.findById(totalInformationId)
                .orElseThrow(() -> new IllegalArgumentException("수면정보종합이 잘못되었습니다."));

        LocalDateTime date = LocalDateTime.now();
        LocalDateTime endTime = LocalDateTime.now(); //수면 측정 완료 시각
        int sleepTime = (int)Duration.between(totalInfo.getStartTime(), endTime).toMinutes();//총 수면 시간
        LocalDateTime start_sleep_time = LocalDateTime.now(); //최용훈이 줄 거.
        double avg = 12.5;
        int realSleepTime = (int) Duration.between(totalInfo.getStartTime(), start_sleep_time).toMinutes();
//        public void setSleepEnd(double avg, LocalDateTime date, int sleepTime, int realSleepTime, LocalDateTime endTime, LocalDateTime startSleepTime) {

        totalInfo.setSleepEnd(avg, date, sleepTime, realSleepTime, endTime, start_sleep_time);
        totalInformationRepository.save(totalInfo);
    }
}

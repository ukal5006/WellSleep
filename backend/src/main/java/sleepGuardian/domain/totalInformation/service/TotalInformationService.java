package sleepGuardian.domain.totalInformation.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.totalInformation.dto.SleepImpactRequestDTO;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;
import sleepGuardian.domain.totalInformation.repository.TotalInformationRepository;
import sleepGuardian.domain.user.entity.Users;
import sleepGuardian.domain.user.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TotalInformationService {

    private final UserRepository userRepository;
    private final TotalInformationRepository totalInformationRepository;

    public void startSleep(int userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 정보가 잘못되었습니다"));
        TotalInformation totalInformation = new TotalInformation(user);
        System.out.println(totalInformation);
        totalInformationRepository.save(totalInformation);
    }

    public void savesleepImpact(SleepImpactRequestDTO dto) {
        TotalInformation totalInfo = totalInformationRepository.findById(dto.getId())
                .orElseThrow(() -> new IllegalArgumentException("수면정보종합이 잘못되었습니다."));

        totalInfo.setSleepImpact(dto.getAlcoholIntake(), dto.getCaffeineIntake());
        totalInformationRepository.save(totalInfo);
    }

    public void getSleepTime(int userId) {

    }
}

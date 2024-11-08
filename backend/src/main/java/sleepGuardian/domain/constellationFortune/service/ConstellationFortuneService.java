package sleepGuardian.domain.constellationFortune.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sleepGuardian.domain.constellationFortune.dto.FortuneUpdateRequest;
import sleepGuardian.domain.constellationFortune.entity.Constellation;
import sleepGuardian.domain.constellationFortune.entity.ConstellationFortune;
import sleepGuardian.domain.constellationFortune.repository.ConstellationFortuneRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConstellationFortuneService {
    private final ConstellationFortuneRepository constellationFortuneRepository;

    // 매일 운세 값을 갱신
    @Transactional
    public void updateDailyFortunes(List<FortuneUpdateRequest> dailyFortunes) {
        dailyFortunes.forEach(request -> {
            Constellation constellation = request.getConstellation();
            String fortune = request.getFortune();

            ConstellationFortune constellationFortune = constellationFortuneRepository.findByConstellation(constellation)
                    .orElseGet(() -> ConstellationFortune.builder()
                            .constellation(constellation)
                            .build());

            constellationFortune.updateFortune(fortune);
            constellationFortuneRepository.save(constellationFortune);
        });
    }

    @Transactional(readOnly = true)
    public Optional<ConstellationFortune> getFortuneByConstellation(Constellation constellation) {
        return constellationFortuneRepository.findByConstellation(constellation);
    }


}

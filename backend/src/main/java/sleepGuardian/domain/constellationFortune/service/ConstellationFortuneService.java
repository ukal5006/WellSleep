package sleepGuardian.domain.constellationFortune.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.constellationFortune.repository.ConstellationFortuneRepository;

@Service
@RequiredArgsConstructor
public class ConstellationFortuneService {
    private final ConstellationFortuneRepository constellationFortuneRepository;
}

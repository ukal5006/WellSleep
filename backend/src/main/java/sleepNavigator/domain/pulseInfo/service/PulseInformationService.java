package sleepNavigator.domain.pulseInfo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepNavigator.domain.pulseInfo.repository.PulseInformationRepository;

@Service
@RequiredArgsConstructor
public class PulseInformationService {
    private final PulseInformationRepository pulseInformationRepository;
}

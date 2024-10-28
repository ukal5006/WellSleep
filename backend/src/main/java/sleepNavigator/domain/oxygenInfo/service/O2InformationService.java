package sleepNavigator.domain.oxygenInfo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepNavigator.domain.oxygenInfo.repository.O2InformationRepository;

@Service
@RequiredArgsConstructor
public class O2InformationService {
    private final O2InformationRepository o2InformationRepository;
}

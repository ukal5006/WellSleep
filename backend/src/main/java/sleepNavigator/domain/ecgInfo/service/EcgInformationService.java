package sleepNavigator.domain.ecgInfo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepNavigator.domain.ecgInfo.repository.EcgInformationRepository;

@Service
@RequiredArgsConstructor
public class EcgInformationService {
    private final EcgInformationRepository ecgInformationRepository;
}

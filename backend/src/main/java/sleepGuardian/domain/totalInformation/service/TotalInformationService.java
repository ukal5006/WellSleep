package sleepGuardian.domain.totalInformation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.totalInformation.repository.TotalInformationRepository;

@Service
@RequiredArgsConstructor
public class TotalInformationService {
    private final TotalInformationRepository totalInformationRepository;
}

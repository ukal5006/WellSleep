package sleepNavigator.domain.pulseInfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepNavigator.domain.pulseInfo.entity.PulseInformation;

@Repository
public interface PulseInformationRepository extends JpaRepository<PulseInformation, Integer> {
}

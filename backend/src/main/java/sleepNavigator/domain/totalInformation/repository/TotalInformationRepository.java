package sleepNavigator.domain.totalInformation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sleepNavigator.domain.totalInformation.entity.TotalInformation;

public interface TotalInformationRepository extends JpaRepository<TotalInformation, Integer> {
}

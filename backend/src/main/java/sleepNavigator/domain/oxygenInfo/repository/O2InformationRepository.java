package sleepNavigator.domain.oxygenInfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepNavigator.domain.oxygenInfo.entity.O2Information;

@Repository
public interface O2InformationRepository extends JpaRepository<O2Information, Integer> {
}

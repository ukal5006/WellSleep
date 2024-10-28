package sleepNavigator.domain.ecgInfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepNavigator.domain.ecgInfo.entity.EcgInformation;

@Repository
public interface EcgInformationRepository extends JpaRepository<EcgInformation, Integer> {
}

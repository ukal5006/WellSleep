package sleepGuardian.domain.totalInformation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;

@Repository
public interface TotalInformationRepository extends JpaRepository<TotalInformation, Integer> {
}

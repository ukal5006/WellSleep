package sleepGuardian.domain.sleepTime.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepGuardian.domain.sleepTime.entity.SleepTime;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;

import java.util.List;
import java.util.Optional;

@Repository
public interface SleepTimeRepository extends JpaRepository<SleepTime, Integer> {
    SleepTime findByTotalInformation(TotalInformation totalInformation);

    SleepTime findByTotalInformationId(int totalInformationId);
}

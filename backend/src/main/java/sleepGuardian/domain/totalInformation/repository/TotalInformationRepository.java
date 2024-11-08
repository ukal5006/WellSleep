package sleepGuardian.domain.totalInformation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;
import sleepGuardian.domain.user.entity.Users;

import java.util.List;

@Repository
public interface TotalInformationRepository extends JpaRepository<TotalInformation, Integer> {
    List<TotalInformation> findAllByUsers(Users user);
}

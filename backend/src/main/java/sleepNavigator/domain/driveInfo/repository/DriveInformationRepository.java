package sleepNavigator.domain.driveInfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepNavigator.domain.driveInfo.entity.DriveInformation;

@Repository
public interface DriveInformationRepository extends JpaRepository<DriveInformation, Integer> {

}


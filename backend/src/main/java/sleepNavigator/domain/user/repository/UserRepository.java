package sleepNavigator.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sleepNavigator.domain.user.entity.Users;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByKakaoKey(String kakaoId);
    Optional<Users> findByRefreshToken(String refreshToken);
}

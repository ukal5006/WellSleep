package sleepGuardian.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sleepGuardian.domain.user.dto.UserInitDataDTO;
import sleepGuardian.domain.user.entity.Constellation;
import sleepGuardian.domain.user.entity.Users;
import sleepGuardian.domain.user.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public boolean updateUserConstellation(int id, Constellation constellation) {
        Optional<Users> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            user.updateConstellation(constellation);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean updateUserInitData(int userId, UserInitDataDTO userData) {
        Optional<Users> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            user.updateInitData(userData);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}

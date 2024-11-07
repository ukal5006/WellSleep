package sleepGuardian.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sleepGuardian.domain.user.dto.UserInitDataDTO;
import sleepGuardian.domain.user.dto.UserResponseDTO;
import sleepGuardian.domain.user.entity.Constellation;
import sleepGuardian.domain.user.entity.Users;
import sleepGuardian.domain.user.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public boolean updateUserConstellation(int userId, Constellation constellation) {
        Optional<Users> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            user.updateConstellation(constellation);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional
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

    @Transactional(readOnly = true)
    public UserResponseDTO getUserInfo(int userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return UserResponseDTO.fromEntity(user);
    }

    @Transactional
    public void deleteUser(int userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        userRepository.delete(user);
    }
}

package sleepNavigator.domain.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sleepNavigator.domain.user.dto.UserDto;
import sleepNavigator.domain.user.entity.Users;
import sleepNavigator.domain.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserLoginService {
    private final UserRepository userRepository;

    @Autowired
    public UserLoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserDto findOrCreateUser(UserDto userDto) {
        String kakaoKey = userDto.getKakaoKey();

        Optional<Users> existingUser = userRepository.findByKakaoKey(kakaoKey);

        if (existingUser.isPresent()) {
            UserDto user = toDto(existingUser.get());
            user.setNewUser(false);
            return user;
        }
        else {
            Users newUser = Users.builder()
                    .kakaoKey(kakaoKey)
                    .email(userDto.getEmail())
                    .name(userDto.getName())
                    .createdAt(LocalDateTime.now())
                    .build();

            Users savedUser = userRepository.save(newUser);
            UserDto user = toDto(savedUser);
            user.setNewUser(true);
            return user;
        }
    }

    public void storeRefreshToken(int userId, String token) {
        Optional<Users> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            user.setRefreshToken(token);  // 리프레시 토큰 저장
            userRepository.save(user);  // 엔티티 업데이트
        }
        else {
            throw new RuntimeException("유저를 찾을 수 없습니다.");
        }
    }

    public void invalidateRefreshToken(int userId) {
        Optional<Users> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            user.setRefreshToken(null);  // 리프레시 토큰 무효화
            userRepository.save(user);  // 엔티티 업데이트
        }
        else {
            throw new RuntimeException("유저를 찾을 수 없습니다.");
        }
    }

    public int getUserIdByRefreshToken(String refreshToken) {
        Optional<Users> userOpt = userRepository.findByRefreshToken(refreshToken);
        if (userOpt.isPresent()) {
            return userOpt.get().getId();
        }
        else {
            throw new RuntimeException("유효하지 않은 리프레시 토큰입니다.");
        }
    }

    public String getRefreshTokenByUserId(int userId) {
        Optional<Users> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            return userOpt.get().getRefreshToken();
        }
        else {
            throw new RuntimeException("유저를 찾을 수 없습니다.");
        }
    }

    // User 엔티티를 UserDto로 변환하는 메서드
    private UserDto toDto(Users user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .kakaoKey(user.getKakaoKey())
                .refreshToken(user.getRefreshToken())
                .createdAt(user.getCreatedAt())
                .build();
    }
}

package sleepGuardian.domain.sleepRecord.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordKeyDTO;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordResultDTO;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordValueDTO;
import sleepGuardian.domain.sleepRecord.entity.SleepRecord;
import sleepGuardian.domain.sleepRecord.repository.SleepRecordRepository;
import sleepGuardian.domain.sleepTime.entity.SleepTime;
import sleepGuardian.domain.sleepTime.repository.SleepTimeRepository;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;
import sleepGuardian.domain.totalInformation.repository.TotalInformationRepository;
import sleepGuardian.domain.user.entity.Users;
import sleepGuardian.domain.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SleepRecordService {
    private final SleepRecordRepository sleepRecordRepository;
    private final SleepTimeRepository sleepTimeRepository;
    private final TotalInformationRepository totalInformationRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    @Autowired
    public SleepRecordService(SleepRecordRepository sleepRecordRepository, SleepTimeRepository sleepTimeRepository,
                              TotalInformationRepository totalInformationRepository, RedisTemplate<String, Object> redisTemplate, ObjectMapper mapper, UserRepository userRepository) {
        this.sleepRecordRepository = sleepRecordRepository;
        this.sleepTimeRepository = sleepTimeRepository;
        this.totalInformationRepository = totalInformationRepository;
        this.redisTemplate = redisTemplate;
        this.objectMapper = mapper;
        this.userRepository = userRepository;
    }

    public void saveSleepRecord(int userId, SleepRecordKeyDTO keyDTO, SleepRecordValueDTO record) {
        String key = "sleep_record:" + keyDTO.getTotalInformationId() + ":" + keyDTO.getTmpId();

        Optional<Users> userOpt = userRepository.findById(userId);
        Users user = userOpt.get();

        // 측정값/내 초기값 * 100 으로 환산환 비율
        double userEmg = 96 - (((record.getEmg() / user.getEmg()) * 100) / 3);
        double userO2 = 260 - (((record.getO2() / user.getO2()) * 100) * 2);
        double userPulse = 115 - (((record.getPulse() / user.getPulse()) * 100) / 2);
        double avg = (userEmg + userO2 + userPulse) / 3;

        SleepRecordValueDTO value = SleepRecordValueDTO.builder()
                .measureTime(LocalDateTime.now())
                .illumination(record.getIllumination())
                .humidity(record.getHumidity())
                .temperature(record.getTemperature())
                .noise(record.getNoise())
                .emg(userEmg)
                .o2(userO2)
                .pulse(userPulse)
                .score(avg)
                .build();

        redisTemplate.opsForValue().set(key, value);
    }

    public SleepRecordResultDTO getSleepRecord(int totalInformationId) {
        TotalInformation totalInformation = totalInformationRepository.findById(totalInformationId)
                .orElseThrow(() -> new RuntimeException("TotalInformation not found"));

        int tmpId = 0;   //임시 카운트 변수
        boolean isSleep = false;
        LocalDateTime startSleep = null;
        double sum = 0;
        int count = 0;
        int sleepStep[] = new int[5];   //0:눕고~입면, 1:비수면, 2:얕은수면, 3:램수면, 4:깊은수면

        while (true) {
            SleepRecordValueDTO record = getSleep(totalInformationId, tmpId);

            if (record == null) {
                break;
            }

            double nowScore = record.getScore();
            sum = sum + nowScore;
            count++;

            if (!isSleep && nowScore >= 70) {   //잠에 들었다고 판단
                isSleep = true;
                startSleep = record.getMeasureTime();
            }

            if (!isSleep && nowScore < 70) {
                sleepStep[0]++;
            }
            else if (nowScore >= 90) {
                sleepStep[4]++;
            }
            else if (nowScore >= 80) {
                sleepStep[3]++;
            }
            else if (nowScore >= 70) {
                sleepStep[2]++;
            }
            else {
                sleepStep[1]++;
            }

            if (tmpId % 10 == 0) {
                // 10분마다니까 MariaDB에 저장
                SleepRecord sleepRecord = SleepRecord.builder()
                        .totalInformation(totalInformation)
                        .measureTime(record.getMeasureTime())
                        .illumination(record.getIllumination())
                        .humidity(record.getHumidity())
                        .temperature(record.getTemperature())
                        .noise(record.getNoise())
                        .emg(record.getEmg())
                        .o2(record.getO2())
                        .pulse(record.getPulse())
                        .score(record.getScore())
                        .build();

                sleepRecordRepository.save(sleepRecord);
            }

            tmpId++;
        }

        //수면시간 누적 저장 *10해서 초단위로
        SleepTime sleepTime = SleepTime.builder()
                .totalInformation(totalInformation)
                .deepSleepTime(sleepStep[4])
                .remSleepTime(sleepStep[3])
                .shallowSleepTime(sleepStep[2])
                .noSleepTime(sleepStep[1])
                .startSleepTime(sleepStep[0])
                .build();

        sleepTimeRepository.save(sleepTime);

        SleepRecordResultDTO result = SleepRecordResultDTO.builder()   //평균점수, 입면시간 저장
                .avg(sum / count)
                .startSleepTime(startSleep)
                .build();

        return result;
    }

    public SleepRecordValueDTO getSleep(int totalInformationId, int tmpId) {
        String key = "sleep_record:" + totalInformationId + ":" + tmpId;
        Object value = redisTemplate.opsForValue().get(key);

        if (value == null) {
            return null;
        }

        SleepRecordValueDTO result = objectMapper.convertValue(value, SleepRecordValueDTO.class);
        redisTemplate.delete(key);
        return result;
    }
}
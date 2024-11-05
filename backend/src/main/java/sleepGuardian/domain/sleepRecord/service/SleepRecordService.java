
package sleepGuardian.domain.sleepRecord.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordKeyDTO;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordValueDTO;

@Service
public class SleepRecordService {
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    public SleepRecordService(RedisTemplate<String, Object> redisTemplate, ObjectMapper mapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = mapper;
    }

    public void saveSleepRecord(int userId, SleepRecordKeyDTO keyDTO, SleepRecordValueDTO record) {
        String key = "sleep_record:" + keyDTO.getTotalInformationId() + ":" + keyDTO.getTmpId();
        SleepRecordValueDTO value = record;


        value = SleepRecordValueDTO.builder()
                .score(11)
                .build();

        redisTemplate.opsForValue().set(key, record);
    }

    public SleepRecordValueDTO getSleepRecord(int totalInformationId, int tmpId) {
        String key = "sleep_record:" + totalInformationId + ":" + tmpId;
        Object value = redisTemplate.opsForValue().get(key);

        if (value == null) {
            return null;
        }
        return objectMapper.convertValue(value, SleepRecordValueDTO.class);
    }

    public void deleteSleepRecord(SleepRecordKeyDTO keyDTO ) {
        String key = "sleep_record:" + keyDTO.getTotalInformationId() + ":" + keyDTO.getTmpId();
        redisTemplate.delete(key);
    }

//    public void processAndStoreSleepRecord(int totalInformationId, int tmpId) {
//        SleepRecordValueDTO record = getSleepRecord(totalInformationId, tmpId);
//
//        if (record != null) {
//            // Process the record as needed
//            // For example, aggregate data or perform calculations
//
//            // Store processed data to the database (this is a placeholder)
//            saveToDatabase(totalInformationId, record);
//
//            // Delete the record from Redis after processing
//            deleteSleepRecord(totalInformationId, tmpId);
//        }
//    }
//
//    private void saveToDatabase(int totalInformationId, SleepRecordValueDTO record) {
//        // Implementation for saving to database
//        // Example:
//        // sleepRecordRepository.save(new SleepRecordEntity(totalInformationId, record));
//    }
}

package sleepGuardian.domain.sleepRecord.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordRequestDTO;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordValueDTO;
import sleepGuardian.domain.sleepRecord.service.SleepRecordService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping ("/api")
public class SleepRecordController {
    private final SleepRecordService sleepRecordService;

    @PostMapping("/live-record/save")
    public ResponseEntity<String> saveSleepRecord(@RequestBody SleepRecordRequestDTO request) {
        sleepRecordService.saveSleepRecord(request.getKey(), request.getValue());
        return ResponseEntity.ok("Sleep record saved successfully.");
    }

    @GetMapping ("/live-record/get")
    public ResponseEntity<List<SleepRecordValueDTO>> getSleepRecord(@RequestParam int totalInformationId) {
        List<SleepRecordValueDTO> result = new ArrayList<>();
        int tmpId = 0;

        while(true) {
            SleepRecordValueDTO record = sleepRecordService.getSleepRecord(totalInformationId, tmpId++);

            if(record == null) {
                break;
            }
            result.add(record);
        }

        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

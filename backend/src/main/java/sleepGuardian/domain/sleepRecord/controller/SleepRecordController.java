package sleepGuardian.domain.sleepRecord.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordRequestDTO;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordResultDTO;
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
    public ResponseEntity<String> saveSleepRecord(HttpServletRequest request, @RequestBody SleepRecordRequestDTO requestDto) {
        int userId = (Integer) request.getAttribute("userId");
        sleepRecordService.saveSleepRecord(userId, requestDto.getKey(), requestDto.getValue());
        return ResponseEntity.ok("Sleep record saved successfully.");
    }
//    @PostMapping("/live-record/get")
//    public ResponseEntity<?> tmp(@RequestParam int totalInformationId) {
//        SleepRecordResultDTO result = sleepRecordService.getSleepRecord(totalInformationId);
//
//        return ResponseEntity.ok(result);
//    }
}

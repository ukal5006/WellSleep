package sleepGuardian;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SleepGuardianApplication {

	public static void main(String[] args) {
		SpringApplication.run(SleepGuardianApplication.class, args);
	}

}

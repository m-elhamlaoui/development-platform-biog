package org.biog.unihivebackend.config;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StorageConfig {

    @Bean
    public Storage getStorage() throws FileNotFoundException, IOException {
        InputStream inputStream = Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream("gcp-account-file.json"));
        return StorageOptions.newBuilder()
                .setCredentials(ServiceAccountCredentials
                        .fromStream(inputStream))
                .build().getService();
    }
}

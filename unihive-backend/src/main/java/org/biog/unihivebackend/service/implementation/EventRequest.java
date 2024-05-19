package org.biog.unihivebackend.service.implementation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventRequest {
    String title;
    String description;
    String location;
    String startTime;
    String endTime;
    String color;
    String reminder;
}
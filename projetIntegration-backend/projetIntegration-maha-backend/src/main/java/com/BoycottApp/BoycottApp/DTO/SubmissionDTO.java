package com.BoycottApp.BoycottApp.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionDTO {
    private String _id;
    private String submissionType;
    private String proofURL;
    private String reason;
    private String alternativeBrand;
}

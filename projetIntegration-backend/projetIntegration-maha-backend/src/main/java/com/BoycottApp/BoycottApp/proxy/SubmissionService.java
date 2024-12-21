package com.BoycottApp.BoycottApp.proxy;

import com.BoycottApp.BoycottApp.DTO.SubmissionDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "node-service" , path = "/api/submissions")
public interface SubmissionService {
    @GetMapping(value ="/{id}" , produces = "application/json")
    SubmissionDTO getSubmission(@PathVariable String id) ;
}

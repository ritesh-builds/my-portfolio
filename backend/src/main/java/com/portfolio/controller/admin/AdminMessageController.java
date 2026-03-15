package com.portfolio.controller.admin;

import com.portfolio.dto.message.MessageResponse;
import com.portfolio.dto.message.PagedResponse;
import com.portfolio.service.AdminMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/messages")
@RequiredArgsConstructor
public class AdminMessageController {

    private final AdminMessageService adminMessageService;

    @GetMapping
    public PagedResponse<MessageResponse> getMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return adminMessageService.getMessages(page, size);
    }
}

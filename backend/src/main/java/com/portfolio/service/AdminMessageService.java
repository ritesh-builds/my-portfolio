package com.portfolio.service;

import com.portfolio.dto.message.MessageResponse;
import com.portfolio.dto.message.PagedResponse;
import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public PagedResponse<MessageResponse> getMessages(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<ContactMessage> messagePage = contactMessageRepository.findAll(pageable);

        List<MessageResponse> content = messagePage.getContent()
                .stream()
                .map(this::mapToResponse)
                .toList();

        return PagedResponse.<MessageResponse>builder()
                .content(content)
                .page(messagePage.getNumber())
                .size(messagePage.getSize())
                .totalElements(messagePage.getTotalElements())
                .totalPages(messagePage.getTotalPages())
                .last(messagePage.isLast())
                .build();
    }

    private MessageResponse mapToResponse(ContactMessage message) {
        return MessageResponse.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .message(message.getMessage())
                .createdAt(message.getCreatedAt())
                .build();
    }
}

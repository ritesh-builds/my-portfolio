package com.portfolio.service;

import com.portfolio.dto.contact.ContactRequest;
import com.portfolio.dto.contact.ContactResponse;
import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactResponse saveMessage(ContactRequest request) {
        ContactMessage savedMessage = contactMessageRepository.save(
                ContactMessage.builder()
                        .name(request.getName().trim())
                        .email(request.getEmail().trim())
                        .message(request.getMessage().trim())
                        .build()
        );

        return ContactResponse.builder()
                .status("SUCCESS")
                .message("Your message has been saved successfully.")
                .submittedAt(savedMessage.getCreatedAt())
                .build();
    }
}

package dev.surya.registrationmanagement.services;

import dev.surya.registrationmanagement.dtos.RegistrationDTO;
import dev.surya.registrationmanagement.models.Registration;
import dev.surya.registrationmanagement.repositories.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    public RegistrationDTO createRegistration(RegistrationDTO registrationDTO) {
        Optional<Registration> existingRegistration = registrationRepository.findByEmail(registrationDTO.getEmail());
        if (existingRegistration.isPresent()) {
            throw new DataIntegrityViolationException("Email already exists");
        }
        Registration registration = new Registration();
        registration.setName(registrationDTO.getName());
        registration.setEmail(registrationDTO.getEmail());
        registration.setDateOfBirth(registrationDTO.getDateOfBirth());
        registration.setCreatedAt(LocalDateTime.now());
        registration = registrationRepository.save(registration);
        registrationDTO.setId(registration.getId());
        return registrationDTO;
    }

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public Optional<Registration> getRegistrationById(Long id) {
        return registrationRepository.findById(id);
    }

    public RegistrationDTO updateRegistration(Long id, RegistrationDTO registrationDTO) {
        Optional<Registration> optionalRegistration = registrationRepository.findById(id);
        if (optionalRegistration.isPresent()) {
            Registration registration = optionalRegistration.get();
            registration.setName(registrationDTO.getName());
            registration.setEmail(registrationDTO.getEmail());
            registration.setDateOfBirth(registrationDTO.getDateOfBirth());
            registration = registrationRepository.save(registration);
            //registrationDTO.setId(registration.getId());
            return registrationDTO;
        } else {
            throw new RuntimeException("Registration not found");
        }
    }

    public void deleteRegistration(Long id) {
        registrationRepository.deleteById(id);
    }
}

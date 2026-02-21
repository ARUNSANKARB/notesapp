package com.arun.notesapp.repository;

import com.arun.notesapp.entity.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {

    Page<Note> findByTitleContaining(String keyword, Pageable pageable);
}
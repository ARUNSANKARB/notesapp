package com.arun.notesapp.service;

import com.arun.notesapp.entity.Note;
import com.arun.notesapp.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;



    public Page<Note> getAll(int page, int size){
        return noteRepository.findAll(PageRequest.of(page, size));
    }

    public void delete(Long id){
        noteRepository.deleteById(id);
    }
    public Note create(Note note){
        if(note.getTags() != null){
            note.getTags().forEach(tag -> tag.setNote(note));
        }
        return noteRepository.save(note);
    }
}
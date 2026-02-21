package com.arun.notesapp.controller;

import com.arun.notesapp.entity.Note;
import com.arun.notesapp.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public Note create(@RequestBody Note note){
        return noteService.create(note);
    }

    @GetMapping
    public Page<Note> getAll(
            @RequestParam int page,
            @RequestParam int size){
        return noteService.getAll(page, size);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        noteService.delete(id);
    }
}
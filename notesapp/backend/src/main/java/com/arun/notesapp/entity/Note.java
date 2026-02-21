package com.arun.notesapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.arun.notesapp.entity.Tag;

import java.util.List;

@Entity   // table in DB
@Data     // getters/setters auto
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL)
    private List<Tag> tags;
}
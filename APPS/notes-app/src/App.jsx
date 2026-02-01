import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Search, Pin, Edit2, Trash2, Check, Copy, Archive, Tag, Plus, X, PenLine } from "lucide-react";
import "./App.css";

const NOTE_COLORS = [
  { bg: '#FFE5E5', accent: '#FF6B6B' },
  { bg: '#FFF4E5', accent: '#FFB84D' },
  { bg: '#FFFBE5', accent: '#FFD93D' },
  { bg: '#E5FFF4', accent: '#6BCF7F' },
  { bg: '#E5F4FF', accent: '#4D9FFF' },
  { bg: '#F0E5FF', accent: '#A855F7' },
  { bg: '#FFE5F4', accent: '#EC4899' },
];

function App() {
  const [notesList, setNotesList] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);
  const [newTag, setNewTag] = useState("");
  const [editingTags, setEditingTags] = useState(null);
  const [filter, setFilter] = useState('active'); // 'active' or 'archived'

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    const savedArchived = localStorage.getItem("archivedNotes");
    if (savedNotes) setNotesList(JSON.parse(savedNotes));
    if (savedArchived) setArchivedNotes(JSON.parse(savedArchived));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesList));
  }, [notesList]);

  useEffect(() => {
    localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
  }, [archivedNotes]);

  function getRandomColor() {
    return NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
  }

  function addNewNote() {
    if (inputText.trim() === "") {
      alert("Empty note can't be added!");
      return;
    }
    const newNote = {
      noteText: inputText,
      id: crypto.randomUUID(),
      date: dayjs().format("MMM DD, YYYY"),
      time: dayjs().format("h:mm A"),
      color: selectedColor,
      isPinned: false,
      tags: [],
    };
    setNotesList([newNote, ...notesList]);
    setInputText("");
    setSelectedColor(getRandomColor());
  }

  function togglePin(id) {
    setNotesList(
      notesList.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  }

  function duplicateNote(note) {
    const duplicate = {
      ...note,
      id: crypto.randomUUID(),
      date: dayjs().format("MMM DD, YYYY"),
      time: dayjs().format("h:mm A"),
    };
    setNotesList([duplicate, ...notesList]);
  }

  function archiveNote(id) {
    const note = notesList.find(n => n.id === id);
    if (note) {
      setArchivedNotes([...archivedNotes, { ...note, isPinned: false }]);
      setNotesList(notesList.filter(n => n.id !== id));
    }
  }

  function unarchiveNote(id) {
    const note = archivedNotes.find(n => n.id === id);
    if (note) {
      setNotesList([note, ...notesList]);
      setArchivedNotes(archivedNotes.filter(n => n.id !== id));
    }
  }

  function deleteNote(id) {
    if (filter === 'active') {
      setNotesList(notesList.filter((note) => note.id !== id));
    } else {
      setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
    }
  }

  function editNote(id, noteText) {
    setEditingId(id);
    setEditingText(noteText);
  }

  function saveNote(id) {
    setNotesList(
      notesList.map((note) =>
        note.id === id ? { ...note, noteText: editingText } : note
      )
    );
    setEditingId(null);
    setEditingText("");
  }

  function addTag(noteId) {
    if (newTag.trim() === "") return;
    setNotesList(
      notesList.map((note) =>
        note.id === noteId
          ? { ...note, tags: [...(note.tags || []), newTag.trim()] }
          : note
      )
    );
    setNewTag("");
  }

  function removeTag(noteId, tagToRemove) {
    setNotesList(
      notesList.map((note) =>
        note.id === noteId
          ? { ...note, tags: note.tags.filter(tag => tag !== tagToRemove) }
          : note
      )
    );
  }

  const displayList = filter === 'active' ? notesList : archivedNotes;
  const filteredNotes = displayList
    .filter((note) =>
      note.noteText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  function displayNotes() {
    return filteredNotes.map((note) => (
      <div
        className={`note-card ${note.isPinned ? 'pinned' : ''}`}
        key={note.id}
        style={{
          '--note-bg': note.color.bg,
          '--note-accent': note.color.accent,
        }}
      >
        {note.isPinned && (
          <div className="pin-badge">
            <Pin size={14} />
          </div>
        )}
        
        {note.id === editingId ? (
          <textarea
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
        ) : (
          <p>{note.noteText}</p>
        )}

        {note.tags && note.tags.length > 0 && (
          <div className="note-tags">
            {note.tags.map((tag, idx) => (
              <span key={idx} className="tag">
                <Tag size={12} />
                {tag}
                {editingTags === note.id && (
                  <button onClick={() => removeTag(note.id, tag)}>
                    <X size={12} />
                  </button>
                )}
              </span>
            ))}
          </div>
        )}

        {editingTags === note.id && (
          <div className="add-tag-input">
            <input
              type="text"
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag(note.id)}
            />
            <button onClick={() => addTag(note.id)}>
              <Plus size={14} />
            </button>
          </div>
        )}

        <div className="note-footer">
          <div className="note-meta">
            <span className="note-date">{note.date}</span>
            <span className="note-time">{note.time}</span>
            <span className="note-chars">{note.noteText.length} chars</span>
          </div>
          <div className="note-actions">
            {filter === 'active' && (
              <>
                <button
                  className="icon-btn"
                  onClick={() => togglePin(note.id)}
                  title={note.isPinned ? 'Unpin' : 'Pin'}
                >
                  <Pin size={16} fill={note.isPinned ? "currentColor" : "none"} />
                </button>
                <button
                  className="icon-btn"
                  onClick={() => setEditingTags(editingTags === note.id ? null : note.id)}
                  title="Manage tags"
                >
                  <Tag size={16} />
                </button>
                <button
                  className="icon-btn"
                  onClick={() => duplicateNote(note)}
                  title="Duplicate"
                >
                  <Copy size={16} />
                </button>
              </>
            )}
            {note.id === editingId ? (
              <button className="icon-btn save" onClick={() => saveNote(note.id)}>
                <Check size={16} />
              </button>
            ) : (
              <button
                className="icon-btn"
                onClick={() => editNote(note.id, note.noteText)}
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
            )}
            {filter === 'active' ? (
              <button
                className="icon-btn archive"
                onClick={() => archiveNote(note.id)}
                title="Archive"
              >
                <Archive size={16} />
              </button>
            ) : (
              <button
                className="icon-btn"
                onClick={() => unarchiveNote(note.id)}
                title="Unarchive"
              >
                <Archive size={16} />
              </button>
            )}
            <button
              className="icon-btn delete"
              onClick={() => deleteNote(note.id)}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    ));
  }

  const charCount = inputText.length;

  return (
    <>
      <div className="app-header">
        <h2>
          <span className="app-logo"><PenLine size={40} strokeWidth={2.5} /></span>
          InkFlow
          <span className="app-tagline">notes that flow</span>
        </h2>
        <div className="header-actions">
          <div className="filter-tabs">
            <button
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              Active ({notesList.length})
            </button>
            <button
              className={filter === 'archived' ? 'active' : ''}
              onClick={() => setFilter('archived')}
            >
              Archived ({archivedNotes.length})
            </button>
          </div>
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search notes & tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="notes-container">{displayNotes()}</div>

      {filter === 'active' && (
        <div className="note-input" style={{ '--note-bg': selectedColor.bg, '--note-accent': selectedColor.accent }}>
          <div className="input-header">
            <div className="color-picker">
              {NOTE_COLORS.map((color, index) => (
                <button
                  key={index}
                  className={`color-dot ${selectedColor === color ? 'active' : ''}`}
                  style={{ background: color.accent }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
            <span className="char-counter">{charCount} / 1000</span>
          </div>
          <textarea
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            placeholder="Start typing your note..."
            maxLength={1000}
          ></textarea>
          <button className="add-btn" onClick={addNewNote}>
            <Plus size={18} />
            Add Note
          </button>
        </div>
      )}
    </>
  );
}

export default App;

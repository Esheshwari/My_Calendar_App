import { useState, useEffect } from "react";
import styles from "./Calendar.module.css";

export default function NotesPanel({ selectedDate, note, onSave }: any) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(note);
  }, [note]);

  return (
    <div className={styles.notesPanel}>
      <h3>
        {selectedDate ? `Notes for ${selectedDate}` : "Select a date"}
      </h3>

      {selectedDate && (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
          />
          <button onClick={() => onSave(text)}>Save</button>
        </>
      )}
    </div>
  );
}
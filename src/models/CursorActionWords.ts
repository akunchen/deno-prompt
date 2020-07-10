enum CursorActionWords {
    MOVE_DOWN = "\x1b\x45",         // Move cursor to the next line.
    MOVE_UP = "\x1b\x4d",           // Move cursor to the prev line.
    CLEAR_LINE_BEFORE = "\x1b[1K",  // Clear current line before cursor.
    CLEAR_LINE_ALL = "\x1b[2K",     // Clear cursor current line.
}

export default CursorActionWords;
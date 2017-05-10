grammar Transcriptase;

// A transcript contains one or more BLOCKS

// A BLOCK can either be:
//   - An EPISODE TITLE
//   - A UNIT OF ACTIVITY
//   - A list of references for links and images

// An EPISODE TITLE is
//   A line that begins with 1-6 # characters,
//   followed by at least one space,
//   followed by text
//   followed by two \n (newline) characters

// A UNIT OF ACTIVITY is
//   A TIMESTAMP (optional)
//   A NAME (optional)
//   ACTIVITY CONTENT

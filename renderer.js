// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// Initialize Quill editor
let quill = new Quill('#editor', {
  modules: {
    toolbar: true  // Include button in toolbar
  },
  theme: 'snow'
})

// Initialize Quill editor
let quill = new Quill('#editor', {
  modules: {
    syntax: false,              // Include syntax module
    toolbar: true  // Include button in toolbar
  },
  theme: 'snow'
})

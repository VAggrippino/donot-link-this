(()=>{
  const selection = window.getSelection();
  // If the selection type isn't a Range, nothing's selected
  if (selection.type === 'Range') {
    // Generate the replacement text
    const replacement = selection.toString()
        .replace(/([@#\.])/g, '$1\u200B')
        .replace(/(https?)(:\/\/)/g, '$1\u200B$2');

    // Determine what's selected
    let target = null;
    // If the anchorNode and focusNode are the same AND the anchorOffset and
    // focusOffset are the same, the selection must be inside a form field.
    if (selection.anchorNode === selection.focusNode &&
      selection.anchorOffset === selection.focusOffset
    // It's a form field
    ) {
      target = selection.anchorNode.childNodes[selection.anchorOffset];
      const value = target.value;
      const before = value.substring(0, target.selectionStart);
      const after = value.substring(target.selectionEnd + 1);
      target.value = before + replacement + after;

    // It's a block of text
    } else {
      target = selection.getRangeAt(0);
      target.deleteContents();
      target.insertNode(document.createTextNode(replacement));
    }
  }
})();

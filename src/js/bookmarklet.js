(()=>{
  const selection = window.getSelection();
  // If the selection type isn't a Range, nothing's selected
  if (selection.type === 'Range') {
    // Generate the replacement text
    const replacement = selection.toString()
        .replace(/([@#\.])/g, '$1\u200B')
        .replace(/(https?)(:\/\/)/g, '$1\u200B$2');

    // Create the user interface
    const uiDiv = document.createElement('div');
    const uiTextarea = document.createElement('textarea');
    const uiCopyButton = document.createElement('button');
    const uiCloseButton = document.createElement('button');

    // Style the UI container
    uiDiv.style.position = 'absolute';
    uiDiv.style.top = '50%';
    uiDiv.style.left = '50%';
    uiDiv.style.transform = 'translate(-50%,-50%)';
    uiDiv.style.zIndex = '9001';
    uiDiv.style.padding = '1em';
    uiDiv.style.backgroundColor = 'bisque';
    uiDiv.style.borderRadius = '0.5em';
    uiDiv.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.3)';

    // Style the UI textarea
    uiTextarea.setAttribute('rows', '4');
    uiTextarea.style.width = '33vw';
    uiTextarea.value = replacement;

    // Style the UI copy button and handle the click event
    uiCopyButton.appendChild(document.createTextNode('Copy'));
    uiCopyButton.addEventListener('click', (e) => {
      e.target.parentNode.getElementsByTagName('textarea')[0].select();
      document.execCommand('copy');
    });

    // Style the close button and handle the click event
    uiCloseButton.appendChild(document.createTextNode('Close'));
    uiCloseButton.addEventListener('click', () => {
      document.body.removeChild(uiDiv);
    });

    // Assemble the pieces
    uiDiv.appendChild(uiTextarea);
    uiDiv.appendChild(document.createElement('br'));
    uiDiv.appendChild(uiCopyButton);
    uiDiv.appendChild(uiCloseButton);
    document.body.appendChild(uiDiv);
  }
})();

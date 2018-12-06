function removeDialog() {
  const oldContainers = document.querySelectorAll('.donot_link_this');
  oldContainers.forEach((oldContainer) => {
    document.body.removeChild(oldContainer);
  });
}

function createResultBox() {
  removeDialog();
  const container = document.createElement('div');
  container.classList.add('donot_link_this');

  const title = document.createElement('div');
  title.classList.add('donot_link_this--title');
  title.appendChild(document.createTextNode("Don't link this"));

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.classList.add('donot_link_this--closeButton');
  closeButton.onclick = removeDialog;

  // Result field
  const fieldBlock = document.createElement('div');
  fieldBlock.classList.add('donot_link_this--field');

  const result = document.createElement('textarea');
  result.setAttribute('id', 'result');
  result.classList.add('donot_link_this--result');

  // Buttons
  const buttonBlock = document.createElement('div');
  buttonBlock.classList.add('donot_link_this--buttonBlock');

  const copyButton = document.createElement('button');
  copyButton.innerText = 'Copy';
  copyButton.classList.add('donot_link_this--copyButton');

  copyButton.onclick = () => {
    result.select();
    document.execCommand('copy');
    document.body.removeChild(container);
  };

  const replaceButton = document.createElement('button');
  replaceButton.innerText = 'Replace';
  replaceButton.classList.add('donot_link_this--replaceButton');
  // A handler can't be attached to the replace button until
  // we have a selected range.

  // Add Children
  container.appendChild(title);
  container.appendChild(closeButton);

  fieldBlock.appendChild(result);
  container.appendChild(fieldBlock);

  buttonBlock.appendChild(copyButton);
  buttonBlock.appendChild(replaceButton);
  container.appendChild(buttonBlock);
  document.body.appendChild(container);
}

function replaceText(obj, replacement) {
  // If it's a range, treat it like a block of text.
  // Otherwise treat it like a form field
  if (obj instanceof Range) {
    obj.deleteContents();
    obj.insertNode(document.createTextNode(replacement));
  } else {
    const before = obj.value.substring(0, obj.selectionStart);
    const after = obj.value.substring(obj.selectionEnd + 1);
    obj.value = before + replacement + after;
  }
}

function activate() {
  const selection = window.getSelection();
  if (selection.type === 'Range') {
    let selectionTarget = null;
    // If the anchorNode and focusNode are the same AND the
    // anchorOffset and focusOffset are the same, the
    // selection must be inside a form field.
    // eslint-disable-next-line max-len
    if (selection.anchorNode === selection.focusNode && selection.anchorOffset === selection.focusOffset) {
      selectionTarget = selection.anchorNode.childNodes[selection.anchorOffset];
    } else {
      selectionTarget = selection.getRangeAt(0);
    }

    createResultBox();
    let str = selection.toString();
    str = str.replace(/([@#\.])/g, '$1\u200B');
    str = str.replace(/(https?)(:\/\/)/g, '$1\u200B$2');
    const replacement = str;

    // eslint-disable-next-line max-len
    const replaceButton = document.getElementsByClassName('donot_link_this--replaceButton')[0];
    replaceButton.addEventListener('click', () => {
      replaceText(selectionTarget, replacement);
      removeDialog();
    });
    document.getElementById('result').value = replacement;
  }
};

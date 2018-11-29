export function autoExpand(ta) {
  // This only works on textarea elements
  if (ta.tagName === 'TEXTAREA') {
    // Hide overflow so that the browser's calculation of
    // scrollHeight isn't thrown off later
    ta.style.overflow = 'hidden';

    // Determine the minimum number of rows
    ta.minRows = +(ta.dataset.minRows || ta.getAttribute('rows') || '2');

    // Store and clear the value temporarily so we can
    // measure the empty textarea
    const value = ta.value;
    ta.value = '';

    // Store the minimum height of the textarea
    ta.minHeight = ta.scrollHeight;

    // Restore the original value
    ta.value = value;

    // Store the lineHeight for use in calculating the
    // number of rows needed
    const taStyle = getComputedStyle(ta);
    const taLineHeight = taStyle.getPropertyValue('line-height');

    // If there's an unusable line-height value (such as 'normal'), use 1.2
    let lineHeight = parseInt(taLineHeight);
    if (isNaN(lineHeight)) {
      ta.style.lineHeight = '1.2';
      const taFontSize = taStyle.getPropertyValue('font-size');
      lineHeight = Math.ceil(parseInt(taFontSize) * 1.2);
    }

    ta.lineHeight = lineHeight;

    const setHeight = (ta) => {
      // Reset the size of the element so that it doesn't
      // mess up the calculation of the extra rows
      ta.rows = ta.minRows;

      // Round up the difference between the current
      // content height and the minimum content height
      // divided by the line height to get the count of
      // new rows needed
      const currentHeight = ta.scrollHeight;
      const newRows = Math.ceil((currentHeight - ta.minHeight) / ta.lineHeight);
      if (currentHeight > ta.minHeight) {
        ta.rows = ta.minRows + newRows;
      }
    };

    setHeight(ta);

    // Attach an input handler to automatically expand the
    // textarea
    ta.addEventListener('input', (e) => setHeight(e.target));
  }
}

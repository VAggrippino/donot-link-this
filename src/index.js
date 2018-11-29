import * as linkify from 'linkifyjs';
import linkifyHtml from 'linkifyjs/html';
import hashtag from 'linkifyjs/plugins/hashtag';
import mention from 'linkifyjs/plugins/mention';
import ticket from 'linkifyjs/plugins/ticket';
import debounce from 'lodash.debounce';

require('./scss/main.scss');

hashtag(linkify);
mention(linkify);
ticket(linkify);

const linkifyOptions = {
  defaultProtocol: 'https',
  formatHref: {
    url: (target) => target,
    hashtag: (target) => 'https://twitter.com/hashtag/' + target.substring(1),
    mention: (target) => 'https://twitter.com/' + target.substring(1),
    ticket: (target) => 'https://github.com/VAggrippino/donot-link-this/issues/' + target.substring(1),
  },
};

function updateOutput(e) {
  const demoInput = document.getElementById('demo_input');
  const demoOutput = document.getElementById('demo_output');
  demoOutput.innerHTML = linkifyHtml(demoInput.value, linkifyOptions);
  demoOutput.classList.add('updated');
}

function removeUpdateAnimation(e) {
  const demoOutput = document.getElementById('demo_output');
  demoOutput.classList.remove('updated');
}

const demoInput = document.getElementById('demo_input');
const demoOutput = document.getElementById('demo_output');

demoInput.addEventListener('input', debounce(updateOutput, 500));
demoOutput.addEventListener('transitionend', removeUpdateAnimation);

const fixButton = document.getElementById('fix_button');
fixButton.addEventListener('click', (e) => {
  let msg = demoInput.value;
  msg = msg.replace(/([@#\.])/g, '$1\u200B');
  msg = msg.replace(/(https?)(:\/\/)/g, '$1$2\u200B');
  demoInput.value = msg;
  demoOutput.innerHTML = linkifyHtml(demoInput.value, linkifyOptions);
  demoOutput.classList.add('updated');
});

window.addEventListener('load', updateOutput);

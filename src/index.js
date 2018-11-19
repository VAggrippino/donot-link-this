import * as linkify from 'linkifyjs';
import linkifyHtml from 'linkifyjs/html';
import hashtag from 'linkifyjs/plugins/hashtag';
import mention from 'linkifyjs/plugins/mention';
import ticket from 'linkifyjs/plugins/ticket';

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

const exampleInput = document.getElementsByClassName('example__input')[0];
const exampleOutput = document.getElementsByClassName('example__output')[0];

exampleOutput.innerHTML = linkifyHtml(exampleInput.value, linkifyOptions);

exampleInput.addEventListener('change', (e) => {
  exampleOutput.innerHTML = linkifyHtml(exampleInput.value, linkifyOptions);
});

exampleInput.addEventListener('keyup', (e) => {
  exampleOutput.innerHTML = linkifyHtml(exampleInput.value, linkifyOptions);
});

exampleInput.addEventListener('mousedown', (e) => {
  exampleOutput.innerHTML = linkifyHtml(exampleInput.value, linkifyOptions);
});

exampleInput.addEventListener('mouseup', (e) => {
  exampleOutput.innerHTML = linkifyHtml(exampleInput.value, linkifyOptions);
});

const fixButton = document.getElementsByClassName('example__fix')[0];
fixButton.addEventListener('click', (e) => {
  console.log('fix');
  let msg = exampleInput.value;
  msg = msg.replace(/([@#\.])/g, '$1\u200B');
  msg = msg.replace(/(https?)(:\/\/)/g, '$1$2\u200B');
  exampleInput.value = msg;
  exampleOutput.innerHTML = linkifyHtml(exampleInput.value, linkifyOptions);
});

// Generated by LiveScript 1.2.0
var cheerio, MarkdownIt, md, out$ = typeof exports != 'undefined' && exports || this;
cheerio = require('cheerio');
MarkdownIt = require("markdown-it");
md = new MarkdownIt({
  html: true
}).use(require('markdown-it-attrs')).use(require('markdown-it-header-sections')).use(require('markdown-it-emoji')).use(require('markdown-it-ins')).use(require('markdown-it-mark'));
out$.render = render;
function render(input){
  var result, $, s;
  result = md.render(input);
  $ = cheerio.load(result, {
    decodeEntities: false
  });
  $('section:has(> h2)').each(function(){
    var $table, $tr;
    if ($(this).find('h1').length) {
      return;
    }
    $table = $('<table />');
    $tr = $('<tr />').append($('<th class="col-1" />')).append($('<th class="col-2" />').html('希望方式 / 準備事項')).append($('<th class="col-3" />').html('✍ 醫師建議 / 備註'));
    $table.append($tr);
    $(this).find('section:has(> h3)').each(function(){
      var $h3, $tr, $th, $td;
      $(this).css({
        display: 'none'
      });
      $h3 = $(this).find('h3');
      $tr = $('<tr />');
      $th = $('<th class="col-1" />').html($h3.html());
      $td = $('<td />').html($(this).html());
      $td.find('h3').remove();
      $tr.append($th, $td, $('<td />'));
      return $table.append($tr);
    });
    return $(this).append($table);
  });
  s = "@media print\n	.container > h1,\n	.container > h2,\n	.footer,\n  .editor,\n	.hint\n	  display: none\n	.preview\n	  width: 90%\n	section\n	  page-break-inside: avoid\n\n	\ntable\n  width: 100%\n  border-collapse: collapse\n  th, td\n    border: 1px solid black\n  th\n    &.col-1\n      width: 15%\n      text-align: left\n      padding-left: 1em\n    &.col-2\n      width: 65%\n    &.col-3\n      width: 20%\n  td\n    padding-right: 1em\n    padding-top: 0.5em\n    padding-bottom: 0.5em\n	ul\n	  margin-top: 0\n	  margin-bottom: 0";
  result = $.html();
  stylus(s).render(function(err, css){
    console.log('zz', err, css);
    return result += ['<style>', css, '</style>'].join("\n");
  });
  console.log('done');
  return result;
}
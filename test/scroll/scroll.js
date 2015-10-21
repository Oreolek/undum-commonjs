var undum = require('../../lib/undum.js');

undum.game.situations = {};

undum.game.situations.start = new undum.SimpleSituation(
  '<p>This is a situation for testing the scrolling code.</p>',
  {choices: ['long', 'short', 'replacement']});

undum.game.situations.long = new undum.SimpleSituation(
  '<p>Lorem ipsum dolor sit amet, cum esse fugit eu, eum ridens discere blandit ea,'  +
  'inani qualisque eu vix. Ad agam epicuri consectetuer cum, pri nostrum accusata ' +
  'indoctum eu, quaeque maiorum sed in. His ea nisl sonet quaeque. Ad mea possim ' +
  'theophrastus, ad aliquando disputationi quo, at vix choro ubique doming.</p>' +

  '<p>Mei ei elit tritani oblique, per nominati forensibus et. Quo ne quem odio ' +
  'melius. Ex duo amet diam vituperata, eos velit molestie conceptam ad, no ' +
  'nominati prodesset quo. Senserit mediocrem cu qui. Ad laudem everti diceret ' +
  'quo, per te inani feugiat sanctus.</p>' +

  '<p>Ad meis mucius eripuit has, harum perfecto legendos mei ad, ei vim autem ' +
  'eruditi meliore. Phaedrum electram mea cu, et vel legere nonumes convenire .' +
  'Eam ubique antiopam ut, no odio partiendo torquatos quo, qui ne quod duis ' +
  'nullam. Quando nostro no has, populo prompta blandit at eos. Eos erant animal ' +
  'referrentur eu, iusto vivendo comprehensam no est, ex adhuc numquam cum.</p>' +

  '<p>Minim delenit eum ex. Ex his persius postulant efficiantur, mediocrem ' +
  'repudiandae eos te. Sed eripuit democritum cu, his habeo periculis voluptatum ' +
  'ut, copiosae contentiones sea id. Nam ex graecis admodum interpretaris, ' +
  'eruditi suavitate voluptaria eam in. Pri ut sumo tritani. Te diam dicant ' +
  'patrioque mei, et ludus diceret salutandi ius, falli vocent salutandi eam ne.</p>' +

  '<p>Mei ei elit tritani oblique, per nominati forensibus et. Quo ne quem odio ' +
  'melius. Ex duo amet diam vituperata, eos velit molestie conceptam ad, no ' +
  'nominati prodesset quo. Senserit mediocrem cu qui. Ad laudem everti diceret ' +
  'quo, per te inani feugiat sanctus.</p>' +

  '<p>Ad meis mucius eripuit has, harum perfecto legendos mei ad, ei vim autem ' +
  'eruditi meliore. Phaedrum electram mea cu, et vel legere nonumes convenire .' +
  'Eam ubique antiopam ut, no odio partiendo torquatos quo, qui ne quod duis ' +
  'nullam. Quando nostro no has, populo prompta blandit at eos. Eos erant animal ' +
  'referrentur eu, iusto vivendo comprehensam no est, ex adhuc numquam cum.</p>',
  {choices: ['short', 'replacement'],
    optionText: function () {return 'Long content'}});

undum.game.situations.short = new undum.SimpleSituation(
  '<p>Lorem ipsum dolor sit amet.</p>', {choices: ['long', 'replacement'],
    optionText: function () {return 'Short content'}});

undum.game.situations.replacement = new undum.SimpleSituation(
  '<p id="first">Lorem ipsum dolor sit amet, cum esse fugit eu, eum ridens discere blandit ea,'  +
  'inani qualisque eu vix. Ad agam epicuri consectetuer cum, pri nostrum accusata ' +
  'indoctum eu, quaeque maiorum sed in. His ea nisl sonet quaeque. Ad mea possim ' +
  'theophrastus, ad aliquando disputationi quo, at vix choro ubique doming.</p>' +

  '<p id="second">Mei ei elit tritani oblique, per nominati forensibus et. Quo ne quem odio ' +
  'melius. Ex duo amet diam vituperata, eos velit molestie conceptam ad, no ' +
  'nominati prodesset quo. Senserit mediocrem cu qui. Ad laudem everti diceret ' +
  'quo, per te inani feugiat sanctus.</p>' +

  '<p id="third">Ad meis mucius eripuit has, harum perfecto legendos mei ad, ei vim autem ' +
  'eruditi meliore. Phaedrum electram mea cu, et vel legere nonumes convenire .' +
  'Eam ubique antiopam ut, no odio partiendo torquatos quo, qui ne quod duis ' +
  'nullam. Quando nostro no has, populo prompta blandit at eos. Eos erant animal ' +
  'referrentur eu, iusto vivendo comprehensam no est, ex adhuc numquam cum.</p>' +
  '<p>Click <a href="./first">this link</a> to replace a paragraph.</p>' +

    '<p id="second">Mei ei elit tritani oblique, per nominati forensibus et. Quo ne quem odio ' +
  'melius. Ex duo amet diam vituperata, eos velit molestie conceptam ad, no ' +
  'nominati prodesset quo. Senserit mediocrem cu qui. Ad laudem everti diceret ' +
  'quo, per te inani feugiat sanctus.</p>' +

    '<p id="second">Mei ei elit tritani oblique, per nominati forensibus et. Quo ne quem odio ' +
  'melius. Ex duo amet diam vituperata, eos velit molestie conceptam ad, no ' +
  'nominati prodesset quo. Senserit mediocrem cu qui. Ad laudem everti diceret ' +
  'quo, per te inani feugiat sanctus.</p>' +

    '<p id="second">Mei ei elit tritani oblique, per nominati forensibus et. Quo ne quem odio ' +
  'melius. Ex duo amet diam vituperata, eos velit molestie conceptam ad, no ' +
  'nominati prodesset quo. Senserit mediocrem cu qui. Ad laudem everti diceret ' +
  'quo, per te inani feugiat sanctus.</p>' +

    '<p id="second">Mei ei elit tritani oblique, per nominati forensibus et. Quo ne quem odio ' +
  'melius. Ex duo amet diam vituperata, eos velit molestie conceptam ad, no ' +
  'nominati prodesset quo. Senserit mediocrem cu qui. Ad laudem everti diceret ' +
  'quo, per te inani feugiat sanctus.</p>' +

    '<p id="second">Mei ei elit tritani oblique, per nominati forensibus et. Quo ne quem odio ' +
  'melius. Ex duo amet diam vituperata, eos velit molestie conceptam ad, no ' +
  'nominati prodesset quo. Senserit mediocrem cu qui. Ad laudem everti diceret ' +
  'quo, per te inani feugiat sanctus.</p>',
  {
    optionText: function () {return 'Mutable content'},
    choices: ['long', 'short'],
    actions: {
     first: function (character, system) {
      system.replaceWith('<p>This is new content, and should be put correctly in view.</p>', '#first');
    }}
  });

undum.game.init = function () {};

window.onload = undum.begin;
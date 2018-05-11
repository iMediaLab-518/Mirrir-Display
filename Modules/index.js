/**
 * 
 * @authors Wang Hanze
 * @date    2018-05-10 02:24:26
 * @version 1.6.0
 */

/* jshint esversion: 6 */

function fetchContext() {
  let time = moment().format('HH:mm');
  let second = moment().format(':ss');
  let date = moment().format('YYYY-MM-DD');
  let week = moment().format('dddd');
  $('#time-element').text(time);
  $('#second-element').text(second);
  $('#date-element').text(date);
  $('#week-element').text(week);
}

function getWeather(city = 'hangzhou') {
  let KEY = '5d406a7cf41246108dd72c0986759cbd';
  let API = 'https://free-api.heweather.com/s6/weather';
  let LOCATION = city;
  let url = API + '?location=' + LOCATION + '&key=' + KEY + '&' + 'lang=en' + '&' + 'unit=m';
  //console.log(url);
  $.ajax({
    type: 'GET',
    async: false,
    cache: false,
    url: url,
    dataType: 'json',
    success: (data) => {
      let weather = data.HeWeather6[0];
      console.log(weather);
      $('#weather-element').text(weather.now.cond_txt);
      $('#temp-element').text(weather.now.tmp);
      $('#humidity-element').text(weather.now.hum);
    }
  });
}

function voice_assistant(strInput = '') {
  $('#assistant-element').fadeIn(1000);
  $('#assistant-element').text('');
  let count = 0;
  let timer = setInterval(event => {
    if (count >= strInput.length) {
      clearInterval(timer);
      $('#assistant-element').fadeOut(1000);
    } else {
      //icon_breath();
      $('#assistant-element').text($('#assistant-element').text() + strInput[count]);
      count++;
    }
  }, 200);
}

function getHealthInfo(GATE = '') {
  let API = 'http://127.0.0.1:12345/' + GATE;
  //console.log(API);
  $.ajax({
    type: 'GET',
    cache: false,
    url: API,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    jsonpCallback: 'successCallback',
    success: (data) => {
      let health = data.out;
      console.log(health);
      $('#health-1').text(health);
      $('.healthreport-table').fadeTo(500, 0.8);
    }
  });
}

function getVoiceInfo(GATE = 'voice') {
  voice_assistant('请输入语音指令');
  let API = 'http://127.0.0.1:12345/' + GATE;
  //console.log(API);
  $.ajax({
    type: 'GET',
    cache: false,
    url: API,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    jsonpCallback: 'successCallback',
    success: (data) => {
      let health = data.res;
      let voice = unescape(str.replace(/\\u/g, '%u'));
      console.log(voice);
      $('#health-2').text(voice);
    }
  });
}

function playVideo(video = $('.video-table')) {
  video.fadeIn(500);
  video.trigger('play');
}

function stopVideo(video = $('.video-table')) {
  video.trigger('end');
  video.fadeOut(500);
}

$(document).ready(event => {
  $('.healthreport-table').fadeTo(0, 0);
  fetchContext();
  getWeather();
  let fetchTimer1 = window.setInterval(fetchContext, 1000);
  let fetchTimer2 = window.setInterval(getWeather, 300000);
  let fetchTimer3 = window.setInterval('getHealthInfo("temperature")', 1000);
  //let fetchTimer4 = window.setInterval('voice_assistant("智能健康魔镜项目演示")', 5000);
  let fetchTimer5 = window.setInterval(getVoiceInfo, 3000);
});
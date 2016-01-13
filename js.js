(function(){
	'use strict';

  var canvas = document.getElementById('c');
  var ctx = canvas.getContext('2d');

  var width = 500;
  var height = 500;
  var dotsNum = 200;
  var dots = [];

  var dotWidth = 3;

  function resize() {
    width = parseInt(getComputedStyle(document.body).width.slice(0, -2), 10);
    height = parseInt(getComputedStyle(document.body).height.slice(0, -2), 10);

    canvas.setAttribute('height', height);
    canvas.setAttribute('width', width);
  }

  function init(){
    window.addEventListener('resize', resize);

    resize();

    for(let i = 0; i < dotsNum; i++){
    	dots.push(newDot());
    }
    step();
  }

  function newDot(){
  		return {
        x : rand(1, width),
        y : rand(1,height)
      };
  }

  function rand(min, max){
  		return Math.round((Math.random() * max * min * 10)) % (max - min) + min;
  }

  function drawDots(){
  		dots.forEach(drawDot);
  }

  function drawDot(dot){
  		ctx.fillRect(dot.x, dot.y, dotWidth, dotWidth);
  }

  function moveDots(){
  		for(let dot of dots){
      		moveDot(dot);
      }
  }

  function moveDot(dot){
    dot.x += dot.deltaX;
    dot.y += dot.deltaY;
  }

  function distance(dot1, dot2){
    return Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2));
  }

  function drawLines() {
    for(let i = 0; i < dotsNum; i++){
      for(let j = i+1; j < dotsNum; j++){
        if(distance(dots[i], dots[j]) < 50){
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function step() {
    for(let i = 0; i < dotsNum; i++){
      dots[i].deltaX = Math.random() * [-1,1][Math.round((Math.random() * 100)) % 2];
      dots[i].deltaY = Math.random() * [-1,1][Math.round((Math.random() * 100)) % 2];
    }
  }

  function clear(){
  	ctx.clearRect(0, 0, width, height);
  }

  function render(){
  		clear();
      moveDots();
			drawDots();
      drawLines();
			requestAnimationFrame(render);
  }

  init();
  render();
  setInterval(step, 1000);

})();

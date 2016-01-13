(function(){
	'use strict';

  var canvas = document.getElementById('c');
  var ctx = canvas.getContext('2d');

  var width = 500;
  var height = 500;
  var dotsNum = 5000;
  var dots = [];

  var dotWidth = 3;

  function init(){

    for(let i = 0; i < dotsNum; i++){
    	dots.push(newDot());
    }
  }

  function newDot(){
  		return {x:rand(1, height), y:rand(1,height)};
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
  	var deltaX = Math.random() * [-1,1][Math.round((Math.random() * 100)) % 2];
    var deltaY = Math.random() * [-1,1][Math.round((Math.random() * 100)) % 2];

    dot.x += deltaX;
    dot.y += deltaY;
  }

  function clear(){
  	ctx.clearRect(0, 0, width, height);
  }

  function render(){
  		clear();
			drawDots();
      moveDots();
			requestAnimationFrame(render);
  }

  init();
  render();

})();

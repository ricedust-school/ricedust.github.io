function preload() {
  // img = loadImage("ref.png");  
}

function setup() {
  let cnv = createCanvas(600, 600);
  let newCanvasX = (windowWidth - 600)/2;
  let newCanvasY = (windowHeight - 600)/2;
  cnv.position(newCanvasX, newCanvasY);
  strokeCap(SQUARE);
}

// sets pencil settings
function pencil() {
  strokeWeight(2);
  stroke(0);
}

// contains instructions to sketch with pencil
function sketch() {
  pencil();
  // face outline
  line(185, 275, 215, 425);
  line(215, 425, 310, 515);
  line(310, 515, 366, 508);
  line(366, 508, 420, 415);
  line(420, 415, 441, 349);
  line(441, 349, 443, 269);
  line(443, 269, 400, 242);
  line(400, 242, 366, 265);
  line(366, 265, 257, 271);
  line(257, 271, 236, 248);
  line(236, 248, 200, 244);
  line(200, 244, 185, 275);
    
  // face shadows
  line(363, 273, 347, 302); // right side
  line(347, 302, 361, 376);
  line(361, 376, 352, 403);
  line(352, 403, 361, 430);
  line(361, 430, 353, 502);
  
  line(238, 342, 247, 364); // left side
  line(247, 364, 281, 360);
  line(281, 360, 292, 409);
  line(292, 409, 304, 399);
  line(304, 399, 309, 350);
  line(309, 350, 326, 283);
  
  // neck outline
  line(225, 435, 224, 451); // left shoulder
  line(224, 451, 209, 483);
  line(209, 483, 185, 509);
  line(185, 509, 31, 598);
  
  line(375, 494, 385, 509); // right shoulder
  line(385, 509, 504, 558);
  line(504, 558, 541, 599);
  
  line(187, 508, 221, 563); // neckline
  line(221, 563, 283, 599);
  line(385, 507, 395, 553);
  line(395, 553, 380, 599);
  
  // neck shadows
  line(338, 509, 335, 546);
  line(335, 546, 371, 568);
  line(371, 568, 393, 564);
  
  line(310, 515, 295, 555);
  line(295, 555, 310, 599);
  
  // neck highlights
  line(239, 455, 299, 580);
  line(299, 580, 298, 599);
  line(298, 599, 197, 530);
  
  line(388, 573, 342, 554);
  line(342, 554, 337, 592);
  line(337, 592, 364, 597);
  line(364, 597, 388, 573);
  
  // ear outline
  line(178, 268, 162, 252);
  line(162, 252, 151, 259);
  line(151, 259, 147, 282);
  line(147, 282, 167, 349);
  line(167, 349, 182, 362);
  line(182, 362, 196, 355);

  // ear shadows
  line(161, 263, 154, 262);
  line(154, 262, 153, 274);
  line(153, 274, 157, 292);
  line(157, 292, 161, 263);
  
  line(181, 292, 163, 292);
  line(163, 292, 165, 315);
  line(165, 315, 178, 320);
  line(178, 320, 182, 327);
  line(182, 327, 189, 328);
  line(189, 328, 182, 312);
  line(182, 312, 181, 292);
  
  // philtrum shadow
  line(345, 406, 348, 426);
  line(348, 426, 338, 422);
  line(338, 422, 345, 406);
  
  // nose highlight
  line(337, 296, 350, 375);
  line(350, 375, 314, 361);
  line(314, 361, 337, 296);
  
  
  // temple highlight
  line(251, 268, 229, 292);
  line(229, 292, 260, 330);
  line(260, 330, 225, 360);
  line(225, 360, 196, 309);
  line(196, 309, 192, 263);
  
  // eye highlight
  line(437, 265, 376, 284);
  line(376, 284, 385, 317);
  line(385, 317, 412, 333);
  
  // chin highlight
  line(308, 477, 318, 497);
  line(318, 497, 340, 488);
  line(340, 488, 327, 474);
  line(327, 474, 308, 477);
  
  // nose contours
  line(306, 389, 313, 397);
  line(313, 397, 328, 394);
  line(328, 394, 349, 403);
  line(349, 403, 370, 397);
  
  line(380, 369, 387, 382);
  line(387, 382, 386, 388);
  
  // eye contours
  line(308, 310, 292, 289); // left eye
  line(292, 289, 264, 289);
  line(264, 289, 238, 298);
  line(301, 303, 280, 313);
  line(280, 313, 259, 310);
  line(259, 310, 248, 299);
  line(264, 293, 266, 306); // iris
  line(266, 306, 276, 310);
  line(290, 292, 285, 307);
  
  line(377, 307, 391, 288); // right eye
  line(391, 288, 412, 286);
  line(412, 286, 431, 294);
  line(384, 304, 404, 310);
  line(404, 310, 418, 305);
  line(418, 305, 423, 294);
  line(386, 297, 390, 305); // iris
  line(410, 288, 411, 297);
  line(411, 297, 407, 306);
  
  // mouth contour
  line(300, 440, 346, 444);
  line(346, 444, 386, 433);
  
  line(307, 439, 329, 428); // upper lip
  line(329, 428, 336, 429);
  line(336, 429, 349, 434);
  line(349, 434, 361, 426);
  line(361, 426, 369, 426);
  line(369, 426, 381, 431);
  
  line(305, 445, 329, 459); // bottom lip
  line(329, 459, 363, 458);
  line(363, 458, 381, 437);
  
  // hair outline
  line(176, 260, 148, 197);
  line(148, 197, 154, 126);
  line(154, 126, 195, 69);
  line(195, 69, 259, 51);
  line(259, 51, 352, 38);
  line(352, 38, 445, 99);
  line(445, 99, 487, 219);
  line(487, 219, 453, 288);
  
  // hair shadow
  line(205, 71, 211, 122);
  line(211, 122, 256, 91);
  line(256, 91, 229, 167);
  line(229, 167, 287, 106);
  line(287, 106, 256, 189);
  line(256, 189, 280, 258);
  
  line(325, 48, 390, 105);
  line(390, 105, 388, 72);
  
  line(198, 85, 177, 155);
  line(177, 155, 199, 223);
}

// sets charcoal settings
function charcoal(tone) {
  strokeWeight(30);
  if (tone === 'black') {
    strokeWeight(50);
    stroke(0, 150);
  }
  else if (tone === 'shadow') {
    stroke(0, 50);  
  }
}

// contains instructionss to block in blacks
function black() {
  charcoal('black');
  line(409, 79, 465, 239);  
}

// contains instructions to block in shadows
function shadow() {
  charcoal('shadow');
  line(357, 246, 384, 403);
  line(375, 377, 360, 419);
  line(373, 414, 371, 506);
  line(406, 405, 347, 507);
  line(405, 251, 358, 318);
  line(425, 342, 405, 412);
  line(427, 259, 425, 350);
  line(374, 456, 414, 232);
  line(363, 301, 379, 370);
  line(388, 247, 406, 437);
  line(420, 268, 424, 374);
  line(420, 364, 380, 455);
  
  // neck
  line(325, 513, 326, 599);
  line(307, 549, 326, 599);
  line(306, 560, 328, 513);
  line(364, 508, 391, 542);
  line(350, 508, 353, 544);
  line(391, 558, 341, 527);
  line(382, 509, 363, 561);
}

// contains instructions to add highlights
function highlight() {
    
}

function draw() {
  // image(img, 0, 0);
  background(255);
  black();
  shadow();
  sketch();
  strokeWeight(1);
  text(mouseX + ", " + mouseY, mouseX, mouseY);
}

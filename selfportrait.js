function setup() {
  let cnv = createCanvas(600, 600);
  let newCanvasX = (windowWidth - 600)/2;
  let newCanvasY = (windowHeight - 600)/2;
  cnv.position(newCanvasX, newCanvasY);
  strokeCap(SQUARE);
  
  // calls drawing functions
  background(255);
  black();
  shadow();
  midtone();
  highlight();
  // guide();
}

// sets pencil settings
function pencil() {
  strokeWeight(2);
  stroke(0);
}

// sets charcoal settings
function charcoal(tone) {
  if (tone === 'black') {
    stroke(0, 150);
  }
  else if (tone === 'shadow') {
    stroke(0, 75);  
  }
  else if (tone === 'midtone') {
    stroke(0, 30); 
  }
  else if (tone === 'highlight') {
    stroke(255, 125);
  }
}

// contains instructions to create guide with pencil
function guide() {
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

// contains instructionss to add blacks
function black() {
  charcoal('black');
  strokeWeight(50);
  
  // hair
  line(409, 79, 465, 239);  
  line(467, 200, 432, 270);
  line(423, 91, 410, 245);
  line(210, 89, 338, 65);
  line(307, 60, 380, 131);
  line(350, 246, 419, 195);
  line(279, 182, 307, 256);
  line(276, 196, 315, 98);
  line(314, 265, 323, 122);
  line(361, 265, 373, 113);
  line(273, 232, 415, 146);
  line(365, 84, 333, 181);
  line(195, 245, 169, 180);
  line(241, 69, 337, 87);
  
  // shirt
  line(402, 541, 493, 580);
  line(486, 575, 524, 615);
  line(431, 530, 400, 615);
  line(385, 582, 474, 620);
  line(446, 557, 519, 610);
  line(181, 556, 170, 556);
  line(129, 583, 120, 589);
  
  strokeWeight(25);
  
  // hair
  line(302, 105, 265, 192);
  line(232, 147, 306, 70);
  line(296, 250, 368, 251);
  line(464, 265, 403, 225);
  line(471, 215, 437, 118);
  line(193, 94, 167, 135);
  line(167, 125, 162, 193);
  line(229, 63, 212, 119);
  
  // nostrils
  //line(329, 394, 328, 399);
  //line(370, 391, 373, 396);
  
  // iris
  line(279, 288, 277, 308);
  line(400, 306, 398, 285);
  
  // shirt
  line(397, 514, 406, 549);
  line(179, 522, 259, 605);
  line(149, 546, 180, 590);
  line(102, 570, 110, 599);
}

// contains instructions to add shadows
function shadow() {
  charcoal('shadow');
  strokeWeight(50);
  
  // face
  line(420, 255, 415, 355);
  line(369, 249, 384, 366);
  line(413, 253, 366, 312);
  line(396, 323, 403, 400);
  line(401, 397, 340, 506);
  line(348, 268, 437, 232);
  line(418, 343, 392, 415);
  
  // eyes
  line(255, 290, 256, 294);
  line(412, 286, 411, 290);
  
  // ears
  line(184, 317, 178, 319);
  
  // hair
  line(332, 55, 430, 116);
  line(221, 73, 190, 185);
  line(221, 243, 207, 137);
  line(243, 253, 290, 227);
  line(167, 201, 280, 221);  
  line(289, 103, 219, 196);
  
  // lips
  line(346, 441, 347, 449);
  line(367, 436, 368, 439);
  line(325, 441, 325, 444);
  
  // neck
  line(421, 596, 352, 502);
  line(335, 510, 333, 599);
  line(337, 527, 395, 542);
  line(354, 566, 363, 566);
  
  // shirt
  line(200, 532, 34, 630);
  line(150, 532, 280, 620);
  line(214, 590, 107, 599);
  line(230, 577, 97, 615);
  line(125, 549, 165, 599);
  line(69, 586, 92, 620);
  
  strokeWeight(25);
  
  // face
  line(365, 406, 377, 361);
  line(360, 301, 380, 388);
  line(300, 406, 290, 369);
  line(414, 395, 357, 497);
  
  // eyebrows
  line(370, 270, 450, 250);
  
  // eyes
  line(291, 290, 289, 294);
  line(303, 300, 298, 302);
  line(381, 294, 385, 297);
  line(412, 302, 416, 309);
  
  // ears
  line(167, 291, 175, 315);
  line(160, 274, 154, 274);
  
  // hair
  line(199, 142, 263, 94);
  line(286, 112, 207, 212);
  line(243, 248, 260, 131);
  line(334, 46, 420, 100);
 
  // nose
  line(360, 386, 370, 422);
  line(328, 386, 327, 397);
  
  // philtrum
  line(349, 417, 342, 417);
  
  // lips
  line(368, 429, 367, 437);
  line(371, 447, 362, 436);
  line(322, 433, 329, 443);
  line(323, 433, 324, 436);
  
  // neck
  line(316, 557, 324, 610);
  line(323, 516, 305, 561);
  
  // shirt
  line(176, 514, 207, 568);
  line(157, 532, 283, 610);
  }

// contains instructions to add midtones
function midtone() {
  charcoal('midtone');
  strokeWeight(50);
  
  // face
  line(335, 510, 327, 261);
  line(231, 408, 321, 488);
  line(310, 438, 266, 243);
  line(213, 228, 260, 420);
  line(241, 277, 320, 305);
  line(340, 508, 354, 399);
  line(354, 393, 355, 407);
  line(356, 462, 357, 469);
  line(271, 357, 316, 258);
  line(442, 299, 382, 301);
    
  // ear
  line(170, 250, 194, 354);
  line(184, 273, 179, 277);
  
  // lips
  line(333, 430, 332, 454);
  
  // neck
  line(220, 466, 383, 596);
  line(204, 490, 300, 597);
  line(347, 512, 374, 599);
  
  strokeWeight(25);
  
  // face
  line(192, 237, 225, 423);
  line(346, 264, 363, 381);
  line(306, 432, 304, 455);
  
  // eyes
  line(288, 310, 290, 317);
  
  // ears
  line(190, 345, 185, 342);
  line(189, 352, 194, 359);
  line(166, 280, 172, 282);
  
  // lips
  line(336, 430, 332, 444);
  line(299, 457, 319, 444);
  line(319, 451, 323, 440);
  line(320, 432, 325, 442);
}

// contains instructions to add highlights
function highlight() {
  charcoal('highlight'); 
  strokeWeight(50);
  
  // face
  line(229, 245, 212, 290);
  line(244, 347, 210, 282);
  line(213, 265, 215, 309);
  
  // nose
  line(330, 373, 331, 381);
  
  // neck
  line(201, 530, 242, 455);
  line(219, 469, 277, 577);
  line(365, 564, 350, 592);
      
  strokeWeight(25);
  
  // face
  line(315, 399, 320, 482);
  line(316, 474, 327, 492);
  
  // nose
  line(318, 373, 325, 326);
  
  // philtrum
  line(354, 414, 349, 415);
  
  // lips
  line(324, 447, 323, 452);
  line(348, 449, 348, 454);
  line(317, 428, 318, 431);
  
  // ears
  line(172, 262, 173, 288);
  line(176, 321, 191, 355);
}

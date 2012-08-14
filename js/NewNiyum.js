////////////////////////////
//ABSTRACTION ONLY PART
///////////////////////////
// Position of Character,
// frame_no 0 (standing) 1 2 3 4 (for running) 5 for jumping
// parity, is direction of movement (1 is right movement, 0 is left)
// footprint, the distance from x, which if in touch is considered to be in contact
var footprint=30, x=footprint,y=0,frame_no=0,parity=1;

// World Position (X) and (V) is velocity in X
var X=0,V=0;

////////////////////////////

//////////////////////////////
//DOM BINDING
//////////////////////////////
$(document).ready(function(){
////////////DOM ADJUST///////////
	width=$(document).width();
	height=$(document).height();
});
//////////////////////////////
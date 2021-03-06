var song="";

var leftwrist_x=0;
var leftwrist_y=0;

var rightwrist_x=0;
var rightwrist_y=0;

var scoreleftwrist=0;

function preload(){
song=loadSound("music.mp3");
}

function setup(){
canvas= createCanvas(600,500);
canvas.center();

video= createCapture(VIDEO);
video.hide();

posenet=ml5.poseNet(video,modalloaded);
posenet.on("pose",gotposes);
}

function draw(){
image(video,0,0,600,500);



fill("#FF0000");
stroke("#FF0000");
if (scoreleftwrist>0.2) {
circle(leftwrist_x,leftwrist_y,20);

numberleftwrist_y=Number(leftwrist_y);
removedecimals=floor(numberleftwrist_y);
volume=removedecimals/500;
document.getElementById("volume").innerHTML="volume = "+volume;
song.setVolume(volume);
}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modalloaded() {
    console.log("modal loaded");
}

function gotposes(results){
if (results.length>0) {
    console.log(results);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log(scoreleftwrist);
    leftwrist_x= results[0].pose.leftWrist.x;
    leftwrist_y= results[0].pose.leftWrist.y;
    console.log("left wrist x = "+leftwrist_x);
    console.log("left wrist y = "+leftwrist_y);

    rightwrist_x= results[0].pose.rightWrist.x;
    rightwrist_y= results[0].pose.rightWrist.y;
    console.log("right wrist x = "+rightwrist_x);
    console.log("right wrist y = "+rightwrist_y);
}
}
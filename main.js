song1 = "";
song2 = "";

leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;

function preload(){
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function setup(){
    canvas = createCanvas(400 , 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400 , 400);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotResult);
}

function modelLoaded(){
    console.log("POSENET INITIALIEZED");
}

function gotResult(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("LEFT WRIST X = " + leftWristX + "LEFT WRIST Y = " + leftWristY);
        console.log("RIGHT WRIST X = " + rightWristX + "RIGHT WRIST Y = " + rightWristY);
    }
}

function draw(){
    image(video , 0 , 0 , 400 , 400);
}

function start(){
    console.log("playing song 2");
    song2.play();
    song.rate(1);
    song.setVolume(1);
}
song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

leftWristScore = 0;
rightWristScore = 0;

song1_status = "";
song2_status = "";

function preload(){
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function setup(){
    canvas = createCanvas(600 , 500);
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
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video , 0 , 0 , 600 , 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX , leftWristY , 20);
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightWristX , rightWristY , 20);

    if(rightWristScore > 0.2){
        song2.stop();
        if(song2_status == false){
            song1.play();
            document.getElementById("song").innerHTML="2st song is playing";
        }
        console.log("playing song ---2️⃣---");
    }

    if(leftWristScore > 0.2){
        song1.stop();
    if(song1_status == false){
        song2.play();
        document.getElementById("song").innerHTML="1st song is playing";
    }
    console.log("playing song ---1️⃣---");
    }
}

function start(){
    song2.play();
}
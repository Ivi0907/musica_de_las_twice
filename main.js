song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

scoreRightWrist = 0; 
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

lefttWristX = 0;
leftWristY = 0;

function preload(){
    song1 = loadSound("moonlightsunrise.mp3");
    song2 = loadSound("TWICE.mp3")
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Modelo cargado :3")
}

function gotPoses(results){
    if(results.length > 0){
        
        scoreRightWrist = results[0].pose.keypoints[10].score; 
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y - 100;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y - 100;
    }

      
}


function draw(){
    image(video,0,0,600,500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    
    fill("#FF0000");
    stroke("#00FF00");
    strokeWeight(4);
   
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        
        song2.stop();

        if(song1_status == false){
           song1.play();
           document.getElementById("song").innerHTML = "Reproduciendo: Canción de MOONLIGHT SUNRISE"

        }
    }

    fill("#f7d547");
    stroke("#d09360");
    strokeWeight(4);

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        
        song1.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Reproduciendo: Canción de Alcohol-free"

         }
    
    }
}

function play(){
    song.play(); 
    song.setVolume(1);  
    song.rate(1)
}



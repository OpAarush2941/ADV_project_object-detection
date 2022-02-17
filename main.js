objectIdentifier = "";
img1 = "";
objects=[];
Status = "";
img2 = "";

function preload(){
    img1 = loadImage("dog_cat.jpg");
    img2 = loadImage("dining2.jpg")
}

function setup(){
    canvas = createCanvas(380 ,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectIdentifier = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Object";
}

function draw(){
    image(video,0,0,380,380);
    if(Status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectIdentifier.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
            fill(r, g, b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
}

function modelLoaded(){
    console.log("model is loaded");
    Status = true;
    objectIdentifier.detect(video, gotResults);
}

function gotResults(error , Results){
    if(error){
        console.error(error);
    }
    console.log(Results);
    objects = Results;
}
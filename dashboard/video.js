var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        width: 600,
        height: 400,
        videoId: 'd8_pRUR-hmg',
        events: {
            onReady: initialize
        }
    });
}

function initialize(){

  // Update the controls on load
  // updateTimerDisplay();
  updateProgressBar();

  // Clear any old interval.
  // clearInterval(time_update_interval);

  // Start interval to update elapsed time display and
  // the elapsed part of the progress bar every second.
  time_update_interval = setInterval(function () {
      // updateTimerDisplay();
      updateProgressBar();
      updatePeople();
      updateTagCloud();
  }, 1000);
}

changeProgressBar = (e, videolen) => {
    var newTime = player.getDuration() * (e / videolen);

    // Skip video to new time.
    player.seekTo(newTime);
}

function updateProgressBar(){

  d3.select('#cursor')
    .attr('cx', xScaleTimeline(player.getCurrentTime()));  
}

function updatePeople() {
    let timeStamp = Math.floor(player.getCurrentTime()/5) * 5;

    d3.selectAll('.gaze')
        .data(people_positions.get(`${timeStamp}`))
        .attr('x1', d => xScalePos(d.cx))
        .attr('y1', d => yScalePos(d.cy))
        .attr('x2', d => xScalePos(d.lx))
        .attr('y2', d => yScalePos(d.ly))
        .attr('stroke', d => colScalePos(d.name));

        d3.selectAll('.people')
        .data(people_positions.get(`${timeStamp}`))
        .attr('cx', d => xScalePos(d.cx))
        .attr('cy', d => yScalePos(d.cy))
        .attr('stroke', d => colScalePos(d.name));
}

updateTagCloud = () => {
    d3.selectAll('.wordCloudText').style('fill', 'grey').attr('opacity', 0.5);
    let currentTime = player.getCurrentTime();
    for (let dialogue of dialogues) {
        if (currentTime < dialogue.timestamp2 && currentTime > dialogue.timestamp1) {
            let words = dialogue.content.match(/\b(\w+)\b/g);
            
            for (let word of words) {
                let wordImage = d3.select(`#${word.toLowerCase()}`);
                wordImage.style('fill', colScale(dialogue.name));
                wordImage.attr('opacity', 1);
            }
        }
    } 
}   
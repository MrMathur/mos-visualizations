$(document).ready(() => {

  let svg = d3.select('#timeline');

  let padding = {
    top: 100,
    bottom: 100,
    left: 10,
    right: 10,
    between: 20
  }

  let videolen, maxLength, maxWidth;

  let width, height;

  let hScale;

  d3.csv('./timeline.csv').then(data => {
      dialogues = data;
      videolen = dialogues[dialogues.length - 1].timestamp2;
      maxLength = 32;
      maxWidth = d3.max(dialogues, d => d.width);
    })
    .then(() => {

      svg.attr('width', '100%')
        .attr('height', '100%')
        // .attr('viewBox', `0 0 100 ${height}`)
        .style('padding', 0);

      width = parseInt(svg.style('width'), 10);
      height = parseInt(svg.style('height'), 10);

      xScaleTimeline = d3.scaleLinear()
        .domain([0, videolen])
        .range([padding.left, width - padding.right]);

      hScale = d3.scaleLinear()
        .domain([0, maxLength])
        .range([0, height - padding.top - padding.bottom]);

      colScale = d3.scaleOrdinal()
        .domain(['teacher', 'student1', 'student2', 'student3', 'student4', 'student5', 'student6', 'student7', 'student8', 'student9', 'student10'])
        .range(colors);
    })
    .then(() => {
      svg.selectAll('.dialogues')
        .data(dialogues)
        .enter()
        .append('ellipse')
        .attr('class', d => `dialogues ${d.name}-bubble`)
        .attr('cx', d => xScaleTimeline(d.midpoint))
        .attr('cy', height / 2)
        .attr('rx', d => xScaleTimeline(d.width) / 4)
        .attr('ry', d => hScale(d.length))
        .attr('fill', d => {
          return colScale(d.name);
        })
        .attr('opacity', '0.5')
        .on('mouseover', (e, d) => {
          svg.append('text')
            .attr('class', 'label')
            .attr('id', 'desc')
            .text(d.content)
            .attr('transform', `translate(${width/2}, ${height-25})`);
        })
        .on('mouseout', d => {
          svg.select('#desc')
            .remove();
        });;
    })
    .then(() => {
      svg.append('g')
        .call(d3.axisBottom(xScaleTimeline))
        .attr('transform', `translate(0, ${height/2})`)
        .attr('stroke-width', '4px')
        .attr('opacity', '0.5')
        .on('click', (event) => {
          var coords = d3.pointer(event);

          d3.select('#cursor')
            .attr('cx', coords[0]);

          let timeScale = d3.scaleLinear()
            .domain([padding.left, width - padding.right])
            .range([0, videolen]);

          changeProgressBar(timeScale(coords[0]), videolen);
        });

      svg.append('circle')
        .attr('id', 'cursor')
        .attr('r', '5')
        .attr('cx', xScaleTimeline(5))
        .attr('cy', height / 2)
        .attr('fill', 'red');
    });
});
loadD3 = () => {

  dataset = [];
  d3.csv('./data.csv', data => {
      dataset.push(data);
    })
    .then(() => {

      // let totTime = 0;
      // for (let i = 0; i < dataset.length; i++) {
      //   let temp = parseFloat(dataset[i].Time);
      //   dataset[i].Time = parseFloat(dataset[i].Time) + totTime;
      //   totTime += temp;

      //   console.log(dataset[i]);
      // }

      width = 1200,
        height = 600;

      convert = d3.scaleLinear()
        .domain([3 * height / 4, 20])
        .range([0, 100]);

      svg = d3.select('#main')
        .attr('width', width)
        .attr('height', height);

      let x = d3.scaleLinear()
        .domain([0, 120])
        .range([90, width + 40]);

      let y = d3.scaleLinear()
        .domain([0, 100])
        .range([3 * height / 4, 20]);

      svg.append('g')
        .call(d3.axisBottom(x))
        .attr('transform', `translate(0,${y(0)})`);

      svg.append('g')
        .attr('id', 'y-axis')
        .call(d3.axisLeft(y).ticks(10))
        .attr('transform', 'translate(90,0)');

      svg.append('line')
        .attr('x1', 30)
        .attr('x2', 30)
        .attr('y1', 3 * height / 4)
        .attr('y2', 20)
        .attr('stroke', 'black')
        .attr('stroke-width', 3)
        .attr('opacity', 0.3)
        .on('click', () => {
          console.log(d3.event.y);
          let y_below = d3.event.y - 240 + 20;
          svg.select('#lower-tab')
            .attr('y', y_below);

          update(y_below);
        });

      svg.append('text')
        .attr('transform', `translate(${x(60)}, ${y(-10)})`)
        .attr('font-family', 'Bai Jamjuree')
        .attr('text-anchor', 'middle ')
        .text('Time (s)');

      svg.append('text')
        .attr('transform', `rotate(-90)`)
        .attr('y', x(-3))
        .attr('x', -y(50))
        .attr('font-family', 'Bai Jamjuree')
        .attr('text-anchor', 'middle ')
        .text('Volume (dB)');

      // svg.append('rect')
      //   .attr('id', 'upper-tab')
      //   .attr('x', 25)
      //   .attr('y', 20)
      //   .attr('width', 10)
      //   .attr('height', 10)
      //   .call(drag);

      svg.append('rect')
        .attr('id', 'lower-tab')
        .attr('x', 25)
        .attr('y', 3 * height / 4)
        .attr('width', 10)
        .attr('height', 10);


      // svg.selectAll('.dash')
      //   .data(dataset)
      //   .enter()
      //   .append('line')
      //   .attr('class', 'dash')
      //   .attr('x1', d => x(d["Time"] - 0.2))
      //   .attr('x2', d => x(d["Time"]))
      //   .attr('y1', d => y(d["Volume"]))
      //   .attr('y2', d => y(d["Volume"]))
      //   .attr('stroke', d => {
      //     if (d.Type == "Ambient") {
      //       return 'green'
      //     } else if (d.Type == "Student") {
      //       return 'red';
      //     } else if (d.Type == "Teacher") {
      //       return 'blue';
      //     } else {
      //       return 'black';
      //     }
      //   })
      //   .attr('stroke-width', '3px');

      svg.selectAll('.dot')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d["Timestamp"]))
        .attr('cy', d => y(d["Volume"]))
        .attr('r', '2px')
        .attr('fill', d => {
          if (d.Type == "Ambient") {
            return '#cab2d6';
          } else if (d.Type == "Student") {
            return '#ff7f00';
          } else {
            return '#1f78b4';
          }
        });

      svg.append('rect')
        .attr('x', width / 2)
        .attr('y', 15)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', '#cab2d6');

      svg.append('rect')
        .attr('x', width / 2 - 150)
        .attr('y', 15)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', '#ff7f00');

      svg.append('rect')
        .attr('x', width / 2 + 150)
        .attr('y', 15)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', '#1f78b4');

      svg.append('text')
        .text('Ambient')
        .attr('transform', `translate(${width/2 + 20}, 25)`)
        .attr('font-family', 'Bai Jamjuree');

      svg.append('text')
        .text('Teacher')
        .attr('transform', `translate(${width/2 + 170}, 25)`)
        .attr('font-family', 'Bai Jamjuree');

      svg.append('text')
        .text('Student')
        .attr('transform', `translate(${width/2 - 130}, 25)`)
        .attr('font-family', 'Bai Jamjuree');
    });
}

update = (y_below) => {
  svg.select('#y-axis')
    .remove();

  // let y_dash = (4 * y_below / (3 * height)) - 20;

  let y_dash = convert(y_below);

  // console.log(y_below, y_dash);

  let y = d3.scaleLinear()
    .domain([y_dash, 100])
    .range([3 * height / 4, 20]);

  svg.append('g')
    .attr('id', 'y-axis')
    .call(d3.axisLeft(y).ticks(10))
    .attr('transform', 'translate(90,0)');

  svg.selectAll('.dot')
    .attr('cy', d => y(d["Volume"]))
    .transition('ease')
    .duration(100)
    .attr('fill', d => {
      if (y(d["Volume"]) > y(y_dash)) {
        return 'none';
      } else {
        if (d.Type == "Ambient") {
          return '#cab2d6';
        } else if (d.Type == "Student") {
          return '#ff7f00';
        } else {
          return '#1f78b4';
        }
      }
    });
}
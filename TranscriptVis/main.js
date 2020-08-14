loadD3 = () => {
  dataset = [];
  d3.csv('./data.csv', data => {
      dataset.push(data);
    })
    .then(() => {

      let width = 1400,
        height = 600;

      svg = d3.select('#main')
        .attr('width', width)
        .attr('height', height);

      x = d3.scaleLinear()
        .domain([0, 120])
        .range([40, 1200 - 30]);

      y = d3.scaleLinear()
        .domain([0, 100])
        .range([2 * height / 3, 20]);

      r = d3.scaleLinear()
        .domain([0, 50])
        .range([0, 400]);

      // svg.selectAll('.dialogue')
      //   .data(dataset)
      //   .enter()
      //   .append('circle')
      //   .attr('class', 'dialogue')
      //   .attr('cx', d => x(d.timestamp))
      //   .attr('cy', y(50))
      //   .attr('r', d => r(d.length))
      //   .attr('fill', d => {
      //     if (d.name == "Teacher") {
      //       return '#2ecc71';
      //     } else if (d.name == "Student") {
      //       return '#e74c3c';
      //     }
      //   })
      //   .attr('opacity', '0.3')
      //   .on('mouseover', d => {
      //     svg.append('text')
      //       .attr('id', 'desc')
      //       .text(d.content)
      //       .attr('transform', `translate(${x(d.timestamp)}, ${y(10)})`)
      //       .attr('text-anchor', 'middle')
      //   })
      //   .on('mouseout', d => {
      //     svg.select('#desc')
      //       .remove();
      //   });

      svg.selectAll('.dialogue_el')
        .data(dataset)
        .enter()
        // .append('circle')
        .append('ellipse')
        .attr('class', 'dialogue_el')
        .attr('cx', d => x(d.midpoint))
        .attr('cy', y(50))
        // .attr('r', d => r(d.length))
        .attr('rx', d => x(d.width) / 4)
        .attr('ry', d => r(d.length) / 3)
        .attr('fill', d => {
          if (d.name == "Teacher") {
            return '#ff7f00';
          } else if (d.name == "Student") {
            return '#1f78b4';
          }
        })
        .attr('opacity', '0.5')
        .on('mouseover', d => {
          svg.append('text')
            .attr('id', 'desc')
            .text(d.content)
            .attr('transform', `translate(${width/2}, ${y(85)})`)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Bai Jamjuree');
        })
        .on('mouseout', d => {
          svg.select('#desc')
            .remove();
        });

      svg.selectAll('.dialogue')
        .data(dataset)
        .enter()
        // .append('circle')
        .append('rect')
        .attr('class', 'dialogue')
        .attr('x', d => x(d.timestamp1))
        .attr('y', d => y(50) - r(d.length) / 3)
        // .attr('r', d => r(d.length))
        .attr('width', d => x(d.timestamp2) - x(d.timestamp1))
        .attr('height', d => r(d.length) / 3)
        .attr('fill', d => {
          if (d.name == "Teacher") {
            return '#ff7f00';
          } else if (d.name == "Student") {
            return '#1f78b4';
          }
        })
        .attr('opacity', 0)
        .on('mouseover', d => {
          svg.append('text')
            .attr('id', 'desc')
            .text(d.content)
            .attr('transform', `translate(${width/2}, ${y(85)})`)
            .attr('font-family', 'Bai Jamjuree')
            .attr('text-anchor', 'middle');

        })
        .on('mouseout', d => {
          svg.select('#desc')
            .remove();
        });

      svg.append('rect')
        .attr('fill', '#1f78b4')
        // .attr('opacity', '0.3')
        .attr('height', 10)
        .attr('width', 10)
        .attr('x', width / 2 - 180)
        .attr('y', y(100));

      svg.append('rect')
        .attr('fill', '#ff7f00')
        // .attr('opacity', '0.3')
        .attr('height', 10)
        .attr('width', 10)
        .attr('x', width / 2 + 20)
        .attr('y', y(100));

      svg.append('text')
        .text('Student Dialogue')
        .attr('transform', `translate(${width/2 - 160},${y(98)})`)
        .attr('font-family', 'Bai Jamjuree')
        .attr('text-anchor', 'start');

      svg.append('text')
        .text('Teacher Dialogue')
        .attr('transform', `translate(${width/2 + 40},${y(98)})`)
        .attr('font-family', 'Bai Jamjuree')
        .attr('text-anchor', 'start');

      svg.append('g')
        .call(d3.axisBottom(x))
        .attr('transform', `translate(0, ${y(50)})`)
        .attr('font-family', 'Bai Jamjuree');

      svg.append('text')
        // .attr('id', 'sort-label')
        .text('View')
        .attr('fill', 'black')
        .attr('font-family', ' Bai Jamjuree')
        .attr('font-size', '24px')
        .attr('transform', `translate(${1200 + 75}, ${130})`)
        .attr('text-align', 'center')
        .attr('text-anchor', 'middle');

      svg.append("rect")
        .attr('id', 'ellipse-button')
        .attr('transform', `translate(1200, ${y(50) - 20})`)
        .attr('width', 150)
        .attr('height', 40)
        .attr('fill', '#b2df8a')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        // .attr("id", "buttonCentre")
        // .classed("button", true)
        .on('click', function () {

          svg.selectAll('.dialogue')
            .attr('opacity', 0);

          svg.selectAll('.dialogue_el')
            .attr('opacity', 0.5);

          svg.select('#ellipse-button')
            .attr('fill', '#b2df8a');

          svg.select('#rect-button')
            .attr('fill', 'white');
        });

      svg.append('text')
        .attr('id', 'sort-label')
        .text('Ellipse')
        .attr('fill', 'black')
        .attr('font-family', ' Bai Jamjuree')
        .attr('transform', `translate(${1200 + 75}, ${y(49)})`)
        .attr('text-align', 'center')
        .attr('text-anchor', 'middle')
        .on('click', function () {

          svg.selectAll('.dialogue')
            .attr('opacity', 0);

          svg.selectAll('.dialogue_el')
            .attr('opacity', 0.5);

          svg.select('#ellipse-button')
            .attr('fill', '#b2df8a');

          svg.select('#rect-button')
            .attr('fill', 'white');
        });

      svg.append("rect")
        .attr('id', 'rect-button')
        .attr('transform', `translate(1200, ${y(50) - 60})`)
        .attr('width', 150)
        .attr('height', 40)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        // .attr("id", "buttonCentre")
        // .classed("button", true)
        .on('click', function () {
          svg.selectAll('.dialogue')
            .attr('opacity', 0.5);

          svg.selectAll('.dialogue_el')
            .attr('opacity', 0);

          svg.select('#rect-button')
            .attr('fill', '#b2df8a');

          svg.select('#ellipse-button')
            .attr('fill', 'white');
        });

      svg.append('text')
        .attr('id', 'sort-label')
        .text('Rectangle')
        .attr('fill', 'black')
        .attr('font-family', ' Bai Jamjuree')
        .attr('transform', `translate(${1200 + 75}, ${y(49)-40})`)
        .attr('text-align', 'center')
        .attr('text-anchor', 'middle')
        .on('click', function () {
          svg.selectAll('.dialogue')
            .attr('opacity', 0.5);

          svg.selectAll('.dialogue_el')
            .attr('opacity', 0);

          svg.select('#rect-button')
            .attr('fill', '#b2df8a');

          svg.select('#ellipse-button')
            .attr('fill', 'white');
        });

    });
}
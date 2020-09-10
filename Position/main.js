colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#000'];

d3onload = () => {
  let dataToShow = [];

  value = 0;

  d3.select('body').selectAll('input')
    .attr('onclick', 'updatePeopleToShow()');

  peopleToShow = ["teacher", "student1", "student2", "student3", "student4", "student5", "student6", "student7", "student8", "student9", "student10"];
  // Parse the Data
  d3.csv("./data.csv").then(data => {
    dataset = d3.nest()
      .key(d => d.time)
      .entries(data);

    console.log(dataset);
  }).then(() => {
    // set the dimensions and margins of the graph
    var margin = {
        top: 10,
        right: 30,
        bottom: 40,
        left: 100
      },
      width = 1000 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

    accent = d3.scaleOrdinal().domain(peopleToShow).range(colors);

    for (let people of peopleToShow) {
      d3.select('body').select(`#${people}`)
        .style('background', accent(people));
    }

    xScale = d3.scaleLinear()
      .domain([0, 1440])
      .range([0, width]);

    yScale = d3.scaleLinear()
      .domain([0, 900])
      .range([0, height]);

    // append the svg object to the body of the page
    svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var data = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
    // var data = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

    let init_data;

    for (let datum of dataset) {
      if (datum.key == 0) {
        init_data = datum.values;
      }
    }

    drawingCircles(init_data);

    console.log(dataset);

    // Step
    var sliderStep = d3
      .sliderBottom()
      .min(d3.min(data))
      .max(d3.max(data))
      .width(300)
      // .tickFormat(d3.format('.2%'))
      .ticks(10)
      .step(5)
      .default(0)
      .on('onchange', val => {
        d3.select('p#value-step').text((val));

        value = sliderStep.value();
        updatePeopleToShow();
      });

    var gStep = d3
      .select('div#slider-step')
      .append('svg')
      .attr('width', 500)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,30)');

    gStep.call(sliderStep);

    d3.select('p#value-step').text((sliderStep.value()));
  });
}

drawingCircles = data => {
  svg.selectAll('.person')
    .data(data, d => d.name)
    .enter()
    .append('circle')
    .attr('class', 'person')
    .attr('cx', d => xScale(d.cx))
    .attr('cy', d => yScale(d.cy))
    .attr('r', 30)
    .attr('fill', d => {
      if (peopleToShow.find(a => a == d.name) != undefined) {
        // if (d.name == "teacher") {
        //   return '#e74c3c';
        // } else {
        //   return '#2ecc71';
        // }
        return accent(d.name);
      } else {
        return 'none'
      };
    });

  svg.selectAll('.person')
    .data(data, d => d.name)
    .transition()
    .attr('cx', d => xScale(d.cx))
    .attr('cy', d => yScale(d.cy))
    .attr('r', 10)
    .attr('fill', d => {
      if (peopleToShow.find(a => a == d.name) != undefined) {
        // if (d.name == "teacher") {
        //   return '#e74c3c';
        // } else {
        //   return '#2ecc71';
        // }
        return accent(d.name);
      } else {
        return 'none'
      }
    });

  svg.selectAll('.person')
    .data(data, d => d.name)
    .exit()
    .remove();

  svg.selectAll('.gaze')
    .data(data, d => d.name)
    .enter()
    .append('line')
    .attr('class', 'gaze')
    .attr('x1', d => xScale(d.cx))
    .attr('x2', d => xScale(d.lx))
    .attr('y1', d => yScale(d.cy))
    .attr('y2', d => yScale(d.ly))
    .attr('stroke', d => {
      if (peopleToShow.find(a => a == d.name) != undefined) {
        // if (d.name == "teacher") {
        //   return '#e74c3c';
        // } else {
        //   return '#2ecc71';
        // }
        return accent(d.name);
      } else {
        return 'none'
      }
    })
    .attr('stroke-width', 3)
    .attr('opacity', 0.2);

  svg.selectAll('.gaze')
    .data(data, d => d.name)
    .transition()
    .attr('x1', d => xScale(d.cx))
    .attr('x2', d => xScale(d.lx))
    .attr('y1', d => yScale(d.cy))
    .attr('y2', d => yScale(d.ly))
    .attr('stroke', d => {
      if (peopleToShow.find(a => a == d.name) != undefined) {
        // if (d.name == "teacher") {
        //   return '#e74c3c';
        // } else {
        //   return '#2ecc71';
        // }
        return accent(d.name);
      } else {
        return 'none'
      }
    });

  svg.selectAll('.gaze')
    .data(data, d => d.name)
    .exit()
    .remove();


}

draw = (val, dataset) => {
  d3.select('p#value-step').text((val));
  for (let datum of dataset) {
    if (datum.key == val) {
      dataToShow = datum.values;
      drawingCircles(dataToShow);
    }
  }
}

updatePeopleToShow = () => {
  peopleToShow = [];

  let boxes = document.querySelectorAll('input');
  for (let box of boxes) {
    if (box.checked == true) {
      peopleToShow.push(box.value);
    }
  }
  draw(value, dataset);
}
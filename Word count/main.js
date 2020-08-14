d3onload = () => {
  let ascending = false;

  // set the dimensions and margins of the graph
  margin = {
      top: 10,
      right: 30,
      bottom: 40,
      left: 100
    },
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")
    .attr('margin', 'auto');

  svg.append('text')
    .text("3 words with count 4")
    .attr('font-family', 'Bai Jamjuree')
    .attr('transform', `translate(${2*width/3 + 100}, ${30})`)
    .attr('font-size', '24px');

  svg.append('text')
    .text("4 words with count 3")
    .attr('font-family', 'Bai Jamjuree')
    .attr('transform', `translate(${2*width/3 + 100}, ${80})`)
    .attr('font-size', '24px');

  svg.append('text')
    .text("11 words with count 2")
    .attr('font-family', 'Bai Jamjuree')
    .attr('transform', `translate(${2*width/3 + 100}, ${130})`)
    .attr('font-size', '24px');

  svg.append('text')
    .text("15 words with count 1")
    .attr('font-family', 'Bai Jamjuree')
    .attr('transform', `translate(${2*width/3 + 100}, ${180})`)
    .attr('font-size', '24px');

  svg.append("rect")
    .attr('transform', `translate(${2*width/3 + 100}, ${250})`)
    .attr('width', 150)
    .attr('height', 40)
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    // .attr("id", "buttonCentre")
    // .classed("button", true)
    .on('click', function () {
      //here this is the button
      // d3.select(this).style("background-color", "#ccc")
      // console.log("Happening");

      let data;

      if (ascending) {
        ascending = false;
        data = dataset.sort(function (b, a) {
          return a.Value - b.Value;
        });
      } else {
        ascending = true;
        data = dataset.sort(function (b, a) {
          return b.Value - a.Value;
        });
      }

      sortIt(data);
    });

  svg.append('text')
    .text("Sort")
    .attr('fill', 'black')
    .attr('font-family', ' Bai Jamjuree')
    .attr('transform', `translate(${2*width/3 + 175}, ${275})`)
    .attr('text-align', 'center')
    .attr('text-anchor', 'middle')
    .on('click', function () {
      //here this is the button
      // d3.select(this).style("background-color", "#ccc")
      // console.log("Happening");

      let data;

      if (ascending) {
        ascending = false;
        data = dataset.sort(function (b, a) {
          return a.Value - b.Value;
        });
      } else {
        ascending = true;
        data = dataset.sort(function (b, a) {
          return b.Value - a.Value;
        });
      }

      sortIt(data);
    });

  svg.append('text')
    .attr('transform', `translate(${width/4}, ${height+40})`)
    .attr('font-family', 'Bai Jamjuree')
    .attr('text-anchor', 'middle ')
    .text('Word Count');

  // Parse the Data
  d3.csv("./data.csv", function (data) {
    // console.table(data);

    dataset = data;

    // sort data
    data.sort(function (b, a) {
      return a.Value - b.Value;
    });

    // Add X axis
    x = d3.scaleLinear()
      .domain([0, 4])
      .range([0, width / 2]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    y = d3.scaleBand()
      .range([0, height])
      .domain(data.map(function (d) {
        return d.Country;
      }))
      .padding(1);
    svg.append("g")
      .attr('id', 'y-axis')
      .call(d3.axisLeft(y));

    // Lines
    svg.selectAll(".myline")
      .data(data, d => d.Country)
      .enter()
      .append("line")
      .attr('class', 'myline')
      .transition()
      .duration(100)
      .attr("x1", function (d) {
        return x(d.Value);
      })
      .attr("x2", x(0))
      .attr("y1", function (d) {
        return y(d.Country);
      })
      .attr("y2", function (d) {
        return y(d.Country);
      })
      .attr("stroke", "grey")
      .attr('opacity', '0.5');

    // Circles
    let circle = svg.selectAll(".mycircle")
      .data(data, d => d.Country)
      .enter()
      .append("circle")
      .attr('class', 'mycircle');

    circle.transition()
      .duration(100)
      .attr("cx", function (d) {
        return x(d.Value);
      })
      .attr("cy", function (d) {
        return y(d.Country);
      })
      .attr("r", "7")
      .style("fill", "#69b3a2")
      .attr("stroke", "black");

    circle.on('mouseover', d => {
        svg.append('text')
          .attr('id', 'desc')
          .attr('transform', `translate(${x(d.Value) + 20}, ${y(d.Country)})`)
          .text(d.Text)
          .attr('font-family', 'Bai Jamjuree');
      })
      .on('mouseout', () => {
        svg.select('#desc').remove();
      });
  })
}

sortIt = (data) => {
  svg.select('#y-axis')
    .remove();
  // Y axis
  y = d3.scaleBand()
    .range([0, height])
    .domain(data.map(function (d) {
      return d.Country;
    }))
    .padding(1);


  svg.append("g")
    .attr('id', 'y-axis')
    .call(d3.axisLeft(y));

  // Lines
  svg.selectAll(".myline")
    .data(data, d => d.Country)
    .transition()
    .duration(100)
    // .enter()
    // .append("line")
    .attr("x1", function (d) {
      return x(d.Value);
    })
    .attr("x2", x(0))
    .attr("y1", function (d) {
      return y(d.Country);
    })
    .attr("y2", function (d) {
      return y(d.Country);
    })
    .attr("stroke", "grey")
    .attr('opacity', '0.5');

  // Circles
  let circle = svg.selectAll(".mycircle")
    .data(data, d => d.Country)
    .transition()
    .duration(100)
    // .enter()
    // .append("circle")
    // .attr('class', 'mycircle')
    .attr("cx", function (d) {
      return x(d.Value);
    })
    .attr("cy", function (d) {
      return y(d.Country);
    })
    .attr("r", "7")
    .style("fill", "#69b3a2")
    .attr("stroke", "black")
  // .on('mouseover', d => {
  //   svg.append('text')
  //     .attr('id', 'desc')
  //     .attr('transform', `translate(${x(d.Value) + 20}, ${y(d.Country)})`)
  //     .text(d.Text)
  //     .attr('font-family', 'Bai Jamjuree');
  // })
  // .on('mouseout', () => {
  //   svg.select('#desc').remove();
  // });
}
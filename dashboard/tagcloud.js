$(document).ready(() => {
  let svg = d3.select('#tag-cloud');

  let wordCount;

  let padding = {
    top: 10,
    bottom: 10,
    left: 80,
    right: 10,
    between: 20
  }

  let width, height;

  let fontScale;



  d3.csv('./wordcount.csv')
    .then(data => {
      wordCount = data.sort(function (b, a) {
        return a.Value - b.Value;
      });
    })
    .then(() => {
      svg.attr('width', '100%')
        .attr('height', '100%')
        // .attr('viewBox', `0 0 100 ${height}`)
        .style('padding', 0);

      width = parseInt(svg.style('width'), 10);
      height = parseInt(svg.style('height'), 10);
    })
    .then(() => {
      data = wordCount.splice(1, 5);

      // sort data
      data.sort(function (b, a) {
        return a.Value - b.Value;
      });

      // Add X axis
      x = d3.scaleLinear()
        .domain([0, 4])
        .range([60, width - 80]);
      svg.append("g")
        .attr("transform", "translate(0," + (height - 60) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Y axis
      y = d3.scaleBand()
        .range([20, height - 60])
        .domain(data.map(function (d) {
          return d.text;
        }))
        .padding(1);
      svg.append("g")
        .attr("transform", "translate(60,0)")
        .attr('id', 'y-axis')
        .call(d3.axisLeft(y));

      // Lines
      svg.selectAll(".myline")
        .data(data, d => d.text)
        .enter()
        .append("line")
        .attr('class', 'myline')
        .transition()
        .duration(100)
        .attr("x1", function (d) {
          return x(d.size);
        })
        .attr("x2", x(0))
        .attr("y1", function (d) {
          return y(d.text);
        })
        .attr("y2", function (d) {
          return y(d.text);
        })
        .attr("stroke", "grey")
        .attr('opacity', '0.5');

      // Circles
      let circle = svg.selectAll(".mycircle")
        .data(data, d => d.text)
        .enter()
        .append("circle")
        .attr('class', 'mycircle');

      circle.transition()
        .duration(100)
        .attr("cx", function (d) {
          return x(d.size);
        })
        .attr("cy", function (d) {
          return y(d.text);
        })
        .attr("r", "7")
        .style("fill", "#69b3a2")
        .attr("stroke", "black");      
    });
});
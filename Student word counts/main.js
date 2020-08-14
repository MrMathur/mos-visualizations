loadD3 = () => {

  order = "Ascending";

  let data;

  dataset = [];
  d3.csv('./data.csv', data => {
      dataset.push(data);
    })
    .then(() => {

      r = d3.scaleSqrt()
        .domain([0, 360])
        .range([0, 60]);
      svg = d3.select('#main')
        .attr('width', '100vw')
        .attr('height', '100vh');

      svg.selectAll('.statement')
        .data(dataset, d => d.Person)
        .enter()
        .append('circle')
        .attr('class', 'statement')
        .attr('fill', '#cab2d6')
        .attr('cx', (d, i) => 100 + i * 100)
        .attr('cy', 150)
        .attr('r', d => r(d.question_words) + r(d.statement_words));

      svg.selectAll('.question')
        .data(dataset, d => d.Person)
        .enter()
        .append('circle')
        .attr('class', 'question')
        .attr('fill', '#6a3d9a')
        .attr('cx', (d, i) => 100 + i * 100)
        .attr('cy', 150)
        .attr('r', d => r(d.question_words));

      svg.selectAll('.label')
        .data(dataset, d => d.Person)
        .enter()
        .append('text')
        .attr('font-family', 'Bai Jamjuree')
        .attr('class', 'label').attr('transform', (d, i) => `translate(${100 + i*100}, 300)`)
        .text(d => d.Person)
        .style('text-anchor', 'middle');

      svg.append('rect')
        .attr('x', 480)
        .attr('y', 15)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', '#6a3d9a');

      svg.append("rect")
        .attr('class', 'select-button')
        .attr('id', 'Ascending')
        .attr('transform', `translate(1200, ${250})`)
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

          order = "Ascending";



          update(data);

        });

      svg.append('text')
        .attr('id', 'sort-label')
        .text('Ascending')
        .attr('fill', 'black')
        .attr('font-family', ' Bai Jamjuree')
        .attr('transform', `translate(${1200 + 75}, ${275})`)
        .attr('text-align', 'center')
        .attr('text-anchor', 'middle').on('click', function () {
          //here this is the button
          // d3.select(this).style("background-color", "#ccc")
          // console.log("Happening");

          order = "Ascending";



          update(data);

        });

      svg.append("rect")
        .attr('class', 'select-button')
        .attr('id', 'Order')
        .attr('transform', `translate(1200, ${210})`)
        .attr('width', 150)
        .attr('height', 40)
        .attr('fill', '#cab2d6')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        // .attr("id", "buttonCentre")
        // .classed("button", true)
        .on('click', function () {
          //here this is the button
          // d3.select(this).style("background-color", "#ccc")
          // console.log("Happening");

          order = "Order";



          update(data);

        });

      svg.append('text')
        .attr('id', 'sort-label')
        .text('Position')
        .attr('fill', 'black')
        .attr('font-family', ' Bai Jamjuree')
        .attr('transform', `translate(${1200 + 75}, ${235})`)
        .attr('text-align', 'center')
        .attr('text-anchor', 'middle')
        .on('click', function () {
          //here this is the button
          // d3.select(this).style("background-color", "#ccc")
          // console.log("Happening");

          order = "Order";



          update(data);

        });;

      svg.append("rect")
        .attr('class', 'select-button')
        .attr('id', 'Descending')
        .attr('transform', `translate(1200, ${170})`)
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

          order = "Descending";



          update(data);

        });

      svg.append('text')
        .attr('id', 'sort-label')
        .text('Descending')
        .attr('fill', 'black')
        .attr('font-family', ' Bai Jamjuree')
        .attr('transform', `translate(${1200 + 75}, ${195})`)
        .attr('text-align', 'center')
        .attr('text-anchor', 'middle')
        .on('click', function () {
          //here this is the button
          // d3.select(this).style("background-color", "#ccc")
          // console.log("Happening");

          order = "Descending";



          update(data);

        });;

      svg.append('text')
        // .attr('id', 'sort-label')
        .text('Sort')
        .attr('fill', 'black')
        .attr('font-family', ' Bai Jamjuree')
        .attr('font-size', '24px')
        .attr('transform', `translate(${1200 + 75}, ${140})`)
        .attr('text-align', 'center')
        .attr('text-anchor', 'middle');

      svg.append('rect')
        .attr('x', 780)
        .attr('y', 15)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', '#cab2d6');

      svg.append('text')
        .attr('transform', `translate(500, 25)`)
        .attr('font-family', 'Bai Jamjuree')
        .text('Question Word Count');

      svg.append('text')
        .attr('transform', `translate(800, 25)`)
        .attr('font-family', 'Bai Jamjuree')
        .text('Total Word Count');
    });
}

update = (data) => {
  if (order == "Ascending") {

    data = dataset.sort((a, b) => {
      return (a.statement_words + a.question_words) - (b.statement_words + b.question_words);
    });
  } else if (order == "Descending") {

    data = dataset.sort((b, a) => {
      return (a.statement_words + a.question_words) - (b.statement_words + b.question_words);
    });
  } else if (order == "Order") {

    data = dataset.sort((a, b) => {
      return a.order - b.order;
    });
  }
  svg.selectAll('.statement')
    .data(data, d => d.Person)
    .attr('fill', '#cab2d6')
    .attr('cx', (d, i) => 100 + i * 100)
    .attr('cy', 150)
    .attr('r', d => r(d.question_words) + r(d.statement_words));

  svg.selectAll('.question')
    .data(data, d => d.Person)
    .attr('fill', '#6a3d9a')
    .attr('cx', (d, i) => 100 + i * 100)
    .attr('cy', 150)
    .attr('r', d => r(d.question_words));

  svg.selectAll('.label')
    .data(data, d => d.Person)
    .attr('font-family', 'Bai Jamjuree')
    .attr('transform', (d, i) => `translate(${100 + i*100}, 300)`)
    .text(d => d.Person)
    .style('text-anchor', 'middle');

  svg.selectAll('.select-button')
    .attr('fill', 'white');

  svg.select(`#${order}`)
    .attr('fill', '#cab2d6');

  // svg.select('#sort-label')
  //   .text(order);
}
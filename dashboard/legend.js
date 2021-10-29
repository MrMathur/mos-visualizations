$(document).ready(() => {

  let svg = d3.select('#legend');
  let people;
  let people_number;

  let padding = {
    top: 20,
    bottom: 10,
    left: 5,
    right: 5,
    between: 5
  }

  let unit_height;

  let width, height;

  let yScale, rScale, colScaleLegend;

  d3.csv('./data.csv').then(data => {
      people_number = data.length;
      people = data;
    })
    .then(() => {

      svg.attr('width', '100%')
        // .attr('height', `${height}px`)
        // .attr('viewBox', `0 0 100 ${height}`)
        .style('padding', 0);

      width = parseInt(svg.style('width'), 10);;
      unit_height = width - padding.left - padding.right;

      height = people_number * (unit_height + padding.between) + padding.top + padding.bottom - padding.between;
      svg.attr('height', height);

      yScale = d3.scaleLinear()
        .domain([0, people_number - 1])
        .range([padding.top + unit_height / 2, height - padding.bottom - unit_height / 2]);

      rScale = d3.scaleSqrt()
        .domain([0, d3.max(people, d => d.question_words + d.statement_words)])
        .range([0, unit_height * 4 - 10]);

      colScaleLegend = d3.scaleOrdinal()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .range(colors);
    })
    .then(() => {
      let groups = svg.selectAll('.words')
        .data(people)
        .enter()
        .append('g')
        .attr('class', 'words')
        .attr('id', d => `person${d.order}`);

      groups.attr('transform', (d, i) => `translate(${width/2}, ${yScale(i)})`);

      groups.append('circle')
        .attr('r', d => rScale(d.question_words) + rScale(d.statement_words))
        .attr('fill', (d, i) => {
          return colScaleLegend(i);
        })
        .attr('opacity', 0.5);

      groups.append('circle')
        .attr('r', d => rScale(d.question_words))
        .attr('fill', (d, i) => {
          return colScaleLegend(i);
        })

      groups.append('text')
        .attr('class', 'label')
        .attr('fill', (d, i) => {
          return colScaleLegend(i);
        })
        .attr('transform', `translate(0, ${unit_height/2 + 5})`)
        .text(d => d["Person"]);

      groups.on('click', (e, d) => {
        let current = d3.select(`#person${d.order}`).classed('unselect');
        d3.select(`#person${d.order}`).classed('unselect', !current);

        updatePeopleToShow(getPeopleToShow());
      })
    });
});

getPeopleToShow = () => {
  let newPeopleToShow = [];

  $('.words').each((a, b) => {
    if (b.classList.value != "words unselect") {
      newPeopleToShow.push(b.id)
    }
  });

  return newPeopleToShow;
}
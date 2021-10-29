$(document).ready(() => {
  colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#000'];

  let svg = d3.select('#position');

  let padding = {
    top: 50,
    bottom: 50,
    left: 10,
    right: 10,
    between: 20
  }

  let width, height;

  let trails;

  d3.csv('./position.csv').then(data => {
      people_positions = d3.group(data, d => d.time);
      trails = d3.group(data, d => d.name);
    })
    .then(() => {
      svg.attr('width', '100%')
        .attr('height', '100%')
        // .attr('viewBox', `0 0 100 ${height}`)
        .style('padding', 0);

      width = parseInt(svg.style('width'), 10);
      height = parseInt(svg.style('height'), 10);

      xScalePos = d3.scaleLinear()
        .domain([0, 1440])
        .range([padding.left, width - padding.right]);

      yScalePos = d3.scaleLinear()
        .domain([0, 900])
        .range([padding.top, height - padding.bottom]);

      peopleToShow = people_positions.get("0").map(a => a.name);

      colScalePos = d3.scaleOrdinal()
        .domain(peopleToShow)
        .range(colors);

    })
    .then(() => {
      // svg.selectAll('.gaze')
      //   .data(people_positions.get("0"))
      //   .enter()
      //   .append('line')
      //   .attr('class', 'gaze')
      //   .attr('x1', d => xScalePos(d.cx))
      //   .attr('y1', d => yScalePos(d.cy))
      //   .attr('x2', d => xScalePos(d.lx))
      //   .attr('y2', d => yScalePos(d.ly))
      //   .attr('stroke-width', 1)
      //   .attr('stroke', d => colScalePos(d.name));

      let trail = svg.selectAll('.trail')
        .data(trails)
        .enter()
        .append('g')
        .attr('class', d => {
          return `trail ${d[0]}-trail`;
        });
      trail
        .append('path')
        .datum(d => d[1])
        .attr("fill", 'none')
        .attr("stroke", d => {
          return colScalePos(d[0].name);
        })
        .attr("stroke-width", 1)
        .attr("d", d3.line()
          .x(function (d) {
            return xScalePos(d.cx)
          })
          .y(function (d) {
            return yScalePos(d.cy)
          })
        )
        .attr('opacity', 0.3);

      svg.selectAll('.people')
        .data(people_positions.get("0"))
        .enter()
        .append('circle')
        .attr('class', 'people')
        .attr('cx', d => xScalePos(d.cx))
        .attr('cy', d => yScalePos(d.cy))
        .attr('r', 10)
        .attr('fill', d => colScalePos(d.name))
        .attr('stroke', 'white');
    })
    .then(() => {
      updatePeopleToShow = newPeopleToShow => {

        d3.selectAll('.dialogues').attr('opacity', '0');
        d3.selectAll('.trail').attr('opacity', '0');


        peopleToShow = [];

        for (let person of newPeopleToShow) {
          if (person == 'person1') {
            peopleToShow.push('teacher');
            d3.selectAll('.teacher-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.teacher-trail').attr('opacity', '1');
          }
          if (person == 'person2') {
            peopleToShow.push('student1');
            d3.selectAll('.student1-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.student1-trail').attr('opacity', '1');
          }
          if (person == 'person3') {
            peopleToShow.push('student2');
            d3.selectAll('.student2-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.student2-trail').attr('opacity', '1');
          }
          if (person == 'person4') {
            peopleToShow.push('student3');
            d3.selectAll('.student3-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.student3-trail').attr('opacity', '1');
          }
          if (person == 'person5') {
            peopleToShow.push('student4');
            d3.selectAll('.student4-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.student4-trail').attr('opacity', '1');
          }
          if (person == 'person6') {
            peopleToShow.push('student5');
            d3.selectAll('.student5-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.student5-trail').attr('opacity', '1');
          }
          if (person == 'person7') {
            peopleToShow.push('student6');
            d3.selectAll('.student6-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.student6-trail').attr('opacity', '1');
          }
          if (person == 'person8') {
            peopleToShow.push('student7');
            d3.selectAll('.student7-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.student7-trail').attr('opacity', '1');
          }
          if (person == 'person9') {
            peopleToShow.push('student8');
            d3.selectAll('.student8-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.student8-trail').attr('opacity', '1');
          }
          if (person == 'person10') {
            peopleToShow.push('student9');
            d3.selectAll('.student9-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.student9-trail').attr('opacity', '1');
          }
          if (person == 'person11') {
            peopleToShow.push('student10');
            d3.selectAll('.student10-bubble').attr('opacity', '1');
            if (!($('#trail-option').prop('checked')))
              d3.selectAll('.student10-trail').attr('opacity', '1');
          }
        }

        d3.selectAll('.people')
          .attr('opacity', (d, i) => {
            if (peopleToShow.find((a) => a == d.name) == undefined) {
              return 0;
            } else {
              return 1;
            }
          });

        // d3.selectAll('.gaze')
        //   .attr('opacity', (d, i) => {
        //     if (peopleToShow.find((a) => a == d.name) == undefined) {
        //       return 0;
        //     } else {
        //       return 1;
        //     }
        //   });
      }
    });
});

trailVisibility = (value) => {
  if (value) {
    d3.selectAll('.trail').attr('opacity', 0);
  } else {
    updatePeopleToShow(getPeopleToShow());
  }
}
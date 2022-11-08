const svg = d3.select('#chart-area').append('svg')
  .attr('width', 600)
  .attr('height', 500)

d3.csv('data/revenues.csv').then((data) => {
  data.forEach((d) => {
    d.revenue = Number(d.revenue)
  })
  console.log(data)

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.revenue)])
    .range([0, 500])

  const rect = svg.selectAll('rect').data(data)

  rect
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 60 + 80)
    .attr('y', 0)
    .attr('width', 40)
    .attr('height', (d) => y(d.revenue))
    .attr('fill', '#008080')
})

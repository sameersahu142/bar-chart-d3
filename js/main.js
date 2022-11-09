const svg = d3.select('#chart-area').append('svg')
  .attr('width', 600)
  .attr('height', 500)

d3.csv('data/revenues.csv').then((data) => {
  data.forEach((d) => {
    d.revenue = Number(d.revenue)
  })
  console.log(data)

  const x = d3.scaleBand()
  .domain(data.map(d => d.month))
  .range([0, 600])
  .paddingInner(0.3)
  .paddingOuter(0.2)

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.revenue)])
    .range([0, 500])

  const rect = svg.selectAll('rect').data(data)

  rect
    .enter()
    .append('rect')
    .attr('x', d => x(d.month))
    .attr('y', 0)
    .attr('width', x.bandwidth)
    .attr('height', (d) => y(d.revenue))
    .attr('fill', '#008080')
})

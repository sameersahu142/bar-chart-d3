const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select('#chart-area').append('svg')
  .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

d3.csv('data/revenues.csv').then((data) => {
  data.forEach((d) => {
    d.revenue = Number(d.revenue)
  })
  console.log(data)

  const x = d3.scaleBand()
  .domain(data.map(d => d.month))
  .range([0, WIDTH])
  .paddingInner(0.3)
  .paddingOuter(0.2)

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.revenue)])
    .range([0, HEIGHT])

  const rect = g.selectAll('rect').data(data)

  rect
    .enter()
    .append('rect')
    .attr('x', d => x(d.month))
    .attr('y', 0)
    .attr('width', x.bandwidth)
    .attr('height', (d) => y(d.revenue))
    .attr('fill', '#008080')
})

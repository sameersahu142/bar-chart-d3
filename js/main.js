const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select('#chart-area').append('svg')
  .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// x label
g.append("text")
  .attr("class", "x-axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 60)
  .attr("font-size", "20px")
  .attr("font-weight", "700")
  .attr("text-anchor", "middle")
  .text("MONTH")

// y label
g.append("text")
  .attr("class", "y-axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("font-weight", "700")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("REVENUE ($)")

const x = d3.scaleBand()
  .range([0, WIDTH])
  .paddingInner(0.3)
  .paddingOuter(0.2)

const y = d3.scaleLinear()
  .range([HEIGHT, 0])

const xAxisGroup = g.append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${HEIGHT})`)

const yAxisGroup = g.append("g")
  .attr("class", "y-axis")

d3.csv('data/revenues.csv').then((data) => {
  data.forEach((d) => {
    d.revenue = Number(d.revenue)
  })

    d3.interval(() => {
      update(data)
    }, 1000)

    update(data)
})

const update = (data) => {
  x.domain(data.map(d => d.month))
  y.domain([0, d3.max(data, d => d.revenue)])

  const xAxisCall = d3.axisBottom(x)
  xAxisGroup.call(xAxisCall)

  const yAxisCall =d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d => d + "$")
    yAxisGroup.call(yAxisCall)

  // JOIN new data with old elements.
  const rect = g.selectAll('rect').data(data)

  // EXIT old elements not present in new data.
  rect.exit().remove()

  // UPDATE old elements present in new data.
  rect
    .attr('x', d => x(d.month))
    .attr('y', d => y(d.revenue))
    .attr('width', x.bandwidth)
    .attr('height', d => HEIGHT - y(d.revenue))

  // ENTER new elements present in new data. 
  rect.enter().append('rect')
    .attr('x', d => x(d.month))
    .attr('y', d => y(d.revenue))
    .attr('width', x.bandwidth)
    .attr('height', d => HEIGHT - y(d.revenue))
    .attr('fill', '#008080')
}
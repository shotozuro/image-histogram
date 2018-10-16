const canvas = document.getElementById("canvas")
const file = document.getElementById("input-image")

canvas.addEventListener("click", showHistogram)
file.addEventListener("change", onChange)

function onChange(e) {
  const files = e.target.files[0]
  const reader = new FileReader()
  reader.onloadend = () => {
    drawImage(reader.result)
  }
  document.getElementById("canvas").innerHTML = ""
  reader.readAsDataURL(files)
}

function drawImage(imageUrl){
  const img = new Image()
  img.addEventListener("load", () => {
      canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
  })
  img.setAttribute("src", imageUrl)
  document.getElementById("histogram").innerHTML = ""
}

function renderHistogram (colors) {
  const histogram = document.getElementById("histogram")
  const redSection = document.createElement("div")
  const greenSection = document.createElement("div")
  const blueSection = document.createElement("div")
  redSection.classList.add("chart-section")
  greenSection.classList.add("chart-section")
  blueSection.classList.add("chart-section")
  
  const red_yAxis = document.createElement("div")
  const green_yAxis = document.createElement("div")
  const blue_yAxis = document.createElement("div")
  red_yAxis.classList.add("y-axis")
  green_yAxis.classList.add("y-axis")
  blue_yAxis.classList.add("y-axis")
  
  redSection.appendChild(red_yAxis)
  greenSection.appendChild(green_yAxis)
  blueSection.appendChild(blue_yAxis)
  
  const redChart = document.createElement("div")
  const greenChart = document.createElement("div")
  const blueChart = document.createElement("div")
  redChart.classList.add("chart")
  greenChart.classList.add("chart")
  blueChart.classList.add("chart")

  document.getElementById("histogram").style.display = "flex"

  colors.forEach(element => {
    const red = document.createElement("div")
    const green = document.createElement("div")
    const blue = document.createElement("div")
    red.classList.add("bar")
    green.classList.add("bar")
    blue.classList.add("bar")

    red.style.height = `${element.r}px`
    red.style.width = "3px"
    red.style.backgroundColor = "#e84118"
    green.style.height = `${element.g}px`
    green.style.width = "3px"
    green.style.backgroundColor = "#4cd137"
    blue.style.height = `${element.b}px`
    blue.style.width = "3px"
    blue.style.backgroundColor = "#0097e6"
    redChart.appendChild(red)
    greenChart.appendChild(green)
    blueChart.appendChild(blue)
  })

  redSection.appendChild(redChart)
  greenSection.appendChild(greenChart)
  blueSection.appendChild(blueChart)
  
  histogram.appendChild(redSection)
  histogram.appendChild(greenSection)
  histogram.appendChild(blueSection)

  renderYaxis()
}

function renderYaxis () {
  const yAxis = document.querySelectorAll(".y-axis")
  yAxis.forEach(element => {
    element.innerHTML = "<span>255</span><span>128</span><span>0</span>"
  })

}

function showHistogram () {
  const colors = []
  const context = this.getContext('2d')
  const { height, width } = context.canvas
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      const pixelData = context.getImageData(w,h,1,1).data
      colors.push({r: pixelData[0], g: pixelData[1], b: pixelData[2], a: pixelData[3]})
    }
  }
  renderHistogram(colors)
}



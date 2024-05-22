(function ($) {
  $(function () {
    // ==============================================================
    // Cuộn về đầu trang
    // ==============================================================
    // #page-top a khi được click sẽ cuộn về đầu trang
  });
})(jQuery);

class ImageResize {
  constructor(config) {
    const { width, height, element } = config;
    this.imageW = width;
    this.imageH = height;
    this.imageMap = document.querySelector(element);
    const mapId = this.imageMap.getAttribute("usemap");
    const mapElem = `map[name="${mapId.substring(1, mapId.length)}"]`;
    const area = document.querySelector(mapElem).children;
    this.areaArray = Array.from(area);

    window.addEventListener("load", this.reloadEvent);
    window.addEventListener("resize", this.resizeEvent);
    setTimeout(this.imgMap, 500);
  }

  getCoordinates = (elem) => {
    let areaCords = elem.dataset.coords;

    if (!areaCords) {
      areaCords = elem.getAttribute("coords");

      elem.dataset.coords = areaCords;
    }

    return areaCords;
  };

  imgMap = () => {
    this.wPercent = this.imageMap.offsetWidth / 100;
    this.hPercent = this.imageMap.offsetHeight / 100;

    this.areaArray.forEach(this.areaLoop);
  };

  areaLoop = (area) => {
    const coordinates = this.getCoordinates(area).split(",");
    const coordsPercent = coordinates.map(this.mapCoords).join();
    area.setAttribute("coords", coordsPercent);
  };

  mapCoords = (coordinate, index) => {
    const parseCord = parseInt(coordinate, 10);

    return index % 2 === 0
      ? this.coordinatesMath(parseCord, this.imageW, this.wPercent)
      : this.coordinatesMath(parseCord, this.imageH, this.hPercent);
  };

  coordinatesMath = (coordinates, imgVal, percentVal) =>
    (coordinates / imgVal) * 100 * percentVal;

  reloadEvent = () => {
    this.imgMap();
    // hoverBtn();
  };

  resizeEvent = () => {
    this.imgMap();
  };
}

// Khởi tạo ImageResize cho PC và mobile
var eleImageMap = document.getElementById("jsImageMapPc");
if (eleImageMap) {
  const resizeImgPC = new ImageResize({
    width: 1783,
    height: 821,
    element: "#jsImageMapPc",
  });
}

const countdownDate = new Date("June 10, 2024 00:00:00").getTime();

const countdownFunction = setInterval(function () {
  // Lấy ngày và giờ hiện tại
  const now = new Date().getTime();

  // Tính khoảng cách giữa bây giờ và ngày đích
  const distance = countdownDate - now;

  // Tính toán thời gian cho ngày, giờ, phút và giây
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Hiển thị kết quả trong các phần tử có id tương ứng
  document.getElementById("days").innerText = days + "d";
  document.getElementById("hours").innerText = hours + "h";
  document.getElementById("minutes").innerText = minutes + "m";

  // Nếu countdown kết thúc, hiển thị một thông báo
  if (distance < 0) {
    clearInterval(countdownFunction);
    // document.getElementById('countdown').innerHTML = "Countdown Finished";
  }
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
  // countdownFunction();
  var splide = new Splide(".splide", {
    type: "fade",
    perPage: 1,
    perMove: 1,
    pagination: false,
  });
  splide.mount();
});

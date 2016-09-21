var style;

// this is a wrapped function
(function () {

  // the variables declared here will not be scoped anywhere and will only be accessible in this wrapped function
  var defaultColor = "white",
    highlightColor = "white";

  style = {
    navitem: {
      base: {
        fill: '#1b1464',
        font: '40pt RobotoBold',
        align: 'left',
        srokeThickness: 4
      },
      default: {
        fill: '#1b1464',
        fill: '#1b1464',
        font: '40pt RobotoBold',
        align: 'left',
      //  stroke: 'rgba(0,0,0,0)'
      },
      inverse: {
        fill: '#1b1464',
        stroke: 'black',
        font: '40pt RobotoBold',
      },
      hover: {
        fill: '#1b1464',
        stroke: 'black'
      }
    }
  };

  for (var key in style.navitem) {
    if (key !== "base") {
      Object.assign(style.navitem[key], style.navitem.base)
    }
  }

})();

// the trailing () triggers the function call immediately

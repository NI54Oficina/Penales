var style;

// this is a wrapped function
(function () {

  // the variables declared here will not be scoped anywhere and will only be accessible in this wrapped function
  var defaultColor = "white",
    highlightColor = "white";

  style = {
    navitem: {
      base: {
        fill: '#fff03a',
        font: '30pt RobotoBold',
        align: 'left',
        srokeThickness: 4
      },
      default: {
        fill: '#fff03a',
        font: '30pt RobotoBold',
        align: 'left',
      //  stroke: 'rgba(0,0,0,0)'
      },
      inverse: {
        fill: '#fff03a',
        stroke: '#fcffaf',
        font: '30pt RobotoBold',
      },
      hover: {
        fill: 'white',
        stroke: 'white'
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

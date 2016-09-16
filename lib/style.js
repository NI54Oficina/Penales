var style;

// this is a wrapped function
(function () {

  // the variables declared here will not be scoped anywhere and will only be accessible in this wrapped function
  var defaultColor = "#FEFFD5",
    highlightColor = "#FEFFD5";

  style = {
    navitem: {
      base: {
        font: '30pt TheMinion',
        align: 'left',
        srokeThickness: 4,
        backgroundColor: 'red'
      },
      default: {
        fill: '#FEFFD5',
        stroke: 'rgba(0,0,0,0)'
      },
      inverse: {
        fill: 'black',
        stroke: 'black'
      },
      hover: {
        fill: 'black',
        stroke: 'rgba(200,200,200,0.5)'
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

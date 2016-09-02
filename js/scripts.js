var time;
$(document).ready(function() {

  var maxHeight = 0;
  $('#visionciudad .columna').each(function() {
    if ($(this).height() > maxHeight) {
      maxHeight = $(this).height();
    }
  });
  $('#visionciudad .columna').height(maxHeight);

  $('#equipo .list-item').each(function() {
    var el = $(this);
    var org = organizers.filter(function(o){ return o.name === el.data('comision')})[0];
    el.css('background-color', org ? org.color : "#555555");
  });

  $('#calendar').fullCalendar({
    lang: 'es',
    googleCalendarApiKey: 'AIzaSyDQa_Ok8Wf9QA4FPerldxq74vzi62ICUGw',
    events: 'partidodelared@gmail.com',
    handleWindowResize: false,
    header: {
        left:   'month,agendaWeek',
        center: 'title',
        right:  'today prev,next'
    },
    views: {
        agendaWeek: {
            type: 'agenda',
            duration: { days: 7 },
            buttonText: 'Semana'
        },
        basicWeek: {
            type: 'basic',
            duration: {weeks: 2},
            rows: 2,
            buttonText: 'Dos Semanas'
        }
    },
    eventClick: function(event) {
    },
    eventRender: function(event, element) {
      var org = organizers.filter(function(o){ return o.email == event.creator.email })[0];
      $(element).css('background-color', org ? org.color : "#555555");
      if(event.title.indexOf('Asamblea') != -1)
        $(element).css('font-size', "20px").css('font-weight', "600").css('text-align', 'center');;
      $(element).attr('target', '_blank');
    }
  });

  time = setInterval(bounceVisionCiudad, 4000);
  CheckScroll();
  $(document).scroll(function(e) {
    CheckScroll();
  });

  ResizeSquares();
  $(window).on('resize', function(event) {
    ResizeSquares();
  });
})

function ResizeSquares() {
  $('.half-height').each(function() {
    $(this).css('height', ($(this).width()/2)+'px');
  });
}

function CheckScroll() {
  var wHeight = $(window).outerHeight();
  if ($(window).scrollTop() > 0) {
    if (!$('#header').hasClass('min')) {
      $('#header').addClass('min');
      clearInterval(time);
    }
  } else {
    if ($('#header').hasClass('min')) {
      $('#header').removeClass('min');
      time = setInterval(bounceVisionCiudad, 4000);
    }
  }
  if ($(window).scrollTop() > ((wHeight / 2))) {
    $('#header').addClass('no-first');
  } else {
    $('#header').removeClass('no-first');
  }
}

function bounceVisionCiudad() {
  var delay = 0;
  $('#visionciudad .columna').each(function(index, el) {
    setTimeout(function() {
      $(el).animate({
        'margin-top': '-100px'
      }, '500ms', function() {
        $(el).animate({
          'margin-top': '0'
        }, '500ms')
      });
    }, delay);
    delay += 1000;
  });
}

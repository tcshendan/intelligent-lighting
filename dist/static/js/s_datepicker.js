(function() {

    var datepicker = window.datepicker;

    var monthData;

    var $wrapper;

    datepicker.buildUi = function(year, month) {
        monthData = datepicker.getMonthData(year, month);

        var html = '<div class="ui-datepicker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th><div class="box"><div class="date">Mo</div></div></th>' +
            '<th><div class="box"><div class="date">Tu</div></div></th>' +
            '<th><div class="box"><div class="date">We</div></div></th>' +
            '<th><div class="box"><div class="date">Th</div></div></th>' +
            '<th><div class="box"><div class="date">Fr</div></div></th>' +
            '<th><div class="box"><div class="date">Sa</div></div></th>' +
            '<th><div class="box"><div class="date">Su</div></div></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i];
            if (i % 7 === 0) {
                html += '<tr>';
            }
            html += '<td data-date="' + date.date + '">' +
                '<div class="box">' +
                '<div class="date">' + date.showDate + '</div>' +
                '</div>' +
                '</td>';
            if (i % 7 === 6) {
                html += '</tr>';
            }
        }

        html += '</tbody>' +
            '</table>' +
            '</div>';

        return html;
    };

    datepicker.render = function(year, month) {

        var html = datepicker.buildUi(year, month);

        $wrapper = document.querySelector('.ui-datepicker-wrapper');
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            document.getElementById('calendar').appendChild($wrapper);
            $wrapper.className = 'ui-datepicker-wrapper';
        }

        $wrapper.innerHTML = html;

    };

    datepicker.init = function() {

        datepicker.render();

    };

})();

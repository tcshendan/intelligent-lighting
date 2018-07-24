(function() {

    var datepicker = window.datepicker;

    var monthData;

    var $wrapper;

    datepicker.buildUi = function(year, month) {
        monthData = datepicker.getMonthData(year, month);

        var curmonth = $('input[name="selectedMonth"]').val();

        var html = '<div class="ui-datepicker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th><div class="box">周一</div></th>' +
            '<th><div class="box">周二</div></th>' +
            '<th><div class="box">周三</div></th>' +
            '<th><div class="box">周四</div></th>' +
            '<th><div class="box">周五</div></th>' +
            '<th><div class="box">周六</div></th>' +
            '<th><div class="box">周日</div></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i];

            if (i % 7 === 0) {
                html += '<tr>';
            }

            if (date.month === 7 && date.showDate === 11) {
                html += '<td data-date="' + date.date + '" style="background-color: #fef9ee">' +
                    '<div class="box" style="' + (i > 34 ? 'border-bottom: none': '') + '">' +
                    '<div class="date" style="color: #efae25">' + date.showDate + '</div>' +
                    '<div class="event">' +
                    '<p><i class="event-status event-status-green"></i><span class="event-text">已完成</span><label class="event-count">999</label></p>' +
                    '<p><i class="event-status event-status-yellow"></i><span class="event-text">逾期</span><label class="event-count">8</label></p>' +
                    '<p><i class="event-status event-status-red"></i><span class="event-text">审核不通过</span><label class="event-count">15</label></p>' +
                    '</div>' +
                    '</div>' +
                    '</td>';
            }
            else {
                html += '<td data-date="' + date.date + '">' +
                    '<div class="box" style="' + (i > 34 ? 'border-bottom: none': '') + '">' +
                    '<div class="date" style="color: ' + (date.month === parseInt(curmonth) ? '#333' : '#999') + '">' + date.showDate + '</div>' +
                    '</div>' +
                    '</td>';
            }

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

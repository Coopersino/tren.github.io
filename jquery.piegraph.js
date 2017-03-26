(function ($) {

    $.fn.pieGraph = function () {
        var data = '{"total":141,"parts":[{"color":"#852b37","size":50},{"color":"#ea4b5d","size":22},{"color":"red","size":69}]}';
        data = JSON.parse(data);

        var svgns = "http://www.w3.org/2000/svg",
            chart = document.createElementNS(svgns, "svg:svg"),
            i,
            angles = [], // Угол в радианах для каждого сектора
            startangle = 0,
            endangle,
            x1, // координаты пересечения радиусов, образующих сектор
            y1, // углу 0 радиан соответствует точка в самой верхней части окружности
            x2, // положительные значения откладываются по часовой стрелке
            y2,
            big = 0, // Флаг для углов, больших половины коружности
            path = [], // Наши сектора
            d, // контур сектора
            width = 640,
            height = 400,
            cx = 200,
            cy = 200,
            r = 150;

        chart.setAttribute("width", width);
        chart.setAttribute("height", height);
        chart.setAttribute("viewBox", "0 0 " + width + " " + height);

        for (i = 0; i < data.parts.length; i += 1) {
            angles[i] = data.parts[i].size / data.total * Math.PI * 2;
        }

        for (i = 0; i < data.parts.length; i += 1) {

            endangle = startangle + angles[i];

            x1 = cx + r * Math.sin(startangle);
            y1 = cy - r * Math.cos(startangle);
            x2 = cx + r * Math.sin(endangle);
            y2 = cy - r * Math.cos(endangle);

            if (endangle - startangle > Math.PI) {
                big = 1;
            }

            path[i] = document.createElementNS(svgns, "path");

            d = "M " + cx + "," + cy + // Старт в центре окружности
                " L " + x1 + "," + y1 + // Нарисовать линию к точке (x1,y1)
                " A " + r + "," + r + // Нарисовать дугу с радиусом r
                " 0 " + big + " 1 " + // Информация о дуге...
                x2 + "," + y2 + // Дуга заканчивается в точке (x2,y2)
                " Z"; // Замкунть линию в точке начала (cx,cy)

            path[i].setAttribute("d", d);
            path[i].setAttribute("fill", data.parts[i].color);
            chart.appendChild(path[i]);

            startangle = endangle;
        }

        $('#pie-graph').append(chart);
    };
})(jQuery);

$(document).ready(function () {
    $('#pie-graph').pieGraph();
});

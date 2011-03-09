/*
    PokerTools
    @package HandReplay
    CanvasHelpers

    A set of re-usable drawing tools
    
    Copyright (C) 2011 Lukasz Nowacki

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

HandReplay.CanvasHelpers = {

    /**
     * Draws a rounded corner rectangle.
     *
     * @param int x             horizontal position on canvas
     * @param int y             vertical position on canvas
     * @param int width         rectangle width
     * @param int height        rectangle height
     * @param int radius        rounded corner radius size
     * @param string stroke     optional stroke colour (has or rgba); canvas spec default
     * @param int strokesize    optional stroke size
     * @param string fill       optional fill colour (hash or rgba); fill will not be applied if undefined
     */
    drawRoundedRectangle : function(x, y, width, height, radius, stroke, strokesize, fill) {
        var ctx = HandReplay.Facade.data.context;
        
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);

        if (typeof strokesize !== 'undefined') {
            ctx.lineWidth = strokesize;
        }

        if (typeof stroke !== 'undefined') {
            ctx.strokeStyle = stroke;
        }
        ctx.stroke();

        if (typeof fill !== 'undefined') {
            ctx.fillStyle = fill;
            ctx.fill();
        }
    },

    /**
     * Draw an oval shape
     * @param int cx            oval centre horizontal coordinate
     * @param int cy            oval centre vertical coordinate
     * @param int width         shape width
     * @param int height        shape height
     * @param string stroke     optional stroke style (rgba or hash)
     * @param int strokesize    optional stroke size
     * @param string fill       optional fill style (rgba or hash); fill will not be applied if undefined
     */
    drawOval : function(cx, cy, width, height, stroke, strokesize, fill) {
        var ctx = HandReplay.Facade.data.context;
        var rectW = width * 1.33;

        ctx.beginPath();
        ctx.moveTo(cx, cy - height/2);
        ctx.bezierCurveTo(cx - rectW/2, cy - height/2, cx - rectW/2, cy + height/2, cx, cy + height/2);
        ctx.bezierCurveTo(cx + rectW/2, cy + height/2, cx + rectW/2, cy - height/2, cx, cy - height/2);

        if (typeof strokesize !== 'undefined') {
            ctx.lineWidth = strokesize;
        }

        if (typeof stroke !== 'undefined') {
            ctx.strokeStyle = stroke;
        }
        ctx.stroke();

        if (typeof fill !== 'undefined') {
            ctx.fillStyle = fill;
            ctx.fill();
        }
    },

     /**
     * Draw an oval shape -- parametric style
      *@author ForestierSimon
     * @param int cx            oval centre horizontal coordinate
     * @param int cy            oval centre vertical coordinate
     * @param int width         shape width
     * @param int height        shape height
     * @param string stroke     optional stroke style (rgba or hash)
     * @param int strokesize    optional stroke size
     * @param string fill       optional fill style (rgba or hash); fill will not be applied if undefined
     */
    drawOvalParam : function(cx, cy, width, height, stroke, strokesize, fill) {
        var ctx = HandReplay.Facade.data.context;
        var alpha, a, b, x, y, twoPi, steps;

        ctx.beginPath();
        ctx.moveTo(cx + width / 2, cy);

        a = width / 2;
        b = height / 2;
        twoPi = Math.PI *2;
        steps = 360;


        for(alpha = 0; alpha <= steps; ++alpha) {
            x = a * Math.cos(twoPi * alpha / steps);
            y = b * Math.sin(twoPi * alpha / steps);
            ctx.lineTo(cx + x, cy + y);
        }

        if (typeof strokesize !== 'undefined') {
            ctx.lineWidth = strokesize;
        }

        if (typeof stroke !== 'undefined') {
            ctx.strokeStyle = stroke;
        }
        ctx.stroke();

        if (typeof fill !== 'undefined') {
            ctx.fillStyle = fill;
            ctx.fill();
        }
    },
    /**
     * Puts n chairs regularly on the given elipse-- parametric style
      *@author ForestierSimon
     * @param int chairsAmount  number of chairs to be put
     * @param float  startAngle angle offset (in radians) used to set the first point position
     * @param int cx            oval centre horizontal coordinate
     * @param int cy            oval centre vertical coordinate
     * @param int width         shape width
     * @param int height        shape height
     * @param string stroke     optional stroke style (rgba or hash)
     * @param int strokesize    optional stroke size
     * @param string fill       optional fill style (rgba or hash); fill will not be applied if undefined
     */
    drawChairs : function(chairsAmount, startAngle, cx, cy, width, height, stroke, strokesize, fill) {
        var ctx = HandReplay.Facade.data.context;
        var i, a, b, x, y, twoPi, ang;

        a = width / 2;
        b = height / 2;
        twoPi = Math.PI *2;

        ctx.beginPath();
        ctx.moveTo(cx + width / 2, cy);

        for(i = 0; i <= chairsAmount; ++i) {
            ang = startAngle + twoPi * i / chairsAmount;
            x = a * Math.cos( ang );
            y = b * Math.sin( ang );
            ctx.moveTo(cx + x - 15, cy + y);
            ctx.lineTo(cx + x + 15, cy + y );
            ctx.moveTo(cx + x, cy + y + 15);
            ctx.lineTo(cx + x, cy + y - 15);
        }

        if (typeof strokesize !== 'undefined') {
            ctx.lineWidth = strokesize;
        }

        if (typeof stroke !== 'undefined') {
            ctx.strokeStyle = stroke;
        }
        ctx.stroke();

        if (typeof fill !== 'undefined') {
            ctx.fillStyle = fill;
            ctx.fill();
        }

    },
    /**
     * Draw a text shape
     *
     * @param int x                 horizontal position on canvas
     * @param int y                 vertical position on canvas
     * @param string text           a string to be drawn
     * @param string font           font family and size, ex. "1em Times New Roman"
     * @param string colour         text colour in hash or rgba
     * @param string baseline       canvas text baseline (top, middle or bottom)
     * @param string align          canvas text align (right, center or left)
     */
    drawText : function(x, y, text, font, colour, baseline, align) {
        var ctx = HandReplay.Facade.data.context;

        ctx.beginPath();
        ctx.font = font;
        ctx.textBaseline = baseline;
        ctx.textAlign = align;
        ctx.fillStyle = colour;
        ctx.fillText(text, x, y);
    },

    /**
     * Set a shadow
     * @param int ox                Horizontal offset
     * @param int oy                Vertical offset
     * @param int blur              Shadow blur
     * @param string colour         Shadow style colour (hash)
     */
    drawShadow : function(ox, oy, blur, colour) {
        var ctx = HandReplay.Facade.data.context;

        ctx.shadowOffsetX = ox;
        ctx.shadowOffsetY = oy;
        ctx.shadowBlur = blur;
        ctx.shadowColor = colour;
    }
};
/*
    PokerTools
    @package HandReplay
    Cards

    Card creation and effects
    
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

HandReplay.Cards = {

    create : function(name, x, y) {
        return new this.Card(name).draw(x, y);
    },

    Card : function(name) {

        var suits = {
            h : '♥',
            d : '♦',
            c : '♣',
            s : '♠'
        };

        var width = 50,
        height = 70,
        font = '18px serif',
        shapefont = '40px serif',
        radius = 3;

        var helpers = HandReplay.CanvasHelpers;
        var ctx = HandReplay.Facade.data.context;

        this.draw = function(x, y) {
            var details = this.parseCardName(name);
            var fontcolor = (details.suit === 's' || details.suit === 'c') ? "Black" : "Red";

            ctx.clearRect(x, y, x + width, y + height);

            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.shadowBlur = 1;
            ctx.shadowColor = "#000";

            helpers.drawRoundedRectangle(x, y, width, height, radius);

            // shadow reset
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;

            ctx.beginPath();
            ctx.moveTo(x + width, y + height/4);
            ctx.lineTo(x + width/3, y + height/4);
            ctx.lineTo(x + width/3, y + height);
            ctx.stroke();

            ctx.beginPath();
            ctx.font = font;
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = fontcolor;
            ctx.fillText(details.label, x + width/6, y + height/8);

            ctx.beginPath();
            ctx.font = font;
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = fontcolor;
            ctx.fillText(suits[details.suit], x + width/6, y + height/3);

            ctx.beginPath();
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = shapefont;
            ctx.fillStyle = fontcolor;
            ctx.fillText(suits[details.suit], width - width/3 + x, height - height/2.5 + y);
        }

        this.parseCardName = function(name) {
            return {
                suit : name.charAt(name.length-1),
                label : name.substring(0, name.length-1)
            }
        }
    }
};
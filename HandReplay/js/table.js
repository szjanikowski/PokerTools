/*
    PokerTools
    @package HandReplay
    Table

    Table drawing and effects
    
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

HandReplay.Table =  {

    init : function() {
        this.draw();
        this.drawSeats();
    },

    draw : function() {
        var ctx = HandReplay.Facade.data.context,
        canvasW = HandReplay.Facade.data.canvasW,
        canvasH = HandReplay.Facade.data.canvasH,
        helpers = HandReplay.CanvasHelpers;

        helpers.drawOvalParam(canvasW/2, canvasH/2, 650, 350, 'rgba(47, 47, 46, 1)', 20, 'rgba(70, 99, 13, 0.8)');
        helpers.drawChairs(6, 0, canvasW/2, canvasH/2, 750, 450, 'rgba(200, 0, 0, 1)', 10);

        HandReplay.Cards.create("Ad", 5, 5);


    },

    seats : function(amount) {

    },

    drawSeats : function() {

    }
};
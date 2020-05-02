import $ from 'jquery';
import { onLoadHtmlSuccess } from '../core/includes';

const durationInMilli = 500;

function filterByCity(city) {
    $('[wm-city]').each(function(i,e) {
        const isTarget = $(e).attr('wm-city') === city || city === null;
        if (isTarget) {
            $(e).parent().removeClass('d-none')
            $(e).hide().fadeIn(durationInMilli);
        } else {
            $(e).hide(1, () => {
                $(e).parent().addClass('d-none')
            });
        }
    })
}

$.fn.cityButtons = function() {
    const cities = new Set;
    $('[wm-city]').each(function(i,e) {
        cities.add($(e).attr('wm-city'));
    });
    
    const btns = Array.from(cities).map(city => {
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(city);
        btn.click(e => filterByCity(city));
        return btn;
    });
    
    const btnAll = $('<button>').addClass(['btn', 'btn-info']).html('All');
    btnAll.click(e => filterByCity(null));
    
    btns.push(btnAll);
    
    const btnGroup = $('<div>').addClass(['btn-group']);
    btnGroup.append(btns);
    
    $(this).html(btnGroup);
    return this;
}

onLoadHtmlSuccess(function (){
    $('[wm-city-buttons]').cityButtons();
})
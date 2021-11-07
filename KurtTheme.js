function rippleALL() {
    patchElementList(['NeuButton', 'NeuMenuItem'])
}

function patchElementList(list) {
    list.forEach(item => {
        Array.from(document.getElementsByClassName(item)).forEach(element => {
            patchRipple(element)
            // console.log(element)
            
        });
    });
}

function patchRipple(element) {
    Parameters = {
        clearing: false,
        spreadingDuration: '.2s',
        opacity: 0.15,
        color: 'black',
        clearingDuration: '0.3s'
    }
    element.setAttribute('onpointerdown', `ripplet(arguments[0], ${JSON.stringify(Parameters)})`)
    element.setAttribute('onpointerup', "ripplet.clear(this)")
    element.setAttribute('onpointerleave', "ripplet.clear(this)")
}

function patchHdlRubberBand() {
    
}

rippleALL()
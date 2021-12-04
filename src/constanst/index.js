export const TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
  DATE: 'date',
  RANGE: 'range',
};

export const SENIORITY = [
  {value: '', label: 'Seleccionar:'},
  {value: 'junior', label: 'Junior'}, 
  {value: 'medium', label: 'Medium'},
  {value: 'master', label: 'Master'},
]

export const EXPERIENCE = [
  {value: '', label: 'Seleccionar:'},
  {value: 'one-year', label: '1 año'},
  {value: 'two-years', label: '2 años'},
  {value: 'three-years', label: '3 años'},
  {value: 'four-years', label: '4 años'},
  {value: 'five-years', label: '5 años'},
]

export const SALARY = [
  {value: '', label: 'Seleccionar:'},
  {value: 'one-million', label: '1 millon'},
  {value: 'three-million', label: '3 millones'},
  {value: 'six-million', label: '6 millones'},
  {value: 'ten-million', label: '10 millones'},
  {value: 'plus-ten-million', label: 'Más de 10 millones'}
]

export const ERROR_MESSAGES = {
  EMPTY: 'Campo requerido',
  EMAIL: 'Email valido',
  DATE: 'Agrega una fecha a futuro'
};

export const FRAMEWORKS = [
  {
    label: "React",
    value: "react",
  },
  {
    label: "Angular",
    value: "angular",
  },
  {
    label: "Svelt",
    value: "svelt",
  },
  {
    label: "NodeJS",
    value: "node-js",
  },
  {
    label: "Vue",
    value: "vue",
  },
  {
    label: "Vanilla JS",
    value: "vanilla-js",
  },
];

export const FONTS = [
  {
    rel: 'preload',
    href: '/fonts/regular/dm-sans.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/bold/dm-sans.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/regular/dm-sans.woff',
    as: 'font',
    type: 'font/woff',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/bold/dm-sans.woff',
    as: 'font',
    type: 'font/woff',
    crossOrigin: 'anonymous',
  },
];
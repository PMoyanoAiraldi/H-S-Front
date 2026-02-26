// Solo el mapeo de búsqueda, lo demás viene de la API
export const BRAND_SEARCH_MAP = {
    'JOHN DEERE': 'JD',
    'MASSEY FERGUSON': 'MF',
    'NEW HOLLAND': 'NH',
    'DEUTZ': 'DEUTZ',
    'FIAT': 'FIAT',
    'CASE IH': 'CASE',
    'VASSALLI': 'VASSALLI',
    'DON ROQUE': 'DON ROQUE',
    'AGCO ALLIS': 'AGCO',
    'VALTRA': 'VALTRA',
    'PLA': 'PLA',
    'METALFOR': 'METALFOR',
    'JACTO': 'JACTO',
    'PAUNY': 'PAUNY',
};

// Las marcas por aplicación, para mostrar en las tarjetas del front
export const APLICACION_MARCAS = {
    'Cosechadoras': ['JOHN DEERE', 'MASSEY FERGUSON', 'NEW HOLLAND', 'VASSALLI', 'DON ROQUE', 'AGCO ALLIS', 'CASE IH'],
    'Pulverizadores': ['PLA', 'METALFOR', 'JACTO'],
    'Tractores': ['JOHN DEERE', 'MASSEY FERGUSON', 'VALTRA', 'DEUTZ', 'NEW HOLLAND', 'PAUNY', 'CASE IH', 'FIAT', 'AGCO ALLIS'],
    'Sembradoras': [],
    'Ognibene Power': [],
};
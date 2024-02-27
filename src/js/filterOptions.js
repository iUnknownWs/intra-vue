const combustible = [
    {
        value: '1',
        label: 'Diesel'
    },
    {
        value: '2',
        label: 'Eléctrico'
    },
    {
        value: '3',
        label: 'Gasolina'
    },
    {
        value: '4',
        label: 'Hidrógeno'
    },
    {
        value: '5',
        label: 'Gasolina/gas'
    },
    {
        value: '6',
        label: 'Híbrido'
    }
]

const cambio = [
    {
        value: '1',
        label: 'Manual'
    },
    {
        value: '3',
        label: 'Automático'
    }
]

const vehiculo = [
    {
        value: '1',
        label: 'Turismo'
    },
    {
        value: '2',
        label: 'Todo terreno'
    },
    {
        value: '3',
        label: 'Vehículo industrial'
    }
]

const categoria = [
    {
        value: '1',
        label: 'Urbano'
    },
    {
        value: '2',
        label: 'Sport'
    },
    {
        value: '3',
        label: 'Aventura'
    },
    {
        value: '4',
        label: 'Clásico'
    },
    
]

const medioambiental = [
    {
        value: '1',
        label: '0'
    },
    {
        value: 'ECO',
        label: 'ECO'
    },
    {
        value: 'B',
        label: 'B'
    },
    {
        value: 'C',
        label: 'C'
    },
    {
        value: 'ND',
        label: 'ND'
    }
]

const etiqueta = [
    {
        value: '0',
        label: 'Cabrio'
    },
    {
        value: '1',
        label: 'Furgoneta'
    },
    {
        value: '2',
        label: 'Deportivo'
    },
    {
        value: '3',
        label: 'No web'
    },
    {
        value: '4',
        label: 'Weekly news'
    }
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i)
const reverseYears = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i).reverse()

const options = {
    combustible,
    cambio,
    vehiculo,
    categoria,
    medioambiental,
    etiqueta,
    years,
    reverseYears
}

export default options
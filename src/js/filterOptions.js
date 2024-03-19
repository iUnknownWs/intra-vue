const combustible = [
    {
        id: '1',
        title: 'Diesel'
    },
    {
        id: '2',
        title: 'Eléctrico'
    },
    {
        id: '3',
        title: 'Gasolina'
    },
    {
        id: '4',
        title: 'Hidrógeno'
    },
    {
        id: '5',
        title: 'Gasolina/gas'
    },
    {
        id: '6',
        title: 'Híbrido'
    }
]

const cambio = [
    {
        id: '1',
        title: 'Manual'
    },
    {
        id: '3',
        title: 'Automático'
    }
]

const vehiculo = [
    {
        id: '1',
        title: 'Turismo'
    },
    {
        id: '2',
        title: 'Todo terreno'
    },
    {
        id: '3',
        title: 'Vehículo industrial'
    }
]

const categoria = [
    {
        id: '1',
        title: 'Urbano'
    },
    {
        id: '2',
        title: 'Sport'
    },
    {
        id: '3',
        title: 'Aventura'
    },
    {
        id: '4',
        title: 'Clásico'
    },

]

const medioambiental = [
    {
        id: '1',
        title: '0'
    },
    {
        id: '1',
        title: 'ECO'
    },
    {
        id: '2',
        title: 'B'
    },
    {
        id: '3',
        title: 'C'
    },
    {
        id: '4',
        title: 'ND'
    }
]

const etiqueta = [
    {
        id: '0',
        title: 'Cabrio'
    },
    {
        id: '1',
        title: 'Furgoneta'
    },
    {
        id: '2',
        title: 'Deportivo'
    },
    {
        id: '3',
        title: 'No web'
    },
    {
        id: '4',
        title: 'Weekly news'
    }
]

const idTypes = [{
    id: 'dni',
    title: 'DNI'
},
{
    id: 'tarjeta_de_extranjeria',
    title: 'Tarjeta de Extranjería'
},
{
    id: 'permiso_de_conducir',
    title: 'Permiso de Conducir'
},
{
    id: 'pasaporte_español',
    title: 'Pasaporte Español'
},
{
    id: 'visado_schengen',
    title: 'Visado Schengen'
},
{
    id: 'permiso_de_residencia',
    title: 'Permiso de Residencia'
}]

const extraType = [{
    id: 'WarrantyType',
    title: 'Garantía'
},
{
    id: 'DeliveryType',
    title: 'Tipo de entrega'
},
{
    id: 'DocumentManagement',
    title: 'Gestión documental'
},
{
    id: 'AnyExtra',
    title: 'Varios'
}]

const paymentMethods = [
    {
        id: 'card',
        title: 'Tarjeta'
    },
    {
        id: 'cash',
        title: 'Efectivo'
    },
    {
        id: 'transfer',
        title: 'Transferencia'
    },
    {
        id: 'vehicle_exchange',
        title: 'Vehículo de cambio'
    }
]

const paymentType = [
    {
        id: '0',
        title: 'Contado'
    },
    {
        id: '1',
        title: 'Financiado'
    }
]

export const interes = [
    {
        id: '1',
        title: '1'
    }
]

export const ajuste = [
    {
        id: '1',
        title: '1'
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
    reverseYears,
    extraType,
    idTypes,
    paymentMethods,
    paymentType
}

export default options
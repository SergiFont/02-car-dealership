import { v4 as uuid } from 'uuid'
import { Brand } from 'src/brands/entities/brand.entity'

export const BRANDS_SEED: Brand[] = [
    {
        id: uuid(),
        name: 'volvo',
        createdAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'jeep',
        createdAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'tesla',
        createdAt: new Date().getTime()
    },
    
] 
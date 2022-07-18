import { Observable } from 'whatsup'
import { createKey } from 'whatsup/jsx'
import { Filter } from './constants'

export const FILTER = createKey<Observable<Filter>>()

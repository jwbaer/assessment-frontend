export enum ComponentType {
  'button' = 'button',
  'condition' = 'condition',
  'image' = 'image',
  'weather' = 'weather',
}

export interface ButtonOptions {
  text: string
  icon: string
  value: string
  variable: string
}

export interface ConditionOptions {
  value: string
  variable: string
}

export interface ImageOptions {
  src: string
  alt: string
}

export interface WeatherOptions {
  lat: string
  lon: string
}

export interface Component {
  id: number
  type: ComponentType
  options: ButtonOptions | ConditionOptions | ImageOptions | WeatherOptions
  children?: number
}

export interface List {
  id: number
  components: number[]
}

export interface VariableDeclaration {
  name: string
  type: string
  initialValue: string
}

export interface Variable {
  name: string
  type: string
  value: string
}

export interface PageApiResult {
  components: Component[]
  lists: List[]
  variables?: VariableDeclaration[]
}

export interface PageSpec {
  componentIndex: Map<number, Component>
  listIndex: Map<number, List>
  variableIndex?:Map<string, Variable>
}

export interface WeatherDay {
  day: string
  condition: string
  conditionName: string
}

export interface WeatherApiResult {
  lon: number
  lat: number
  condition: string
  conditionName: string
  temperature: number
  unit: string
  location: string
  upcomming: WeatherDay[]
}